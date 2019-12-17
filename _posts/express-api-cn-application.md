---
title: Express4.x API (一)：application (译) 
date: 2017-12-24 17:48:41
cover: "https://cdn.jsdelivr.net/gh/okaychen/CDN@1.2/BlogSource/gallery/thumb_014.jpg"
comments: true
tags:
    - Node
    - Express
categories:
    - Node
---

# Express4.x API 译文 系列文章
- [Express4.x API (一)：application (译) -- 完成](http://www.cnblogs.com/okaychen/p/8108405.html)
- [Express4.x API (二)：request (译) -- 完成](http://www.cnblogs.com/okaychen/p/8081275.html)
- [Express4.x API (三)：Response (译) -- 完成](http://www.cnblogs.com/okaychen/p/8087425.html)
- [Express4.x API (四)：router (译) -- 完成](http://www.cnblogs.com/okaychen/p/8093717.html)

技术库更迭较快，很难使译文和官方的API保持同步，更何况更多的大神看英文和中文一样的流畅，不会花时间去翻译--，所以我们看到[express中文网](http://www.expressjs.com.cn)更多的还是英文，我们只有提升自己的英语能力才能更快的适应库的更新迭代,阅读到最新资料.
所以我此次翻译的目的，一是熟悉express文档，二是锻炼自己英语阅读能力；

>原文地址：[express.com](http://www.expressjs.com.cn/4x/api.html#res)
<!-- more -->
# Application
app对象是指一个Express应用程序，通过调用的顶层的express()函数创造它
```js
var express = require('express');
var app = express();

app.get('/',function(req,res){
    res.send('hello world')
});

app.listen(3000);
```
app对象有以下这些方法
- 路由HTTP请求；例如：app.METHOD和app.param
- 配置中间件；例如：app.router
- 渲染HTML视图；例如：app.render
- 注册模板引擎；例如：app.engine

他还具有影响应用程序行为的设置(属性)；获得更多的信息，见[Application settings](http://www.expressjs.com.cn/4x/api.html#app.settings.table)

## Properties
### app.locals
app.locals是一个JavaScript对象，它的属性是应用程序中的局部变量
```js
app.locals.title  // "My App"

app.locals.email  // "me@myapp.com"
```
一旦设置，`app.locals`属性的值将会贯穿整个生命周期。对比`res.locals`属性的特性，`res.locals`仅适用于请求的生命周期

你可以访问应用程序中呈现的模板中的本地变量，这对于想模板提供协助函数以及`app-level`非常有用。但是请注意，您不能访问中间件的局部变量
```js
app.locals.title = "My App";
app.locals.strftime = require('strftime');
app.locals.email = 'me@myapp.com';
```

### app.mountpath
app.mountpath属性是路径模式的子应用程序安装
>子应用程序是一个Express实例，可以用于处理对路由的请求
```js
var express = require('express');

var app = express();  // 主要的应用程序
var admin = express();  // 子应用程序

admin.get('/'，function(req,res){
    console.log(admin.mountpath)  // admin
    res.send('Admin Homepage');
})

app.use('/admin',admin) // 挂载子应用程序
```
这类似于req对象中的`baseUrl`属性，除了`baseUrl`返回匹配的URL路径，而不是匹配的模式(s).

如果子应用程序挂载在多个路径模式上，`app.mountpath`返回它挂载的模式列表，像下面所展示的例子这样：
```js
var admin = express();

admin.get('/',function(req,res){
    console.log(admin.mountpath)   // [ '/adm*n','/manager' ]
    res.send('Admin Homepage');
});

var secret = express();
secret.get('/',function(req,res){
    console.log(secret.mountpath); //secr*t
    res.send('Admin Secret');
});

admin.use('/secr*t', secret); 
app.use(['/adm*n', '/manager'], admin);
```

## Events
### app.on('mount',callback(parent))
当子程序被挂载到父程序时，mount事件被发射。父程序对象作为参数，传递给回调方法。
```js
var admin = express();

admin.on('mount',function(parent){
    console.log('Admin Mount');
    console.log(parent);   // 指父应用程序
})

admin.get('/',function(req,res){
    res.send('Admin homePage');
});

app.use('/admin',admin);
```

## Methods
### app.all(path,callback[,callback ...])
app.all方法和标准的app.METHOD()方法类似，除了它匹配所有的HTTP动词。对于给一个特殊前缀映射一个全局的逻辑处理，或者无条件匹配，它是很有效的。例如，如果你把下面内容放在所有其他的路由定义的前面，它要求所有从这个点开始的路由需要认证和自动加载一个用户。这些回调并不一定是终点：`loadUser`可以在完成了上一个任务后，调用`next()`来继续匹配随后的路由。
```js
app.all('*',requireAuthentication,loadUser)
```
或者这种相等的形式：
```js
app.all('*',requireAuthentication);
app.all('*',loadUser)
```

另一个例子是全局白名单的方法（white-listed “global” functionality）。这个例子和前面很像，然而它只是限制以/api开头的路径。
```
app.all('/api/*',requireAuthentication);
```

### app.delete(path, callback [, callback ...])
路由HTTP DELETE请求到有特殊回调方法的特殊的路径。获取更多的信息，可以查阅[routing guide](http://www.expressjs.com.cn/guide/routing.html)

你可以提供多个回调函数，他们的作用和中间件一样，除了这些回调可以通过调用next('router')来绕过剩余的路由回调。你可以使用这个机制来为一个路由设置一些前提条件，如果不能满足当前路由的处理条件，那么你可以传递控制到随后的路由。
```js
app.delete('/',function(req,res){
    res.send('DELETE request to homepage');
})
```
### app.disable(name)
将设置名为name的值为false，此处的name是[app settings table](http://www.expressjs.com.cn/4x/api.html#app.settings.table)中各属性的一个。调用app.set('foo',false)和app.disable('foo')是等价的
```js
app.disable('trust proxy');
app.get('trust proxy');   // false
```
### app.disabled(name)
如果`name`被禁用则返回true，此处的name是[app settings table](http://www.expressjs.com.cn/4x/api.html#app.settings.table)中各属性的一个
```js
app.disabled('trust proxy');  // true
app.enable('trust proxy');
app.disabled('trust proxy');  // false
```

### app.enable(name)
设置布尔类型的设置值name为true，此处的name是[app settings table](http://www.expressjs.com.cn/4x/api.html#app.settings.table)中各属性的一个。调用app.set('foo', true)和调用app.enable('foo')是等价的。
```js
app.enable('trust proxy');
app.get('trust proxy')  // true
```
### app.enabled(name)
如果`name`可用则返回true，此处的name是[app settings table](http://www.expressjs.com.cn/4x/api.html#app.settings.table)中各属性的一个。
```js
app.enabled('trust proxy')   // false
app.enable('trust proxy')   
app.enabled('trust proxy')   // true
```

### app.engine(ext,callback)
注册给定引擎的回调，用来渲染ext文件。默认情况下，Express需要使用require()来加载基于文件扩展的引擎。例如，如果你尝试渲染一个`foo.jade`文件，Express在内部调用下面内容，同时缓存`require()`结果供随后来调用去提高性能
```js
app.engine('jade',require('jade').__express);
```
使用下面这种方法，来处理没有办法开箱即用的.express方法的模板，或者你希望使用不同的扩展名。

举个栗子，使用ejs模板引擎来渲染.html文件：
```js
app.engine('html',require('ejs').renderFile);
```

在这个例子中，ejs提供了一个`.renderFile`方法，这个方法满足了Express规定的签名规则：(path, options, callback)，然而记住在内部它只是`ejs.__express`的一个别名，所以你可以在不做任何事的情况下直接使用.ejs扩展。一些模板引擎没有遵循这种规范，`consolidate.js`库映射模板引擎以下面的使用方式，所以他们可以无缝的和Express工作。
```js
var engines = require('consolidate');
app.engine('haml',engines.haml);
app.engine('html',engines.hogan);
```

### app.get(name)
获得设置名为name的app设置的值，此处的name是[app settings table](http://www.expressjs.com.cn/4x/api.html#app.settings.table)中各属性的一个。 如下：
```js
app.get('title');  // => undefined
app.set('title','My site');
app.get('title')  // 'My site'
```

### app.get(path, callback [, callback ...])
使用指定的回调函数将HTTP请求路由到指定的路径。获取跟多的信息，可以查阅[routing guide](http://expressjs.com/guide/routing.html)。你可以提供多个回调函数，他们的内容和中间件一样，除了这些回调可以通过调用next('router')来绕过剩余的路由回调。你可以使用这个机制来为一个路由设置一些前提条件，如果请求没能满足当前路由的处理条件，那么传递控制到随后的路由。
```
app.get('/',function(req,res){
    res.send('GET request to homepage')
})
```

### app.listen(port, [hostname], [backlog], [callback])
绑定程序监听端口到指定的`主机`和`端口号`。这个方法和Node中的[http.Server.listen()](http://nodejs.org/api/http.html#http_server_listen_port_hostname_backlog_callback)是一样的
```js
var express = require('express')
var app = express();
app.listen(3000);
```
通过调用express()返回得到的app实际上是一个JavaScript的Function，被设计用来作为一个回调传递给`NODE HTTP servers`来处理请求。这样，其就可以很简单的基于同一份代码提供的http和https版本，所以app没有从这些继承（它只是一个简单的回调）。
```js
var express = require('express');
var https = require('https');
var  http = require('http');

http.createServer(app).listen(80);
http.createServer(options,app).listen(443)
```
app.listen()方法是下面所示的一个便捷的方法（只针对HTTP协议）：
```js
app.listen = function(){
    var server = http.createServer(this);
    return server.listen.apply(server, arguments);
}
```

### app.METHOD(path,callback [,callback ...])
路由HTTP请求，METHOD是这个请求的HTTP方法，比如GET,POST,PUT等等，小写。所以，实际方法是app.get,app.post,app.put等等，下面有关于方法完整的表。

获取更多信息，请看[routing guide](http://expressjs.com/guide/routing.html)。 Express支持下面的路由方法，对应与同名的HTTP方法：

具体见[app.METHOD](http://www.expressjs.com.cn/4x/api.html#app.METHOD)

>如果使用上述方法时，导致了无效的JavaScript变量名，可以使用中括号，比如：app['m-search']('/', function ....

你可以提供多个回调函数，它们的行为和中间件一样，除了这些回调可以通过调用next('router')来绕过剩余的路由回调。你可以使用这个机制来为一个路由设置一些前提条件，如果请求没有满足当前路由的处理条件，那么传递控制到随后的路由。（我的话："！这一段看了好几遍啦- -，理解next传递非常重要性"）

>本API文档把使用比较多的HTTP方法app.get()，app.post，app.put()，app.delete()作为一个个单独的项进行说明。然而，其他上述列出的方法以完全相同的方式工作。

有一种特殊的路由方法，`app.all()`，这不是来自任何HTTP方法。他在所有请求方法的路径上加载中间件，其对于所有的方法都有效

### app.param([name],callback)
给路由参数添加回调触发器，这里的name是参数名或者参数数组，function是回调方法。回调方法的参数按序是请求对象，响应对象，下个中间件，参数值和参数名。 如果name是数组，会按照各个参数在数组中被声明的顺序将回调触发器注册下来。还有，对于除了最后一个参数的其他参数，在他们的回调中调用next()来调用下个声明参数的回调。只有一个参数，那么就是最后一个参数，和数组中最后一个参数是一样的。 例如，当:user出现在路由路径中，你可以映射用户加载的逻辑处理来自动提供req.user给这个路由，或者对输入的参数进行验证。
```js
app.param('user'.function(req,res,next,id){

    // 尝试从用户模型获取用户详细信息并将其附加到请求对象
    User.find(id,function(err,user){
        if(err){
            next(err);
        }else if(user){
            req.user = user;
            next();
        }else{
            next(new Error('fail to load user'))
        }
    })
})
```
对于Param的回调定义的路由来说，他们是局部的。它们不会被挂载的app或者路由继承。所以，定义在app上的Param回调只有是在app上的路由具有这个路由参数时才起作用。

在定义param的路由上，param回调都是第一个被调用的，它们在一个请求-响应循环中都会被调用一次并且只有一次，即使多个路由都匹配，如下面的栗子：
```js
app.param('id',function(req,res,next,id){
    console.log('CALLED ONLY NOCE');
    next();
})

app.get('/user/:id',function(req,res,next){
    console.log('although this match');
    next();
})

app.get('/user/:id',function(req,res){
    console.log('and this matches too');
    res.end();
})
```
当GET/user/42,得到下面结果
```js
 CALLED ONLY NOCE
 although this matches
 and this matches too
```
```js
app.param(['id','page'],function(req,res,next,value){
    console.log('CALLED ONLY ONCE with',value);
    next();
})

app.get('/user/:id/:page',function(){
    console.log('although this matches');
    next();
})

app.get('/user/:id/:page',function(){
    console.log('and this matchs too');
    res.end();
})
```
当执行GET /user/42/3，结果如下：
```js
CALLED ONLY ONCE with 42
CALLED ONLY ONCE with 3
although this matches
and this mathes too
```

>下面章节描述的app.param(callback)在v4.11.0之后被弃用。

通过只传递一个回调参数给app.param(name, callback)方法，app.param(naem, callback)方法的行为将被完全改变。这个回调参数是关于app.param(name, callback)该具有怎样的行为的一个自定义方法，这个方法必须接受两个参数并且返回一个中间件。 这个回调的第一个参数就是需要捕获的url的参数名，第二个参数可以是任一的JavaScript对象，其可能在实现返回一个中间件时被使用。 这个回调方法返回的中间件决定了当URL中包含这个参数时所采取的行为。 

在下面的例子中，app.param(name, callback)参数签名被修改成了app.param(name, accessId)。替换接受一个参数名和回调，app.param()现在接受一个参数名和一个数字。
```js
var express = require('express');
var app = express();

// 自定义app.param()的行为
app.param(function(param,option){
    return function(req,res,next,val){
        if(val == option){
            next();
        }else{
            res.sendStatus(403);
        }
    }
})

// 使用定制的app.param()
app.param('id',1337);

// 触发捕获的路由
app.get('/user/:id', function (req, res) {
  res.send('OK');
})

app.listen(3000,function(){
    console.log('Ready');
})
```

```js
app.param(function(param,validator){
    return function(req,res,next,val){
        if(validator(val)){
            next();
        }else{
            res.sendStatus(403);
        }
    }
})

app.param('id',function(candidate){
    return !isNaN(parseFloat(candidate)) && isFinite(candidate);
})
```

>在使用正则表达式，不要使用.。例如，你不能使用/user-.+/来捕获user-gami，用使用[\\s\\S]或者[\\w\\>W]来代替(正如/user-[\\s\\S]+/)。
```js
//captures '1-a_6' but not '543-azser-sder'
router.get('/[0-9]+-[[\\w]]*', function); 
//captures '1-a_6' and '543-az(ser"-sder' but not '5-a s'
router.get('/[0-9]+-[[\\S]]*', function); 
//captures all (equivalent to '.*')
router.get('[[\\s\\S]]*', function); 
```

### app.path()
返回应用程序的规范路径（字符串）
```
var app = express()
  , blog = express()
  , blogAdmin = express();

app.use('/blog', blog);
blog.use('/admin', blogAdmin);

console.log(app.path()); // ''
console.log(blog.path()); // '/blog'
console.log(blogAdmin.path()); // '/blog/admin'
```
如果app挂载很复杂下，那么这个方法的行为也会很复杂：一种更好用的方式是使用`req.baseUrl`来获得这个app的典型路径。

### app.post(path, callback, [callback ...])
使用指定的回调函数将HTTP POST请求路由到指定的路径。有关更多信息，请参见[routing guide](http://www.expressjs.com.cn/guide/routing.html)。

你可以提供多个回调函数，它们的行为和中间件一样，除了这些回调可以通过调用next('router')来绕过剩余的路由回调。你可以使用这个机制来为一个路由设置一些前提条件，如果请求没能满足当前路由的处理条件，那么传递控制到随后的路由
```js
app.post('/', function (req, res) {
  res.send('POST request to homepage');
});
```

### app.put(path, callback [, callback ...])
使用指定的回调函数将HTTP PUT请求路由到指定的路径。有关更多信息，请参见[routing guide](http://www.expressjs.com.cn/guide/routing.html)。

你可以提供多个回调函数，它们的行为和中间件一样，除了这些回调可以通过调用next('router')来绕过剩余的路由回调。你可以使用这个机制来为一个路由设置一些前提条件，如果请求没能满足当前路由的处理条件，那么传递控制到随后的路由
```js
app.put('/', function(req, res) {
    res.send('PUT request to homepage');
});
```

### app.render(view, [locals], callback)
通过回调函数返回视图的呈现HTML,它可以接受一个可选的参数，可选参数包含了这个view需要用到的本地数据。这个方法类似于res.render()，除了它不能把渲染得到的HTML文本发送给客户端。

> 将app.render()当作是可以生成渲染视图字符串的工具方法。在res.render()内部，就是使用的app.render()来渲染视图。

>如果使能了视图缓存，那么本地变量缓存就会保留。如果你想在开发的过程中缓存视图，设置它为true。在生产环境中，视图缓存默认是打开的。

```js
app.render('email', function(err, html){
  // ...
});

app.render('email', { name: 'Tobi' }, function(err, html){
  // ...
});
```

### app.route(path)
返回一个单例模式的路由的实例，之后你可以在其上施加各种HTTP动作的中间件。使用app.route()来避免重复路由名字
```js
var app = express();

app.route('/events')
.all(function(req, res, next) {
  // runs for all HTTP verbs first
  // think of it as route specific middleware!
})
.get(function(req, res, next) {
  res.json(...);
})
.post(function(req, res, next) {
  // maybe add a new event...
})
```

### app.set(name, value)
给 name 设置项赋 value 值，name 是 [Application settings](http://www.runoob.com/w3cnote/express-4-x-api.html#app.settings.table) 中属性的一项。 

对于一个类型是布尔型的属性调用app.set('foo', ture)等价于调用app.enable('foo')。同样的，调用app.set('foo', false)等价于调用app.disable('foo')。

可以使用app.get()来取得设置的值：
```js
app.set('title', 'My Site');
app.get('title'); // 'My Site'
```
#### Application Settings
如果name是程序设置之一，它将影响到程序的行为。下边列出了程序中的设置。
见 [app.set](http://www.expressjs.com.cn/4x/api.html#app.set)

### app.use([path,] function [, function...])
挂载中间件方法到路径上。如果路径未指定，那么默认为"/"。

>一个路由将匹配任何路径如果这个路径以这个路由设置路径后紧跟着"/"。比如：app.use('/appale', ...)将匹配"/apple"，"/apple/images"，"/apple/images/news"等。

>中间件中的req.originalUrl是req.baseUrl和req.path的组合，如下面的例子所示。
```js
app.use('/admin', function(req, res, next) {
  // GET 'http://www.example.com/admin/new'
  console.log(req.originalUrl); // '/admin/new'
  console.log(req.baseUrl); // '/admin'
  console.log(req.path); // '/new'
  next();
});
```

在一个路径上挂载一个中间件之后，每当请求的路径的前缀部分匹配了这个路由路径，那么这个中间件就会被执行。 由于默认的路径为/，中间件挂载没有指定路径，那么对于每个请求，这个中间件都会被执行
```js
 // 此中间件将不允许请求超出它的范围。
app.use(function(req, res, next) {
    console.log('Time: %d', Date.now());
    next();
});
```
路径(path)可以是表示路径的字符串、路径模式、匹配路径的正则表达式或其组合数组

下面是中间件的简单示例：

具体见[app.use](http://www.expressjs.com.cn/4x/api.html#app.use)

下面是一些例子，在Express程序中使用express.static中间件。
为程序托管位于程序目录下的public目录下的静态资源：
```js
// GET /style.css etc
app.use(express.static(__dirname + '/public'));
```
在/static路径下挂载中间件来提供静态资源托管服务，只当请求是以/static为前缀的时候。
```js
// GET /static/style.css etc.
app.use('/static', express.static(express.__dirname + '/public'));
```
通过在设置静态资源中间件之后加载日志中间件来关闭静态资源请求的日志。
```js
app.use(express.static(__dirname + '/public'));
app.use(logger());
```
托管静态资源从不同的路径，但./public路径比其他更容易被匹配：
```js
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/files'));
app.use(express.static(__dirname + '/uploads'));
```

# 写在后面
Express文档核心的四大部分app，request，response，router，到此已经完成。简单的总结

1. 通过调用express()返回得到的app实际上是一个JavaScript的Function，它是一个Express的应用实例；app对象具有HTTP请求，配置中间件，渲染HTML视图，注册模板引擎这四大功能。它还有一些属性设置，这些属性可以改变程序的行为

2. request对象即表示HTTP请求，包含了请求查询字符串，参数，内容，HTTP头等属性

3. response对象则表示HTTP响应，即在受到请求时向客户端发送的HTTP响应数据

4. 每个Express程序有一个内建的app路由，顶层的express对象有一个Router()方法，你可以使用Router()来创建一个新的router对象，你可以把它当做一个`mini-application`，它具有操作路由和中间件的能力，有些方法和app类同

到此`Express4.x API 译文 系列文章`已经完成。
本人学识有限，难免有所纰漏或者理解不当之处，翻译仅仅是方便个人学习交流使用，无其他用意（如果有不妥之处，请联系本人删除），原文地址：[expressjs.com](http://www.expressjs.com.cn/4x/api.html#res)

