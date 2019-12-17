---
title: Express4.x API (二)：Request (译) 
date: 2017-12-20 22:07:04
comments: true
cover: "https://cdn.jsdelivr.net/gh/okaychen/CDN@1.2/BlogSource/gallery/thumb_013.jpg"
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
<!-- more -->
# 写在前面
最近学习express想要系统的过一遍API，[www.expressjs.com](www.expressjs.com)是express英文官网(进入[www.epxressjs.com.cn](www.epxressjs.com.cn)发现也是只有前几句话是中文呀~~)，所以自己准备在express学习的过程也翻译一遍API，一是熟悉Express文档，二是锻炼自己英语阅读能力.

>原文地址：[express.com](http://www.expressjs.com.cn/4x/api.html#req)

# Request(请求)
`req`代表`http request`请求，具有请求查询字符串，参数，body，http头等等的性能。在本文件和惯例中，这个对象总是被简称为`req`(`http response`对象是`res`),但是它的实际名称取决于你正在工作的回调函数的参数

举个栗子：
```js
app.get('/user/:id/',function(req,res){
    res.send('user' + req.params.id);
})
```
当然你也可以这样：
```js
app.get('user/"id/',function(request,response){
    response.send('user ' + request.params.id);
})
```

## Properties
> 在express4.x中，`req.files`在默认情况下是不再可以被使用的，在`req.files`对象为了获得`upload files`，使用多个处理中间件,像 `busboy,formidable,multiparty,connect-multiparty`或者`pez`

### req.app
此属性持有对使用中间件的Express应用程序实例的引用

如果你按照所创建的一个模块，刚暴露一个中间件为了在你的主文件中使用它，然后中间件可以通过`req.app`访问Express实例

举个栗子：
```js
// index
app.get("/viewdirectory/",require("./mymiddleware.js"))
```
```js
// mymiddleware.js
module.exports = function(req,res){
    res.send('The views direction is " + req.app.get('views'));
}
```
### req.baseUrl
安装路由器的实例的URL路径

举个栗子：
```js
var greet = express.Router();
greet.get('/jp',function(req,res){
    console.log(req.baseUrl)  // greet
    res.send('Konichiwa!')
})

app.use('/greet',greet)  // load the router on '/greet'
```
即使使用路径模式或一组路径模式来加载路由器，`baseUrl`特性返回匹配字符串，而不是模式(s),

在下面这个路径中，`greet`路径加载两个路由路径
```js
app.use(['/gre+t','hel{2}o'],greet)   // load the router on '/gre+t' and '/hel{2}o'
```
当一个请求指向`/greet/jp`,`req.baseUrl`是'/greet'.当一个请求指向`/hello/jp`,`req.baseUrl`是`/hello`
`req.baseUrl`类似于`app.mountpath`,除了`app.mountpath`返回路径匹配的模式

### req.body
包含请求主体中提交数据的键值对.默认情况下，它是`undefined`,当时用`body-parsing`中间件例如`body-parser`和`multer`时被填充

下面这个栗子展示如何使用中间件来填充`req.body`
```js
var app = require('express')
var bodyParser = require('body-parser')
var multer = require('multer')

app.use(bodyParser.json());   // 解析 application/json
app.use(bodyParser.urlencoded({extended:true}));   // 解析 application/x-www-form-urlencoded
app.use(multer())  // 解析multipart/form-data

app.post('/',function(req,res){
    console.log(req.body)
    res.json(req.body)
})
```

### req.cookies
当使用cookie-parser中间件，此属性是包含请求发送的cookie对象.如果请求不包含cookie，它默认为`{}`
```js
// Cookie:name = tj
req.cookies.name  // =>"tj"
```

### req.fresh
指示是否这个请求是"fresh"，他是和`req.stale`相反的。这是真的如果`cache-control`请求头没有一个`no-cache`指令，下面一项都是正确的：
- 这个`if-modified-since`请求头是明确指定的，`last-modified`请求头等于或者更早于`modified`响应头
- `if-none-match`请求头是*
- `if-none-match`请求头，在解析到他的指令之后，不匹配`etag`的响应头

```js
req.fresh // => true
```

### req.hostname
包含主机`host` http header的主机名
```js
// HOST:“expample.com:3000”
req.hostname // => elample.com
```
### req.ip
请求的远程ip地址
如果信用代理`trust proxy`被设置为启用,它是`upstream`地址
```js
req.ip  // => 127.0.0.1
```

### req.ips
如果信用代理`trust proxy`被设置为启用,此属性在`X-Forwards-For`请求头包含指定的ip地址数组，否者他包含一个空数组.

### req.orignalUrl
>req.url不是express的本身的属性，它是从节点的http模块继承来的

这个属性和req.url非常相似，然而它保留起初的url请求,允许你自由的重req.url用于内部路由的目的。举个栗子，`app.use()`的'mounting'特性将会重写req.url的挂载点
```js
//  GET /serch?q=somting
req.orignalUrl //  => "/serch?q=somthing"
```

### req.params
一个包含映射到命名路由"参数"的属性对象。举个栗子,如果你有这样的路由`/user:name`,然后这个"name"属性可以被作为`req.params.name`。这个对象默认为{}
```js
// GTE /user/tj
req.parmas.name // => "tj" 
```
当你使用正则表达式作为路由定义时，捕获组（capture group）在数组中使用req.params[n],其中n是第n个捕获组，此规则应用于未命名通配符通配符匹配，比如`/file/*`
```js
// GET /file/javascripts/jquery.js
req.params[0]  // => "javascript/jquery.js"
```

### req.path
包含`request url`的部分路径

```js
// example.com/users?sort=decs
req.path  // => "/users"
```
>当从中间件调用时，挂载点不包含在`req.path`

### req.protocol
请求协议字符串,当使用TSL请求时：http或者https。当（trust proxy）信任代理设置信任（scokets address）套接字，这个'X-Forward-Proto'的header（http，https）领域值将会被信任
```js
req.protocol()  // => "http"
```

### req.query
包含路由中每个查询字符串参数的属性的对象，如果没有查询字符串，它是一个空对象{}
```js
// GET /serch?q=tobi+ferret
req.query.q  // "tobi ferret"

// GET /shoes?order=decs&shoe[color]=blue&shoe[type]=converse
req.query.order  // => "desc"

req.query.shoe.color  // => "blue"

req.query.shoe.type  // => "converse"
```

### req.route
当前匹配的路由，字符串

举个栗子：
```js
app.get('/user/:id?',functon userIdHandler(req,res){
    console.log(req.route);
    res.send('GET')
})    
```
示例上一段代码的输出：
```js
{
    path:'user/:id?',
    stack:
    [
        {
            handle:[Function:userIdHandler],
            name:'userIdHandler',
            params:undefind,
            path:undefind,
            keys:[],
            regexp:/^\/?$/i,
            method:'get'
        }
    ],
    methods:{get:true}
}
```

### req.secure
如果建立的TSL连接，则为真的布尔值，相当于
```js
'https' == req.protocol;
```

### req.signedCookies
当使用`cookie-parser`中间件时，此属性包含请求发送签署的cookie，为签名并以准备好使用，签署的cookie驻留在不同的对象中以显示开发人员的意图.否者，恶意攻击可以放置req.cookie值(这是容易欺骗的).注意签署cookie并不能使其隐藏或加密，当时简单的防止篡改（因为用于签署的secret是私有的）.如果没有发送签署的cookie，则默认为{}
```js
// Cookie: user=tobi.CP7AWaXDfAKIRfH49dQzKJx7sKzzSoPq7/AcBBRVwlI3
req.signedCookies.user  // => "tobi"
```

### req.stale
指示是否请求是`stable`,和它对应的是`req.fresh`
```js
req.stable  // true
```

### req.subdomains
请求的域名中的一组子域
```js
// HOST： 'tobi.ferrets.example.com'
req.subdomains  // => ["tobi","ferrets"] 
```

### req.xhr
如果请求的`X-Requsested-With`头域是`XMLHttpRequest`，布尔值为true.指示请求是由一个客户库（如jQuery）发出的
```js
req.xhr // => true
```

## Methods

### req.accepts(types)
检查指定的内容类型是否可接受，基于请求的`Accept`http字段.该方法返回最佳匹配,或者如果没有指定内容类型是可以接受的，返回`undefined`(在这种情况下，应用程序回应以406`Not Acceptable`)

类型值可以是单个MIME类型字符串（例如'application/json'）,一个扩展名例如'.json',逗号分割的列表或者是一个数组.对于列表和数组，该方法返回最佳匹配（如果有的话）
```js
// Accept : text/html
req.accepts('html')    // => "html"

// Accept : text/*,application/json
req.accepts('html')  // => "html"
req.accepts('text/html') // =>  'text/html'
req.accepts(['json','text']) // => 'json'
req.accepts('application/json') // => 'application/json'

// Accepts : text/*,application/json
req.accepts('image/png');
req.accepts('png')   // => undefined

// Accept: text/*;q=.5,application/json
req.accepts(['html','json']) // => json
```

### req.acceptsCharsets(charset[,...])
基于请求的`Accept-Charset`HTTP头字段，返回第一个接受指定字符集的字符集.如果指定的字符集都不接受，返回`false`

### req.acceptsEncodings(encoding[,...])
基于请求的`Accept-Encoding`http字段，返回第一个接受的指定编码.如果指定的编码是没有接受的，返回`false`

### req.acceptsLanguages[lang[,...]]
基于请求的`Accept-Language`http字段，返回指定语言的第一个已接受语言.如果没有指定的语言被接受，返回`fasle`

### req.get(field)
返回指定http请求头字段（大小写不敏感匹配），这个`Referrer`和`Referer`字段可以互换
```js
req.get('Content-Type'); // => 'text/plain'
req.get('content-type'); // => 'text/plain'
req.get('Something') // undefined
```
别名`req.header(field)`

### req.is(type)
如果传入的请求的HTTP头字段与type类型的参数指定的MIME类型匹配，返回true。否者返回false
```js
// when content-type:text/html;charset=utf-8
req.is('html')
req.is('text/html')
req.is('text/*')
// => true

// when content-type is application/json
req.is('json')
req.is('application/json')
req.is('application/*')
// => true

req.is('html')
// => false
```

### req.param(name,[,defaultValue])
> 过时的，使用`req.body,req.params,req.query`,如适用

返回参数名的值时
```js
// ?name=tobi
req.param('name')   // => 'tobi'

// POST name=tobi
req.param('name')  // => 'tobi'

// /user/tobi for /user/:name
req.param('name') // => 'tobi'
```
按以下顺序执行查找，
- req.params
- req.body
- req.query
 
> 直接访问req.params,req.body,req.query应该是被视为清晰可赞扬的-除非你真正接受每个对象的输入。`Body-parsing`必须被加载为了`req.param`正常的使用


# 写在后面
Express文档中Request部分就完成了，本人学识有限，难免有所纰漏，另外翻译仅仅是方便个人学习交流使用，无其他用意，原文地址：[expressjs.com](http://www.expressjs.com.cn/4x/api.html#req)