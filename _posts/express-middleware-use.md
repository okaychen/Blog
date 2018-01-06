---
title: express中间件，一篇文章就够了
date: 2017-12-18 10:40:48
comments: true
tags:
    - node
    - express
categories:
    - web开发
    - node
---

# 底层：http模块
express目前是最流行的基于Node.js的web开发框架，express框架建立在内置的http模块上，

```js
var http = require('http')
var  app = http.createServer(function(req,res){
    res.writeHead(200,{"Content-type":"text/plain"});
    res.end('hello world')
})

app.listen(3000,'lcoalhost')
```
上面代码的关键是使用`createServer`方法，生成一个HTTP的服务器实例。该方法接受一个回调函数，回调函数的参数分别代表HTTP请求和HTTP回应的`request`和`response`对象

Experss框架的核心是对http模块的再包装，
```js
var express = require('express')
var port  = process.env.PORT || 3000
var app = express()
app.get('/',fcuntion(req,res){
  res.send('hello world')
})
app.listen(port)
```
比较`http.createServer()`方法创建一个app实例和Express的构造方法，生成一个Express实例，两者的回调函数都是相同的。Express框架等于在http模块之上，加了一个中间层

# 中间件
Express是一个自身功能极简单，完全由`路由`和`中间件`构成的web开发框架，从本质上说，一个Express应用是在调用各种中间件

`中间件(middleware)`是一个函数,他可以访问请求对象（request object(req)）,响应对象（response object(res)）和web应用中处于请求-响应循环

Express可以使用如下几种中间件：

    - 应用级中间件
    - 路由级中间件
    - 错误处理中间件
    - 内置中间件
    - 第三方中间件

# 应用级中间件
应用级中间键绑定到`app对象`使用`app.use`和`app.METHOD()-需要处理http请求的方法，例如GET、PUT、POST`
```js
var app = express()

// 没有挂载路径的中间件，应用中的每个请求都会执行该中间件
app.use((req,res,next) => {
    console.log('Time',Dtae.now());
    next(); // 传递request对象给下一个中间件
})

// 挂载至/user/:id的中间件，任何执行/user/:id的请求都会执行它
app.use('/use/:id',(req,res,next) => {
    console.log('Request Type',req.method);
    next();
})

// 路由和句柄函数（中间件系统），处理指向/user/:id的GET请求
app.get('/user/:id',(req,res,next)=>{
    console.log('USER');
})
```
![$ node app](../../../../assets/images/middlewarp1.png)
![result](../../../../assets/images/middlewarp2.png)

如果我们想要`处理挂在至/user/:id`的中间件的GET请求，我们需要使用`next()`将`request`对象传递给下一个中间件

否者：
![error](../../../../assets/images/middlewarp3.png) 

得不到下一个中间件处理的它，一直在等待...
最终会抛出localhost未发送任何数据的错误

![error](../../../../assets/images/middlewarp4.png)

如何你不想要终止`请求-响应循环`,总是记得通过`next()`传递request对象

*** 

如果你想要在中间件栈中跳过剩余中间件，调用next('route')方法将控制权交给下一个路由

```js
app.get('/user/:id',(req,res,next)=>{
    if(req.params.id==0) next('route')
    else next()
},(req,res,next)=>{
    // 渲染常规页面
    res.render('regular')
})

// 处理/user/:id，渲染一个id为0的特殊页面
app.get('/user/:id',(req,res,next)=>{
    res.render('special')
})
```

# 路由级中间件
路由级中间件和应用级中间件类似，只不过是它绑定对象为`express.Router()`
```js
var router = express.Router()
```
路由级使用`router.use()`或`router.VERB()`加载

