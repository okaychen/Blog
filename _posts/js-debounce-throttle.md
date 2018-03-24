---
title: 跟着underscore学习防抖和节流
date: 2018-03-20 15:54:44
comments: true
tags:
    - underscore
    - 防抖与节流
categories:
    - JavaScript
---

# 有个开始吧！

网上有很多的防抖与节流的文章，自己也早有耳闻，之前看underscore的代码，也发现了两个与众不同的函数debounce和throttle，仿佛是有特定的用途。学习实践之后便总结下这篇文章。

在前端开发中经常遇到一些频繁触发的事件，比如
- 键盘事件：keyup、keydown...
- window：resize、scroll...
- 鼠标事件：mousedown、mousemove...

那么什么是事件的频发触发呢？让我们写一个例子来了解事件的频繁触发；

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>学习事件的频发触发</title>
  <style>
    * {
      padding: 0;
      margin: 0;
    }

    .container {
      width: 50vw;
      height: 30vh;
      margin: 50px auto;
      background: yellowgreen;
      border-radius: 5px;
      text-align: center;
      line-height: 30vh;
      font-size: 30px;
    }
  </style>
</head>

<body>
  <div id="container" class="container"></div>
  <script src="debounce.js"></script>
</body>

</html>
```
debounce.js代码如下：
```js
'use strict'

let count = 1;
let container = document.getElementById('container');

function getAction() {
  container.innerHTML++;
}

container.onmousemove = getAction;
```
效果如下：

![时间频发触发](http://www.chenqaq.com/assets/images/debounce1.gif)

我们发现鼠标从盒子左侧平稳的滑到右侧，数字从1增加到了188，也就是说在极短的时间内getAction这个函数就触发了188次。可想而知，如果这个问题是复杂回调或者ajax请求等等，每个回调就必须在更短的时间内执行完毕，否则就会出现卡顿现象。

对于这个问题，防抖和节流就是两种很好的解决方案。

# 防抖与节流介绍

防抖的原理就是：尽管时间触发，但是我一定要到事件触发n秒后才执行。如果在这个时间内又触发了这个事件，那就以新的事件的时间为准，触发n秒后才执行。主要是通过定时器来实现

而节流的原理是：如果持续触发事件，每隔一段时间，只执行一次事件。主要通过时间戳或者定时器来实现

# 实现防抖debounce
根据原理我们就可以来写第一版debounce代码：
```js
function debounce(func, wait) {
  let timeout;
  return function () {
      clearTimeout(timeout)
      timeout = setTimeout(func, wait);
  }
}

container.onmousemove = debounce(getAction, 1000);
```
效果如下

![debounce第一版](http://www.chenqaq.com/assets/images/debounce2.gif)

从效果中很明显可以看出来，无论开始怎么在盒子内移动鼠标，数值都不会加1，直到鼠标停下来，并且等待1s后，getAction函数执行使数值加1。

### this带来的问题
如果在getAction函数中`console.log(this)`，在不使用debounce函数时，`this`的值为
```html
<div id="container" class="container"></div>
```
但是我们在使用我们的debounce函数时，这个this就指向了window！（这是由于嵌套函数内部的this都会失去方向，指向window对象。可参见我写的[this四种绑定方式之间的奇淫技巧](http://www.cnblogs.com/okaychen/p/7520472.html)）

所以我们必须要将this指向正确的对象：
```js
function debounce(func, wait) {
  let timeout;

  return function (timeout) {
    let context = this;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      func.apply(context);
    }, wait);
  }
}
```

# 实现节流throttle
