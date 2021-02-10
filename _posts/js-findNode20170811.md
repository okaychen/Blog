---
title: JavaScript快速查找节点
date: 2017-08-11 17:46
cover: "https://cdn.jsdelivr.net/gh/okaychen/CDN@1.2/BlogSource/gallery/thumb_024.jpg"
tags:
    - JavaScript
categories:
    - JavaScript
---
 

我们在实际的开发中，经常要获取页面中某个html元素，动态更新元素的样式、内容属性等。

<img src="https://cdn.jsdelivr.net/gh/okaychen/CDN@2.2/BlogSource/cnblogs_img/1140602-20170811173058398-1140296284.gif" alt="">

我们已经知道在JavaScript中提供下面的方法获取子、父、兄节点的方法：

# 常规
1.通过父节点获取子节点：
- 获取已知父节点的第一个子节点:`parentObj.firstChild　`
- 获取已知父节点的最后一个子节点:`parentObj.lastChild`
- 获取已知父节点的子节点数组(这里我在IE 7中获取的是所有直接的子节点):`parentObj.childNodes`　　
- 获取已知节点的直接子节点数组（在IE7中和childNodes效果一样）:`parentObj.children  `  
- 返回已知子节点中类型为指定值的子节点数组:`parentObj.getElementsByTagName(tagName) `  

2.通过临近节点获取兄弟节点：
- 获取已知节点的前一个兄弟节点:`neighbourNode.previousSibing`
- 获取已知节点的下一个兄弟节点:`neighbourNode.nextSibing`
                                     
3.通过子节点获取父节点：
- 获取已知节点的父节点:`childNode.parentNode`

上面的方法基本都是可以递归是使用的，但并不是最优

<!-- more -->

# 扩展
在扩展之前，我们需要知道一些关于节点基础的知识：Dom节点中，每个节点都拥有不同的类型

W3C规范中常用的Dom节点的类型有以下几种

节点类型 | 说明 |  值  
-|-|-
元素节点 | 每一个HTML标签都是一个元素节点 | １ |
属性节点 | 元素节点（HTML标签）的属性，如id，class，name等 | ２ |
文本节点 | 元素节点或属性节点中的文本内容 | ３ |
注释节点 | 文档的注释 | ８ |
文档节点 | 表示整个文档（Dom树的根节点，即document） | ９ |
 

关于节点的名称，不同类型的节点对应不同的名称

节点类型 | 说明
-|-
元素节点|HTML的名称（大写）
属性节点|属性的名称
文本节点|它的值永远的都#text
文档节点|	它的值永远都是#document

可以分别通过nodeType（节点类型），nodeName（节点名称），以及nodeValue（节点值）分别返回节点的类型（比如元素节点返回1，属性节点返回2）、节点名称以及节点值；

# JS获取兄弟节点的两种方法

方法一：通过父元素的子元素先找到含自己在内的“兄弟元素”，然后在剔除自己
```js
 function sibling(elem){
    var a = [];
    var b = elem.parentNode.children;
    for (var i = 0 ; i < b.length ; i++){
      if(b[i] !== elem)   a.push(b[i]);
    }
    return a;
 }
```
方法二：jQuery中实现方法，先通过查找元素的第一个子元素，然后在不断往下找下一个紧邻元素，判断并剔除自己。
```js
siblings:function(elem)
{
    return JQuery.sibling(elem.parentNode.firstNode,elem);
}

JQuery.sibling = function(n,elem){
    var r = [];
    for (;n;n= n.nextSibling){
    if(n.nodeType == 1 && （！elem ||  elem  != elem))
    r.push(n);
    }  
    return r;
}
```
在jQuery 1.2多的版本中都可以找到这段代码，我看的jQuery1.2.3的版本，在1800行可以找到这段代码:

![](https://cdn.jsdelivr.net/gh/okaychen/CDN@2.2/BlogSource/cnblogs_img/1140602-20170811160458570-1191181173.png)

把这个方法转化为独立可用的函数：
```js
fucntion sibling(elem){
    var r = [];
    var n = elem.parentNode.firstChild;
    for(;n;n = n.nextSibling) {
        if(n.nodeType === 1 && n !== elem) {
            r.push(n);
    }
}  
    return r;
}
```
很显然通过这种方法查找特定节点的兄弟元素，可以很方便的避免的使用递归的冗余。


# 获取所有元素子节点
在JavaScript中，可以通过children来获取所有的子节点（只返回HTML中，甚至不返回子节点），几乎得到了所有浏览器的支持，但是在Firefox有的版本中不支持。注意：在IE中，children包含注释节点

所以因为特殊情况的存在，有时候我们需要只获取元素节点，这样我们就可以通过nodeType属性来进行筛选，用上面的知识：nodeType == 1的节点为元素节点。

下面，自定义一个函数来获取所有的元素子节点：

```js
var getChildNodes = function(elem) {
    var childArr = elem.children || elem.childNodes,  
        childArrTem = new Array();
    for (var i = 0 ; i < childArr.length; i ++ )  {
            if (childArr[i].nodeType == 1){
            childArrTem.push(childArr[i]); 
    }
    } 
    return childArrTem;
}
```
# 获取所有的父节点
同样的，我们可以获取当前节点所有的父节点：
```js
function getParents （elem）{
    var parents = [];
    while(elem.parentNode){
        parents.push(elem.parentNode)
        elem = elem.parentNode;
    } 
    return parents;
}
```
这样我们可以接受一个dom节点，最终会获取到document对象，如果只要获取到最上层是body，可以把while里的判断改为：`while（elem.parentNode && elem.parentNode.tagName == 'BODY' `

依据JavaScript中的提供的获取节点的方法和相关的知识，我们可以写出很多封装的方法，尝试一下，你可以写出多少种获取节点的方法呢？

当我们写出了一些操作节点的封装之后在去看jQuery中Dom操作节点方法的源码会轻松很多呢。