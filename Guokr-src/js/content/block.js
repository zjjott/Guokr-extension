//重新绘制屏蔽列表
function initBlockList() {
    if($("#gk-pl-ids").size() == 0){return;}
    $("#gk-pl-ids").empty();
    var asyncfunc = eval(Wind.compile("async", function () {
        var result = $await(asyncstore("ids"));
        var arr = result.split(",");
        $.each(arr,function(i,n){
            if(n)$("#gk-pl-ids").append($("<li>").html(n).append($("<input type='button' title='取消屏蔽' value='x'/>").click(function(){
                var asyncfunc1 = eval(Wind.compile("async", function () {
                    $await(removeBlocked("ids", n));
                    initBlockList();
                }));
                asyncfunc1().start();
            })));
        });
    
        $.each(blockIDs,function(i,n){
            if(n)$("#gk-pl-ids").append($("<li>").html(n));
        });
    
        var result = $await(asyncstore("strs"));
        var arr = result.split(",");
        $("#gk-pl-strs").empty();
        $.each(arr,function(i,n){
            if(n){$("#gk-pl-strs").append($("<li>").html(n).append($("<input type='button' title='取消屏蔽' value='x'/>").click(function(){
                var asyncfunc2 = eval(Wind.compile("async", function () {
                    $await(removeBlocked("strs", n));
                    initBlockList();
                }));
                asyncfunc2().start();
            })));}
        });
    
        $.each(blockStrs,function(i,n){
            if(n)$("#gk-pl-strs").append($("<li>").html(n));
        });
    }));
    asyncfunc().start();
}
        
//删除处理
var removeBlocked = eval(Wind.compile("async", function (a,s) {
    var result = $await(asyncstore(a));
    var arr = result.split(",");
    $.each(arr,function(i,n){
        if (n == s) {
            arr.splice(i, 1);
            return false;
        }
    });
    $await(asyncstore(a, arr));
}));

//屏蔽处理,因为需要调用domChanged()，所以需要处于同一作用域
var addBlocked = eval(Wind.compile("async", function (a,s) {
    if (!s) return;
    var result = $await(asyncstore(a));
    var arr = result.split(",");
    arr.push(s);
    $await(asyncstore(a, arr));
    domChanged();
}));