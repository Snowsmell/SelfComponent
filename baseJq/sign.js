/**
 * 基于jq,canvas签名组件
 * 2018.4.11 17:48 snowsmell
 */
;
(function ($) {
    //构造函数，传入dom本身和参数
    $.fn.sign = function (options) {
        var self = $(this)
        //合并参数
        options = $.extend({}, $.fn.sign.default, options || {})
        var canDom = init(self, options)[0]

        //canvas具体设置
        var context = canDom.getContext('2d') //画布上下文
        var canvasX = canDom.getBoundingClientRect().left; // 画板的坐标x
        var canvasY = canDom.getBoundingClientRect().top; // 画板的坐标y
        context.fillStyle = options.background; // 画布背景色
        context.lineWidth = options.lineWidth; // 线的宽度
        context.strokeStyle = options.linecolor; // 线的颜色
        context.fillRect(0, 0, options.width, options.height); // 画板的范围        

        //事件
        canDom.addEventListener("mousedown", down, false);
        canDom.addEventListener("mousemove", draw, false);
        canDom.addEventListener("mouseup", up, false);

        var onoff = false; // 锁定开关
        var oldx = canvasX; // 起始坐标x
        var oldy = canvasY; // 起始坐标y
        var newx; // 结束坐标x
        var newy; // 结束坐标y
        // 鼠标按下
        function down(event) {
            onoff = true; // 打开开关
            oldx = event.clientX - canvasX; // 鼠标在画板中点击的X的坐标
            oldy = event.clientY - canvasY; // 鼠标在画板中点击的Y的坐标
            context.beginPath(); // 开始路径
            console.log(oldx)
        }

        // 鼠标移动
        function draw(event) {
            // 开关
            if (onoff) {
                newx = event.clientX - canvasX;
                newy = event.clientY - canvasY;
                context.moveTo(oldx, oldy); // 线的起点坐标
                context.lineTo(newx, newy); // 线的始点坐标
                context.stroke(); // 初始化到画布中
                oldx = newx;
                oldy = newy;
            }
        }
        // 鼠标离开
        function up() {
            onoff = false; // 关闭开关
            context.closePath(); // 关闭路径
        };

        //初始化设置容器和画布，并且返回canvas对象
        function init(self, options) {
            self.css({
                boxSizing: 'border-box',
                width: options.width + 'px',
                height: options.height + options.buttonHeight + 'px',
            })
            var canvas = $('<canvas></canvas>')
            canvas.css({
                boxSizing: 'border-box',
                border: options.border,
            })
            canvas.attr('width', options.width + 'px')
            canvas.attr('height', options.height + 'px')
            self.append(canvas)
            return canvas
        }

    }
    $.fn.sign.default = {
        width: 600,
        height: 300,
        buttonHeight: 60,
        border: 'none',
        background: '#ccc',
        lineWidth: 4,
        linecolor: '#333',
    }

})($)