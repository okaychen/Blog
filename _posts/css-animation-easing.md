---
title: 过渡与动画 - 缓动效果之弹跳动画&弹性过渡
date: 2017-12-10 19:12:36
comments: true
tags:
    - CSS
    - animation
categories:
    - web开发
    - CSS
---

# 难题

给过渡和动画加上缓动效果是一种常见的手法（比如具有回弹效果的过渡过程）是一种流行的表现手法，可以让界面显得更加生动和真实：在现实世界中，物体A点到B点往往也是不完全匀速的

以纯技术的角度来看，回弹效果是指当一个过渡达到最终值时，往回到一点，然后再次回到最终值，如此往复一次或者多次，并逐渐收敛，最终稳定在最终值。有相当的多JavaScript类库可以创建动画，且内置回弹效果等其他缓动效果。但是眼下，我们其实已经不需要借助脚本来实现过渡和动画了。不过，在CSS中实现回弹效果的最佳方式是什么呢？

![弹跳效果](../../../../assets/images/easingP.png)


# 弹跳动画

我们的第一感觉可能就是使用css动画，并且设置如下关键帧：

```CSS
@keyframes bounce{
    60%,80%,to{transform:translateY(350px);}
    70%{transform:translateY(250px);}
    90%{transform:translateY(300px);}
}
```
相信我们都做过这样的事，但是我们跑一遍这个动画，会发现它显示的及其不真实，主要原因在于，每当这个小球方向改变时，她得移动过程都是持续加速的，这看起来很不自然。`原因其实就是因为它的调速函数在关键帧的衔接都是一样的`

所有的过渡和动画之间都是跟一条曲线有关的，`这条曲线指定了动画过程在整段时间中是如何推进的`。

如果不指定调速函数，就是得到一个默认值。但是这个`默认值`并不是我们想象中的匀速效果，而是：

![默认值](../../../../assets/images/easing2.png)

注意，当时间进行到一半时，这个过渡已经推进到80%.

说到`调速函数`,我们很自然联系到了css内置的缓动曲线和贝塞尔曲线。

不论是在`animation/transition`简写属性中，还是在`animation-timing-function/transition-timing-function`展开属性中，你都可以把这个默认的调速函数显示指定`ease`关键字。除了ease外，还有四种内置的缓动曲线，你可以借助他们来改变动画的推进方式

![ease-out](../../../../assets/images/easing-easeOut.png)
![ease-in](../../../../assets/images/easing-easeIn.png)

![ease-in-out](../../../../assets/images/easing-easeInOut.png)
![linear](../../../../assets/images/easing3.png)

从上面四个图中，我们很直观的看出，`ease-out`是`ease-in`的反向版本。而这一对组合正是实现回弹效果所需要的：`每当小球的运动方向相反时，我们希望调速函数也是相反的`。我们希望小球下落是加速的`(ease-out)`,而弹起向上是减速的`(ease-in)`:

```CSS
@keyframes bounce{
    60%,80%,to{
        transform:translateY(400px);
        animation-timing-function:ease-out;
    }
    70%{transform:translateY(300px);}
    90%{transform:translateY(360px);}
}
.ball{
    animation:bounce 3s ease-in;
}
```
虽然我们改动不大，但是已经发现回弹效果变得真实起来。不过显然这`五种内置的缓动曲线`是不够用的，假如我们这个回弹效果是用来模拟自由落体的，那么我们需要一个`更高的加速度`和ease的反向版本，又如何得到呢？

其实所有的这五种曲线都是通过`(三次)贝塞尔曲线`来指定的，而CSS的调速函数都是`只有一个片段的贝塞尔曲线`，每个函数也只有两个控制锚点，CSS就提供了一个`cubic-bezier()`函数，允许我们指定自定义调速函数。他接受四个参数，分别是两个控制锚点的坐标值，
`cubic-bezier(x1,y1,x2,y2)`，曲线的两个端点固定在(0,0)和(1,1)之间，前者是整个过渡的起点(时间进度0%，动画进度0%)而后者是整个过渡的终点(时间进度100%，动画进度100%)。

举例来说，`ease`等同于`cubic-bezier(.25,.1,.25,1)`,因此它的反向版本就是`cubic-bezier(.1,.25,1,.25)`

```CSS
@keyframes bounce{
    60%,80%,to{
        transform:translateY(400px);
        animation-timing-function:ease;
    }
    70%{
        transform:translateY(300PX);
    }
    90%{
        transform:translateY(160px);
    }
}

.ball{
    animation:bounce 3s cubic-bezier(.1,.25,1,.25);
}
```

