function loginGuokr(){
    var login = $("#loginTemplate").html();
    $(".baskets").append(login);
}

function message(msg) {
    $("span.warn").html(msg);
}