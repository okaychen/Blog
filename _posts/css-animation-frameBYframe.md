---
title: steps调速函数&CSS值与单位之ch
cover: "https://cdn.jsdelivr.net/gh/okaychen/CDN@1.2/BlogSource/gallery/thumb_004.jpg"
date: 2017-12-13 21:16:41
comments: true
tags:
    - CSS
categories:
    - HTML/CSS
---

# 写在前面

上一篇中我们熟悉五种内置的缓动曲线和(三次)贝塞尔曲线，并且基于此完成了缓动效果.

但是如果我们想要实现逐帧动画，基于贝塞尔曲线的调速函数就显得有些无能为力了，因为我们并不需要`帧与帧之间的过渡状态`，就像上篇中所看到的，所有基于贝塞尔曲线的调速函数都会在关键帧之间进行插值运算，从而产生平滑的过渡效果。

这个特性显然很棒，平滑的效果确实是我们使用css过渡和动画所追求的。

但是在逐帧动画的场景下，这种平滑的特性恰恰毁掉了我们想要实现的逐帧动画的效果.

<!-- more -->

![](https://cdn.jsdelivr.net/gh/okaychen/CDN@2.2/BlogSource/photos/yi.png)

# 逐帧动画
我们经常会看到一段卡通影片、一个复杂进度的提示框、一个小loading，
我们不会单纯的选择一张GIF动画胜任，因为它的局限性和短板表现的很明显.
- GIF图片所能使用的颜色数量被限制在256色
- GIF不具有Alpha透明的特性，
- GIF动画一旦生成，参数就固定在文件内部，只能通过图像处理软件去重新生成. 
在某些场景下，基于图片的逐帧动画成了不错的选择。

![](https://cdn.jsdelivr.net/gh/okaychen/CDN@2.2/BlogSource/images/loading.jpg)

# steps()调速函数

写在前面中提到，我们不能基于贝塞尔曲线的调速函数完成我们所需要的逐帧动画，那么采用什么调速函数呢？

对，答案就是`steps()`调速函数,与贝塞尔曲线迥然不同的是，`steps()`会根据你指定的步进数量，把动画分为很多帧，而且整个动画会在`帧与帧之间硬切`,不会像贝塞尔曲线那样做插值处理。

![对比step(8)、linear以及默认ease的差异](https://cdn.jsdelivr.net/gh/okaychen/CDN@2.2/BlogSource/images/xy.png)

通过上图我们可以很明显看出steps(8)、linear和ease的区别.

其实这种硬切效果是我们极力避免的，因此我们也很少听到关于`steps()`的讨论。在CSS调速函数的世界里，基于`贝塞尔曲线`的调速函数就像是被人追捧的白天鹅，而`steps()`则是旁人唯恐不及的丑小鸭。

![](https://cdn.jsdelivr.net/gh/okaychen/CDN@2.2/BlogSource/photos/ch.jpg)

其实无所谓好与不好，更多的是适合与不适合，我们都崇拜的贝塞尔曲线在像小"loading"这样的逐帧动画中失败了，而`steps()`却展示出我们想要的效果.

这个想法最初是Simurai在他的博客中推出[http://simurai.com/blog/2012/12/03/step-animation](http://simurai.com/blog/2012/12/03/step-animation)，他使用`steps()`实现拼合图片的动画效果.让人印象深刻 

<iframe height='265' scrolling='no' title='Steps Animation' src='//codepen.io/simurai/embed/tukwj/?height=265&theme-id=dark&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;margin-top:20px'>See the Pen <a href='https://codepen.io/simurai/pen/tukwj/'>Steps Animation</a> by simurai (<a href='https://codepen.io/simurai'>@simurai</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

# ch单位 - css值与单位第三版

有时候，我们希望一段为本字符逐个显示，模拟出一种打字的效果。这种效果在技术类网站中尤为常见，用等宽字体可以营造出一种终端命令行的感觉.

```html
<h1>CSS is amazing!</h1>
```
```css
@keyframes typing{
    from{width:0}
}
h1{
    width:7.7em;
    white-space:nowrap;
    overflow:hidden;
    animation:typing 8s;
}
```
我们想要模拟出一种打字效果，但是
- 整个动画是平滑连贯的，而不是逐字显示
- 目前我们已经使用em指定宽度是7.7，虽然他比像素单位好一些，但是仍然不够理想，这个宽度为什么是7.7em.

![](https://cdn.jsdelivr.net/gh/okaychen/CDN@2.2/BlogSource/photos/mi.jpg)

我们很自然的想到了使用`steps()`来修复第一个问题，但是不幸的是，我们所需要的步进数量是由字符的数量来决定的

`CSS值与单位(第三版)`规范引入了一个新的单位，表示"0"字形的宽度。大多数场景下，我们不必关心"0"字形的宽度到底有多宽，因为在等宽字体中，"0"字形的宽度和其他所有字形的宽度是一样的。因此，我们如果使用ch单位来表示h1的宽度，那取值实际上就是字符的数量：在上面的例子中就是15
```css
@keyframes typing{
    from{ width:0 }
}
@keyframes caret{
    50%{ border-color:transparent }
}
h1{
    width:15ch;
    overflow:hidden;
    white-space:nowrap;
    border-right:0.5em solid;
    animation:typing 6s steps(15),caret 1s steps(1) infinite;
}
```
但是我们还是有些疑问：
- 这样的代码是不易维护的，当更新标题的时候，我们总是需要根据字符的数量来指定不同的宽度样式和`steps()`函数，这时候正是JavaScript的用武之地
```js
function $$(selector,context){
    context = context||document;
    var elements = context.querySelector(selector);
    return Array.prototype.slice.call(elements);
}
$$('h1').forEach(function(h1){
    var len = h1.textContent.length,s = h1.style;

    s.width = len + 'ch';
    s.animationTimingFunction = "steps(" + len + "),steps(1)"
})
```
- 如果浏览器不支持ch单位，我们该怎么办？这时候就需要实现样式的回退，如果不希望字体出现异常，会选择补一行em作为单位的回退样式


# 写在最后
这一篇主要基于`steps()`函数和`ch单位`,详细的比较了`steps()`调速函数和基于贝塞尔曲线调速函数的区别，虽然`steps()`调速函数像是旁人唯恐不及的丑小鸭，但是它亦有其独特的魅力。