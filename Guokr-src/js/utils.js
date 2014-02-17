function loginGuokr(){
    var login = $("#loginTemplate").html();
    $('#blockTitle').text('请先登录');
    $('textarea.basket-text').prop('disabled','disabled');
    $('label[for="baskets"]').hide();
    $('.basket-box-footer').hide(); 
    $(".baskets").append(login);
}

function message(msg) {
    $("span.warn").html(msg);
}
