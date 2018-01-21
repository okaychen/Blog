---
title: 我找不到dev-server，请允许我给mock数据找一个接口
date: 2018-01-19 20:37:03
excerpt_render: true  
comments: true
tags:  
    - vueCli
    - express 
    - webpcak
    - mock
categories:
    - Node
---

我们想要给我们的mock data 找一个接口请求，原版配置在 dev-server.js ，新版的 vue-webpack-template 删除了dev-server.js，改用webpcak.dev.conf.js代替（具体更新见[github：switch to webpack-dev-server](https://github.com/vuejs-templates/webpack/pull/975)）

![switch to webpack-dev-server](http://www.chenqaq.com/assets/images/vuecli1.png)

```js
// # webpack.dev.conf.js
// 在const portfinder = require('portfinder')添加我们需要的一些模块

// node的开发框架express来简化操作
const express = require('express')
const app = express()

// mock data
const appDate = require('../mock/data.json')
const seller = appDate.seller;
const goods = appDate.goods;
const ratings = appDate.ratings;
```

1、get请求配置
```js
# webpack.dev.conf.js
// 在devServer选项中添加以下内容

before(app){
  app.get('/api/seller',(req,res)=>{
    res.json({
      errno : 0,
      data : seller
    })
  })
  app.get('/api/goods/',(req,res)=>{
    res.json({
      errno : 0,
      data : goods
    })
  })
  app.get('/api/ratings',(req,res)=>{
    res.json({
      errno : 0,
      data : ratings
    })
  })
}

```

关于`devServer.before()` webpack有很详细的解释，并且给出了一个例子，它提供了在服务器内部所有中间件之前执行的自定义中间件的能力，用它可以来自定义处理程序

![devServer.before](http://www.chenqaq.com/assets/images/webpack1.png)


修改完配置之后，我们需要重新运行命令`npm run dev`重新编译即可

然后标题栏访问
```js
http://localhost:8080/api/seller
```

![api/seller](http://www.chenqaq.com/assets/images/vuecli-json1.png)

同样的，我们访问
```js
http://localhost:8080/api/goods
// 和
http://localhost:8080/api/ratings
```
同样得到了我们的mock data，哈哈，终于给我们的mock data找了一个接口

2、post请求配置

如果配置post请求，我们可以做一下配置
```js
// # webpack.dev.conf.js
app.post('/api/foods',(req,res)=>{
  res.json({
    errno : 0,
    data : foods
  })
})

// 在组件中
// # ..vue
created(){
  this.$http.post('http://localhost:8080/api/foods').then(res)=>{
    console.log(res)
  }
}
```

这样我们的`data mock`就有接口可以访问喽。