---
title: Angule Cli创建Angular项目
date: 2017-05-27 20:04
cover: "https://cdn.jsdelivr.net/gh/okaychen/CDN@1.2/BlogSource/gallery/thumb_019.jpg"
tags:
    - JavaScript
categories:
    - JavaScript
---

![](https://cdn.jsdelivr.net/gh/okaychen/CDN@2.2/BlogSource/cnblogs_img/1140602-20170521131215853-1429491603.png)

Angular4.0来了，更小，更快，改动少

接下来为Angular4.0准备环境和学会使用Angular cli项目

<!-- more -->

# 环境准备
1）在开始工作之前我们必须设置好开发环境

如果你的机器上还没有安装Node.js和npm，请安装他们

（这里特别推荐使用淘宝的镜像cnpm，记得以后把npm的指令改为cnpm就可以了）
```js
npm install -g cnpm --registry=https://registry.npm.taobao.org
```
然后我们可以通过node -v和cnpm -v来分别查看node和cnpm安装的版本和结果
```cmd
node -v
cnpm -v
```
2）安装全局Angular cli
```js
cnpm install -g @angular/cli
```
# 创建新的项目
打开终端窗口（这里我使用的是webstorm的Terminal，也可以使用计算机自带的powershell）
```js
ng new my-app
```
项目会很快创建完成，接下来你会看到
```js
Installing packages for tooling via npm
```
这里如果你选这了淘宝的cnmp镜像，应该最好在安装完全局Angular cli后设置一下，保证正常下载工具
```js
ng set --global packageManager = cnpm
```
然后我们的项目就创建完成了

![](https://cdn.jsdelivr.net/gh/okaychen/CDN@2.2/BlogSource/cnblogs_img/1140602-20170521134325432-1354080667.png)

我们会发现在文档中有很多文件，这里参考[Angular](https://angular.cn/)官方文档 ，以便认识这些文件的作用。

# 在项目中引入bootstrap和jQuery

这里我使用webstorm的Terminal，直接在终端操作
```js
cnpm install bootstrap --save   
cnpm install jquery --save
```
我们在项目中就添加了bootstrap和jQuery，我们可以在node_modules文件夹中找到他们（这个文件夹放的是第三方库）；

然后我们需要操作.angular-cli.json文件，把bootstrap和jQuery添加进去:
![](https://cdn.jsdelivr.net/gh/okaychen/CDN@2.2/BlogSource/assets/cnblogs_img/1140602-20170521135435088-196815303.png)
这里需要注意的是：因为angular用的是微软开发的typescript语言，我们需要在终端做下面的操作，以便让typescript认识bootstrap和jQuery一些字符（比如jQuery的$）：
```js
cnpm install @types/bootstrap --save-dev
cnpm install @types/jquery --save-dev
```
这样我们就在项目中正常使用bootstrap和jQuery了

# 项目的启动
启动项目我们可以直接通过：
```js
ng serve
// 或者是
npm start
```
这两个的默认端口都是4200：
```js
http://localhost:4200
``` 
这里你也可以修改默认的端口:
```js
ng serve -p 3000
```
# 最后项目的打包
用angular cli创建的项目会有很多文件，我们就需要打包后再发行：
```js
ng build
```