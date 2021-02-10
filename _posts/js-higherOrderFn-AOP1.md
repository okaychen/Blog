---
title: 用AOP装饰函数-摸索篇
date: 2018-10-18 19:13:20
cover: "https://cdn.jsdelivr.net/gh/okaychen/CDN@1.2/BlogSource/gallery/thumb_025.jpg"
categories:
  - [JavaScript]
  - [设计模式]
tags:
  - JavaScript
  - 设计模式
  - AOP
---
# 开始：小荷才露尖尖角
有一天，老大见程序员小T的核心逻辑代码相当冗杂，核心逻辑模块和一些无关的功能融成一团，就告诉小T，让他尝试把日志统计，异常处理模块从和核心逻辑模块中抽离出来，对于刚入职经验不足的小T来说，犹如晴天霹雳。小T前思后想，还好大学期间读了不少编程相关的书籍有些功底，既然目的是想把一些日志统计、异常处理这些和核心逻辑代码无关的抽离出来，他灵机一闪，心想这不是面向切面编程(AOP)嘛，老大果然是老司机，把和核心逻辑模块无关的功能抽离出来，业务逻辑模块就清晰了很多，还能够复用日志统计、日常处理等这些功能模块，真是两全其美啊！
<!--more-->
# 发展：闲敲棋子落灯花
于是小T开始了实现AOP之旅，心想核心业务模块和其他模块，那我就抽象成两个函数，既然需要在核心业务模块中使用异常处理这些功能，我应该把异常处理函数动态织入到其中，想到这小T不禁欣喜了一番，但是马上又陷入了思考，我应该怎么把一个函数"动态织入"到另一个函数中呢？小T之前对于原型的掌握相当扎实，于是他想我可不可以扩展Function的原型来把一个函数"动态织入"另一个函数呢.小T决定试一下，于是便敲敲打打：
```js
Function.prototype.before = function(){

}
```
小T很快有了一个比较清晰的规划，我需要一个原函数（核心逻辑模块）和新函数（日志统计），我可以把"动态织入"的新函数作为参数传递，然后返回原函数和新函数的"代理"函数，然后执行，这样我不就可以在原函数之前执行新函数啦。既然Function.prototype.before里有原函数又有传递的新函数参数，新函数被执行后this的指向可能会被劫持，所以他想到了先保存一下原函数引用
```js
Function.prototype.before = fcuntion(beforefn){
    let _self = this;  //保存原函数的引用
    return function(){  //返回包含了原函数和新函数的”代理“函数
       
    }
}
```
然后小T想，既然是before要让新函数在原函数之前执行，return function(){}我应该怎么处理可以让两个函数执行并且不会导致this被劫持呢，小T说如果我直接执行beforefn()，那么this指向会被劫持，小T想到apply/call可以很自然的控制/重写this值，以便定义调用函数时确定this指向哪个对象，决定用apply试试：
```js
Function.prototype.before = fcuntion(beforefn){
    let _self = this;  
    return function(){  
        beforefn.apply(this,arguments); // 执行新函数，且保证this不被劫持，新函数接受的参数会被原封不会的传入原函数，新函数在原函数之前执行
        return _self.apply(this,arguments) //执行原函数并返回原函数执行结果，并保证this不被劫持
    }
}
```
这样就能在函数之前动态的增加功能了，写到这里，小T有些激动，心血来潮决定用同样的方法在函数后也增加功能，但是小T按照上面的方式导致了一系列问题，小T前思后想有些着急了，既然是在函数后增加新功能，让参数函数afterfn先执行显然是不正确的了，于是小T决定这样做：
```js
Function.prototype.after = function(afterfn){
    let _self = this;
    return function(){
        let ret = _self.apply(this,arguments);
        afterfn.apply(this,arguments);
        return ret;
    }
}
```
# 高潮：漫卷诗书喜欲狂
终于下班啦，晚上回到家小T躺在沙发上敲着mac回想起以前经常需要在不修改源代码的情况下给函数增加新功能，他常规的做法会先预保存原引用，比如：
```js
<!-- 同事之前代码 -->
let a = function(){
    alert(1);
}
<!-- 小T需要给a增加新功能 -->
let _a = a;
a = function(){
    _a();
    alert(2);
}
a();
```
但是老大之前曾经告诉他，这虽然是一种符合开-闭原则常规的做法，但是因为总是需要维护_a()函数也许你会经常遇到_a()装饰链较长，装饰函数变多，中间变量数量也会越来越多，有时候还会遇到this被劫持。比如
```js
let _getElementById = document.getElementById;
document.getElementById = function( id ){
    alert (1);
    return _getElementById( id ); //Uncaught TypeError: Illegal invocation
}
const button = document.getElementById( 'button' );
```
>在alert(1)弹出之后，控制台很明显的报了Uncaught TypeError: Illegal invocation的错误，异常就发生在_getElementById(id)这句话上，因为_getElementById是一个全局函数，this是指向window的，而document.getElementById的内部实现需要使用this引用，this在这个方法内的预期是指向document，而不是window，所以就产生了这样的错误。

所以就需要手动把document当作上下文this传入_getElementById，常用的就是使用`call/apply`来改变this的指向，老大曾还直言不讳的告诉小T，对call/apply的掌握程度是可能间接性决定了你对JavaScript的精通度，于是小T便对call/apply针对性的理解练习和实践:
```js
let _getElementById = document.getElementById;
document.getElementById = function(id){
    alert(1);
    return _getElementById.apply(document,arguments);
}

const button = document.getElementById('button');
```
但是这样的做法有些不方便，用AOP装饰函数可以很方便的解决这个问题，
```js
Function.prototype.before = function(beforefn){
    var _self = this;
    return function(){
        beforefn.apply(this,arguments);
        return _self.apply(this,arguments);
    }
}

document.getElementById = document.getElementById.before(function(){
    alert(1);
})

const button = document.getElementById('button');
```
在试一个简单的栗子，利用`Function.prototype.after`来增加新的window.onload事件：
```js
<!-- 同事之前代码 -->
window.onload = function(){
    alert(1);
}
<!-- 需要新增加 -->
window.onload = (window.onload || function(){}).after(function(){
    alert(2);
}).after(function(){
    alert(3);
}).after(function(){
    alert(4);
})
```
就这样敲着敲着，窗外的夜变得寂静些许，只听到小Tcode code的键盘击打声，他抬头看了看墙上的钟表已经凌晨一点了，望了望窗外，月光洒在窗台，小T终于摸清楚了用AOP装饰函数的意图，但是小T有些不满足，因为在Function.prototype上添加before和after方法，是一种污染原型的方法，小T有些排斥，决定把新函数和原函数都作为参数传入before和after方法：
```js
var before = function(fn,beforefn){
    return function(){
        beforefn.apply(this,arguments);
        return fn.apply(this,arguments);
    }
}

var a = before(
    function(){alert(3)},
    function(){alert(2)}
)

a = before(a,function(){alert(1);});  //需要在a()之前增加新方法
a();
```
窗外的夜更深了，小T按下了关机键，还来不及摸到卧室，就已经慢慢的在沙发上闭上了眼睛，就这样伴随着墙上钟表滴答声，小T进入了梦乡。第二天睡眼惺忪的他揉了揉眼睛，开始了又一天的新生活...

**人物与故事纯属虚构**
## 特别鸣谢
《JavaScript设计模式与开发实践》 -  AlloyTeam曾探