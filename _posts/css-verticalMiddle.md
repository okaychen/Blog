---
title: 把所有的东西都对齐吧！
date: 2017-12-07 17:17:50
comments: true
tags:
    - CSS
    - layout
categories:
    - web开发
    - CSS
---

> "44年前我们就把人类送上了月球了，但现在我们仍然无法在css中实现垂直居中  -James Anderson"

# 难题

在CSS中对元素进行水平居中是非常简单的；`如果是一个行内元素，就对父元素设置text-align:center；如果是一个它是一个块级元素，就对自身应用margin:auto.`然而考虑到代码的DRY和较强的可维护性，如果要对一个元素进行垂直居中，可能是令人头皮发麻的一件事情了.
    
就这样在前端开发圈内看似及其常见的需求，从理论上似乎极其简单，在实践中，它往往难如登天，当涉及尺寸不固定的元素时尤为如此.

为了解决这一"绝世难题"，于是前端开发者们殚精竭虑，脑洞大开，琢磨出了各种解决方案，大多数并不实用.

一路走来走了不少弯路，希望初入前端的小伙伴们可以走的更加通畅，总结分享给大家：

下面就让我们来探索现代css的强大威力：

# 基于表格布局法的解决方案
利用表格的显示模式，需要用到一些冗余的HTML元素

思路来源：
```html
<table style="width:100%;height:100%;">
    <tr>
     <td style="text-align: center; vertical-align: middle;">
          Unknown stuff to be centered.
     </td>
  </tr>
</table>
```
```css
html,body{
    height:100%;
}
```
摘自：https://css-tricks.com/centering-in-the-unknown/

我们发现在table中vertical-align: middle；实现了自动垂直居中.

基于曾经在网页早期风靡一时的表格布局法：实现了垂直居中

