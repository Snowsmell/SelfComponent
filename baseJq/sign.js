/**
 * 基于jq,canvas签名组件
 * 2018.4.11 17:48 snowsmell
 */
;
(function ($) {
    //构造函数，传入dom本身和参数
    $.fn.sign = function (options) {
        var self =$(this)
        //合并参数
        options = $.extend({}, $.fn.sign.default, options || {})
        var canDom = init(self,options)[0]
        var context = canDom.getContext('2d')//画布上下文



        //初始化设置容器和画布，并且返回canvas对象
        function init(self,options){            
            self.css({
                boxSizing: 'border-box',
                width: options.width + 'px',
                height: options.height + options.buttonHeight + 'px',
            })
            var canvas = $('<canvas></canvas>')
            canvas.css({
                boxSizing: 'border-box',
                border: options.border,
                width: options.width + 'px',
                height: options.height + 'px',

            })
            self.append(canvas)
            return canvas
        }

        

    }
    $.fn.sign.default = {
        width: 600,
        height: 300,
        buttonHeight:60,
        border: '1px solid #ccc'
    }

})($)