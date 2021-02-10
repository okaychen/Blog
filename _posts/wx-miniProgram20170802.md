---
title: 微信小程序-滚动消息通知
date: 2017-08-02 20:20
cover: "https://cdn.jsdelivr.net/gh/okaychen/CDN@1.2/BlogSource/gallery/thumb_003.jpg"
tags:  
    - 小程序
categories:
    - 小程序
---

# 写在前面：　
这次我主要想总结一下微信小程序实现上下滚动消息提醒，主要是利用swiper组件来实现，swiper组件在小程序中是滑块视图容器。

# 效果图

<img src="https://cdn.jsdelivr.net/gh/okaychen/CDN@2.2/BlogSource/cnblogs_img/1140602-20170802200717553-132653419.gif" alt="">

<!-- more -->

# 实现

我们通过vertical属性（默认为false,实现默认左右滚动）设置为true来实现上下滚动。（需要注意的是：只要你的swiper存在vertical属性，无论你给值为true或者false或者不设参数值，都将实现上下滚动）

wxml
```html
<swiper class="swiper_container" vertical="true" autoplay="true" circular="true" interval="2000">
    <block wx:for="{{msgList}}">
    <navigator url="/pages/index/index?title={{item.url}}" open-type="navigate">
        <swiper-item>
        <view class="swiper_item">{{item.title}}</view>
        </swiper-item>
    </navigator>
    </block>
</swiper>
```
wxss
```css
.swiper_container {
    height: 55rpx;
    width: 80vw;
}
.swiper_item {
    font-size: 25rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    letter-spacing: 2px;
}
```
js
```js
var app = getApp()
Page({
data: {},
onLoad(e) {
    console.log(e.title)
    this.setData({
    msgList: [
            { url: "url", title: "公告：多地首套房贷利率上浮 热点城市渐迎零折扣时代" },
            { url: "url", title: "公告：悦如公寓三周年生日趴邀你免费吃喝欢唱" },
            { url: "url", title: "公告：你想和一群有志青年一起过生日嘛？" }]
        });
    }
})
```
数据放在了setData函数中，setData函数的主要作用是将数据从逻辑层发送到视图层，但是需要避免单次设置大量的数据。
