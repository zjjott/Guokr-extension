// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// A generic onclick callback function.

var ifchanged = false;
//端口监听器

chrome.runtime.onConnect.addListener(function(port) {
  //消息通道，reload的监听器在main.js
  if(port.name == "msg"){
    port.onMessage.addListener(function(msg) {
      if (msg.set){
          //request.data是一个键值对object
          chrome.storage.local.set(msg.set,function(){
            port.postMessage({ok: true});  
          });
      }
      if (msg.get){
          chrome.storage.local.get(msg.get,function (items) {
            if (!items[msg.get]) 
              var data ="";
            else
              var data=items[msg.get];
            port.postMessage({data:data,key:msg.get,ok:true});
          });
      };
    });
  }
  if (port.name == "reload") {
    port.onMessage.addListener(function(msg){
      //收到询问是否需要重载的链接，直接返回
      
      if (msg.ping) {
        console.log("服务器收到询问");
        port.postMessage({reload:ifchanged});
        ifchanged=false;
      };
    });
  };
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
    if ("gkr-user-favfaces" in changes) {
        console.log("监听到存储改变事件");
        ifchanged = true;
    }
});

function addFaceToStorage(info, tab) {
  chrome.storage.local.get("gkr-user-favfaces", function(items) {
        var store = items;        
        if(!store["gkr-user-favfaces"]){
            var json = '{"gkr-user-favfaces":"'+info.srcUrl+'"}';
            store = JSON && JSON.parse(json)||$.parseJSON(json);
        }
        else
        {
          store["gkr-user-favfaces"]+="\n"+info.srcUrl;
        }
        chrome.storage.local.set(store);
        console.log(store); 
    });
}
function cleanStorage(){
  chrome.storage.local.clear(function(){
    alert("所有表情已删除");
  });
}
chrome.contextMenus.create({"title": "添加进收藏表情", 
                            "contexts":["image"],
                            "onclick": addFaceToStorage
                              });
chrome.contextMenus.create({"title": "删除所有收藏表情",
                            "contexts":["page"],
                            "onclick": cleanStorage
                              });