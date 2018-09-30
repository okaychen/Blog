---
title: requestAnimationFrame优化web动画
date: 2018-05-15 18:01:39
categories:
  - JavaScript
tags:
  - JS
  - web动画
# photos:
#   - /assets/photos/banner01.png
#   - /assets/photos/banner02.png
---

## requestAnimationFrame 是什么?

在浏览器动画程序中，我们一般会使用定时器来循环每隔多少毫秒来移动物体一次，来使它产生动画的效果。requestAnimationFrame()函数是针对动画效果的 API，告诉浏览器您希望执行动画并请求浏览器在下一次重绘之前调用指定的函数来更新动画，可以把它用在 DOM 上的风格变化或 canvas 动画或 WebGL 中。

<!-- more -->

## requestAnimationFrame 相比定时器有哪些优势?

那么问题就来了：CSS3 动画那么强，定时器同样可以完成一般的动画，我们为什么还需要 requestAnimationFrame()呢？

首先对于主流的 CSS3 动画来说，虽然一些主流浏览器都对它有比较好的支持，但是 ie8 以下（）是不支持的是其一，其二 CSS3 动画的运动轨迹比较少，有不小的局限性。

这时候我们会考虑到 JS，定时器使我们经常用到的方法，但是用定时器制作动画会发生【跳帧】问题，试想一下拥堵的高速公路上，最多每 16.7s 通过一辆车，结果突然插入一批 setinterval 的军车，强行要在 10s 通过。显然，这是超负荷的，想要顺利通过，只能让第三辆车军车直接消失。然而这是不现实的，于是就会堵车！

同样的，显示器 16.7ms`刷新间隔之前发生了其他的绘制的请求`（setTimeout），导致所有的第三帧丢失，继而导致动画断续显示，这就是过渡绘制带来的问题。这也是为何 setTimeout 的定时器值推荐最小使用`16.7ms`原因`（16.7 = 1000 / 60，即每秒60帧）`

requestAnimationFrame 则会跟着浏览器的绘制走，如果浏览器设备的绘制间隔是 16.7ms，它就会 16.7ms 绘制；如果是 10ms，则会按 10ms 来绘制。这样就不会存在过度绘制的问题，动画不会掉帧。

## requestAnimationFrame 用法

虽然说 CSS3 动画既方便又高效，但是对于 PC 端 IE8，9 之流，想要兼容某些动画效果，比如淡入淡出，该如何实现？一般情况下，IE10+我们使用 CSS3 实现，对于 IE9-之流，我们使用 setTimeout 实现。两套完全不同的 style.改下动画时间还要修改两处。requestAnimationFrame 跟 setTimeout 非常类似，都是单回调，用法也类似。

我们一般使用下面的兼容写法：

```js
window.requestAnimFrame = (function() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(/* function */ callback, /* DOMElement */ element) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

(function animloop() {
  requestAnimFrame(animloop);
  render();
})();
```

## 兼容性

![requestAnimationFrame兼容性](http://www.chenqaq.com/assets/images/CheckRequestAnimationFrame.jpg)

主流浏览器都实现了 requestAnimationFrame 的支持，即使是 IE9-之流，通过一些优雅降级的方案，也可以做到不出错。

比如，Opera 浏览器的技术师 Erik Möller [把这个函数进行的封装](https://blogs.opera.com/news/)，使得它更好的兼容各种浏览器。
在 Erik Möller 标准函数的基础上加了兼容各种浏览器引擎的前缀。

```js
(function(){
    var lastTime = 0;
    var vendors = ['webkit','moz'];
    for(var x=0;x<vendors.length && !window.requestAnimationFrame; ++x){
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame  = window[vendors[x] + 'CancleAniamtionFrame'] ||
                                       window[vendors[x] + 'CancleRequestAnimationFrame'];
    }

    if(!window.requestAnimationFrame){
        window.requestAnimationFrame = function(callback,element){
            var currTime = new.Date().getTime();
            var timeToCall = Math.max(0,16.7 - (currTime - lastTime));
            var id = window.setTimeout(function(){
                callback(currTime + timeToCall);
            },timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }

    if(!window.cancelAnimationFrame){
        window.cancelAnimationFrame = function(id){
            clearTimeout(id);
        };
    }
}());
```

## 练习

在使用 canvas 绘画时这个函数更加合适，能得到更好的效果。

```js
window.reqestAnimFrame = function() {
  window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback, element) {
      window.setTimeout(callback, 1000 / 60);
    };
};

var canvas, context, toggle;

init();
animate();

function init() {
  canvas = document.createElement("canvas");
  canvas.height = 512;
  canvas.width = 512;

  context = cavnas.getContext("2d");

  document.body.appendChild(canvas);
}

function animate() {
  reqestAnimFrame(animate);
  draw();
}

function draw() {
  var time = new Date().getTime() * 0.002;
  var x = Math.sin(time) * 192 + 256;
  var y = Math.cos(time * 0.9) * 192 + 256;
  toggle = !toggle;

  context.fillStyle = toggle ? "rgb(200,100,20)" : "rgb(20,20,100)";
  context.beginPath();
  context.arc(x, y, 5, 0, Math.PI * 2, true);
  context.closePath();
  context.fill();
}
```

## 参考资料
