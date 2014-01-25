﻿// ==UserScript==
// @name           Guokr
// @author         nasdaq,猪了个去
// @description    果壳网增强扩展
// @version        1.4.0.7
// @namespace      http://www.guokr.com/
// @download       http://userscripts.org/scripts/show/129841
// @include        http://www.guokr.com/*
// @grant          none
// ==/UserScript==

// ※※※注意！脚本必须以UTF-8编码保存！※※※
//主处理
function domChanged() {
    willRun = false;
    log("domChanged");
    //主过滤处理
    var strsPlus = store("strs").split(",").concat(blockStrs);
    var idsPlus = store("ids").split(",").concat(blockIDs);
    $(".container").find("li a,dd a,li * a,dd * a,dl * a").filter(":visible").each(function(){
        var a = $(this);
        var text = a.text();
        $.each(strsPlus,function(i,n){if(n && text.indexOf(n) != -1){a.closest("li,dd,dl").hide();return false;}});
        var href = a.attr("href");
        if(href && a.parent().attr("class") != "titles-b-r"){//最后回复者不作为过滤条件
            var id = href.replace("http://www.guokr.com/i/","").replace(/\//g,"");
            if(id && $.inArray(id,idsPlus) != -1){a.closest("li,dd,dl").hide();}
        }
    });
    
    //悬浮框
    $("a[href^='http://www.guokr.com/i/']").children("img[hoverBoxAdded!='true']").attr("hoverBoxAdded","true").hover(function(){
        var img = $(this);
        var parent = $(this).parent();
        clearTimeout(outTimer);
        hoverTimer = setTimeout(function(){
            var id = parent.attr("href").toString().replace("http://www.guokr.com/i/","").replace(/\//g,"");
            $("#gkr-hover-box").hide().data("userId",id);
            $("#gkr-hover-link").attr("href",parent.attr("href")).html(parent.text() + parent.attr("title"));
            $("#gkr-hover-link:empty").html(parent.next(".lu_txt").text() + $(".post_user").text());
            $("#gkr-hover-img").empty().append(img.clone().css("height","48px").css("width","48px"));
            var note = json2obj(store("gkr-user-notes"))[id];
            $("#gkr-hover-notes").val(note ? note : "");//FF,Chrome不处理undefined
            $("#gkr-hover-box:hidden").css("top",img.offset().top - 120).css("left",img.offset().left).fadeIn("fast").children("#gkr-hover-triangle").css("left",img.attr("width")/2-6);
        },800);
    },function(){
        clearTimeout(hoverTimer);
        outTimer = setTimeout(function(){
            $("#gkr-hover-box:visible").fadeOut("fast");
        },800);
    });

    //功能按钮
    if($("div.edui-toolbar[addFaceDone!='true']").length > 0){
        var toolBar = $($("div.edui-toolbar[addFaceDone!='true']")[0]);
        
        //颜色选择器
        var cp = "http://img1.guokr.com/gkimage/3u/wh/1y/3uwh1y.gif";
        var cpButton = $("<div tabIndex='998' class='edui-box edui-button'>\
                              <div class='edui-box edui-icon' style='background-position: 3px 3px;background-repeat: no-repeat;background-size: 20px 20px;'>\
                              </div>\
                          </div>");
        //tabIndex属性帮助div获取焦点,处理foucs blur事件                 
        cpButton.children().css("background-image","url('" + cp + "')");
        
        cpButton.click(function(){
            var cpLink = $(this);
            //关闭其他悬浮框
            $("#gkr-faces-box").hide()
            
            if($("#gkr-color-div:empty").length > 0){
                $.each(colors,function(i,n){
                    $("#gkr-color-div").append($("<a href='javascript:void(0);' style='display:block;float: left;height: 20px; width: 20px;background-position:0px 0px;' />").css("background-color","#" + n).click(function(){addColor(n);}));
                });
            }
            try{cpLink.focus();}catch(e){}
            clearTimeout(hideFaceTimer);
            
            //默认情况
            var top = cpLink.offset().top - 159;
            var triangleTop = 145;
            var trangleShape = {"border-color":"#2AA4CE transparent transparent transparent", "border-style":"solid dashed dashed dashed"}//down
            if($(".edui-editor").offset().left < 10){//编辑器全屏
                top = cpLink.offset().top + 40;
                triangleTop = -16;
                trangleShape = {"border-color":"transparent transparent #2AA4CE transparent", "border-style":"dashed dashed solid dashed"}//up
            }
            
            $("#gkr-color-box").css("top",top)
            .css("left",cpLink.offset().left - 180 + 62).show()
            .children("#gkr-color-triangle")
            .css("left",180-60+3)
            .css("top",triangleTop)
            .css(trangleShape);
            }).blur(function(){
                hideFaceTimer = setTimeout(function(){$("#gkr-color-box").hide();},500);
            });
        toolBar.append(cpButton);
        
        //加入更多表情
        var faceSize = 24;
        var faceGridStyle = "<li style='line-height:22px;height:22px;width:22px;padding:0px;float: left;border:1px solid #e8e8e8'>";

        var moreFace = "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/eb/smile.gif";
        var moreFaceButton = $("<div tabIndex='999' class='edui-box edui-button'>\
                                    <div class='edui-box edui-icon' style='background-position: 2px 2px;background-repeat: no-repeat;'>\
                                    </div>\
                                </div>");
        //tabIndex属性帮助div获取焦点,处理foucs blur事件
        moreFaceButton.children().css("background-image","url('" + moreFace + "')");
        moreFaceButton.click(function(){
            var morefaceLink = $(this);
            //关闭其他悬浮框
            $("#gkr-color-box").hide();
            $("#gkr-faces-ul").empty();
            if($("#gkr-faces-ul:empty").length > 0){
                moreFaces = Faces.defaultMoreFaces[0].faces;
                $.each(moreFaces,function(i,n){
                    $("#gkr-faces-ul").append($(faceGridStyle).append(
                        $("<a href='javascript:void(0);' style='display:block;float: left;height: 22px; width: 22px;background-size:22px 22px;background-position:1px 0px;' />")
                        .css("background-image","url('" + $.trim(n) + "')")
                        .click(function(){addFace($.trim(n));})
                        .hover(function(){showPreview(n,this);},function(){hidePreview();})
                    ));
                });
            }
            try{morefaceLink.focus();}catch(e){}//Chrome需要调用focus()获取焦点,FF调用反而会抛出异常
            clearTimeout(hideFaceTimer);//Chrome重复点击更多表情时取消上次的blur事件
            var rowLength = 14;
            var facerows = (moreFaces.length/rowLength > (parseInt(moreFaces.length/rowLength,10))) ? (parseInt(moreFaces.length/rowLength,10) + 1) : (parseInt(moreFaces.length/rowLength,10));

            //默认情况
            var top = morefaceLink.offset().top - facerows*faceSize - 36 - faceSize;
            var triangleTop = facerows*faceSize + 44;
            var trangleShape = {"border-color":"#2AA4CE transparent transparent transparent", "border-style":"solid dashed dashed dashed"}//down
            if($(".edui-editor").offset().left < 10){//编辑器全屏
                top = morefaceLink.offset().top + 40;
                triangleTop = -16;
                trangleShape = {"border-color":"transparent transparent #2AA4CE transparent", "border-style":"dashed dashed solid dashed"}//up
            }
            $("#gkr-faces-div").css("width",(rowLength * faceSize) + 2);
            $("#gkr-faces-box").show().css("width",(rowLength * faceSize) + 2)
            .css("top",top)
            .css("left",morefaceLink.offset().left - 210 + 70)
            .children("#gkr-faces-triangle").css("left",210-70+5)
            .css("top",triangleTop)
            .css(trangleShape);
            
            $("#gkr-faces-ul").css("height",facerows*faceSize +20);
            $("#gkr-faces-groups-ul").show();
        }).blur(function(){
            hideFaceTimer = setTimeout(function(){$("#gkr-faces-box").hide();},500);
        }).hover(function(){//常用表情
            var morefaceLink = $(this);
            //200ms延迟显示
            showFaceTimer = setTimeout(function(){
                //如果更多表情已经显示则不再显示常用表情
                if($("#gkr-faces-box:visible").length > 0){return;}
                //关闭其他悬浮框
                $("#gkr-color-box").hide();
                $("#gkr-faces-ul").empty();
                if($("#gkr-faces-ul:empty").length > 0){
                    $.each(faces,function(i,n){
                            $("#gkr-faces-ul").append($(faceGridStyle)
                                .append($("<a href='javascript:void(0);' style='display:block;float: left;height: 22px; width: 22px;background-size:22px 22px;background-position:1px 0px;' />").css("background-image","url('" + $.trim(n) + "')").click(function(){addFace($.trim(n));})));
                    });
                }
                try{morefaceLink.focus();}catch(e){}//Chrome需要调用focus()获取焦点,FF调用反而会抛出异常
                clearTimeout(hideFaceTimer);//Chrome重复点击更多表情时取消上次的blur事件
                var rowLength = 4;
                var facerows = (faces.length/rowLength > (parseInt(faces.length/rowLength,10))) ? (parseInt(faces.length/rowLength,10) + 1) : (parseInt(faces.length/rowLength,10));
                
                
                //默认情况
                var top = morefaceLink.offset().top - facerows*faceSize - 36;
                var triangleTop = facerows*faceSize + faceSize;
                var trangleShape = {"border-color":"#2AA4CE transparent transparent transparent", "border-style":"solid dashed dashed dashed"}//down
                if($(".edui-editor").offset().left < 10){//编辑器全屏
                    top = morefaceLink.offset().top + 40;
                    triangleTop = -16;
                    trangleShape = {"border-color":"transparent transparent #2AA4CE transparent", "border-style":"dashed dashed solid dashed"}//up
                }
                
                $("#gkr-faces-div").css("width",(rowLength * faceSize) + 2);
                $("#gkr-faces-box").show().css("width",(rowLength * faceSize) + 2)
                .css("top",top)
                .css("left",morefaceLink.offset().left - 100 + 70)
                .children("#gkr-faces-triangle").css("left",100-70+5)
                .css("top",triangleTop)
                .css(trangleShape);
                $("#gkr-faces-ul").css("height",facerows*faceSize +20)
                $("#gkr-faces-groups-ul").hide();
                },200);
            },function(){
                clearTimeout(showFaceTimer);
            }
        );
        toolBar.append(moreFaceButton);
        
        //表情分组与切换
        $.each(Faces.defaultMoreFaces,function(i,n){
            $("#gkr-faces-groups-ul").append($("<li style='line-height:22px;height:22px;padding:0px 2px 0px 2px;float: left;'></li>")
                .append($("<a index='" + i + "' href='javascript:void(0);'>"+ n.name +"</a>")
                .click(function(){
                    // 突出显示当前表情分组名
                    $('#gkr-faces-groups-ul > li > a').each(function() {
                        $(this).css({"font-weight":"400","font-size":"12px"});//normal font style
                    })
                    $(this).css({"font-weight":"700","font-size":"14px"});// bold font style

                    var index = parseInt($(this).attr("index"),10);
                    moreFaces = Faces.defaultMoreFaces[index].faces;
                    $("#gkr-faces-ul").empty();
                    if($("#gkr-faces-ul:empty").length > 0){
                        $.each(moreFaces,function(i,n){
                            $("#gkr-faces-ul").append($(faceGridStyle).append(
                                $("<a href='javascript:void(0);' style='display:block;float: left;height: 22px; width: 22px;background-size:22px 22px;background-position:1px 0px;' />")
                                .css("background-image","url('" + $.trim(n) + "')")
                                .click(function(){
                                    addFace($.trim(n));
                                })
                                .hover(function(){showPreview(n,this);},function(){hidePreview();})
                            ));
                        });
                    }
                    try{moreFaceButton.focus();}catch(e){}//Chrome需要调用focus()获取焦点,FF调用反而会抛出异常
                    clearTimeout(hideFaceTimer);//Chrome重复点击更多表情时取消上次的blur事件
                    var rowLength = 14;
                    var facerows = (moreFaces.length/rowLength > (parseInt(moreFaces.length/rowLength,10))) ? (parseInt(moreFaces.length/rowLength,10) + 1) : (parseInt(moreFaces.length/rowLength,10));
                    $("#gkr-faces-div").css("width",(rowLength * faceSize) + 2);
                    
                    //默认情况
                    var top = moreFaceButton.offset().top - facerows*faceSize - 36 - faceSize;
                    var triangleTop = facerows*faceSize + 44;
                    var trangleShape = {"border-color":"#2AA4CE transparent transparent transparent", "border-style":"solid dashed dashed dashed"}//down
                    if($(".edui-editor").offset().left < 10){//编辑器全屏
                        top = moreFaceButton.offset().top + 40;
                        triangleTop = -16;
                        trangleShape = {"border-color":"transparent transparent #2AA4CE transparent", "border-style":"dashed dashed solid dashed"}//up
                    }
                    
                    $("#gkr-faces-box").show().css("width",(rowLength * faceSize) + 2)
                    .css("top",top)
                    .css("left",moreFaceButton.offset().left - 210 + 70)
                    .children("#gkr-faces-triangle")
                    .css("left",210-70+3)
                    .css("top",triangleTop)
                    .css(trangleShape);
                    log(facerows*faceSize +20);
                    $("#gkr-faces-ul").css("height",facerows*faceSize +20);
                })));
        });
        
        //短网址用于统计
        toolBar.append($("<div id='countLink' class='edui-box edui-button' style='height:25px;width:0px;border-style:none;border-width:0px;background-size:21px 0px;background-position:2px 2px;color:#CECFCE;' >\
                              <div class='edui-box edui-icon' >\
                              </div>\
                          </div>").css("background-image","url('http://goo.gl/IkF5C')"));             
        //$(".gui-ubb-links").attr("addFaceDone","true");
        toolBar.attr("addFaceDone","true"); 

    }
}


(function() {   
    //消息处理
    var handler = {
        storageUpdate : function(data) {
            log("storageUpdating");
            log(data);
            for(var key in data){
                localStorage.setItem(key,data[key]);
                if(key == "gkr-user-favfaces"){
                    reloadFace();
                }
            }
        }
    }

    //消息接收
    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        for(var title in request){
          handler[title](request[title], sender, sendResponse);
        }
      }
    );
        
    //备份
    $.each(Faces.defaultMoreFaces[Faces.defaultMoreFaces.length-1].faces,
        function(i,n){
            favFaces.push(n);
    });

    //需要从background载入的数据
    sendMsg("getItemArray", ["gkr-user-favfaces"], function(data){
        for(var key in data){
            localStorage.setItem(key,data[key]);
        }
    });
    
    //判断是否Opera JS模式
    if(window.opera){window.opera.defineMagicVariable( '$isOperaJsMode', function(){return 1;}, null );}
    if(window.$isOperaJsMode){//Opera UserJs模式下的脚本随页面一起加载
        document.addEventListener('DOMContentLoaded',contentLoaded,false);
    }else{//GM模式下的脚本DOMContentLoaded发生之后才加载
        contentLoaded();
    }

    function reloadFace () {
        log(store("gkr-user-favfaces"));
        var facesdata = store("gkr-user-favfaces").split("\n");
        oldFaces = new Array();
        $.each(facesdata,function(i,n){
            if(n && $.trim(n)){
                oldFaces.push(n);
             }
        });
        Faces.defaultMoreFaces[Faces.defaultMoreFaces.length-1].faces = oldFaces;

    }

    //页面载入
    function contentLoaded() {
        //如果是第一次初始化载入默认表情
        if(!store("gkr-user-defaultfaces")){
            store("gkr-user-defaultfaces",Faces.defaultFaces.join("\n"));
        }

        //初始化常用表情列表
        if(store("gkr-user-defaultfaces") && $.trim(store("gkr-user-defaultfaces"))){
            var facesdata = store("gkr-user-defaultfaces").split("\n");
            $.each(facesdata,function(i,n){
                if(n && $.trim(n)){
                    faces.push(n);
                }
            });
        }

        //初始化收藏表情列表
        if(store("gkr-user-favfaces") && $.trim(store("gkr-user-favfaces"))){
            var facesdata = store("gkr-user-favfaces").split("\n");
            var oldFaces = Faces.defaultMoreFaces[Faces.defaultMoreFaces.length-1].faces;
            $.each(facesdata,function(i,n){
                if(n && $.trim(n)){
                    oldFaces.push(n);
                }
            });
        }
        	
        //如果是个人设置页面右侧追加配置项
        if (window.location.href == setHref) {
            //脚本设置区域
            $("<div>").attr("id", "gk-pl-config").appendTo($(".settings-profile-page form").parent()).html('\
                <div id="gk-pl-content" style="display:block;">\
                    <div id="gk-pl-main">\
                        <fieldset><legend title="脚本设置">脚本设置</legend>\
                            <fieldset><legend title="屏蔽的用户ID" >屏蔽ID</legend><ul id="gk-pl-ids"/></fieldset>\
                            <fieldset><legend title="屏蔽的标题关键字">屏蔽关键字</legend>\
                                <ul><li id="gk-pl-addstr"><input type="text" id="gk-pl-str" title="含有此关键字的链接将被屏蔽"/></li></ul>\
                                <ul id="gk-pl-strs"/>\
                            </fieldset>\
                            <fieldset><legend title="常用表情设置">常用表情设置</legend>\
                                <ul id="gk-user-defaultfacesbox"/>\
                            </fieldset>\
                            <fieldset><legend title="收藏表情设置">收藏表情设置</legend>\
                                <ul id="gk-user-favfacesbox"/>\
                            </fieldset>\
                            <a href="javascript:localStorage.setItem(\'gkr-user-groups\',\'\');">重置小组数据</a><br>\
                            <a href="javascript:localStorage.setItem(\'gkr-user-favfaces\',\'\');localStorage.setItem(\'gkr-user-defaultfaces\',\'\');">重置自定义表情数据</a>\
                        </fieldset>\
                    </div>\
                </div>\
            ');
            //关键词Add按钮
            $("<input type='button'>").val("Add").css("width", "35px").click(function(){
                addBlocked("strs", $("#gk-pl-str").val());
                initBlockList();
            }).appendTo("#gk-pl-addstr");
            initBlockList();
            
            
           
            //自定义区保存事件
            $("<textarea>").attr("id","gk-user-defaultfaces").val($.trim(store("gkr-user-defaultfaces"))).css("width", "655px").css("height","150px").blur(function(){
                store("gkr-user-defaultfaces",$("#gk-user-defaultfaces").val() + " ");
            }).appendTo("#gk-user-defaultfacesbox");
            
            $("<textarea>").attr("id","gk-user-favfaces").val($.trim(store("gkr-user-favfaces"))).css("width", "655px").css("height","300px").blur(function(){
                store("gkr-user-favfaces",$("#gk-user-favfaces").val() + " ");
            }).appendTo("#gk-user-favfacesbox");
        }

        //加载guoker悬挂框
        UserHoverBox.addHoverBox();
        //备注改变事件
        UserHoverBox.changeNotes();
        //屏蔽按钮事件
        UserHoverBox.clickBlock();       
        //站内信按钮事件
        UserHoverBox.clickMsg();

        //表情悬浮框
        Editor.addFacesBox();      
        //表情预览悬浮框
        Editor.addFacesPreviousBox();
        //颜色选择器悬浮框
        Editor.addColorPicker();
        
		// 处理小组搜索框
        HoverMenu.addGroupsMenu();
        HoverMenu.showGroupsMenu();     
        HoverMenu.searchGroups();
         //还有收藏小组没做TODO
        
        //获取selfHomepage
        selfHomepage = $(".gheader-new a[href^='http://www.guokr.com/i/']").attr("href");
        HoverMenu.addGroupsName();

        //主处理
        domChanged();
        document.addEventListener("DOMNodeInserted",domChangeRunOnce,false);
        
        //短时间800ms内多次事件发生只执行一次
        function domChangeRunOnce(){
            if(willRun){return;}
            willRun = true;
            runOnceTimer = setTimeout(domChanged,800);
        }
    } // end contentLoaded
})();
