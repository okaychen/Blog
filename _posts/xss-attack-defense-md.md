---
title: web安全-浅谈xss攻防（一）
date: 2018-10-09 13:59:50
cover: "https://cdn.jsdelivr.net/gh/okaychen/CDN@1.2/BlogSource/gallery/thumb_006.jpg"
tags:  
    - WEB安全
categories:
    - WEB安全
---

# 前言
近来反反复复读了一些xss和csrf攻防的一些文章，大体上读完了《XSS跨站脚本剖析与防御》这本书，之前浅浮的以为xss仅仅需要对用户输入内容进行过滤，然而现在重新审视xss的攻击技巧着实令人眼花缭乱。

那到底什么是xss跨站脚本呢？它会造成什么危害？为何它如此流行？它的攻击方式有哪些？作为web开发人员我们应该做的有哪些？

带着这几个问题，反复测试总结了这篇文章，一方面方便自己以后学习回顾，另一方面希望可以帮助到一些想对xss攻防有些了解的人，我相信这篇文章能够帮你理解上面几个问题。想要深入学习，建议还是去学习[《xss跨站脚本剖析与防御》](https://read.douban.com/ebook/12812565/)，这本书是邱永华先生所著，阿里首席安全研究员吴翰清作的序，细细读来定能有所收获；
<!--more-->
# XSS背景与介绍
## 什么是XSS
随着互联网的发展，web2.0时代的兴起，带来的交互模式的发展，现如今更是向融合人工智能的web3.0发展。目前的网站绝大多数都有需要和用户交互的功能，比如电商网站的评论，论坛的发帖，微博网站的转发等等。

正常用户会中规中矩的使用，但是对于黑客他们也许不会循规蹈矩，他们可以通过这些表单提交一些恶意代码，通常是JavaScript（但是绝对不限与此，也包括Java，VBScript，ActiveX，Flash或者甚至是普通的HTML）一旦攻击成功后，攻击者可能获得更高的权限（可能的一些操作）、私密的网页内容、会话和cookie等等

不过目前现代浏览器比如chrome，firefox对于表单中的代码会自动检测出xss，从而屏蔽请求，但仍然不是绝对安全的，与此同时不乏有一些浏览器如IE6,7,8并不会做这样的处理，亲测如此；chrome的xss过滤器叫做xssAuditor，IE的xss过滤xssFilter从IE8 beta2才开始，所以IE8及以下的浏览器不会做xss过滤处理，关于xssAuditor和xssFilter两者的区别，吴翰清大神所著的《白帽子讲web安全》有详细的介绍，

>作为扩展简单的说，ie的xss检测相对粗暴，在系统盘的mshtml.dll中，是基于正则进行检测的；
而chrome的xssAuditor的整合在webkit中，任何使用webkit内核的都可以使用这些规则，在词法解析阶段进行，和html解析不同的token，xssAuditor会逐一扫描并检测token，token中发现危险的属性和URL进行比较，如果URL中也存在同样的数据，xssAuditor则会认为是一个反射型xss。

下面通过一个很简单的栗子说明：textarea中的一段`<script>alert(/XSS/)</script>`很简单的恶意代码，如果前后端和浏览器的xss检测都跳过，那么这段代码就会伴随请求被上传到漏洞服务器或者客户端中，站点从数据库中或者客户端读取恶意用户存入的非法数据，然后显示在页面，在受害者主机上的浏览器执行恶意代码，那么这个xss就会成功（其实就是让用户打开这个页面弹个屏的小恶作剧），但是这里就如同上面说的那样chrome的xssAuditor帮我们检测出了异常代码，从而拦截了这个网页，阻止了这个恶作剧的发生，我们把这种注入到服务器或者客户端的恶意代码的xss攻击方式称为持久性（又叫存储型）XSS

<video src="https://www.chenqaq.com/assets/videos/xss01.mp4" controls allowfullscreen="true" loop="true" autoplay="autoplay" width="100%" min-height="100%">embed: xss--chrome_test</video>

## XSS的分类
根据攻击的来源不同，我们通常分为三种：反射型，存储型和比较特殊的DOM型（DOM-Based XSS）

### 反射型
反射型：反射性通常发生在URL地址的参数中，常用来窃取客户端的cookie或进行钓鱼欺骗，经常在网站的搜索栏，跳转的地方被注入；
比如：
```
http://www.test.com/search.php?key="><script>alert("XSS")</script>
http://www.test.com/logout.asp?out=l$url=javascript:alert(document.cookie)
```
我们发现URL后本来应该是正常的键值对key=value，却被注入了一段恶意代码（即构造了一个其中包含恶意代码的特殊的url），应该慎用get请求，对隐秘的信息则是避免，get请求的键值会被暴露在URL中；POST的内容也会触发反射型XSS，不过触发条件相对苛刻。

当然如果地址栏看到上面两个URL，可能被轻易的看穿该链接是不可信的，但是绝不要小瞧此类XSS的威力，一般黑客都会进行精心布置，恶意URL暴露一般会进行各种编码转化，编码转换后，攻击的迷惑性大大提高
![](https://www.chenqaq.com/assets/images/xss-encode01.png)

### 持久型（又叫存储型）
我们上面提到的栗子就是一个持久型xss的示例，可以看处此类xss攻击不需要用户去点击URL进行触发，提前将恶意代码保存在了漏洞服务器或者客户端中，站点取出后会自动解析执行，相比反射型更具有攻击性，通常发生在网站的留言，评论，博客日志等交互处。

黑客可以利用它渗透网站、挂马、钓鱼...还有危害更大的xss蠕虫，跨站蠕虫用AJAX/JAVASCRIPT脚本语言编写的蠕虫病毒，可以在站点间实现病毒几何数级传播。
### DOM型
相比以上两种攻击类型，DOM型比较特殊，DOM型取出和执行恶意代码都由浏览器端完成，属于前端自身安全漏洞。主要由客户端的脚本通过DOM动态地输出到页面中，它不依赖于提交到服务器端，而从客户端获得DOM中的数据在本地执行.
举个栗子：
```js
    let temp = document.URL;
    let index = temp.indexOf("content") + 4;
    let par = temp.substring(index);
    document.write(decodeURL(par));
```
如果用户点击了带有下面链接的跳转，就会触发XSS漏洞
```js
https://www.test.com/dom.html?content=<script>alert(/xss/)</script>
```

更多XSS攻击方式可以关注xss cheat sheet，会看到很多常见的xss攻击脚本列表，可以作为Poc用来检测web应用程序是否存在xss漏洞

# 续集
web安全-浅谈xss攻防（二）：更多的关注整理一些防御措施

# 参考资料
[《XSS跨站脚本剖析与防御》--邱永华](https://book.douban.com/subject/25711796/)
[《白帽子讲web安全》--吴翰清](https://book.douban.com/subject/10546925/)
[《前端安全系列:如何防止XSS攻击？》--美团技术团队](https://juejin.im/post/5bad9140e51d450e935c6d64)