<iframe height='341' scrolling='no' title='xPNopE' src='//codepen.io/okaychen/embed/xPNopE/?height=341&theme-id=dark&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;margin-top:20px;'>See the Pen <a href='https://codepen.io/okaychen/pen/xPNopE/'>xPNopE</a> by okaychen (<a href='https://codepen.io/okaychen'>@okaychen</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

但是由于表格布局法逐渐的退出舞台，这种方法也渐渐的不为所用

# 基于绝对定位的解决方案

早期实现垂直居中方法，要求具有固定的宽度和高度：
```CSS
main{
    position:absolute;
    top:50%;
    left:50%;
    magin-top:-3em;
    margin-left:-9em;
    width:18em;
    height:6em;
}
```
这种方法利用负外边距移动的方法，从而把元素放在视口的正中心.我们还可以借助强大的`calc`函数，省掉两行声明：
```CSS
    main{
        position:absolute;
        top:calc(50%-3em);
        left:calc(50%-9em);
        width:18em;
        height:6em;
    }
```
显然这个方法最大的局限性就是他要求元素具有固定宽度和高度.我们知道在通常情况下，固定宽度和高度的情况是极少的，对于那些需要居中的元素来说，其尺寸往往是由其内容决定的.如果能够找到一个属性的百分比以元素自身的宽高作为基准，那么难题就迎刃而解！遗憾的是，`对于大多数的css属性（包括margin）来说，百分比都是以其父元素的尺寸为基准进行解析的`.

css领域有一个很常见的现象，真正的解决方案往往来自我们最意想不到的地方：利用css变形属性，

>当我们在进行`translate（）`变形函数中使用百分比值时，是`以这个元素位基准进行转换和移动的`，而这正是我们所需要的.

```CSS
main{
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
}
```

<iframe height='265' scrolling='no' title='css-lineCenter-position' src='//codepen.io/okaychen/embed/NwQyRN/?height=265&theme-id=dark&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;margin-top:20px;'>See the Pen <a href='https://codepen.io/okaychen/pen/NwQyRN/'>css-lineCenter-position</a> by okaychen (<a href='https://codepen.io/okaychen'>@okaychen</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

从codepen中看到，利用css变形技巧，这个容器已经完美居中，满足我们的期望.

但是没有任何技巧十全十美，我们需要注意几点：

* 我们有时不能选择决定定位，他对整个布局影响太过强烈

* 如果需要居中的元素已经在高度上超过了视口，那它的顶部部分就会被视口裁掉

* 在某些浏览器中，这个方法可能会导致元素的显示模糊，因为元素可能会被放置在半个元素上.可以用一个偏hack的手段来修复`transform-style:preserve-3d`

# 基于视口的解决方案

假设我们不使用绝对定位，仍然采用`translate()`技巧来把这个元素以其自身宽高的一半为距离进行移动；但是在缺少left和top的情况下，如何吧这个元素放在容器正中心呢？

我们的第一反应很可能用margin属性的百分比值来实现，就像这样：
```CSS
main{
    width:18em;
    padding:1em 1.5em;
    margin:50% auto 0;
    transform:translateY(-50%);
}
```
但是却产生了十分离谱的效果.原因在于`margin的百分比值是以父元素的宽度作为解析基准的`

在CSS值与单位（第三版）定义了一套新的单位，称为视口相关的长度单位

* vm是与视口宽度相关的.1vm相当于视口的1%

*  与vw类似，1vh相当于视口的1%

* 当视口宽度小于高度时，1vmin等于1vw，否则等于1vh

* 当视口宽度大于高度时，1vmax等于1vw，否则等于1vh

在这个例子中，我们适用外边距的是vh单位
```CSS
main{
    width:18em;
    padding:1em  1.5em;
    margin:50vh auto 0;
    transform:translateY(-50%);
}
```

<iframe height='265' scrolling='no' title='css-lineCenter-vm' src='//codepen.io/okaychen/embed/NwQydr/?height=265&theme-id=dark&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;margin-top:20px'>See the Pen <a href='https://codepen.io/okaychen/pen/NwQydr/'>css-lineCenter-vm</a> by okaychen (<a href='https://codepen.io/okaychen'>@okaychen</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

我们可以看到，其效果堪称完美.这个技巧更适合于在视口中居中的场景.

# 基于Flexbox的解决方案

这是毋庸置疑的最佳解决方案，因为Flexbox（伸缩盒）是专门针对这类需求所设计的.现代浏览器对于Flexbox支持度已经相当不错了

我们只需要两行声明即可：先给这个待定居中元素的父元素设置`display:flex`（在使用的例子中是body元素），在给这个元素设置我们在熟悉不过的`margin:auto`
```CSS
body{
    display:flex;
    min-height:100vh;
    margin:0;
}
main{
    margin:auto;
}
```

Flexbox还有一个好处就是，它可以将匿名容器（即使没有节点包裹的文本节点）垂直居中.
```html
<main>center me，place！</main>
```
借助Flexbox规范所吸引人的`align-items`和`justify-content`属性，我们可以让它内部文本也实现居中
```CSS
main{
    display:flex;
    align-items:center;
    justify-content:center;
    width:18em;
    height:10em;
}
```

# 把所有的东西都对齐吧！

根据盒对齐模型（第三版）的计划，在未来，对于简单的垂直居中的要求，我们完全不需要动用特殊的布局模式.我们只需要这行代码就可以搞定
```CSS
align-self:center;
```
不知不觉间，我们身边的浏览器都开始让它成为现实（但是路途还很遥远：IE10及更早版本不支持，Safari 7.0 及更早版本使用-webkit前缀）

![align-self:center](../../../../assets/images/hack.png)


参考

* 《CSS Secrets 》

*  CSS-tricks：https://css-tricks.com/centering-in-the-unknown/

*  CSS变形：http://w3.org/TR/css-transforms

*  CSS值与单位：http://w3.org/TR/css-values

*  CSS伸缩盒布局模型：http://w3.org/TR/css-flexbox

*  CSS盒对齐模型：http://w3.org/TR/css-align