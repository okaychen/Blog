---
title: 强大的原型和原型链
date: 2017-09-21 10:09
cover: "https://cdn.jsdelivr.net/gh/okaychen/CDN@1.2/BlogSource/gallery/thumb_028.jpg"
categories:
  - JavaScript
tags:
  - JavaScript
---

前两次总结了JavaScript中的基本数据类型（值类型<引用类型>，引用类型<复杂值>）以及他们在内存中的存储，对内存空间有了一个简单的了解，以及第二次总结了this深入浅出的用法，我们知道了this的用法取决于函数四种调用的方式。

这一次我们来对JavaScript中原型以及原型链做一个深入浅出的理解。

# JavaScript深入浅出系列

1）复杂值vs原始值&&内存空间 - JavaScript深入浅出（一）

2）this的用法 – JavaScript深入浅出（二）

3）原型那些事 - JavaScript深入浅出（三）

<!-- more -->

实际上，原型只是一个被称为"原型"的空对象属性，它是由JavaScript在后台创建（当然我们知道了它的原理，可以手动完成这项工作）；

当你创建一个函数时，这个函数都会有一个prototype属性（不管你是不把它当做一个构造函数使用）。

那么我们具体来看一下吧！！！


# 原型链概要
prototype属性是JavaScript为每个Function实例创建的一个对象。

具体的说："它将通过new关键字创建的<对象实例>链接回创建它们的<构造函数>" 。就这样，我们可以共享或继承通用的方法和属性。当我们在属性查找时，就会不自觉的开启了我们的原型链之旅

让我们通过一个简单的例子开启我们的原型链查询之旅：我们使用Array构造函数创建一个数组，然后调用join方法

