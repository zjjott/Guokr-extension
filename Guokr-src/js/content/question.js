var Question = {};

// 给每个回答加上折叠钩子
Question.addFoldableHook = function(){
    var data_id = $(".answer.gclear").attr('id').slice(6);
    $('span.shareAnswer').before(
        '<a href="javascript: void 0;" data-operation="fold_toggle" data-id=' + data_id + ' data-login=' + ("#answer" + data_id) + ' class="cmts-t-grey answer-hover">收起</a>\
        <span class="split answer-hover">|</span>');
    $('a.answer-hover[data-operation="fold_toggle"]').click(function(){
        if ($(this).text() === "收起") {
            $(this).text("展开");
            var height = $(this).parents('div.answer-r').children('.answer-txt').height();
            if (height > 500) {
                $(this).parents('div.answer-r').children('.answer-txt').slideUp('slow');
            }
            else if (height > 300)
                $(this).parents('div.answer-r').children('.answer-txt').slideUp(); // normal
            else
                $(this).parents('div.answer-r').children('.answer-txt').slideUp('fast');
        }
        else{
            $(this).text("收起");
            $(this).parents('div.answer-r').children('.answer-txt').show("fast");
        }
    });
}
