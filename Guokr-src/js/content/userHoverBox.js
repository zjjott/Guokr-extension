var UserHoverBox = {
    addHoverBox : function(){
    //用户悬浮框(果壳测试页面不添加用户悬浮框防止测试页面出错)
        if (window.location.href.indexOf("guokr.com/test") == -1){      
            $('<div id="gkr-hover-box">\
                <s id="gkr-hover-triangle" class="triangle"/>\
                <div id="gkr-hover-board">\
                    <table>\
                        <tr style="height:70px;">\
                            <td><div id="gkr-hover-img"/></td>\
                            <td><div style="padding-left:10px;">\
                                <div style="height:24px"><a href="javascript:void(0);" id="gkr-hover-link";/></div>\
                                <input type="text" placeholder="添加备注" id="gkr-hover-notes" value=""/>\
                            </div></td></tr>\
                            <tr><td style="width:140px; vertical-align:bottom;"><a id="gkr-hover-msg" href="javascript:void(0);" title="点击发送站内信给他">站内信</a></td>\
                            <td style="width:40px;">\
                            <a id="gkr-hover-block" class="mw_btn-ext" href="javascript:void(0);">屏蔽</a>\
                            <!--<a id="gkr-hover-follow" class="mw_btn-ext" href="javascript:void(0);">关注</a>--></td>\
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
            }).appendTo($(document.body).children(containerSelector));
        }
    },
    //备注改变事件
    changeNotes : function(){
        $("#gkr-hover-notes").change(function(){
            var note = $(this).val();
            var asyncfunc = eval(Wind.compile("async", function () {
                
                var result = $await(asyncstore("gkr-user-notes"));
                var notes = json2obj(result);
                notes[$("#gkr-hover-box").data("userId")] = note;
                //其实没有后续并不需要阻塞,如果不加$await等待就需要调用start(),因为asyncstore返回的是Task对象
                $await(asyncstore("gkr-user-notes",obj2json(notes)));
                
            }));
            asyncfunc().start();
        });
    },
    //屏蔽按钮事件
    clickBlock : function(){
        $("#gkr-hover-block").click(function(){
            if (confirm("确定要屏蔽该用户发言？")) {
                var asyncfunc = eval(Wind.compile("async", function () {
                    $await(addBlocked("ids", $("#gkr-hover-box").data("userId")));
                    initBlockList();
                }));
                asyncfunc().start();
            }
        });
    },
    //站内信按钮事件
    clickMsg : function(){
        $("#gkr-hover-msg").click(function(){
            if($(this).data("running") == "true"){return;}
            var msg = $(this).data("running","true");
            window.open("/user/messages/" + $("#gkr-hover-box").data("userId") + "/");
            msg.data("running","false");         
        });
    }
};