// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// A generic onclick callback function.

//开启/关闭日志输出
var debugMode = true;

//消息发送
function sendMsgToContent(title,msg,callback){
  chrome.tabs.query({url: "http://*.guokr.com/*"}, function(tabs) {
    for (var i=0;i<tabs.length;i++) {
      var o = {};
      o[title]=msg;
      chrome.tabs.sendMessage(tabs[i].id, o, callback);
    }
  });
}

//消息处理
var handler = {
    setItem : function(data) {
        log(data);
        for(var key in data){
            localStorage.setItem(key,data[key]);
        }
    },
    getItemArray : function(data, sender, sendResponse) {
        var o = {};
        for(var i=0;i<data.length;i++){
          var key = data[i];
          o[key] = localStorage.getItem(key);
        }
        sendResponse(o);
    }
};

//消息接收
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    for(var title in request){
      log(request);
      handler[title](request[title], sender, sendResponse);
    }
  }
);



function store(key, value) {
  if (value) {//存储,发set消息
      localStorage.setItem(key, encodeURIComponent(value));

      var obj = {};
      obj[key] = encodeURIComponent(value);
      //存储,发消息同步content页面的localStorage
      sendMsgToContent("storageUpdate",obj);
  }
  else//读取，发get消息
  {
      var rtnValue = localStorage.getItem(key);
      try{
          return rtnValue ? decodeURIComponent(rtnValue) : "";
      }catch(e){return "";}
  }
}

//调试
function log(info){
    if(!debugMode){return;}
    if(console){console.log(info); }
}

function addFaceToStorage(info, tab) {
  store("gkr-user-favfaces",store("gkr-user-favfaces")+"\n"+info.srcUrl);
}


chrome.contextMenus.create({"title": "添加进收藏表情",
                            "contexts":["image"],
                            "onclick": addFaceToStorage
                              });
