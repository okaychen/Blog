---
title: Express4.x API (四)：Router (译) 
date: 2017-12-23 12:17:42
comments: true
tags:
    - node
    - express
categories:
    - Node
---

# Express4.x API 译文 系列文章
- [Express4.x API (一)：application (译) -- 完成](http://www.cnblogs.com/okaychen/p/8108405.html)
- [Express4.x API (二)：request (译) -- 完成](http://www.cnblogs.com/okaychen/p/8081275.html)
- [Express4.x API (三)：Response (译) -- 完成](http://www.cnblogs.com/okaychen/p/8087425.html)
- [Express4.x API (四)：router (译) -- 完成](http://www.cnblogs.com/okaychen/p/8093717.html)
<!-- more -->
已经完成了Express4.x API中的Requst和Response对象的文档翻译。简单的总结，request对象即表示HTTP请求，包含了请求查询字符串，参数，内容，HTTP头等属性；response对象则表示HTTP响应，即在受到请求时向客户端发送的HTTP响应数据。Express则基于此提供给我们一些方法，完成指定的请求和响应。

技术库更迭较快，很难使译文和官方的API保持同步，我们只有提升自己的英语能力才能更快的适应库的更新迭代,阅读到最新资料。
所以我此次翻译的目的，一是熟悉express文档，二是锻炼自己英语阅读能力；

>原文地址：[express.com](http://www.expressjs.com.cn/4x/api.html#res)

# Router
`router`对象是中间件和路由的隔离实例，你可以把它看做一个仅能执行中间件和路由功能的`mini-applaction`，每一个Express应用程序实例都有一个内置的路由器

路由器的行为类似于中间件本身，所以你可以把他作为一个参数传递给`app.use()`或者作为参数传递给另一个路由器的`use()`方法

`top-level` express 对象有一个Router()创建一个新的路由器对象

## Properties
### Router([options])

创建一个新的路由器对象
```
var router = express.Router([options]);
```

可选择的options参数指定路由器的行为
|Property|Description|Default|Availability|
|---|---|---|---|
|caseSensitive|是否启用大小写敏感|默认情况下不敏感，以相同的方式对待"/Foo","/foo"| |
|mergeParams|从父路由器保存`req.params`值，如果子父有冲突的参数名称，以子路由参数优先|false|4.5.0+|
|strict|启用严格路由|默认情况下是禁用的，"/foo"和"/foo/"是相同的| |

你可以像应用程序那样添加中间件和HTTP方法路由（例如get，put，post等等）
```js
// 调用传递给次路由的任何请求
router.use(function(req,res,next){
    // 一些逻辑，和其他中间件一样
    next();
})

// 将会处理任何以/events结束的请求
router.get('/events',function(req,res,next){
    // ..
})
```

然后你可以为你特定的URL使用路由器，用这种方式把你的routes分为文件甚至是`mini-apps`
```js
app.use('/calendar',router);
```

## Methods

### routers.all(path,[callback,...] callback)
这个方法就像`router.METHHOD()`,除了他匹配所有的HTTP方法

这个方法对于映射特定路径前缀或任意匹配的"全局"逻辑非常有用。举个栗子，如果你将以下路由置于所有路由的最前面，它要求从该点的所有路由都需要身份认证，并自动加载user。记住这些回调函数不必作为终点，`loadUser`可以执行任务，然后通过`next()`传递继续匹配给后续的路由
```js
router.all('*',requireAuthentication,loadUser);
```
等价于
```js
router.all('*',requireAuthentication)
router.all('*',loadUser)
```
另一个例子是` white-listed `"global"功能，这里的例子非常的相似，但是它只限制路径的前缀"/api"
```js
router.all('/api/*',requireAuthentication);
```

### router.METHOD(path,[callback,...] callback)
`router.METHOD()`方法在Express中提供路由功能，其中METHOD是HTTP方法之一，例如GET，POST，PUT等等，当然你可以小写。所以实际的方法是`router.get()`，`router.post()`，`router.put()`等等

>`router.get()`函数将会自动的调用HTTP HEAD方法，除了`router.head()`在`router.get()`之前要求没有走这条路 

你可以提供多个回调，每个回调都被平等对待，表现的就像中间件，除了这些回调函数可以调用`next(route)`绕过其余路由回调。您可以使用此机制在路由上执行预条件，然后在没有理由继续匹配路由的情况下将控制传递给后续路由。

下面片段展示了最简单的路由定义，Express将字符串转化为正则表达式，在内部用于匹配传入请求。执行这些匹配时不考虑查询字符串，例如'GET'将匹配下面路由，像`GET/?name='tobi'`
```js
router.get('/',function(req,res){
    res.send('hello world')
})
```
如果你有非常具体的约束条件，还可以使用正则表达式。举个栗子下面将会匹配"GET /commits/71dbb9c"以及 "GET /commits/71dbb9c..4c084f9".
```js
router.get(/^\/commits\/(\w+)(?:\.\.(\w+))?$/,function(req,res){
    var from = req.params[0];
    var to = req.params[1] || 'HEAD';
    res.send('commit range' + form + '..' + to);
})
```

### router.param(name, callback)
添加回调触发到路由参数中，name是参数的名称，callback是回调函数。虽然name在技术上是可选的，但是从Express v4.11.0没有它是不推荐使用这种方法的（如下）

- req，请求对象
- res，响应对象
- next，指示下一个中间件的功能
- name参数的值
- 参数的名称

>不像`app.param()`,`router.param()`不接受数组参数

举个栗子，当`:user`在路由路径中存在时，可以将用户加载映射为自动提供`req.user`给这个路由，或者执行验证的参数输入
```js
router.param('user',function(req,res,next,id){
    //尝试从用户模型获取用户详细信息并将其附加到请求对象
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
该回调方法是在本地路由器上定义他们，它们不是由加载的应用程序或路由器继承的。因此，定义在路由上的参数回调只有通过`router`定义的路由参数才会触发

一个回调参数将被称为一次请求响应周期，即使参数在多个路径中匹配，如下面的栗子所示：
```js
router.param('id',function(req,res,next,id){
    console.log('CALLED ONLY ONCE');
    next();
})

router.get('/user/:id',function(req,res,next){
    console.log('although this matchs ');
    next();
})

router.get('/user/:id',function(req,res){
    console.log('and this matchs too ');
    res.end();
})
```
将会依次打印：
```js
CAALED ONLY ONCE
although this matchs
and this matchs too
```

>以下部分描述`router.param(callback)`在v4.11.0将是过时的

`router.param(name,callback)`方法的行为通过仅传递一个函数到`router.param()`将会完全改变。此功能是如何实现`router.param(name,callback)`的习惯-它接受两个参数，必须返回一个中间件

函数返回的中间件决定了URL参数被捕获时发生的行为

在下面这个例子中，`router.param(name,callback)`签名被修改为`router.param(name, accessId)`。`router.param()将会接受一个`name`和一个`number`而不是一个`name`和一个`回调函数`

```js
var express = require('express');
var app = express();
var router = express.Router();

// 定制 `router.param()`的功能
router.param(function(param,option){
    return function(req,res,next,val){
        if(val == option){
            next();
        }else{
            res.sendStatus(403);
        }
    }
})

// 使用定制的`router.param()`
router.param('id',1337);

// 触发捕获的路由
router.get('/user/:id',function(req,res){
    res.send('OK')
})

app.use(router);

app.listen(3000,function(){
    console.log('Ready');
})
```

在这个栗子中，`router.param(name,callback)`签名是相同的，但不是一个中间件回调，一个自定义检查函数定义了验证用户ID
```js

router.param(function(param,validator){
    return function(req,res,next,val){
        if(validator(val)){
            next();
        }else{
            res.sendStatus(403)
        }
    }
})

router.param('id',function(candidate){
    return !isNaN(parseFloat(candidate)) && isFinite(candidate)
})
```

### router.route(path)
返回单个路由的实例，您可以使用可选中间件来处理HTTP verbs，使用`router.route()`为了避免重复路由命名，从而键入错误。

在上面`router.param()`栗子的基础上，下面的栗子展示了如何使用`router.route()`指定HTTP处理方法
```js
var router = express.Router();

router.param('user_id',function(req,res,next,id){
    // 示例用户，可能实际将从db等获取
    req.user = {
        id:id,
        name:'TJ'
    };
    next();
})

router.route('/users/:user_id')
.all(function(req,res,next){
    // ..
    next()
})
.get(function(req,res,next){
    res.json(req.user)
})
.put(function(req,res){
    req.user.name = req.params.name;
    // 保存用户等
    res.json(req.user) 
})
.post(function(req,res,next){
    next(new Error('not implemented'));
})
.delete(function(req,res,next){
    next(new Error('not implemented'))
});
```
这个方法再利用单一`/users/:user_id`路径并且为各种HTTP方法添加处理程序

### router.use([path], [function, ...] function)
使用指定中间件函数或者函数，可选的参数是挂载路径，默认是"/"

这个方法类似于`app.use()`。下面展示了一个简单的示例和用例：

中间件就像是管道，请求在第一个中间件函数定义时开始，并为它们"向下"匹配每一条路径处理中间件堆栈处理。
```js
var express = require('express');
var app = express();
var router = express.Router();

router.use(function(req,res){
    console.log('%s %s %s',req.method,req.url,req.path);
    next();
})

// 下面只有当路径从挂载点开始时，才会调用这个函数
router.use('/bar',function(req,res,next){
    // ..
    next();
})

// 总是调用
router.use(function(req,res,next){
    res.send('Hello world')
});

app.use('/foo',router);

app.listen(3000);
```
“挂载”路径被剥离并且对中间件功能不可见。这个功能的主要作用是：不管它的"prefix前缀"路径，安装中间件功能可能没有代码的变化

为了保证您使用`router.use()`定义的中间件的重要性。他们按顺序调用，因此顺序定义中间件优先级。举个栗子：通常`logger`是您将使用的第一个中间件，因此每个请求都会被记录
```js
var logger = require('morgan');

router.user(logger());
router.use(express.static(__dirname+'/public'));
router.use(function(req,res){
    res.send('hello')
})
```
现在假设您忽略了对静态文件的日志请求,但是在`logger()`之后要继续记录路由和中间件定义。你只需简单的移动`express.static()`到顶部，在添加日志中间件之前即可。
```js
router.use(express.static(__dirname + '/public'));
router.use(logger());
router.use(function(req,res){
    res.send('Hello')
})
```
另一个例子是从多个目录中服务文件，给予"/public"优先
```js
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/files'));
app.use(express.static(__dirname + '/uploads'));
```
`router.use()`方法也支持命名参数，这样，其他路由器的挂载点可以通过使用命名参数预加载来获益。

>NOTE:虽然这些中间件功能是通过特定路由器添加的,当他们运行时由他们连接到的路径来定义(而不是路由)。因此，如果路由器的路由匹配，则通过一个路由器添加的中间件可以运行其他路由器。举个栗子，下面显示安装在同一路径上的两个不同的路由器：
```js
var autoRouter = express.Router();
var openRouter = express.Router();

autoRouter.use(require('./authenticate').basic(usersdb));

autoRouter.get('/:user_id/edit',function(req,res,next){
    // .. 编辑用户界面 .. 
})
openRouter.get('/',function(req,res,next){
    // .. 用户列表 ..
})
openRouter.get('/:user_id',function(req,res,next){
    // .. 查看用户 .. 
})

app.use('/users',authRouter);
app.use('/users',openRouter);
```
尽管`authenticate`中间件是通过`autoRouter`路由加入的,但是它也将运行在openRouter定义的路由上，因为两个路由器都挂载在`/users`。为了避免这种行为发生，为每个路由器使用不同的路径。

# 写在后面
Express文档中Router部分就完成了，本人学识有限，难免有所纰漏或者理解不当之处，翻译仅仅是方便个人学习交流使用，无其他用意，原文地址：[expressjs.com](http://www.expressjs.com.cn/4x/api.html#res)


