---
title: 设计模式之单例模式与场景实践
date: 2017-11-06 21:19
cover: "https://cdn.jsdelivr.net/gh/okaychen/CDN@1.2/BlogSource/gallery/thumb_023.jpg"
categories:
  - [JavaScript]
  - [设计模式]
tags:
  - JavaScript
  - 设计模式
---
# 单例介绍
上次总结了设计模式中的module模式，可能没有真真正正的使用在场景中，发现效果并不好，想要使用起来却不那么得心应手，

所以这次我打算换一种方式~~从简单的场景中来看单例模式，

因为JavaScript非常灵活，所以在使用设计模式的时候也带来了很强的灵活性，实现单例的方法也有很多，那就需要我们把握住单例模式的核心。

> 单例模式是保证一个类只有一个实例，实现的方法一般是先判断实例存在与否，如果存在直接返回，如果不存在就创建了再返回，这就确保了一个类只有一个实例对象。

在JavaScript里，单例作为一个命名空间提供者，从全局命名空间里提供一个唯一的访问点来访问该对象

作用：

- 1、模块间通信

- 2、系统中某各类的对象只能存在一个

- 3、保护自己的属性和方法，保证了所有的对象访问的都是同一个实例

注意事项：

- 1、注意this的使用

- 2、闭包容易造成内存泄露，不需要的尽快处理等待回收

<!-- more -->

# 简单场景
我们先来实现一个标准的单例模式：

- 1、如果实例存在就返回，实例不存在就创建新实例；

- 2、从全局命名空间中隔离出代码，从而为函数提供单一访问点：

```js
var mySingleton = (function () {
    // 实例保持Singleton的一个引用
    let instance;

    // Singleton
    // 私有方法和变量
    function init() {
        function privateMethod() {
            console.log('I am private');
        }
        const privateVariable = ' I am also private ';
        const privateRandomNumber = Math.random();
        // 公有方法和变量
        return {
            publicMethod:function(){
                console.log('I am public');
            },
            getRandomNumber:function(){
                return privateRandomNumber; 
            }
        }
    }

    // 获取Singleton实例，如果存在就返回，不存在就创建新实例
    return {
        getInstance:function(){
            if(!instance){
                instance = init();
            }
            return instance;
        }
    }

})();

// 测试
const singleA = mySingleton.getInstance();
const singleB = mySingleton.getInstance();

console.log( singleA.getRandomNumber() === singleB.getRandomNumber());  // true
console.log(singleA.publicMethod())  // I am public
```
下面写一个我们在场景中经常使用的一种简单的非标准的单例模式类型，

场景一：使用简单的单例模式实现一个可编辑表格

```html
<table class="table table-bordered" id="js-table-test">
    <tr>
        <td>编号</td>
        <td>姓名</td>
    </tr>
    <tr>
        <td>1</td>
        <td>okaychen</td>
    </tr>
    <tr>
        <td>2</td>
        <td>StackOverflowChen</td>
    </tr>
</table>
```
没使用单例模式之前，我们可能会这样处理：
```js
$("#js-table-test td").click(function (argument) {
    var m = $(this).html();
    var s = "<input type='text' value='" + m + "'  />";
    $(this).html(s);
})
$("#js-table-test td").on('keyup','input',function(e){
    e.stopPropagation();
    var me = $(this);
    if(e.keyCode==13){
        me.val();
    }
})
```
那么就让我们对比一下使用单例的代码思路：

- 1、使用自执行函数传递参数$，减少查询次数

- 2、使用简单的单例模式，为之后修改或者模块化打基础

提供单一访问点init，通过datas共享数据，render封装对应的元素，bind来绑定事件，_do来规范私有事件；
```js
(function ($) {
    // 命名空间
    var index = {
        init: function () {
            // 入口
            var me = this;
            me.render();
            me.bind();
        },
        datas: {
            // 共享数据
            num: 1
        },
        render: function () {
            // 封装对应的元素
            var me = this;
            me.test = $('#js-table-test td');
        },
        bind: function () {
            // 绑定事件
            var me = this;
            me.test.on('click', $.proxy(me['_do'], this));
        },
        _do: function (e) {
            // 私有事件
            var me = this;
            var m = $(e.target).text();
            var s = "<input type='text' value='" + m + "'  />";
            $(e.target).html(s);
            console.log(me.datas.num ++)
        }
    }
    index.init();
})(jQuery);
```