<iframe height='265' scrolling='no' title='css-animation-easing' src='//codepen.io/okaychen/embed/xPveBP/?height=265&theme-id=dark&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;margin-top:20px'>See the Pen <a href='https://codepen.io/okaychen/pen/xPveBP/'>css-animation-easing</a> by okaychen (<a href='https://codepen.io/okaychen'>@okaychen</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

我们可以借助[cubic-bezier.com](http://cubic-bezier.com)的图形化工具，进行反复尝试和优化，从而进一步改写这个回弹动画.

## 最后

经过以上这些知识的学习储备和练习，相信我们已经可以做出很棒的弹跳动画了.
我们在文章开始放了一个小球弹跳的gif图效果，那么就让我们真真正正的动手来写一下吧！

<p data-height="265" data-theme-id="dark" data-slug-hash="POMgrv" data-default-tab="css,result" data-user="okaychen" data-embed-version="2" data-pen-title="css-animation-easing-practice" class="codepen">See the Pen <a href="https://codepen.io/okaychen/pen/POMgrv/">css-animation-easing-practice</a> by okaychen (<a href="https://codepen.io/okaychen">@okaychen</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>


# 弹性过渡

假设我们有一个文本输入框，每当它被聚焦时，都需要展示一个提示框
我们有如下结构：
```html
    <label>
        Your username:<input id="username" />
        <span class="callout">Only letters,numbers,usrescore(_) and hyphens (-) allowed!</span>
    </label>
```
每当用户聚焦这个文本输入框时，都会有一个半秒钟的过渡，可能我们会完成这样的代码
```css
input:not(:focus) + .callout{
    transform:scale(0);
}
.callout{
    transition:.5s transform;
    transition-origin:1.4em -.4em;
}
```
这个过渡没有任何问题，但是我们希望它在结尾时能在夸张一点话，显得更加自然生动，我们可能会把这个过渡改为一个动画，然后用上面提到的缓动曲线
```css
@keyframes elastic-grow{
    from{transform:scale(0);}
    70% {
        transform:scale(1.1);
        animation-timing-function:cubic-bezier(.1,.25,1,.25);   /*反向的ease*/
    }
}

input:not(:focus) + .callout{ transform:scale(0); }

input:focus + .callout{ animation:elastic-grow .5s; }

.callout{ transform-origin:1.4em -.4em; }
```
添加了这个动画之后，确实发挥了作用。不过这里我们其实只是需要一个过渡而已，而我们本质上却使用了一个动画，显得有些大材小用，有一种杀鸡用牛刀的感觉，我们如何只用过渡完成这个效果呢？

这里我们就用到了上面说起的调速函数`cubic-bezier()`，在这个例子中，我们希望调速函数先到达110%的程度(相当于`scale(1.1)`)，然后在过渡回100%，我们把控制锚点向上移，

![cubic-bezier(.25,.1,.3,1.5)](../../../../assets/images/Tankease.png)

这个自定义调速函数在垂直坐标上已经超出0~1的区间，最终又回到1，在70%的时间点到达了110%的变形程度的高峰，然后继续用剩下30%的时间回到它的最终值

整个过渡的推进，非常接近前面的动画方案，但他仅需要一行代码就可以实现整个效果
```css
input:not(:focus) + .callout{ transform:scale(0) }

.callout{
    transform-origin:1.4em -.4em;
    transition:.5s cubic-bezier(.25,.1,.3,1.5);
}
```
![cubic-bezier(.25,.1,.3,1.5)](../../../../assets/images/Tankbug.png)

but,wait...当提示框收缩时，左下角出现的是什么？其实，当我们把焦点从输入框切出去的时候，所触发的过渡会以`scale(1)`作为起始值，并以`scale(0)`作为最终值，这个过渡仍然会在350ms后到达110%的变形程度。只不过在这里，110%的变形程度的解析结果并不是`scale(1.1)`,而是scale`(-0.1)`

我们可以定义关闭状态的css规则(假如我们指定普通的ease调速函数)把当前的调速函数覆盖掉
```css
input:not(:focus) + .callout{
    transform:scale(0);
    transition-timing-function:ease;   /*覆盖cubic-bezier*/
}

.callout{
    transform-origin:1.4em -.4em;
    transition:.5s cubic-bezier(.25,.1,.3,1.5);
}
```
再试一试，发现已经关闭提示框已经恢复到我们设置`cubic-bezier()`之前的样子了，

但是其实我们仔细观察发现另一个问题：`提示框的关闭动作明显要迟钝一些。`我们细细想来发现，在提示框展开过程中，当时间为50%(250ms)时，它就已经到达100%的尺寸效果了。但是在收缩过程中，从0%~100%的变化会花费我们为过渡所指定的素有时间(500ms),因此感觉会慢上一般

然后我们会想到同时覆盖过渡的持续时间：可以用`transition-duration`这一属性，也可以用`transition`这个简写属性来覆盖所有值，如果选择后者的话就不需要指定ease了，因为他本来就是`transition`的初始值:

```css
input:not(:focus) + .callout{
    transform:scale(0);
    transition:.25s;
}

.callout{
    transform-origin:1.4em -.4em;
    transition:.5s cubic-bezier(.25,.1,.3,1.5);
}
```

<iframe height='265' scrolling='no' title='css-animation-task' src='//codepen.io/okaychen/embed/VywaXV/?height=265&theme-id=dark&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;margin-top:20px'>See the Pen <a href='https://codepen.io/okaychen/pen/VywaXV/'>css-animation-task</a> by okaychen (<a href='https://codepen.io/okaychen'>@okaychen</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## 最后
虽然弹性过渡在很多过渡中都可以收到不错的效果，但是某些时候`他产生的效果可能相当糟糕`。典型的`反面案例`出现在对`颜色属性`的弹性过渡中。尽管颜色发生弹性过渡可能非常有趣，但这种效果在UI场景中通常是不合适的.

为了避免不小心对颜色设置了弹性过渡，可以尝试把`过渡的作用范围限制在某几种特定的属性上`，transition不指定时，`transition-property`就会得到它的初始值：`all`，这意味着只要是过渡的属性都会参与过渡。我们可以在`transition`中设置`transform`

```css
input:not(:focus){
    transform:scale(0);
    transition:.25s transform;
}

.callout{
    transition-origin:1.4em -.4em;
    transform:.5s cubic-bezier(.25,.1,.3,1.5) transform;
}
```




参考资料

*  [《CSS Secrets 》](https://book.douban.com/subject/26295140/)

*  [http://w3.org/TR/css-animations](http://easings.net/zh-cn)

*  [http://cubic-bezier.com](http://easings.net/zh-cn)

*  [understand css cubic-bezier](http://easings.net/zh-cn)

