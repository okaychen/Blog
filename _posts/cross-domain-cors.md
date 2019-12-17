---
title: 浏览器同源政策
date: 2018-03-15 10:51:07
cover: "https://cdn.jsdelivr.net/gh/okaychen/CDN@1.2/BlogSource/gallery/thumb_003.jpg"
tags:
    - WEB安全
categories:
    - WEB安全
---

我们都知道浏览器的“同源政策”是浏览器安全的基石，根本目的是为了保护用户信息安全，防止恶意的网站窃取数据。
1995年，同源政策由Netscape 公司引入。目前，所有浏览器都执行这个政策。
<!-- more -->
随着互联网的发展，保障用户的信息安全也越来越重要。非同源将受到三种行为的限制：
> - Cookie、localstorage、IndexDB无法读取
- DOM无法获得
- AJAX无法发送

所谓"同源"即指三个相同，
> - 域名相同
- 协议相同
- 端口相同

举个栗子，https://www.chenqaq.com，协议就是http://,域名是www.chenqaq.com，端口默认为80。

ing...
