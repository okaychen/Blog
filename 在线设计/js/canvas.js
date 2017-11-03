//okayChen(9月9日)
//IE 8 及以下不支持canvas,如果使用IE内核的浏览器，请选择IE 9及以上版本
window.onload = function () {
    /*1、*******(***********绘制方格，并初始化**************)*****/
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");

    function drawGrid(stepX, stepY, lineWidth, color) {
        context.save();
        context.lineWidth = lineWidth;
        context.strokeStyle = color;
        for (var i = stepY + 0.5; i < context.canvas.height; i += stepY) {
            context.beginPath();
            context.moveTo(0, i);
            context.lineTo(context.canvas.width, i);
            context.stroke();
        }
        for (var i = stepX + 0.5; i < context.canvas.width; i += stepX) {
            context.beginPath();
            context.moveTo(i, 0);
            context.lineTo(i, context.canvas.height);
            context.stroke();
        }
        context.restore();
    }

    drawGrid(20, 20, 1, '#ccc');    //初始化


    /*2、*******(***********js滚轮事件 实现放大缩小**************)*****/
    var num = 0;
    var scrollFunc = function (e) {
        e = e || window.event;
        var base = 10;   //放大缩小的倍率
        var maxNum = 10; //最大放大的倍数
        var minNum = 0; //最小缩小，恢复默认
        context.clearRect(0, 0, 2400, 1800);   //清除画布，重新绘制
        var draw = drawGrid(20 + base * num, 20 + base * num, 1, '#ccc');

        /*封装重用：attr 为形参，传入e.wheelDelta、e.detail解决Firefox的兼容性问题*/
        function mouseScroll(attr) {
            if (attr >= 120) {    //if 向上滚动, 【120、-120为一般正常状态滚动的数值，console.log(e.wheelDelta)】
                num = num + 1;
                if (num <= maxNum) {
                    draw;
                } else {
                    num = maxNum;
                    draw;
                }
            } else {    //else if 向下滚动
                num = num - 1;
                if (num >= minNum) {
                    draw;
                } else {
                    num = minNum;
                    draw;
                }
            }
        }//end 封装重用

        if (e.wheelDelta) {//IE/Opera/Chrome
            mouseScroll(e.wheelDelta);
        } else if (e.detail) {//Firefox
            mouseScroll(e.detail);
        }
    };

    //初始化后默认可以放大缩小
    if (document.addEventListener) {
        document.addEventListener('DOMMouseScroll', scrollFunc, false);
    }
    window.onmousewheel = document.onmousewheel = scrollFunc;//IE/Opera/Chrome/Safari

    //注册事件<只有在鼠标不在navBar，leftBar，map...内时--才注册放大缩小事件>
    var leftBarWrapper = document.querySelector('.leftBarWrapper');
    var header = document.querySelector('.header');
    var mapWrapper = document.querySelector('.mapWrapper');
    var eventOrNot = {
        yes: function () {
            if (document.addEventListener) {
                document.addEventListener('DOMMouseScroll', scrollFunc, false);
            }
            window.onmousewheel = document.onmousewheel = scrollFunc;//IE/Opera/Chrome/Safari
        },//注册事件
        no: function () {
            if (document.addEventListener) {
                document.addEventListener('DOMMouseScroll', null, false);
            }
            window.onmousewheel = document.onmousewheel = null;
        }//取消事件
    };

    function MouseEvent(attr) {
        attr.addEventListener('mouseover', eventOrNot.no, false);
        attr.addEventListener('mouseout', eventOrNot.yes, false);
    }

    //leftBar，navBar，map注册事件
    MouseEvent(leftBarWrapper);
    MouseEvent(header);
    MouseEvent(mapWrapper);
};