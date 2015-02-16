//--------Global variable ------
//开启/关闭日志输出
var debugMode = false;
// 持久化屏蔽ID列表, e.g. :   var blockIDs	 = ["0792011715","0020566516","0814609355","0637014415"];
var blockIDs	 = [];
// 持久化屏蔽关键词列表, e.g. : var blockStrs	 = ["中医","经络","针灸"];
var blockStrs	 = [];
// 常用表情(可以根据需要修改,注意最后一行没有逗号)
var faces = [

 ];

//更多表情(可以根据需要修改,注意最后一行没有逗号)
var moreFaces = [

];

//备份原始的我的收藏,请勿修改
var favFaces=[];

//个人设置URL
var setHref = "http://www.guokr.com/settings/profile/";

//页面url
var pageurl = window.location.href.replace(/(\?|#).*$/,"");
var isMainpage = (pageurl == "http://www.guokr.com/");
//一些处理标识(不要改动)
var hoverTimer, outTimer, hideFaceTimer, showFaceTimer, showPreviewTimer, showGroupTimer;
var selfHomepage;
var willRun = false;
var colors = ["ffffff","ffccc9","ffce93","fffc9e","ffffc7","9aff99","96fffb","cdffff","cbcefb",
                "cfcfcf","fd6864","fe996b","fffe65","fcff2f","67fd9a","38fff8","68fdff","9698ed","c0c0c0","fe0000",
                "f8a102","ffcc67","f8ff00","34ff34","68cbd0","34cdf9","6665cd","9b9b9b","cb0000","f56b00","ffcb2f",
                "ffc702","32cb00","00d2cb","3166ff","6434fc","656565","9a0000","ce6301","cd9934","999903","009901",
                "329a9d","3531ff","6200c9","343434","680100","963400","986536","646809","036400","34696d","00009b",
                "303498","000000","330001","643403","663234","343300","013300","003532","010066","340096"];
//允许的代码类型,下拉框的值/显示，值会在插入时插成data-lang="xxx"
var codeType=[{value:"python",name:"Python"},
{value:'c',name:"C"},
{value:'c++',name:"C++"},
{value:'matlab',name:"Matlab"},
{value:'java',name:"Java"},
{value:'php',name:"PHP"},
{value:'javascript',name:"Javascript"},

]
// 子域名
var subdomain = "guokr"; // "guokr"表示主站,"mooc"表示MOOC学院,"sex"表示知性社区

//MOOC学院的显示偏移&科学人的显示偏移
if(pageurl.indexOf("mooc.guokr.com") !=-1 ){
    subdomain = "mooc";
} else if(pageurl.indexOf("www.guokr.com/article/") !=-1 ){
    subdomain = "science";
} else if (pageurl.indexOf("sex.guokr.com") != -1) {
    subdomain = "sex";
} else {
    subdomain = "guokr"
}

//--------Util--------
function getContainerObj(){
//  var containerSelector = ".gwrap, .wrap"; // 主页面container元素的选择器.gwrap 是主站, .wrap是mooc学院
//  var container = $(document.body).children(containerSelector);
//  if(container.length == 0){
//  	container = $(document.body).children(".container"); 
//  }
	//对话框不加到body里各个画面布局有问题. 暂时先加到body里了.
	var container = $(document.body);
	if(container.attr("contenteditable") == "true") { //避免把编辑框也改了
		container = $("#oUmwPjslwx123"); // 生成空集
	}
	return container;
}

function getIdFromUrl(url) {
	return url.replace("http://www.guokr.com/i/","").replace("http://www.guokr.com/group/i/","").replace(/\//g,"");
}

//绝对定位 via: http://www.cnblogs.com/jianfangkk/archive/2011/12/30/2307172.html
function getAbsPos(elem) {
	var left = elem.getBoundingClientRect().left+document.body.scrollLeft;
	var top = elem.getBoundingClientRect().top+document.body.scrollTop;
	var pos = {}; pos.top = top; pos.left = left;
	return pos;
}


function store(key, value) {
    if (value) {//存储
        console.warn("store func is deprecated!!!");
    }
    else {//读取
        var rtnValue = localStorage.getItem(key);
        try{
            return rtnValue ? decodeURIComponent(rtnValue) : "";
        }catch(e){return "";}
    }
}

var asyncstore = function(key, value) {
	if (value) {// 异步存储
        var obj = {};
        obj[key] = encodeURIComponent(value);
        log("set:" + value);
        return Wind.Async.Task.create(function(t){
            chrome.storage.local.set(obj, function() {
                t.complete("success", obj);
            });
        });

	} else {// 异步读取
        return Wind.Async.Task.create(function(t){
            chrome.storage.local.get(key, function(data) {
                var rtnValue = "";
                try {rtnValue = (data[key] ? decodeURIComponent(data[key]) : "");} catch (e) {}
                t.complete("success", rtnValue);
            });
        });
		//var rtnValue = localStorage.getItem(key);
	}
}
/////////////Sample of Invocation
/**
var waitForResult = eval(Wind.compile("async", function () {
    var result = $await(asyncstore(obj));
    log(result);
}));
waitForResult().start();
*/
/////////////

// 简单json处理
function obj2json(o){
    if(!o){return ""};
    return JSON.stringify(o);
}
function json2obj(s){
    try{
        if (s) {
            // 判断一下是否{开头是为了兼容纯文本字符串,不过暂时不是必须的,目前用到json2obj的只有gkr-user-groups和gkr-user-notes
            return ($.trim(s).indexOf("{") == 0) ? JSON.parse(s) : JSON.parse('"' + s + '"');
        } else {
            return {};
        }
        // return s ? eval("(" + s + ")") : new Object();
    }catch(e){
        return {};
    }
}

//调试
function log(info){
    if(!debugMode){return;}
    if(console){console.log(info); }
}

//--------Util-End-------
