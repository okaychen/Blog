---
title: css3多栏属性&&JS实现瀑布流
date: 2017-06-14 02:05
comments: true
cover: "https://cdn.jsdelivr.net/gh/okaychen/CDN@1.2/BlogSource/gallery/thumb_021.jpg"
tags:
    - JavaScript
    - CSS
    - Layout
    - 瀑布流
categories:
    - [JavaScript]
    - [HTML/CSS]
---

# css3多列
首提的兼容性问题：IE10以及opera支持多列（column），chrome需要-webkit-前缀，Firefox需要-moz-的前缀，Ie9以及更早版本就不支持多列了。你可以使用这个工具，很方便的查看你的浏览器内核以及版本信息http://ie.icoa.cn/

css3多列属性:css3多列主要是五个属性
```css
column-count　　  // <规定元素被分隔的列数>
column-gap　　　  // <规定列与列之间的间隔>
column-rule　　   // <列之间的宽度、样式、颜色>
column-width     // <列的宽度>
column-span      // <元素应该横跨的列数>
```
注意：在设置column-width宽度时，同时设置盒子的width，否则宽度默认为100%，每栏宽度按栏数平均分；盒子每栏宽度必须大于等于column-width设定的值，否则就会减少栏数来增加每栏宽度

<!-- more -->

# css3多列和JS实现瀑布流
给自己安利一波吧，第一次看到瀑布流是在pinterest的官网

自己也梳理梳理逻辑：<在写js代码之前，一定要先搞清逻辑，再动手写代码>

我们都不陌生瀑布流是同宽的，但是高度不一，js主要的工作就是根据高度来进行布局，

> 1）当一行排满后，准备排第二行的时候，把第一个图片放到上一行图片高度最小处，以此类推，另外有一点就是自动加载，这里我做一个条件来判断是否加载，

> 2）当最后一个的元素距离网页顶部的高度（offsetTop）+ 这个元素高度的一半 < 垂直方向上滚轮的量（scrollTop） + 网页可见区域的高 时：我们就加载图片（这里我没有用ajax请求，我用了一个json数组来模拟json数据）

要搞清楚offsetTop、scrollTop、clientHeight这些API，可以查看MDN文档。

梳理完逻辑，让我们动手写代码吧：

html比较简单，这里图片我用了placehold的图片占位符，如果你没有很好的素材，这也许是个不错的选择

```html
<body>
<div class="main clearfix" id="main">
    <div class="box">
        <div class="pic"><img src="http://placehold.it/200x300"/></div>
    </div>
    <div class="box">
        <div class="pic"><img src="http://placehold.it/200x300"/></div>
    </div>
    <div class="box">
        <div class="pic"><img src="http://placehold.it/200x300"/></div>
    </div>
    <div class="box">
        <div class="pic"><img src="http://placehold.it/200x200"/></div>
    </div>
    <div class="box">
        <div class="pic"><img src="http://placehold.it/200x200"/></div>
    </div>
    <div class="box">
        <div class="pic"><img src="http://placehold.it/200x300"/></div>
    </div>
    <div class="box">
        <div class="pic"><img src="http://placehold.it/200x300"/></div>
    </div>
    <div class="box">
        <div class="pic"><img src="http://placehold.it/200x300"/></div>
    </div>
    <div class="box">
        <div class="pic"><img src="http://placehold.it/200x300"/></div>
    </div>
    <div class="box">
        <div class="pic"><img src="http://placehold.it/200x150"/></div>
    </div>
    <div class="box">
        <div class="pic"><img src="http://placehold.it/200x200"/></div>
    </div>
    <div class="box">
        <div class="pic"><img src="http://placehold.it/200x300"/></div>
    </div>
    <div class="box">
        <div class="pic"><img src="http://placehold.it/200x200"/></div>
    </div>
    <div class="box">
        <div class="pic"><img src="http://placehold.it/200x300"/></div>
    </div>
    <div class="box">
        <div class="pic"><img src="http://placehold.it/200x300"/></div>
    </div>
    <div class="box">
        <div class="pic"><img src="http://placehold.it/200x200"/></div>
    </div>
    <div class="box">
        <div class="pic"><img src="http://placehold.it/200x300"/></div>
    </div>
    <div class="box">
        <div class="pic"><img src="http://placehold.it/200x300"/></div>
    </div>
    <div class="box">
        <div class="pic"><img src="http://placehold.it/200x300"/></div>
    </div>
    <div class="box">
        <div class="pic"><img src="http://placehold.it/200x300"/></div>
    </div>
    <div class="box">
        <div class="pic"><img src="http://placehold.it/200x300"/></div>
    </div>
    <div class="box">
        <div class="pic"><img src="http://placehold.it/200x300"/></div>
    </div>
    <div class="box">
        <div class="pic"><img src="http://placehold.it/200x300"/></div>
    </div>
    <div class="box">
        <div class="pic"><img src="http://placehold.it/200x100"/></div>
    </div>
    <div class="box">
        <div class="pic"><img src="http://placehold.it/200x300"/></div>
    </div>
    <div class="box">
        <div class="pic"><img src="http://placehold.it/200x150"/></div>
    </div>
    <div class="box">
        <div class="pic"><img src="http://placehold.it/200x300"/></div>
    </div>
    <div class="box">
        <div class="pic"><img src="http://placehold.it/200x200"/></div>
    </div>
    <div class="box">
        <div class="pic"><img src="http://placehold.it/200x300"/></div>
    </div>
</div>
```
css用了多列的column-width和column-gap属性

