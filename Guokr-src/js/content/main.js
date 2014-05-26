// ==UserScript==
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
    var blocking = eval(Wind.compile("async", function () {
        var strsResult = $await(asyncstore("strs"));
        var strsPlus = strsResult.split(",").concat(blockStrs);
        var idsResult = $await(asyncstore("ids"));
        var idsPlus = idsResult.split(",").concat(blockIDs);
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
    }));
    blocking().start();

    //悬浮框
    $("a[href^='http://www.guokr.com/i/']").children("img[hoverBoxAdded!='true']").attr("hoverBoxAdded","true").hover(function(){
        var img = $(this);
        var parent = $(this).parent();
        clearTimeout(outTimer);
        hoverTimer = setTimeout(function(){
            var asyncfunc = eval(Wind.compile("async", function () {
                var id = parent.attr("href").toString().replace("http://www.guokr.com/i/","").replace(/\//g,"");
                $("#gkr-hover-box").hide().data("userId",id);
                $("#gkr-hover-link").attr("href",parent.attr("href")).html(parent.text() + parent.attr("title"));
                $("#gkr-hover-link:empty").html(parent.next(".lu_txt").text() + $(".post_user").text());
                $("#gkr-hover-img").empty().append(img.clone().css("height","48px").css("width","48px"));
                var result = $await(asyncstore("gkr-user-notes"));
                var note = json2obj(result)[id];
                $("#gkr-hover-notes").val(note ? note : "");//FF,Chrome不处理undefined
                $("#gkr-hover-box:hidden").css("top",img.offset().top - 120).css("left",img.offset().left).fadeIn("fast").children("#gkr-hover-triangle").css("left",img.attr("width")/2-6);
            }));
            asyncfunc().start();
        },800);
    },function(){
        clearTimeout(hoverTimer);
        outTimer = setTimeout(function(){
            $("#gkr-hover-box:visible").fadeOut("fast");
        },800);
    });
    var toolBarSelector = "div.edui-toolbar[addFaceDone!='true'],div.mce-container-body.mce-flow-layout[addFaceDone!='true']";

    //功能按钮
    //暂时有bug,问答页面有两个编辑器时会有冲突
    if($(toolBarSelector).length > 0){
        var toolBar = $($(toolBarSelector)[0]);
        var isMce = toolBar.hasClass("mce-flow-layout");
        var editorSelector = isMce ? ".mce-edit-area" : ".edui-editor";

        /**
        //颜色选择器
        if (isMce) {
            var cpButton = $("<div tabIndex='998'  id='mce_98' class='mce-container mce-flow-layout-item mce-btn' ><div id='mce_98-body'></div></div>");
            cpButton.children().css("width",25);
            cpButton.children().css("height",25);
            cpButton.children().css("background-position","3px 3px");
            cpButton.children().css("background-size","20px 20px");
            cpButton.children().css("background-repeat","no-repeat");
        }
        else{
            var cpButton = $("<div tabIndex='998' class='edui-box edui-button'><div class='edui-box edui-icon' style='background-position: 3px 3px;background-repeat: no-repeat;background-size: 20px 20px;'></div></div>");
        }

        var cp = "http://img1.guokr.com/gkimage/3u/wh/1y/3uwh1y.gif";
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
            if($(editorSelector).offset().left < 10){//编辑器全屏
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
        //果壳颜色功能已经被干掉,暂时隐藏颜色选择器
        //toolBar.append(cpButton);*/

        //加入更多表情
        if (isMce) {
            var moreFaceButton = $("<div tabIndex='999'  id='mce_99' class='mce-container mce-flow-layout-item mce-btn' ><div id='mce_99-body'></div></div>");
            moreFaceButton.children().css("width",25);
            moreFaceButton.children().css("height",25);
            moreFaceButton.children().css("background-position","3px 3px");
            moreFaceButton.children().css("background-size","20px 20px");
            moreFaceButton.children().css("background-repeat","no-repeat");
        }
        else{
            var moreFaceButton = $("<div tabIndex='999' class='edui-box edui-button'><div class='edui-box edui-icon' style='background-position: 2px 2px;background-repeat: no-repeat;'></div></div>");
        }

        var moreFace = "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/eb/smile.gif";

        // 按照所在子域名不同来初始化不同的待插入的组件。
        // 如果是MOOC学院，那么需要把样式写入html里，这样才会覆盖原有的css规则。
        var facesLi = '';
        var facesGroupLi = '';
        var facesA = '';
        if(subdomain === "mooc") {
            facesLi = "<li class='gkr-faces-li' style='line-height:22px;height:24px;width:24px;padding:0;margin:0;border:1px solid #e8e8e8;'>";
            facesGroupLi = "<li class='gkr-faces-groups-li' style='padding:0 2px; margin:0;line-height:22px;height:22px;border-width:1px;border-style:none none solid;border-color:transparent transparent #2AA4CE;'></li>";
              facesA = "<a href='javascript:void(0);' style='display:block; float: left; height: 22px; width: 22px; background-size:22px 22px;'/>";
        }
        else {
            facesLi = "<li class='gkr-faces-li'>";
            facesGroupLi = "<li class='gkr-faces-groups-li'></li>";
            facesA = "<a href='javascript:void(0);'/>";
        }

        moreFaceButton.children().css("background-image","url('" + moreFace + "')");
        moreFaceButton.click(function(){
            var morefaceLink = $(this);
            //关闭其他悬浮框
            $("#gkr-color-box").hide();
            $("#gkr-faces-ul").empty();
            if($("#gkr-faces-ul:empty").length > 0){
                moreFaces = Faces.defaultMoreFaces[0].faces;
                $.each(moreFaces,function(i,n){
                    $("#gkr-faces-ul").append($(facesLi).append(
                        $(facesA).css("background-image","url('" + $.trim(n) + "')")
                        .click(function(){addFace($.trim(n));})
                        .hover(function(){showPreview(n,this);},function(){hidePreview();})
                        .hover(function(){
                            $(this).css("border","1px solid #0095cd");
                        }, function(){
                            $(this).css("border", "1px solid #e8e8e8");
                        })
                    ));
                });
            }
            try{morefaceLink.focus();}catch(e){}//Chrome需要调用focus()获取焦点,FF调用反而会抛出异常
            clearTimeout(hideFaceTimer);//Chrome重复点击更多表情时取消上次的blur事件
            var rowLength = 14;
            var facerows = (moreFaces.length/rowLength > (parseInt(moreFaces.length/rowLength,10))) ? (parseInt(moreFaces.length/rowLength,10) + 1) : (parseInt(moreFaces.length/rowLength,10));

            //默认情况
            // 这个是每个表情框的大小
            var width = $(".gkr-faces-li").outerWidth();
            var height = $(".gkr-faces-li").outerHeight();
            width = width ? width : 22;
            height = height ? height : 22;
            log(morefaceLink);
            var top = morefaceLink.offset().top + subdomainOffsetTop - facerows*height - 36 - 22;
            var triangleTop = facerows * height + 44;
            var trangleShape = {"border-color":"#2AA4CE transparent transparent transparent", "border-style":"solid dashed dashed dashed"};//down
            if($(editorSelector).offset().left < 10){//编辑器全屏
                top = morefaceLink.offset().top + subdomainOffsetTop + 40;
                triangleTop = -16;
                trangleShape = {"border-color":"transparent transparent #2AA4CE transparent", "border-style":"dashed dashed solid dashed"};//up
            }
            $("#gkr-faces-div").css("width",(rowLength * width) + 2);
            $("#gkr-faces-box").show().css("width",(rowLength * width) + 2)
            .css("top",top)
            .css("left",morefaceLink.offset().left + subdomainOffsetLeft - 170)
            .children("#gkr-faces-triangle").css("left",170+5)
            .css("top",triangleTop)
            .css(trangleShape);

            $("#gkr-faces-ul").css("height",facerows*height +20);
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
                            $("#gkr-faces-ul").append($(facesLi).append($(facesA)
                            .css("background-image","url('" + $.trim(n) + "')")
                            .click(function(){addFace($.trim(n));})
                            .hover(function(){
                                $(this).css("border","1px solid #0095cd");
                            }, function(){
                                $(this).css("border", "1px solid #e8e8e8");
                            })
                        ));
                    });
                }
                try{morefaceLink.focus();}catch(e){}//Chrome需要调用focus()获取焦点,FF调用反而会抛出异常
                clearTimeout(hideFaceTimer);//Chrome重复点击更多表情时取消上次的blur事件

                var rowLength = 4;
                var facerows = (faces.length/rowLength > (parseInt(faces.length/rowLength,10))) ? (parseInt(faces.length/rowLength,10) + 1) : (parseInt(faces.length/rowLength,10));


                //默认情况
                // 这个是每个表情框的大小
                var width = $(".gkr-faces-li").outerWidth();
                var height = $(".gkr-faces-li").outerHeight();
                width = width ? width : 22;
                height = height ? height : 22;
                var top = morefaceLink.offset().top + subdomainOffsetTop - facerows*width - 36;
                var triangleTop = facerows * width + 22;
                var trangleShape = {"border-color":"#2AA4CE transparent transparent transparent", "border-style":"solid dashed dashed dashed"};//down
                if($(editorSelector).offset().left < 10){//编辑器全屏
                    top = morefaceLink.offset().top + subdomainOffsetTop + 40;
                    triangleTop = -16;
                    trangleShape = {"border-color":"transparent transparent #2AA4CE transparent", "border-style":"dashed dashed solid dashed"};//up
                }
                $("#gkr-faces-div").css("width",(rowLength * width) + 2);
                $("#gkr-faces-box").show().css("width",(rowLength * width) + 2)
                .css("top",top)
                .css("left",morefaceLink.offset().left + subdomainOffsetLeft - 40)
                .children("#gkr-faces-triangle").css("left", 40 + 5)
                .css("top",triangleTop)
                .css(trangleShape);
                $("#gkr-faces-ul").css("height",facerows * height +20);
                $("#gkr-faces-groups-ul").hide();
                },200);
            },function(){
                clearTimeout(showFaceTimer);
            }
        );
        toolBar.append(moreFaceButton);

        //表情分组与切换
        $.each(Faces.defaultMoreFaces,function(i,n){
            $("#gkr-faces-groups-ul").append($(facesGroupLi).append($("<a index='" + i + "' href='javascript:void(0);' style='font-size:12px;color: #0078b6;'>"+ n.name +"</a>").click(function(){
                var index = parseInt($(this).attr("index"),10);
                moreFaces = Faces.defaultMoreFaces[index].faces;
                $("#gkr-faces-ul").empty();
                if($("#gkr-faces-ul:empty").length > 0){
                    $.each(moreFaces,function(i,n){
                        $("#gkr-faces-ul").append($(facesLi).append(
                            $(facesA)
                            .css("background-image","url('" + $.trim(n) + "')")
                            .click(function(){addFace($.trim(n));})
                            .hover(function(){showPreview(n,this);},function(){hidePreview();})
                            .hover(function(){
                                $(this).css("border","1px solid #0095cd");
                            }, function(){
                                $(this).css("border", "1px solid #e8e8e8");
                            })
                        ));
                    });
                }
                try{moreFaceButton.focus();}catch(e){}//Chrome需要调用focus()获取焦点,FF调用反而会抛出异常
                clearTimeout(hideFaceTimer);//Chrome重复点击更多表情时取消上次的blur事件

                var rowLength = 14;
                var facerows = (moreFaces.length/rowLength > (parseInt(moreFaces.length/rowLength,10))) ? (parseInt(moreFaces.length/rowLength,10) + 1) : (parseInt(moreFaces.length/rowLength,10));
                $("#gkr-faces-div").css("width",(rowLength * width) + 2);



                //默认情况
                // 这个是每个表情框的大小
                var width = $(".gkr-faces-li").outerWidth();
                var height = $(".gkr-faces-li").outerHeight();
                width = width ? width : 24;
                height = height ? height : 24;
                var top = moreFaceButton.offset().top + subdomainOffsetTop - facerows*height - 36 - 22;
                var triangleTop = facerows * height + 44;
                var trangleShape = {"border-color":"#2AA4CE transparent transparent transparent", "border-style":"solid dashed dashed dashed"}//down
                if($(editorSelector).offset().left < 10){//编辑器全屏
                    top = moreFaceButton.offset().top + subdomainOffsetTop + 40;
                    triangleTop = -16;
                    trangleShape = {"border-color":"transparent transparent #2AA4CE transparent", "border-style":"dashed dashed solid dashed"}//up
                }

                $("#gkr-faces-box").show().css("width",(rowLength * width) + 2)
                .css("top",top)
                .css("left",moreFaceButton.offset().left + subdomainOffsetLeft - 210 + 70)
                .children("#gkr-faces-triangle")
                .css("left",210-70+5)
                .css("top",triangleTop)
                .css(trangleShape);
                log(facerows*height +20);
                $("#gkr-faces-ul").css("height",facerows*height +20);
            })));
        });

        //短网址用于统计
        toolBar.append($("<div id='countLink' class='edui-box edui-button' style='width:0px;border-style:none;border-width:0px;background-size:21px 0px;background-position:2px 2px;color:#CECFCE;' >\
                              <div class='edui-box edui-icon' >\
                              </div>\
                          </div>").css("background-image","url('http://goo.gl/IkF5C')"));
        //目前只支持同一个页面上的第一个编辑器
        $(toolBarSelector).attr("addFaceDone","true");

    }

}


