//编辑框增强，现在包括颜色选择器按钮和表情按钮
var Editor = {};
//表情悬浮框
Editor.addFacesBox = function(){
    $('<div id="gkr-faces-box">\
        <s id="gkr-faces-triangle" class="triangle"/>\
        <div id="gkr-faces-div">\
            <ul id="gkr-faces-groups-ul"/>\
            <ul id="gkr-faces-ul"/>\
        </div>\
    </div>'
    ).appendTo($(document.body).children(containerSelector));
}

//表情预览悬浮框
Editor.addFacesPreviousBox = function(){
    $('<div id="gkr-preview-box">\
        <div id="gkr-preview-div"/>\
    </div>'
    ).appendTo($(document.body).children(containerSelector));
}

//颜色选择器悬浮框
Editor.addColorPicker = function(){
    $('<div id="gkr-color-box" style="position:absolute; display:none; width:185px; height:160px;z-index:9999;">\
        <s id="gkr-color-triangle" class="triangle" style="border-width: 8px;border-color:#2AA4CE transparent transparent transparent; border-style:solid dashed dashed dashed;position: absolute;left: 20px;top: 145px;"/>\
        <div id="gkr-color-div" style="background-color:white; border-color:#2AA4CE; border-style:solid; border-width:1px;height:143px;"/>\
        <div style="background-color:transparent;height:7px"/>\
    </div>'
    ).appendTo($(document.body).children(containerSelector));
}

//获取可视化模式文本区域
function getViewObject(){
    var iframe = $(".edui-editor iframe:visible");
    if(iframe.length == 0){
        var iframe = $(".mce-edit-area iframe:visible");
        if (iframe.length == 0) {
            return null;
        };

    }
    return iframe.prop("contentDocument"); // for jQuery 1.6+
}

//加入表情
 function addFace(url) {
    var $view = getViewObject();
    if($view){
        try{
            $($view.body).focus();
            var range = $view.getSelection().getRangeAt(0);
            range.collapse(false);//行末
            var image = $("<img class='edui-image'>").attr("src",$.trim(url)).attr("data_ue_src",$.trim(url))[0];
            range.insertNode(image);
        }catch(e){
            $view.execCommand("unselect");
            $view.execCommand("insertImage", !1, $.trim(url))
        }
    }

    $("#gkr-faces-box:visible").hide();
}

//加入字体颜色
function addColor(color) {
    var $view = getViewObject();
    if($view){
        $($view.body).focus();
        $view.execCommand("ForeColor", !1, "#" + color)
        //Opera Chrome execCommand 改变的字体颜色为font方式,果壳只能解析span方式
        $($view.body).find("font[color]").each(function(){
            var font = $(this);
            font.replaceWith($("<span>").css("color",font.attr("color")).html(font.html()));
        });
    }

    $("#gkr-color-box:visible").hide();
}

//显示隐藏表情预览
function showPreview(url,currentTarget){
    showPreviewTimer = setTimeout(function(){
        //计算靠左还是靠右显示预览图
    	var boxAbsPos = getAbsPos($("#gkr-faces-box")[0]);
        var previewDivLeft = boxAbsPos.left;
        var currentTargetLeft = getAbsPos(currentTarget).left;
        var boxWidth = $("#gkr-faces-box").width();
		var previewWidth = $("#gkr-preview-box").width();
        if(currentTargetLeft - previewDivLeft <  (boxWidth/2)){
		// 靠右
            previewDivLeft = previewDivLeft + boxWidth - previewWidth;
        }
        $("#gkr-preview-box").show().css("top",boxAbsPos.top + 23).css("left",previewDivLeft).children("#gkr-preview-div").css("background-image","url('" + $.trim(url) + "')");
    },400);
}
function hidePreview(){
    clearTimeout(showPreviewTimer);
    $("#gkr-preview-box").hide();
}