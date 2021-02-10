---
title: 同步、异步、回调执行顺序经典闭包setTimeout分析
date: 2017-12-06 17:47
cover: "https://cdn.jsdelivr.net/gh/okaychen/CDN@1.2/BlogSource/gallery/thumb_032.jpg"
comments: true
tags:  
    - 事件循环
    - JavaScript
categories:
    - JavaScript
---

# 聊聊同步、异步和回调
同步，异步，回调，我们傻傻分不清楚，

有一天，你找到公司刚来的程序员小T，跟他说：“我们要加个需求，你放下手里的事情优先支持，我会一直等你做完再离开”。小T微笑着答应了，眼角却滑过一丝不易觉察的杀意。

世界上的所有事情大致可以分为同步去做和异步去做两种。你打电话去订酒店，电话另一边的工作人员需要查下他们的管理系统才能告诉你有没有房间。

这时候你有两种选择：一种是不挂电话一直等待，直到工作人员查到为止（可能几分钟也可能几个小时，取决于他们的办事效率），这就是同步的。

另一种是工作人员问了你的联系方式就挂断了电话，等他们查到之后再通知你，这就是异步的，这时候你就可以干点其他事情，比如把机票也定了之类的

 >  计算机世界也是如此，我们写的代码需要交给cpu去处理，这时候就有同步和异步两种选择。js是单线程的，如果所有的操作（`ajax`,获取文件等I/O操作`<node>`）都是同步的，遇到哪些耗时的操作，后面的程序必然被阻塞而不能执行，页面也就失去了响应，

>因此js采用了事件驱动机制，在单线程模型下，使用异步回调函数的方式来实现非阻塞的IO操作，
<!-- more -->
那么什么是异步任务呢？（参考阮一峰老师《JavaScript运行机制》）

异步任务也就是 指主线程（stack栈）运行的过程中，当stack空闲的时候，主线程对event queque（队列）轮询(事实上一直在轮询)后，将异步任务放到stack里面进行执行；


![（上图转引自Philip Roberts的演讲《Help, I'm stuck in an event-loop》））](https://cdn.jsdelivr.net/gh/okaychen/CDN@2.2/BlogSource/images/event.png)

 简单的说，如果我们指定过回调函数，那么当事件发生时就会进入事件队列，等待主线程的`stack`空闲的时候，就会对`event queue`里面的回调读取并放到`stack`里面执行

我们经常说的可能是异步回调（当然也有同步回调），所以也就并不难理解，回调和异步之间其实并没有直接的联系，回调只是异步的一种实现方式， 

通过这样的`event loop`我们其实可以分析出三者的执行顺序，即 `同步 > 异步 > 回调`


# 经典闭包setTimeout分析
今天同学问了我一个问题，我一看是一道经典的面试题，问题如下：

![question](https://cdn.jsdelivr.net/gh/okaychen/CDN@2.2/BlogSource/images/questions.png)

简单的这个问题改一下：
```JavaScript
for (var i = 0; i <= 5; i++) {
     setTimeout(function() {
         console.log( i );
     }, i*1000);
      console.log( ' i : ' , i );
 }
 
 console.log( i );
```

相信我们很多人都遇到过这个问题，心中或许都有答案：

![result](https://cdn.jsdelivr.net/gh/okaychen/CDN@2.2/BlogSource/images/results.png)

那么为什么并不是入门者心中所想要的结果嘞(为什么`setTimeout`中打印出`i`全部是`6`，而且是最后才打印出来呢)？

那么就让我们来梳理一下，第一部分`event loop`图片很直观的体现："任务队列"可以放置异步任务的事件，也可以放置定时事件（`setTimeout`和`setinterval`），即指定某些代码在多少时间之后执行；

 1、首先我们先来看一下他的主体结构：`for`循环的第一层是`setTimeout`函数，`setTimeout`函数中使用了一个匿名（回调）函数

 2、还记的我们之前总结的执行顺序：同步 > 异步 > 回调 吧！

　   for循环和外层的 `console.log()`是同步的，`setTimeout`是回调执行，

>所以按照执行顺序，先执行for循环，然后进入for循环中，他发现了一个`setTimeout()`回调(进入`event queque`事件队列，等待`stack`栈为空后读取并放入栈中后执行)，

>这时候他并不会等待，而是继续执行 --> for循环内部的  `console.log( ' i : ' , i )`  -->  for循环外部的`console.log( i )` ，然后"任务队列"中的回调函数才进入到空`Stack`中开始执行；

 我们在来用这个例子尝试一下上面的event loop图，更加直观的感受一下：

![](https://cdn.jsdelivr.net/gh/okaychen/CDN@2.2/BlogSource/images/eventMe.png)

 那么接下来可能会问怎么解决这个问题呢？我想最简单的当然是`let`语法了，

 ```javascript
for (let i = 0; i <= 5; i++) {
    setTimeout(function() {
          console.log( i );
      }, i*1000);
      console.log( ' 1 : ' , i );
  }
  
 console.log( i );
 ```

 我们都知道`es5`中变量作用域是函数，而`es6`却可以使用`let`声明一个具有块级作用域的i，在这里也就是`for`循环体；

在这里`let`本质上就是形成了一个闭包，那么写成`es5`的形式其实等价于：

```javascript
var loop = function (_i) {
     setTimeout(function() {
         console.log( _i);
     }, _i*1000);
     console.log('2：',_i)  
 }; 
 
  for (var _i = 0; _i <= 5; _i++) {  
      loop(_i); 
 }
```

# 总结

到这里，我们就完成了从同步、异步、回调的机制分析 到 setTimeout的经典案例的分析，JavaScript博大精深，我们需要了解他的机制去深入去挖掘他。


