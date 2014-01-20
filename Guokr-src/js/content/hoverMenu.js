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

function addGroupsMenu(){
    
        
}

//获取全部小组
function getGroups(callback){
    var groups = json2obj(store("gkr-user-groups"));
    var size = 0;
    $.each(groups,function(){size++;});
    var time = new Date().getTime();
    var lastcheck = store("gkr-user-groups-chktime") ? store("gkr-user-groups-chktime"): 0;

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
                    store("gkr-user-groups",obj2json(groups));
                    store("gkr-user-groups-chktime",time);
                    callback(groups);
                }
            });
        }
        groups = new Object();
        fetchGroups(selfHomepage + "groups/");
    }
}