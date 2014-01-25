//--------Global variable ------
//开启/关闭日志输出
var debugMode = true;
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

//--------Util--------
function store(key, value) {
    if (value) {//存储,发setItem消息
        localStorage.setItem(key, encodeURIComponent(value));

        var obj = {};
        obj[key] = encodeURIComponent(value);
        sendMsg("setItem",obj,function(){});
        
        //重构用TEMP代码,完成后需要删掉
        chrome.storage.local.set(obj, function() {});
    }
    else {//读取
        var rtnValue = localStorage.getItem(key);
        try{
            return rtnValue ? decodeURIComponent(rtnValue) : "";
        }catch(e){return "";}
    }
}

/////////////------------------------------------------
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
/////////////Invocation
var waitForResult = eval(Wind.compile("async", function () {
    var result = $await(asyncstore(obj));
    log(result);
}));
//waitForResult().start();
/////////////------------------------------------------

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

//消息发送
function sendMsg(title,msg,callback){
    var o = new Object();
    o[title]=msg;
    chrome.runtime.sendMessage(o,callback);
}

//--------Util-End-------
