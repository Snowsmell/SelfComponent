/**
 * 文本框组件，设置宽高，字数限制,基于jq
 * @param width {num} 设置文本域的长度单位是px
 * @param height {num} 设置文本域的宽度单位是px
 * @param font {num} 文本域字体大小
 * @param limit {num} 文本域限制字数
 * @param limit {num} 文本域默认内容
 * 2018.4.11 17:48 snowsmell
 */
;
(function ($) {
  //定义扩展方法tarea
  $.fn.tarea = function (options, param) {
    if (typeof options === 'string') {
      return $.fn.tarea.methods[options](this, param);
    }
    //参数和默认的参数合并
    options = $.extend({}, $.fn.tarea['default'], options || {})

    init($(this), options)

    function init(_this, options) {
      //样式调整，添加textarea和提示框
      _this.css({
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
      _this.append(textarea)
      _this.append(span)
      //具体提示
      var num = _this.find('span i').eq(0)
      $(textarea).on('keyup', function () {
        if ($(this).val().length >= options.limit) {
          $(this).val($(this).val().slice(0, 200))
          alert('输入超过上限')
        }
        num.html(options.limit - $(this).val().length)
      })
    }
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