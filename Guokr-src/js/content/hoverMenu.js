//小组搜索悬挂框
var Pinyin={};
Pinyin._pinyin = PinyinData;
// 将前面的字符变成大写
Pinyin._ucfirst = function(l1){
    if (l1.length>0) {
        var first = l1.substr(0,1).toUpperCase();
        var spare = l1.substr(1,l1.length);
        return first + spare;
    }
};
Pinyin._arraySearch = function(l1,l2){
    for (var name in this._pinyin){
        if (this._pinyin[name].indexOf(l1)!=-1) {
            return this._ucfirst(name); break;
        }
    }
    return false;
};
Pinyin.get = function(l1){
    var l2 = l1.length;
    var I1 = "";
    var reg = new RegExp('[a-zA-Z0-9\- ]');
    for (var i=0;i<l2;i++) {
        var val = l1.substr(i,1);
        var name = this._arraySearch(val,this._pinyin);
        if(reg.test(val)) {
            I1 += val;
        } else if (name!==false) {
            I1 += name;
        }
    }
    I1 = I1.replace(/ /g,'-');
    while (I1.indexOf('--')>0) {
        I1 = I1.replace('--','-');
    }
    return I1;
};

var HoverMenu = {};
//小组菜单悬浮框
HoverMenu.addGroupsMenu = function(){
	$('<div id="gkr-groups-menu">\
		<s id="gkr-groups-triangle" class="triangle"/>\
		<div id="gkr-groups-div">\
		   <ul id="gkr-groups-searchfav-ul">\
			   <li>\
			       <input type="text" id="gkr-groups-searchbox" maxlength=8 placeholder="快速搜索"/>\
			   </li>\
		   </ul>\
		   <ul id="gkr-groups-ul"/>\
		</div>\
	</div>'
	).hover(function(){
		clearTimeout(showGroupTimer);
	},function(){
		showGroupTimer = setTimeout(function(){
			$("#gkr-groups-menu").show().hide();
		},400);
	}).appendTo($(document.body).children(".container"));
};

//追加小组菜单
HoverMenu.showGroupsMenu = function(){
	$("ul.gh-nav a[href='http://www.guokr.com/group/user/recent_replies/']").hover(function(){
		clearTimeout(showGroupTimer);
		var groupLink = $(this);
		showGroupTimer = setTimeout(function(){
			var rowLength = 5;
			var groups = $("#gkr-groups-ul").children().length;
			var grouprows = (groups/rowLength > (parseInt(groups/rowLength,10))) ? (parseInt(groups/rowLength,10) + 1) : (parseInt(groups/rowLength,10));
			$("#gkr-groups-menu").show().css("width",(rowLength * 95) + 2)
			.css("top",groupLink.offset().top + subdomainOffsetTop + groupLink.height() + 23)
			.css("left",groupLink.offset().left + subdomainOffsetLeft - 145);//首页位置修正
			//.children("#gkr-groups-triangle").css("left",100-70+3).css("top",grouprows*22 + 22);
			$("#gkr-groups-div").css("width",(rowLength * 95) + 5)
			$("#gkr-groups-ul").css("height",grouprows*22 +5);
			$("#gkr-groups-searchfav-ul").css("height",1*22);
		},400);

	},function(){
		clearTimeout(showGroupTimer);
		showGroupTimer = setTimeout(function(){
			$("#gkr-groups-menu").show().hide();
		},400);
	});
};

//获取全部小组
function getGroups(callback){

    var asyncfunc = eval(Wind.compile("async", function () {

        var groupsdata = $await(asyncstore("gkr-user-groups"));
        var groups = json2obj(groupsdata);
        var size = 0;
        $.each(groups,function(){size++;});
        var time = new Date().getTime();
        var lastcheckdata = $await(asyncstore("gkr-user-groups-chktime"));
        var lastcheck = lastcheckdata ? lastcheckdata: 0;

        //存在且更新时间在1小时以内则使用既有groups
        if(size > 0 && (time - lastcheck) < 3600000){callback(groups);return;}

        //否则获取并保存
        if(selfHomepage){

            function fetchGroups(url){
                $.get(url, function(data){
                    $(data).find("ul.join-list * div a[href^='http://www.guokr.com/group/']").each(function(){
                        if($(this).attr("title")){
                            groups[$(this).attr("href")] = $(this).attr("title");
                        }
                    });

                    //有多页(翻页最后一项是链接(下一页))
                    if($(data).find("ul.gpages li:last a").text()){
                        fetchGroups($(data).find("ul.gpages li:last").prev().children("a").attr("href"));
                    }else{

                        var asyncfunc1 = eval(Wind.compile("async", function () {
                            $await(asyncstore("gkr-user-groups",obj2json(groups)));
                            $await(asyncstore("gkr-user-groups-chktime",time));
                            callback(groups);
                        }));
                        asyncfunc1().start();
                    }
                });
            }
            groups = new Object();
            fetchGroups(selfHomepage + "groups/");
        }
    }));
    asyncfunc().start();
}

//快速搜索
HoverMenu.searchGroups = function(){
	$("#gkr-groups-searchbox").keyup(function(){
		var searchText = $(this).val().toLowerCase();
		var reg = new RegExp("^" + searchText);
		var regForInitials = new RegExp(searchText);//按首字母搜索不要求从第一个字开始
		$("#gkr-groups-ul").children().each(function(i,n){
			var pyLetters = $(n).attr("pinyin");
			var pyLettersLower = pyLetters.toLowerCase();
			var pyInitials = pyLetters.replace(/[a-z]+/g,"").toLowerCase();
			var fullName = $(n).children("a").attr("title").toLowerCase();
			if(!reg.test(pyLettersLower) && !regForInitials.test(pyInitials) && !reg.test(fullName)){
				$(n).hide();
			}else{
				$(n).show();
			}
		});
	});
};

//获取全部小组
HoverMenu.addGroupsName = function(){
	var maxGroupName = 12;
	getGroups(function(data){
		$.each(data,function(i,n){
				var groupName = n;
				if(groupName.length > 7 && !/([a-zA-Z]|\s|\d|!)+/.test(n)){//长度超过7 又不包含英文的截断
					groupName = groupName.substr(0,6) + "…";
				}
				if(groupName.length > maxGroupName ){//限制中英混合或纯英文的不超过12个字符,thank to spacewander.
					groupName = groupName.substr(0,maxGroupName - 1) + "…";
                }
				$("<li pinyin='" + Pinyin.get(n.replace(/\s|\d|!/g,"")) + "'>\
				<a href='" + i + "' title='"+ n +"'>" + groupName + "</a></li>").appendTo("#gkr-groups-ul");
		});
	});
};

