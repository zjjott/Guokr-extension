// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// A generic onclick callback function.

//开启/关闭日志输出
var debugMode = true;

//调试
function log(info){
    if(!debugMode){return;}
    if(console){console.log(info); }
}

function addFaceToStorage(info, tab) {
    var key ="gkr-user-favfaces";
    chrome.storage.local.get(key, function(data) {
        //get
        var favfaces = ""; 
        try {favfaces = (data[key] ? decodeURIComponent(data[key]) : "");} catch (e) {}
        
        //set
        var obj = {};
        obj[key] = encodeURIComponent(favfaces+"\n"+info.srcUrl);
        chrome.storage.local.set(obj, function() {});
    });
}


chrome.contextMenus.create({"title": "添加进收藏表情",
                            "contexts":["image"],
                            "onclick": addFaceToStorage
                              });