<fancybox>![](https://cdn.jsdelivr.net/gh/okaychen/CDN@2.2/BlogSource/cnblogs_img/1140602-20170920174520228-1650950569.png)</fancybox>

我想上面的例子对于js入门者是非常简单的，那么但是我们再来仔细了解一下，你发现join方法并没有定义为myArray对象实例的属性，但是我们创建的数组却可以访问join()方法，就好像我们本来就可以访问似的。

## join()是在哪个地方定义的呢？
事实上，我们经常使用的join()，slice()，push()...等这些内建的方法，都被定义为了Array()构造函数的prototype属性的属性。由于在我们创建的myArray数组中没有找到join(),因此JavaScript会在原型链中查找join()方法；

其实这样做我们很容易就联想到了效率和重用，通过把该属性添加到原型中去，我们所有的数组都有充分利用了相同的join()函数，而不需要为每一个数组实例都创建函数的新实例。

原型在所有的function()实例上都是标准的
我们知道创建函数两种方法

1、调用Function构造函数法：

<fancybox>![](https://cdn.jsdelivr.net/gh/okaychen/CDN@2.2/BlogSource/cnblogs_img/1140602-20170920180222415-1922951156.png)</fancybox>

2、使用字面量法：

<fancybox>![](https://cdn.jsdelivr.net/gh/okaychen/CDN@2.2/BlogSource/cnblogs_img/1140602-20170920180309587-1797862199.png)</fancybox>

其实，即使不直接使用Function构造函数，而是使用字面量表示法，所有的函数也都是由Function()构造函数创建的

我们用字面量方法创建了一个函数，发现它的prototype和Function()构造函数一样，都指向了object()，这也就证实了我们上所说的.

<fancybox>![](https://cdn.jsdelivr.net/gh/okaychen/CDN@2.2/BlogSource/cnblogs_img/1140602-20170920181154181-1036941154.png)</fancybox>

# 默认的prototype属性是object()对象
上面我已经谈到，实际上，原型只是一个被称为'原型'的空对象属性，它在JavaScript的后台已经创建，并且通过Function()构造函数来使用。

我们可以手动完成这项在后面完成的工作，以便了解它的机制。

<fancybox>![](https://cdn.jsdelivr.net/gh/okaychen/CDN@2.2/BlogSource/cnblogs_img/1140602-20170920182200743-1619464603.png)</fancybox>

上面的代码非常简单，实际上也非常好用，它实质上复制了JavaScript在后面已经完成的工作。

# 将构造函数创建的实例链接至构造函数的prototype属性
将构造函数所创建的实例链接至构造函数的prototype属性，让我们开始这条神秘的_proto_链接

上面我们所原型只是一个对象，但是它是特殊的，因为原型链将每个实例都链接至其构造函数的prototype属性。

创建的对象实例和创建对象的构造函数的prototype属性

<fancybox>![](https://cdn.jsdelivr.net/gh/okaychen/CDN@2.2/BlogSource/cnblogs_img/1140602-20170920183956321-1581665034.png)</fancybox>

当然，我们除了使用_proto_链接，还可以使用构造函数属性：

事实上，`_proto_  ===  constructor.prototype`

<fancybox>![](https://cdn.jsdelivr.net/gh/okaychen/CDN@2.2/BlogSource/cnblogs_img/1140602-20170920183940150-1570195149.png)</fancybox>

 这样我们就不难理解，下面可以达到同样的效果：

<fancybox>![](https://cdn.jsdelivr.net/gh/okaychen/CDN@2.2/BlogSource/cnblogs_img/1140602-20170920184944103-989778859.png)</fancybox> 

上面的例子中我写到直接使用链也是可以的，下面会介绍它的查询顺序。虽然我相信对于入门者都是使用的链查询，但是我们有必然要知道它背后的那些机制。

其实有只看不见的手，在帮助着我们的代码完成任务

# 原型链的最后是Object.prototype
那么就让我们来看一下它的原型链查询吧。

由于prototype属性是一个对象，因此原型链或查询的最后一站是Object.prototype。

<fancybox>![](https://cdn.jsdelivr.net/gh/okaychen/CDN@2.2/BlogSource/cnblogs_img/1140602-20170920190544243-1227861953.png)</fancybox>
 
我想上面的代码，对于我们来说是丝毫不费力气的，但就借这个简单的例子，最后一个简单的undefined结果，却经历了一段不为我们所见的原型链查询；

我们创建了一个myArray空数组，然后我们试图访问未定义的myArray属性时，并不会直接返回undefined，而是要经历一段原型链查询。

①在myArray对象中查找foo属性；

如果没有找到

②则在Array.prototype中查找该属性；

但它在哪里也没有定义，

③最后查找的地方就是Object.prototype

三个对象中都没有定义，最后才给我们了一个undefined的回馈。


# 用新对象替换prototype属性会删除默认的构造函数属性
我们可以用一个新值来替换prototype属性的默认值，但是需要特别注意的是：这么做会删除在"预制"原型对象中找到的默认的constructor属性，除非我们手动指定一个 ；

<fancybox>![](https://cdn.jsdelivr.net/gh/okaychen/CDN@2.2/BlogSource/cnblogs_img/1140602-20170920192520821-1186090159.png)</fancybox>

所以当你想要替换JavaScript设置的默认的prototype属性(与一些js oop模式类似)，应该重新连接引用该构造函数的构造函数属性。

下面我们简单的改一下上面的代码，以便构造函数属性能够再次为适当的构造函数提供引用

<fancybox>![](https://cdn.jsdelivr.net/gh/okaychen/CDN@2.2/BlogSource/cnblogs_img/1140602-20170920193046993-265590715.png)</fancybox>

# 继承原型属性的实例总是能够获得最新值
其实prototype是动态的继承原型的属性的实例总是能够获得最新值，

<fancybox>![](https://cdn.jsdelivr.net/gh/okaychen/CDN@2.2/BlogSource/cnblogs_img/1140602-20170920193844259-1842047267.png)</fancybox>

这一点比较简单，不管是使用原型对象还是自己的对象覆盖它，继承原型属性的实例总是能够获得新值。

但是我们需要注意下面的一点：
 

# 用新对象替换prototype属性不会更新以前的实例
当你想用一个新对象完全替换prototype属性时，觉得所有的实例都会被更新，那么就即将要走向一条寻错的道路，可能会得到意想不到的结果。

创建一个实例时，该实例将在实例化时绑定至"刚完成"的原型，提供一个新对象作为prototype属性不会更新已创建的实例和原型之间的连接

<fancybox>![](https://cdn.jsdelivr.net/gh/okaychen/CDN@2.2/BlogSource/cnblogs_img/1140602-20170920195027900-1505871808.png)</fancybox>

这里的重点是，一旦开始创建实例，就不应用一个新对象那个来替换对象的原型，这样将会导致实例有一个指向不同原型的链接

# 自定义构造函数实现原型继承
当我们在自定义构造函数时，同样可以实现原型继承:

<fancybox>![](https://cdn.jsdelivr.net/gh/okaychen/CDN@2.2/BlogSource/cnblogs_img/1140602-20170920201741993-2044813602.png)</fancybox>

上面我们写的例子，很好的利用原型链，来创建一个构造函数。如果我们不提供参数的话，构造函数则可以继承legs和arms属性。如果传入参数，就遮盖继承的属性

# 创建继承链
我们自定义的构造函数实现了原型继承，设计原型继承的目的是要在传统的面向对象编程语言中找到模仿继承模式的继承链。继承只是一个对象可以访问另一个对象的属性。

接下来我们来创建一个简单的继承链：

<fancybox>![](https://cdn.jsdelivr.net/gh/okaychen/CDN@2.2/BlogSource/cnblogs_img/1140602-20170920201619353-1702121657.png)</fancybox>

事实上，上述代码我做的仅仅是利用一个已有的原生对象。

Person()和prototype属性的默认的object()值没有什么不同，这也正是一个prototype属性包含默认空object()值所发生的事情，查找用于创建对象的构造函数的原型（即object.prototype），以便查找所继承的属性。

# 我们为什么要关注prototype属性呢？

你可能不喜欢原型继承，而是更多的喜欢采用另一种模式的对象继承。但是：

①原生构造函数（如Ocject(),Array(),Function()...）都使用了prototype属性，以便让你的实例可以继承属性和方法。

②如果想要更好的理解JavaScript，我们需要了解JavaScript本身是如何使用prototype对象的

③当你自定义一个构造函数时，可以像JavaScript原生对象那样使用继承，就必须要知道他是如何工作的

④通过使用原型继承，我们可以创建有效的对象实例。因为并非所有的数组对象都需要他们自己的join()方法<我想这就需要我们做些工作了>，但所有的实例都可以利用相同的join()方法，这就提高了效率和重用性。

# 写在后面

到这里我们的函数原型属性的深入浅出系列已经介绍完毕了，希望可以帮助你记住原型链层次结构的工作原理、对于易混淆的原型继承属性有一个分类
