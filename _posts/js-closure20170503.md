---
title: 闭包初体验
date:  2017-05-03 22:35
cover: "https://cdn.jsdelivr.net/gh/okaychen/CDN@1.2/BlogSource/gallery/thumb_020.jpg"
tags:
    - JavaScript
categories:
    - JavaScript
---

首先，在理解闭包之前：

我们首先应该清楚下作用域和作用域链

作用域：每个函数定义时创建时自己的环境即作用域

作用域链：函数内可访问自身和父级作用域中的变量，函数外不可访问函数内的私有变量

<!-- more -->

```js
var a = 1;
function f(){
    var b = 1;
    return a;
}
f();        // 1
b;          // ReferenceError: b is not defined
```
在这里，变量a是属于全局域的，变量b的作用域就在函数f()内了，所以：
> 在f()内，a和b都是可见的；在f()外，a是可见的，b则不可见；

下面是我在控制台中测试：可以更好的理解作用域链。

![](https://www.chenqaq.com/assets/cnblogs_img/1140602-20170426213921397-539687826.png)

在outer内定义了另一个函数inner；那么在inner()中可以访问的变量既可以来自他自身的作用域，也可以来自其“父级”的作用域。这就形成了一条作用域链，该链的长度取决于我们的需要。

接下来我们就可以正式认识下闭包了：

我们通过闭包来突破作用域链的过程，也许你会发现其中的乐趣

首先我们看下下面的代码：

```js
var a = 'global variable';
var F = function(){
    var b = "local variable";
    var N = function(){
        var c = "inner local"
    }
}    
```
我们假想全局作用域为G，我们可以将其视为可以包含一切的宇宙

然后就是本地空间F

在F内部，还有F的私有内部空间N

>当我们将N的空间扩展到F以外，并且止步于全局空间内部时，就产生了一种有趣的东西——闭包

### 闭包#1
```js
var a = 'global variable';
var F = function(){
    var b = "local variable";
    var N = function(){
        var c = "inner local";
        return b;
    };
    return N;
};

b;        //ReferenceError : b is not defined    
         //函数F中包含了局部变量b,因此后者在全局空间里是不可见的
N()     //ReferenceError : N is not defined

//很明显当我们在全局中调用私有函数N时，会抛出错误；我们在全局中是无法访问一个函数内的私有函数的
```

上面的代码在控制台中的返回结果：

接下来，我们在控制台中完整正确测试一次：

解读:

首先，在函数N()内部，我们是可以获得b的返回值的（来自于他的父级作用域，可以访问到），我们将b的值作为私有函数N的返回值（如果这时我们在全局中调用函数N(),仍然会抛出错误，见上面代码）

于是，我们要解决这个问题。将F的私有函数N作为F()的返回值。

接着，把函数F()赋值给另一个全局变量(实际上是将F()的返回值赋值给了一个全局变量)

从而生成了一个可以访问F()私有空间的全局函数。

```js
var inner = F();
inner ();         //local variable
```
 
### 闭包#2
下面这种方法结果与之前相同，实现上略有不同。

在这里F()不在返回函数了，而是直接在函数体内创建了一个新的全局函数inner()

(首先：我们声明一个占位符，尽管这不是必须的，最好还是声明一下)

```js
var inner;        //placeholder 占位符
var F = function () {
    var b = "local variable";
    var N = function () {
        return b;
    };
    inner = N ;
};
```

现在我们可以自行测试一下

```js
F();          /*undefined*/
inner();    /*local variable*/
```

解读:

我们在函数F()内定义了一个新的函数N(),并将它赋值给全局变量inner。

由于N()是在F()内定义的，他可以访问到F()的作用域，所以即使该函数后来升级成了全局函数，但是它依然可以保留对F()作用域的访问权

 
### 相关定义与闭包#3
接下来，我们这次使用函数参数。

我们在这里创建了一个函数，该函数将返回一个子函数，而这个子函数返回的则是父函数的参数

```js
function F(param) {
    var N = function () {
        return param;
    };
    param++;
    return N;
};
```

我在控制台中做了测试：

发现:返回函数被调用时，param++已经执行过一次递增操作了，inner()返回的是更新后的值

由此我们可以看出：函数绑定的是作用域本身（！*！）而不是在函数定义时该作用域中的变量或当前变量所返回的值

### 循环中的闭包#4
我们首先看一下新手在闭包中容易犯的错误：

```js
function F() {
    var arr = [], i ;
    for (i=0;i<3;i++){
        arr[i] = function () {
            return i;
        };
    }
    return arr;
}
arr[0]();    /*3*/
arr[1]();    /*3*/
arr[2]();    /*3*/
```

显然这并不是我们想要的结果：

　　在这里，我们创建了三个闭包，而三个闭包都指向了一个共同的局部变量i，

　　但是闭包并不会记录他们的值，他们所拥有的的只是相关作用域在创建时的一个连接（即引用）

　　在这个例子中，变量i恰巧存在于定义这三个函数域中。对这三个函数中的任何一个而言，当他要去获取某个值时，他会从其所在的域开始逐级寻找那个距离最近的i值。由于循环结束时i的值为3，所以这三个函数都指向了一个共同值。

我们换一种闭包的形式：（来解决这个问题）
```js
function F(){
    var arr = [], i ;      
    for (i=0;i<3;i++){
          arr[i] = (function (x) {
                return function () {
                      return x;
               }    
           } (i));
      }  
     return arr;
 }        
 
 var arr = F();
 arr[0]()            /*0*/
 arr[1]()            /*1*/
 arr[2]()            /*2*/
```

我们还可以定义一个正常点的函数 （不使用即时函数）来实现相同的功能。

要点是在每次迭代中，我们要在中间函数内将i的值“本地化”
s
```js
function F() {
　 function binder(x){　
         return function () {
            return x;
        }
    }
    var arr = [], i ;
    for (i=0;i<3;i++){
        arr[i] = binder(x);
    }
    return arr;
}

var arr = F()
arr[0]()         /*0*/
arr[1]()         /*1*/
arr[2]()         /*2*/
```

最后，希望自己在实战中深入理解闭包的巧妙和乐趣。