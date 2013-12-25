function restore_options() {
  var basket_url = localStorage["basket_url"];
  var link_url = localStorage["link_url"];
  var category_url = localStorage["category_url"];
  if (!basket_url) {
    basket_url = "http://apis.guokr.com/favorite/basket.json";
  }
  if (!link_url) {
    link_url = "http://apis.guokr.com/favorite/link.json";
  }
  if (!category_url) {
    category_url = "http://www.guokr.com/apis/favorite/category.json";
  }
  $("input.basket_url").val(basket_url);
  $("input.link_url").val(link_url);
  $("input.category_url").val(category_url);
}
function message(msg) {
  $("span.message").html(msg);
}
function save_options() {
  var basket_url = $("input.basket_url").val();
  var link_url = $("input.link_url").val();
  var category_url = $("input.category_url").val();
  localStorage["basket_url"]=basket_url;
  localStorage["link_url"]=link_url;
  localStorage["category_url"]=category_url;
  message("保存成功");
  
}
function reset(){
  localStorage.removeItem("basket_url");
  localStorage.removeItem("link_url");
  localStorage.removeItem("category_url");
  restore_options();
}

$(document).ready(function(){
    restore_options();
    $("button.save").click(function(){
      save_options();
    });
    $("button.reset").click(function(){
      reset();
    });
});