(function() {

    //收藏表情发生变化时reload
    chrome.storage.onChanged.addListener(function(changes, namespace) {
        for(var key in changes){
            if(key == "gkr-user-favfaces"){
                reloadFace();
            }
        }
    });

    // 备份
    $.each(Faces.defaultMoreFaces[Faces.defaultMoreFaces.length-1].faces,
        function(i,n){
            favFaces.push(n);
    });

    //判断是否Opera JS模式
    if(window.opera){window.opera.defineMagicVariable( '$isOperaJsMode', function(){return 1;}, null );}
    if(window.$isOperaJsMode){//Opera UserJs模式下的脚本随页面一起加载
        document.addEventListener('DOMContentLoaded',contentLoaded,false);
    }else{//GM模式下的脚本DOMContentLoaded发生之后才加载
        contentLoaded();
    }

    //重新加载我的收藏表情列表
    function reloadFace () {
        var asyncfunc = eval(Wind.compile("async", function () {
            var result = $await(asyncstore("gkr-user-favfaces"));
            var facesdata = result.split("\n");
            oldFaces = new Array();
            $.each(facesdata,function(i,n){
                if(n && $.trim(n)){
                    oldFaces.push(n);
                 }
            });
            Faces.defaultMoreFaces[Faces.defaultMoreFaces.length-1].faces = oldFaces;
        }));
        asyncfunc().start();
    }

    //页面载入
    function contentLoaded() {

        var asyncfunc = eval(Wind.compile("async", function () {
            //如果localStorage中有旧版插件的数据,则将数据迁移到chrome.storage中
            if(store("gkr-user-defaultfaces")){
                var localStorageKeys = ["gkr-user-favfaces","gkr-user-defaultfaces","gkr-user-notes","ids","strs"];
                for(var i=0;i<localStorageKeys.length;i++){
                    var key = localStorageKeys[i];
                    $await(asyncstore(key,store(key)));
                    localStorage.removeItem(key);
                }
                //小组数据只需要重新获取就好了,不必迁移数据
                localStorage.removeItem("gkr-user-groups");
                localStorage.removeItem("gkr-user-groups-chktime");
            }

            //如果是第一次初始化载入默认表情
            var defaultfaces = $await(asyncstore("gkr-user-defaultfaces"));
            if(!defaultfaces){
                defaultfaces = Faces.defaultFaces.join("\n");
                $await(asyncstore("gkr-user-defaultfaces",defaultfaces));
            }

            //初始化常用表情列表
            if(defaultfaces && $.trim(defaultfaces)){
                var facesdata = defaultfaces.split("\n");
                $.each(facesdata,function(i,n){
                    if(n && $.trim(n)){
                        faces.push(n);
                    }
                });
            }

            //初始化收藏表情列表
            var favfaces = $await(asyncstore("gkr-user-favfaces"));
            if(favfaces && $.trim(favfaces)){
                var facesdata = favfaces.split("\n");
                var oldFaces = Faces.defaultMoreFaces[Faces.defaultMoreFaces.length-1].faces;
                $.each(facesdata,function(i,n){
                    if(n && $.trim(n)){
                        oldFaces.push(n);
                    }
                });
            }
        }));
        asyncfunc().start();

        //如果是个人设置页面右侧追加配置项
        if (window.location.href == setHref) {
            //脚本设置区域
            $("<div>").attr("id", "gk-pl-config").appendTo($(".settings-profile-page form").parent()).html('\
                <div id="gk-pl-content">\
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
                            <a id="reset-user-groups" href="javascript:void(0);">重置小组数据</a><br>\
                            <a id="reset-user-faces" href="javascript:void(0);">重置自定义表情数据</a>\
                        </fieldset>\
                    </div>\
                </div>\
            ');

            //重置小组数据
            $("#reset-user-groups").click(function(){
                chrome.storage.local.remove("gkr-user-groups");
            });

            //重置自定义表情数据
            $("#reset-user-faces").click(function(){
                if (confirm("确定要重置自定义表情数据？您的自定义表情可能会丢失！")) {
                    chrome.storage.local.remove("gkr-user-favfaces");
                    chrome.storage.local.remove("gkr-user-defaultfaces");
                }
            });

            //关键词Add按钮
            $("<input type='button'>").val("Add").css("width", "35px").click(function(){
                var asyncfunc = eval(Wind.compile("async", function () {
                    $await(addBlocked("strs", $("#gk-pl-str").val()));
                    initBlockList();
                }));
                asyncfunc().start();
            }).appendTo("#gk-pl-addstr");
            initBlockList();



            //自定义区保存事件
            var asyncfunc1 = eval(Wind.compile("async", function () {
                var defaultFaces = $await(asyncstore("gkr-user-defaultfaces"));
                $("<textarea>").attr("id","gk-user-defaultfaces").val($.trim(defaultFaces)).css("width", "655px").css("height","150px").change(function(){
                    asyncstore("gkr-user-defaultfaces",$("#gk-user-defaultfaces").val() + " ").start();
                }).appendTo("#gk-user-defaultfacesbox");
            }));
            asyncfunc1().start();

            var asyncfunc2 = eval(Wind.compile("async", function () {
                var favFaces = $await(asyncstore("gkr-user-favfaces"));
                $("<textarea>").attr("id","gk-user-favfaces").val($.trim(favFaces)).css("width", "655px").css("height","300px").change(function(){
                    asyncstore("gkr-user-favfaces",$("#gk-user-favfaces").val() + " ").start();
                }).appendTo("#gk-user-favfacesbox");
            }));
            asyncfunc2().start();
            log("asyncfunc2");
        }

        //加载guoker悬挂框
        UserHoverBox.addHoverBox();
        //备注改变事件
        UserHoverBox.changeNotes();
        //屏蔽按钮事件
        UserHoverBox.clickBlock();
        //站内信按钮事件
        UserHoverBox.clickMsg();

        // 果壳问答
        if (window.location.href.indexOf("http://www.guokr.com/question") != -1 ){
            Question.addFoldableHook();
        }

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
