/**
 * 文本框组件，设置宽高，字数限制,基于jq
 * $.fn.tarea
 */
;
(function ($) {
    //定义扩展方法tarea
    $.fn.tarea = function (options, param) {
        //如果有内部方法，会用到，不过这里并没有方法，下面的这句if可以无视
        if (typeof options === 'string') {
            return $.fn.tarea.methods[options](this, param);
        }
        //参数和默认的参数合并
        options = $.extend({}, $.fn.tarea['default'], options || {})
        //样式调整，添加textarea和提示框
        $(this).css({
            width: options.width + 'px',
            height: options.height + 'px',
            position: 'relative'
        })
        //文本输入框
        var textarea = $('<textarea></textarea>');
        textarea.css({
            resize: options.resize,
            boxSizing: 'border-box',
            fontSize: options.font + 'px',
            width: options.width + 'px',
            height: options.height + 'px',
            overflow: 'auto'
        })
        textarea[0].placeholder = options['text']
        //字数span
        var span = $('<span><i>' + options.limit + '</i>\/<i>' + options.limit + '</i></span>')
        span.css({
            display: 'block',
            position: 'absolute',
            bottom: '5px',
            right: '10px',
            color: '#999'
        })
        $(this).append(textarea)
        $(this).append(span)
        console.log(span)
        //具体提示
        var num = $(this).find('span i').eq(0)
        $(textarea).on('keyup', function () {
            if ($(this).val().length >= options.limit) {
                $(this).val($(this).val().slice(0, 200))
                alert('输入超过上限')
            }
            num.html(options.limit - $(this).val().length)
        })
    };
    //默认设置
    $.fn.tarea['default'] = {
        width: 400,
        height: 200,
        font: 14,
        resize: 'none',
        limit: 200,
        text: '大概我就是默认的内容'
    }
})($)