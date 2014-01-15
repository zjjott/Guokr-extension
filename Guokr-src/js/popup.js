var API_BASKET;
var API_LINK;
function loadOptions(){
    API_BASKET = localStorage["basket_url"];
    API_LINK = localStorage["link_url"];
    if (!API_BASKET) {
    API_BASKET = "http://apis.guokr.com/favorite/basket.json";
    localStorage["basket_url"]=API_BASKET;
  }
  if (!API_LINK) {
    API_LINK = "http://apis.guokr.com/favorite/link.json";
    localStorage["link_url"]=API_LINK;
  }
}
var debug=true;

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
            getBaskets(ukey);
            clickEvent();
        }else{
            loginGuokr();
        }
        
    });
}

function toHtml(data) {
    sl = $('<select>').prependTo('.baskets');
    $(data.result).each(function(index, basket) {
        var cardTemplate = $("#basketTemplate").html();
        var template = cardTemplate.format(basket.id, basket.title);
        sl.append(template);
    });
    chrome.tabs.getSelected(null, function(tab) {
        localStorage.current_link = tab.url;
        $('textarea.basket-text').val(tab.title);
    });
    
}

function getBaskets(ukey) {
    url = API_BASKET + '?retrieve_type=by_ukey&ukey=' + ukey;
    $.get(url, function(data) {
        toHtml(data);
    });
}

function getCurrentLink(){
    chrome.tabs.getSelected(null, function(tab) {
        localStorage.current_link = tab.url;
    });
}

function addToBasket(basketId, fruit_url,title, t){
    $.ajax({
        url: API_LINK,
        type: 'post',
        data: {
            basket_id: basketId,
            url: fruit_url,
            title: title,
            access_token: localStorage.token
        },
        success: function(f){
            t.toggleClass("remove");
            t.toggleClass("add");
            t.html("已添加");
            t.val(basketId);
            message("");
        },
        error: function(a,b,c){
            message("添加失败");
        },
        dataType: 'json'
    });
}



function removeFromBasket(basket_id,link,t){
    $.ajax({
        url: API_LINK + '?' + $.param({"basket_id": basket_id,
            "url":link,
            "access_token": localStorage.token}),
        type: 'delete',
        success: function(d){
            t.toggleClass("remove");
            t.toggleClass("add");
            t.removeAttr("value");
            t.html("添加");
        },
        error: function(a,b,c){
            message("删除失败");
        },
        dataType: 'json'
    });
}

function clickEvent(){
    $('.baskets').delegate('select','click',function(){
        var b = $("button");
        b.html("添加");
        b.removeAttr("value");
        b.removeClass();
        b.addClass("add");
    });
    $('.baskets').delegate('button','click', function(){
        var t = $(this);
        var basket_id = $("select").val();
        log(t);
        link = localStorage.getItem("current_link");
        localStorage.removeItem('current_link');
        if (t.hasClass("remove")){
            var id = t.val();
            removeFromBasket(id,link,t);
        }else{
            var title = $('textarea.basket-text').val();
            addToBasket(basket_id, link, title, t);
        }
    });
    $('.baskets').delegate('button.remove','mouseenter', function(){
        $(this).html("删除");
    });
    $('.baskets').delegate('button.remove','mouseleave', function(){
        $(this).html("已添加");
    });
    $('.basket-box').delegate('textarea','click',function(){
        message("");
    });
    
}

$(document).ready(function(){
    loadOptions();
    getCookies();
    getCurrentLink();
});

