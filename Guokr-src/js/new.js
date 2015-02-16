
var API_BASKET;
var API_CATEGORY;
function loadOptions(){
  API_BASKET = localStorage["basket_url"];
  API_CATEGORY = localStorage["category_url"];
  if (!API_BASKET) {
    API_BASKET = "http://apis.guokr.com/favorite/basket.json";
    localStorage["basket_url"]=API_BASKET;
  }
  if (!API_CATEGORY) {
    API_CATEGORY = "http://www.guokr.com/apis/favorite/category.json";
    localStorage["category_url"]=API_CATEGORY;
  }

}
var debug=false;

function log(item){
    if(debug)
        console.log(item);
}

String.prototype.format = function() {
  var args = arguments;
  return this.replace(/{(\d+)}/g, function(match, number) {
    return typeof args[number] != 'undefined'? args[number]: match
    ;
  });
};

function getCookies(callback) {
    localStorage.removeItem('ukey');
    localStorage.removeItem('token');
    chrome.cookies.getAll({"domain": "www.guokr.com"}, function(cookie) {
        allCookieInfo = "";
        for (i=0; i<cookie.length; i++){
            // log(JSON.stringify(cookie[i]));
            if (cookie[i].name == "_32353_access_token"){
                localStorage.token = cookie[i].value;
            } else if (cookie[i].name == "_32353_ukey"){
                localStorage.ukey = cookie[i].value;
            }
            allCookieInfo = allCookieInfo + JSON.stringify(cookie[i]);
        }
        var ukey = localStorage.ukey;
        if (ukey){
            getCategory();
            clickCreate();
        }else{
            loginGuokr();
        }
        
    });
}
function toHtml(result) {
    sl = $('<select>').appendTo('.gselect');
    var cardTemplate = $("#basketTemplate").html();
    sl.append(cardTemplate.format(-1, "选择类别"));
    $(result).each(function(index, basket) {
        var template = cardTemplate.format(basket.id, basket.name);
        sl.append(template);
    });
}
function validator(title){
    
    if(title)
    {
        return true;
    }
    else{
        $(".new-basket-tip").css("color","red");
    }
}
function createBusket(title,intro,cate,b) {
    $.ajax({url:API_BASKET,
        type: 'post',
        data:{
            title:title,
            introduction:intro,
            category_id:cate,
            access_token: localStorage.token
        },
        success: function(f){
            var result = f.result;
            b.html("已创建");
            b.val(result.id);
            b.removeClass("create");
            message("");
        },
        error:function(){
            message("创建失败");
        },
        dataType: 'json'
    });
}
function clickCreate() {
     $('.new-basket-box').delegate('button.create','click',function(){
        var title = $("input").val();
        if(validator(title)){
            var intro = $("textarea").val();
            var cate = $("select").val();
            createBusket(title,intro,cate,$(this));
        }
    });
     $('.new-basket-box').delegate('input','click',function(){
        $(".new-basket-tip").css("color","#A9A9A9");
    });
}
function getCategory(){
    $.ajax({
        url:API_CATEGORY,
        type:"get",
        data:{
        "access_token": localStorage.token},
        success: function(data){
            toHtml(data.result);
        },
        error:function(){
            message("果篮分类地址无效");
        }
    });
}

$(document).ready(function(){
    loadOptions();
    getCookies();

});