---
title: wx.request接口需要注意的几个问题
date: 2017-10-12 12:58 
cover: "https://cdn.jsdelivr.net/gh/okaychen/CDN@1.2/BlogSource/gallery/thumb_005.jpg"
tags:  
    - 小程序
categories:
    - 小程序
---
# 写在前面
之前写了一篇《微信小程序实现各种特效实例》，这次主要聊一下小程序前后端接口对接的一些事，

对于客户端与服务端接口的对接，微信小程序提供了wx.request()的API接口，完美的实现前端后台的对接：

一个简单的栗子：
```js
wx.request({
    url: API_URL + '/api/category/categoryList',
    data: {
        applet_id: app.globalData.applet_id
    },
    method: 'POST',
    success: function (res) {
    wx.hideLoading();
    console.log(res.data.data, 'category data acquisition success');
        that.setData({category: res.data.data});
    }
});
```
在控制台中也得到了我想要的接口中的数据：

<fancybox>![](https://www.chenqaq.com/assets/cnblogs_img/1140602-20171011130151684-1534935555.png)</fancybox>

但期间也遇到了几个问题，总结下来；

<!-- more -->

# 1）网络请求与域名的合法性
微信小程序包括四种类型的网络请求：

- 普通HTTPS请求(wx.request)

- 上传文件(wx.uploadFile)

- 下载文件(wx.downloadFile)

- WebSocket通信(wx.connectSocket)

关于“URL 域名不合法，请在后台配置后重试”的错误

<fancybox>![](https://www.chenqaq.com/assets/cnblogs_img/1140602-20171011184932012-1926871764.png)</fancybox>

小程序只允许与合法配置的域名进行数据交互

进入微信公共平台=>设置=>开发设置：设置需要交互的域名

<fancybox>![](https://www.chenqaq.com/assets/cnblogs_img/1140602-20171011190502621-1772459677.png)</fancybox>

# 2）对于接口调用http和https的问题
对于这一个问题，在之前来说，微信公共平台支持使用http测试项目，但是正式发布需要使用https的域名，

但是前几天看到了微信公众平台发的一则公告：

应该是要封杀http方式调用了，公告链接：为保证数据传输安全，提高业务安全性，公众平台将不再支持HTTP方式调用（时间2017年9月21日）

# 3）关于method以及data数据
微信小程序多地方都严格区分大小写，所以要注意method的value需要为大写，request的默认的超时时间都是60s；

对于data数据，上次我们从接口中拿到的数据是json格式的，最终发送给服务器的数据是String类型，如果传入的 data 不是 String 类型，会被转换成 String 。

文档中提供的转换规则如下：

> 对于 header['content-type'] 为 application/json 的数据，会对数据进行 JSON 序列化

> 对于 header['content-type'] 为 application/x-www-form-urlencoded 的数据，会将数据转换成 query string；

`（encodeURIComponent(k)=encodeURIComponent(v)&encodeURIComponent(k)=encodeURIComponent(v)...）`

这个工作在我们设置header头为application/x-www-form-urlencoded后，在后面为我们进行。

# 4）关于GET和POST请求
根据HTTP的规范，get是用于信息获取，post表示可能修改服务器的资源的请求

对于小程序post请求：'application/json'用在get请求中没有问题，但是用在POST请求中不好使了，content-type 默认为 'application/json'; 

所以使用post请求时，将content-type设置为 application/x-www-form-urlencoded 

# 写在后面
总结了以上四个问题，应该是比较常见也是容易遇到的，欢迎补充和指正，另外文档中api模块还有一些需要注意的问题，