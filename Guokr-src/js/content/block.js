//重新绘制屏蔽列表
function initBlockList() {
    if($("#gk-pl-ids").size() == 0){return;}
    $("#gk-pl-ids").empty();
    var arr = store("ids").split(",");
    $.each(arr,function(i,n){
            if(n)$("#gk-pl-ids").append($("<li style='float:left'>").html(n).append($("<input type='button' title='取消屏蔽' value='x' style='width:16px'/>").click(function(){removeBlocked("ids", n);initBlockList();})));
    });

    $.each(blockIDs,function(i,n){
        if(n)$("#gk-pl-ids").append($("<li style='float:left'>").html(n));
    });

    var arr = store("strs").split(",");
    $("#gk-pl-strs").empty();
    $.each(arr,function(i,n){
        if(n)$("#gk-pl-strs").append($("<li style='float:left'>").html(n).append($("<input type='button' title='取消屏蔽' value='x' style='width:16px'/>").click(function(){removeBlocked("strs", n);initBlockList();})));
    });

    $.each(blockStrs,function(i,n){
        if(n)$("#gk-pl-strs").append($("<li style='float:left'>").html(n));
    });
}
        
//删除处理
function removeBlocked(a, s) {
    var arr = store(a).split(",");
    $.each(arr,function(i,n){
        if (n == s) {
            arr.splice(i, 1);
            return false;
        }
    });
    store(a, arr);
}

//屏蔽处理,因为需要调用domChanged()，所以需要处于同一作用域
        function addBlocked(a, s) {
            if (!s) return;
            var arr = store(a).split(",");
            arr.push(s);
            store(a, arr);
            domChanged();
        }