```css
* {
    margin: 0;
    padding: 0;
}

.clearfix:after,
.clearfix:before {
    content: "";
    display: table;
}

.clearfix:after {
    clear: both;
}

.main {
    position: relative;
    -webkit-column-width: 210px;
    -webkit-column-gap: 5px;
    -moz-column-gap: 5px;
}

.box {
    float: left;
    padding: 15px 0 0 15px;
}

.box .pic {
    width: 200px;
    height: auto;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0px 0 5px #ccc;
}

.box .pic img {
    display: block;
    width: 100%;
}
```
梳理完了逻辑，该动手写js了
```js
window.onload = function () {
    waterfall('main', 'box');
    var ImgJson = {
        'data': [
            {'src': 'http://placehold.it/200x300'}

        ]
    };
    //监听scroll事件
    window.onscroll = function () {
        var isPosting = false;
        if (checkScrollSlide('main', 'box') && !isPosting) {
            var oParent = document.getElementById('main');
            for (var i in ImgJson.data) {
                var oBox = document.createElement('div');
                oBox.className = 'box';
                oBox.innerHTML = '<div class="pic"><img src="' + ImgJson.data[i].src + '"></div>';
                oParent.appendChild(oBox);
            }
            isPosting = false;
            waterfall('main', 'box');
        }
    }
};

function waterfall(parent, clsName) {
    //获取元素
    var oParent = document.getElementById(parent);
    //获取所有box
    var aBoxArr = oParent.getElementsByClassName(clsName);
    //单个box的宽度
    var iBoxw = aBoxArr[0].offsetWidth;
    //列数
    var cols = Math.floor(document.documentElement.clientWidth / iBoxw);
    oParent.style.cssText = 'width:' + iBoxw * (cols + 1) + 'px;margin:0 auto;';

    //储存所有高度
    var hArr = [];
    for (var i = 0; i < aBoxArr.length; i++) {
        if (i < cols) {
            hArr[i] = aBoxArr[i].offsetHeight;
        } else {
            //获取hArr的最小值
            var minH = Math.min.apply(null, hArr);
            //hArr最小值索引index
            var minHIndex = getMinHIndex(hArr, minH);
            aBoxArr[i].style.cssText = 'position:absolute;top:' + minH + 'px;left:' + aBoxArr[minHIndex].offsetLeft + 'px';

            //添加元素之后更新hArr
            hArr[minHIndex] += aBoxArr[i].offsetHeight;
        }
    }
}

//获取最小索引值
function getMinHIndex(arr, val) {
    for (var i in arr) {
        if (arr[i] == val) {
            return i;
        }
    }
}

//检查是否满足加载数据的条件
function checkScrollSlide(parent, clsName) {
    var oParent = document.getElementById(parent);
    var aBoxArr = oParent.getElementsByClassName(clsName);
    //最后一个box元素的offsetTop+高度的一半
    var lastBoxH = aBoxArr[aBoxArr.length - 1].offsetTop + aBoxArr[aBoxArr.length - 1].offsetHeight / 2;

    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var height = document.documentElement.clientHeight || document.body.clientHeight;
    return lastBoxH < scrollTop + height;
}
```
最后走一波效果图
<p><img src="https://cdn.jsdelivr.net/gh/okaychen/CDN@2.2/BlogSource/cnblogs_img/1140602-20170614004905400-394825169.gif" /><p>
 



　　
 