举个栗子
```js
var app = express()
var router = express.Router()
// 没有挂载路径的中间件，通过该路由的每个请求都会执行该中间件
router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
})

// 一个中间件，显示任何指向/user/:id的HTTP请求的信息
router.use('/user/:id',(req,res,next)=>{
    console.log('Request URL',req.originalUrl)
    next()
},(req,res,next)=>{
    console.log('Request Type',req.method)
    next()
})

// 一个中间件栈，处理指向/user/:id的GET请求
router.get('/user/:id',(req,res,next)=>{
    if(req.params.id == 0) next('router')
    else next()
},(req,res,next)=>{
    res.render('regular')
})

// 处理/user/:id，渲染一个特殊页面
router.get('user/:id',(req,res,next)=>{
    console.log(req.params.id)
    res.render('special')
})

// 将路由挂载至应用
app.use('/',router)
```
# 错误处理中间件
>错误处理中间件有四个参数,定义错误处理中间件必须使用这四个参数。即使不需要next对象，也必须在参数中声明它，否者中间件会识别为一个常规中间件，不能处理错误

举个栗子：
```js
app.use((err,req,res,next)=>{
    console.error(err.stack)
    res.status(500).send('Something broke')
})
```
中间件返回的响应是随意的，可以响应一个 HTML 错误页面、一句简单的话、一个 JSON 字符串，或者其他任何您想要的东西。

所以你可能想要像处理常规中间件那样，定义多个错误处理中间件
,比如您想为使用 XHR 的请求定义一个，还想为没有使用的定义一个，那么：
```js
app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)
```
`logErrors` 将请求和错误信息写入标准错误输出、日志或者类似服务
```js
function logErrors(err,req,res,next){
    console.error(err.stack)
    next(err)
}
```
`clientErrorHandler` 定义如下(这里将错误直接传给了next)
```js
function clientErrorHandler(err,req,res,next){
    if(req.xhr){
        res.status(500).send({error:'Something blew up!'})
    }else{
        next(err)
    }
}
```

`errorHandler` 捕获所有错误
```js
function errorHandler(err,req,res,next){
    res.status(500)
    res.render('error',{error:err})
}
```
# 内置中间件
从版本4.x开始，Express不再依赖`Content`，除了 `express.static`, Express 以前内置的中间件现在已经全部单独作为模块安装使用

`express.static`是 Express 唯一内置的中间件。
它基于 `serve-static`，负责在 Express 应用中提托管静态资源。

可选`options`参数拥有如下属性

属性 | 描述 | 类型 | 缺省值 |
----|------|----- |  ---- |
dotfiles | 是否对外输出文件名以点（.）开头的文件。可选值为 “allow”、“deny” 和 “ignore”  | String |   "ignore" | 
etag | 是否启用etag生成  | Boolean  |  true |
extensions | 设置文件扩展名备份选项  | Array  | [ ] | 
index | 发送目录索引文件，设置为 false 禁用目录索引。  | mixed  | "index.html" |
lastModified|设置 Last-Modified 头为文件在操作系统上的最后修改日期|Boolean|true|
maxAge|毫秒或者其字符串格式设置 Cache-Control 头的 max-age 属性|Number|0|
redirect|当路径为目录时，重定向至"/"|Boolean|true|
setHeaders|设置HTTP头以提供文件的函数|Function| |
下面的栗子使用了 `express.static` 中间件，其中的 `options` 对象经过了精心的设计。
```js
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  }
}

app.use(express.static('public', options));
```
我们总是需要使用`express.static`指定多个静态资源文件，比如：
```js
app.use(express.static('public'))
app.use(express.static('files'))
```

# 第三方中间件
通过使用第三方中间件从而为Express应用增加更多的功能
安装所需功能的node模块，并在应用中加载，可以在应用级中加载，也可以在路由级中加载

举个栗子
```js
$ npm install cookie-parser
```
```js
var express = require('express')
var app = express()
var cookieParser = require('cookie-parser')

// 加载用于解析cookie的中间件
app.use(cookieParser())
```
[express部分第三方中间件](http://www.expressjs.com.cn/resources/middleware.html)


参考资料
- [expressjs.com](http://www.expressjs.com.cn/guide/using-middleware.html)
- [express框架-阮一峰老师](http://javascript.ruanyifeng.com/nodejs/express.html#toc6)






