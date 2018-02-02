---
title: stricky footer的三种解决方案
date: 2018-02-01 21:06:54
tags:
    - CSS
    - layout
categories:
    - HTML/CSS
---

# 写在前面
stricky footer设计是最古老和最常见的效果之一，我们都曾经历过类似的情景：

>如果页面内容不够长的时候，页脚块粘贴在底部；如果内容足够长时，页脚块会被内容向下推送。

这些天做vue+express实战的练习，跟着黄轶老师倒是认识了stricky footer，就认真的了解学习了一下，但是前两天的问题，今天几种解决方案的详细情况竟然有些模糊，所以还是记录下来吧！求学之路就是这样，不断地积累和重复。

![](http://www.chenqaq.com/assets/images/strickyFooter1.png)

上图底部的`x`就用到了经典的stricky footer，当页面内容足够时，它会向下推送；当页面内容没有撑满整个屏幕时，它就固定在底部。

而不是像下图这样：

![](http://www.chenqaq.com/assets/images/strickyFooter2.png)


# 问题

如果此前不知道stricky footer，使用fixed固定在底部的话，像下图这样

![](http://www.chenqaq.com/assets/images/strickyFooter3.png)

```css
position: fixed;
width: 32px;
height: 32px;
bottom: 20px;
left: calc(50% - 16px);
font-size: 32px;
```

那样 `x` 会覆盖内容，显然是不符合要求的不实际的，而且不美观的。

所以经典的stricky footer 广为所用，适用情景也非常多，前几天回顾第一次做的项目，发现很多地方适用。

# 解决方案
stricky footer主要有三种解决方案，我们构建一点简单的代码

```html
<body>
  <div class="content"></div>
  <div class="footer"></div>
</body>
```

## 1.为内容区域添加最小的高度
这个方法主要是用视口vh来计算整体视窗的高度，然后减去底部footer的高度，从而得出内容区域的最小高度
```css
.content{
  min-height:calc(100vh - `footer的高度`);
  box-sizing:border-box;
}
```
这种方法很简单，但是如果页面的footer高度不同，每个页面都要重新计算一次，所以并不推荐

## 2.使用flex布局
flex布局如今在移动端布局可谓是占有一片天地，广为所用。

我们通常利用flex布局对视窗宽度进行分割，一侧是固定宽度，另一侧是自适应宽度。同样的，flex布局当然也可以对对视窗高度进行分割，footer的flex为0，这样flex获得其固有的高度；content的flex为1。这样它会充满除去footer的其余部分

```css
body{
  display:flex;
  flex-flow:column;
  min-height:100vh;
}
.content{
  flex:1;
}
.footer{
  flex:0;
}
```
这种方法较为推荐

## 3.在content的外面添加一个wrapper层
这种方法也是黄轶老师使用的方法，在content的外面添加一个wrapper层包裹

```html
<body>
  <div class="content-wrapper clearfix">
    <div class="content"></div>
  </div>
  <div class="footer"></div>
</body>
```
这种做法为了保证兼容性，我们通常会在wrapper层上添加一个clearfix类，

```css
html,body,.content-wrapper{
  height:100%
}
body > .content-wrapper{
  height:auto;
  min-height:100%;
}
.content{
  padding-bottom:150px //与footer的高度相同
}
.footer{
  position:relative;
  margin-top:-150px; // -`footer高度`
  height:150px;
  clear:both;
}
.clearfix{
  display:inline-block;
}
.clearfix{
  content:"";
  display:block;
  height:0;
  clear:both;
  visibility: hidden;
}
```
这样就完成了stricky footer，这种方法也比较推荐，但是加入的代码有点多，而且改变了HTML结构。