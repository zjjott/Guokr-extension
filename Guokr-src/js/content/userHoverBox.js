function addHoverBox(){
    //用户悬浮框(果壳测试页面不添加用户悬浮框防止测试页面出错)
    if (window.location.href.indexOf("guokr.com/test") == -1){      
        $('<div id="gkr-hover-box" style="position:absolute; display:none; z-index:9999;  width:250px; height:120px;font-size: 12px;">\
            <s id="gkr-hover-triangle" class="triangle" style="border-width: 6px;border-color:green transparent transparent transparent; border-style:solid dashed dashed dashed;position: absolute;left: 20px;top: 114px;"/>\
            <div style="background-color:white; border-color:green; border-style:solid; border-width:1px;height:113px;">\
            <table style="border-collapse: separate;padding:10px"><tr style="height:70px;">\
                <td><div id="gkr-hover-img"/></td>\
                <td><div style="padding-left:10px;">\
                    <div style="height:24px"><a href="javascript:void(0);" id="gkr-hover-link" style="color: rgb(0, 102, 153);";/></div>\
                    <input type="text" placeholder="添加备注" id="gkr-hover-notes" style="width:160px;height:20px;" value=""/>\
                </div></td></tr>\
                <tr><td style="width:140px; vertical-align:bottom;"><a id="gkr-hover-msg" href="javascript:void(0);" title="点击发送站内信给他">站内信</a></td>\
                <td style="width:40px;">\
                <a id="gkr-hover-block" style="float:right;margin-right:0px;margin-left:10px;" class="mw_btn-ext" href="javascript:void(0);">屏蔽</a>\
                <!--<a id="gkr-hover-follow" style="float:right;" class="mw_btn-ext" href="javascript:void(0);">关注</a>--></td>\
                </tr>\
                </table>\
            </div>\
            <div style="background-color:transparent;height:7px"/>\
        </div>'
        ).hover(function(){
            clearTimeout(outTimer);
            $(this).show();
        },function(){
            var box = $(this);
            clearTimeout(hoverTimer);
            outTimer = setTimeout(function(){
                box.fadeOut("fast");
            },800);
        }).appendTo($(document.body).children(".container"));
    }
}

//备注改变事件
function changeNotes(){
    $("#gkr-hover-notes").change(function(){
        var notes = json2obj(store("gkr-user-notes"));
        notes[$("#gkr-hover-box").data("userId")] = $(this).val();
        store("gkr-user-notes",obj2json(notes));
    });
}

//屏蔽处理
function addBlocked(a, s) {
    if (!s) return;
    var arr = store(a).split(",");
    arr.push(s);
    store(a, arr);
    domChanged();
}
//屏蔽按钮事件
function clickBlock(){
    $("#gkr-hover-block").click(function(){
        if (confirm("确定要屏蔽该用户发言？")) {
            addBlocked("ids", $("#gkr-hover-box").data("userId"));
            initBlockList();
        }
    });
}

//站内信按钮事件
function clickMsg(){
    $("#gkr-hover-msg").click(function(){
        if($(this).data("running") == "true"){return;}
        var msg = $(this).data("running","true");
        window.open("/user/messages/" + $("#gkr-hover-box").data("userId") + "/");
        msg.data("running","false");         
    });
}