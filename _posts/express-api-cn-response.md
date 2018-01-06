---
title: Express4.x API (三)：Response (译) 
date: 2017-12-21 20:32:44
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

技术库更迭较快，很难使译文和官方的API保持同步，更何况更多的大神看英文和中文一样的流畅，不会花时间去翻译--，所以我们看到[express中文网](http://www.expressjs.com.cn)更多的还是英文，我们只有提升自己的英语能力才能更快的适应库的更新迭代,阅读到最新资料.
所以我此次翻译的目的，一是熟悉express文档，二是锻炼自己英语阅读能力；

>原文地址：[express.com](http://www.expressjs.com.cn/4x/api.html#res)

# Response
`res`对象表示一个Express应用程序在收到HTTP请求时发送的HTTP响应(response)

在这篇文档和惯例中，HTTP响应这个对象总是被称为`res`(HTTP请求则是req)，但是它的实际名称取决于您正在工作的回调函数的参数.

举个栗子：
```js
app.get('/user/:id',function(req,res){
    res.send('user' + req.params.id)
})
```
当然你也可以这样：
```js
app.get('/user/:id',function(request,response){
    response.send('user' + request.params.id)
})
```
## Properties
### res.app
此属性持有对使用中间件Express应用实例的引用

`res.app`和在request对象中的`req.app`属性是完全相同的
### res.headersSent
布尔属性，表示这个app是否发送了HTTP头进行响应
```js
app.get('/',function(req,res){
    console.log(res.headersSend);  // false
    res.send('ok');
    console.log(res.headersSend); // true
})
```
### res.locals
一个对象包含局部变量作用域的请求的响应，因此只能用于在request/response周期中呈现的视图(如果有的话)。否者，此属性与app.locals是相同的

此属性用于公开`request-level`信息，例如请求的路径名(path name)，经过身份认证的用户(authenticated user),用户设置(user setting)等等
```js
app.use(function(req,res,next){
    res.locals.user = req.user;
    req.locals.authenticated = !req.user.anonymous;
    next();
})
```
## Methods
### res.append(field[,value])
>res.append在Expressv4.11.0+是支持的

将指定的值到http响应头字段.如果header还没有被设置，它创建具有指定值的头文件，`value`参数可以是字符串或数组

如果`res.set()`在`res.append()`之后的话将会重置以前设置的header头

```js
res.append('Link',['<http://localhost/>','<http://localhost:3000/>'])
res.append('Set-Cookie','foo=bar;path=/;HttpOnly')
res.append('Warning','199 Miscellaneous warning')
```

### res.attachment([filename])
使用`attchment`设置HTTP响应`Content-Dispositon`头字段.如果给了一个文件名`filename`，然后基于扩展名通过`res.type()`设置`Content-Type`,并设置`Content-Disposition`"fliename="参数
```js
res.attachment();
// Content-Disposition:attachment

res.attachment('path/to/logo.png');
// Content-Disposition:attachment;filename='logo.png'
// Content-Type:image/png
```

### res.cookie(name,value[,options])
给cookie名称设置值，`value`参数可以是一个字符串或者是对象转化为JSON，options参数可以是具有以下属性的对象

|Property|Type|Description|
|---|---|----|
|domain|String|cookie的域名，默认应用程序的域名|
|expires|Date|格林尼治时间内cookie的到期日期，如果没有指明或设置为0，创建会话cookie|
|httpOnly|Boolean|标志cookie只能由web服务器访问|
|maxAge|String|在毫秒内设置相对于当前时间的方便选项|
|path|String|cookie的路径，默认为'/'|
|secure|Boolean|标记只于https一起使用的cookie|
|signed|Boolean|指示cookie是否被签署|

>提供带有选项设置的HTTP `Set-Cookie``res.cookie`起作用，未指定的任何选项默认值为[RFC 6265](http://tools.ietf.org/html/rfc6265)

举个栗子：
```js
res.cookie('name','tobi',{domain:'example.com',path:'/admin',secure:true});
res.cookie('rememberme','1',{expires:'new Dtae(Date.now() + 900000),httpOnly：true'})
```
`maxAge`选项是以当前时间为起点以毫秒为单位设置`expires`的便捷选项，下面这个栗子相当于上面例子中的第二个
```js
res.cookie('rememberme','1',{maxAge:900000,httpOnly:true})
```

你可以传递一个对象给`value`参数,然后通过`bodyparser`中间件将其序列化为JSON
```js
res.cookie('cart',{items:[1,2,3]})
res.cookie('cart',{items:[1,2,3]},{maxAge:900000})
```
当使用`cookie-parser`中间件时，此方法还支持签署cookie，只需要设置`signed`选项为true。然后`res.cookie()`将会秘密的传递给`cookieParser(secret)`去签署这个值
```js
res.cookie('name','tobi',{signed:true})
```
然后你可以通过`req.signedCookie()`访问此值

### res.clearCookie(name,[,options])
通过cookie名称清除指定的cookie
```js
res.cookie('rememberme','tobi',{path:'/admin'});
res.clearCookie('rememberme',{path:'/admin'})
```

### res.download(path,[,fliename][,fn])
将路径中文件作为`附件(attachment)`传输.通常，浏览器将提示用户下载.默认情况下，`Content-Disposition`头中"filename="参数是路径（这通常出现在浏览器对话框），用`filename`参数覆盖默认值
```js
res.download('/report-12345.pdf');

res.download('/report-12345.pdf','report.pdf');

res.download('/report-12345.pdf','report.pdf',function(err){
    if(err){
        // 处理错误，但是请记得响应可能是部分发送的
        // 所以检查`res.headerssent`
    }else{
        // 减量下载，等
    }
})
```

### res.end([data][,encoding])
结束响应进程，This method actually comes from Node core, specifically the [response.end() method of http.ServerResponse](https://nodejs.org/api/http.html#http_response_end_data_encoding_callback).（这句话翻译过来我有些不理解，我就不再翻译，res.end用于结束响应）

快速结束响应而无需任何数据，如果你需要对数据进行响应，取而代之的是使用诸如`res.send`和`res.json`
```js
res.send();
res.status(404).end();
```


### res.format(object)
在请求对象时，在`Accept`HTTP头对象上执行`content-negotiation`。他使用`req.accepts`基于可接受的质量值的有序类型为请求选择一个处理程序，如果header未指定，调用第一个回调函数.当没有找到匹配项，服务器响应406`Not Acceptable`或调用默认回调函数

当选择回调时，将设置`Content-Type`响应头.然而你可以使用回调方法在回调中更改此值例如：`res.set`或者`res.type`

下面这个例子当`Accept`头域设置为`applocation/json`或者`*/json`时，将会响应{'message':'hey'}(然而如果是"*/*",响应将会是'hey')
```js
res.format({
    'text/plain':function(){
        res.send('hey')
    },

    'text/html':function(){
        res.send('<p>hey</p>')
    }

    'applaction/json':function(){
        res.send(message:'hey')
    }

    'default':function(){
        // 记录请求并用406响应
        res.status(406).send('Not Acceptable')
    }
})
```
除了规范化MOME类型，对于稍微不太详细的实现你还可以使用扩展名映射到这些类型
```js
res.format({
    text:function(){
        res.send('hey');
    }

    html:function(){
        res.send('<p>hey</p>');
    }

    json:function(){
        res.send({message:'hey'});
    }
})
```

### res.get(field)
返回由路由字段指定的http响应头(对大小写是不敏感的)

```js
res.get('Content-Tpye');  // => 'text/plain'
```

### res.json([body])
发送一个JSON响应，这个方法和`res.send`是一样的传递一个对象或者数组作为参数.但是你可以使用它将其他值转化为JSON,例如null，undefined（虽然这些在技术上不是有效的JSON）
```js
res.json(null)
res.json(user:'tobi')
res.status(500).json(error:'message')
```

### res.jsonp([body])
发送一个JSONP支持的JSON响应，这个方法和`req.json()`是相同的,除了他选择在JSONP的回调支持
```js
res.jsonp(null) // => null

res.jsonp({user:'tobi'})  // => {"user":"tobi"}

res.status(500).jsonp({error:'message'})  // => {"error":"message"}
```
以下是一些JSONP响应用相同的代码的栗子：
```js
// ?callback=foo
res.jsonp(user:"tobi")  // => foo({"user":"tobi"})

app.set('JSONP callback name ','cb');

// ?cb=foo
res.status(500).jsonp({error:'message'})  // => foo({"error":"message"})
```

### res.links(links)
将提供的链接作为参数的属性添加到响应的`Link` HTTP 头字段
```js
res.links({
    next:'http://api.example.com/user?page=2',
    last:'http://api.example.com/user?page=5'
})
```
产出
```
Link:<http://api.example.com/user?page=2>; rel='next'
    :<http://api.example.com/user?page=5>; rel='last'
```

### res.location(path)
设置响应`location`HTTP头为指定的path路径参数
```
res.location('/foo/bar');
res.location('http://example.com');
res.location('back');
```
带有`back`参数的的路径带有特殊的意义，它指的是在请求的`Referer`报头指定的URL，如果没有被指定，它指向"/"

### res.redirect([status,] path)
重定向URL来自指定的路径，使用指定的HTTP状态码.如果没有指定状态，状态代码默认为'302 Found'
```js
res.redirect('/foo/bar');
res.redirect('http://example.com');
res.redirect(301,'http://example.com');
res.redirect('../login');
```
重定向可以完全的将URL重定向到另一个不同的网站
```js
res.redirect('http://google.com');
```
重定向可以使用相对主机的路径，例如，如果你的应用程序是"http://example.com/admin/post/new"，下面将会将它重定向到"http://example.com/admin"
```js
res.redirect('/admin')
```
重定向可以相对于当前的URL，例如来自"http://example.com/blog/admin/"(注意最后的尾斜杠)，下面将重定向到"http://example.com/blog/admin/post/new"
```js
res.redirect('post/new')
```
如果上面admin最后没有尾斜杠，将会重定向至"http://example.com/blog/post/new"

>如果你发现上述行为令人困惑，把路径段看做目录（尾随斜杠）和文件，他将开始变得有意义

相对路径的重定向也是有可能的，如果你是"http://example.com/admin/post/new",下面将会重定向到"http://example.com/admin/post"
```js
res.redirect('..');
```
一个`back`重定向到请求返回`referer`，如果`referer`丢失默认为'/'

### res.render(view[,locals][,callback])
呈现视图并将HTML发送给客户端，可选参数：
- locals,属性定义视图的局部变量的对象
- callback,回调函数，如果提供的话，返回可能的错误和呈现的字符串，但并不自动响应.当错误发生时,该方法在内部调用`next(err)`
```js
res.render('index')

res.render('index',function(err,html){
    res.send(html)
})

// 将局部变量传递给视图
res.render('user',{name:'tobi'},function(err,html){
    // ..
})
```

### res.send([body])
发送http响应
`body`参数可以是一个`buffer`对象，字符串，对象，数组.举个栗子：
```js
res.send(new Buffer('whoop'))
res.send({some:'json'})
res.send('<p>some html</p>')
res.status(404).send('sorry,er can not find that!')
res.status(500).send({error:'something brew up'})
```
当参数是一个buffer对象时，该方法设置`Content-Type`响应头字段为`application/octet-stream`，除非先定义如下所示：
```js
res.set('Content-Type':'text/html')
res.send(new Buffer('<p>some html</p>'))
```
当参数为字符串时，这个方法设置'Content-Type'为'text/html'
```js
res.send('<p>some html</p>')
```
当参数为数组或者对象时，Express用JSON表示响应
```js
res.send({user:'tobi'})
res.send([1,2,3])
```

### res.sendFile(path[,options][,fn])
>res.sendFile()在Express v4.8.0之前被支持

在给定路径上传输文件，根据文件的扩展设置"Content-Tpye"响应HTTP头字段.除非在选项对象中设置根选项，路径必须是文件的绝对路径

下表中列出了选项对象中的详细信息

|Property|Description|Default|Availability|
|---|---|---|---|
|maxAge|以毫秒为单位设置max-age缓存控制头或者MS格式的字符串|0| |
|root|相关文件的根目录| | |
|lastModified|设置last-modified头设置为操作系统上文件的最后修改日期，设置false禁用它|Enabled|4.9.0+|
|headers|包含与文件服务对象的HTTP头| | |
|dotfiles|可能值为"allow","deny","ignore"|"ignore"| |

该方法调用一个回调函数`fn(err)`当传输完成或发生错误时.如果指定了回调函数并发生错误时，回调函数必须通过终止请求响应周期来显式地处理响应过程，或者传递控制给下一个路由

下面这个栗子使用了`res.sendFile()`的所有参数
```js
res.send('/file/:name',function(req,res,next){
    var options={
        root:__dirname+'/public',
        dotfiles:'deny',
        headers:{
            'x-timestamp':Date.now(),
            'x-sent':true
        }
    }
    var flieName = req.params.name;
    res.sendFile(fileName,options,funcion(err){
        if(err){
            console.log(err);
            res.status(err.status).end();
        }else{
            console.log('Sent:', fileName);
        }
    })
})
```
res.sendFile()在下面的例子中，提供对文件服务的`fine-grained`支持，
```js
app.get('/user/:uid/photos/:file',function(req,res){
    var uid = req.params.uid;
    var file = req.params.file;

    req.user.mayViewFilesFrom(uid,function(yes){
        if(yes){
            res.sendFile('/uploads/' + uid + '/' + file);
        }else{
            res.status(403).send("sorry you cant\'s see that.")
        }
    })
})
```

### res.sendStatus(statusCode)
设置响应的HTTP状态码并将字符串形式作为响应体发送
```js
res.sendStatus(200);  // 等于 res.status(200).send('ok')
res.sendStatus(403);  // 等于 res.status(403).send('Forbidden')
res.sendStatus(404);  // 等于 res.status(404).send('Not Found')
res.sendStatus(500);  // 等于 res.status(500).send('Internal Server Error')
```
如果指定了不受支持的状态代码，HTTP状态仍然设置状态码和代码的字符串版本为响应正文中发送
```js
res.sendStatus(2000)  // 等于 res.status(2000).send('2000')
```
[More about HTTP Status Codes](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes)

### res.set(field [,value])
将HTTP响应头filed设置为value值.立即设置多个字段，传递一个对象作为参数
```js
res.set('Content-Type':'text/plain');

res.set({
    'Content-Type':'text.plain',
    'Content-Length':'123',
    'ETag':'12345'
})
```
别名为`res.header(field[,value])`

### res.status(code)
使用此方法为响应设置HTTP状态，这是一个连贯性的Node `response.statusCode`别名
```js
res.status(403).send();
res.status(400).send('Bad Request');
res.status(404).sendFile('/absolute/path/to/404.png')
```

### res.type(type)
将`Content-Type`的HTTP头设置为`MIME`类型,通过`mime.lookup`指定类型.如果类型包含'/'字符，设置"Content-Type"为'type'
```js
res.type('.html')  // => 'text/html'
res.type('html')  // =>'text/html'
res.type('json') // => 'application/json'
res.type('application/json')  // => 'application/json'
res.type('png') // => image/png:
```

### res.vary(field)
如果它不在那里，添加字段到`vary`响应头
```js
res.vary('User-Agent').render('docs');
```

# 写在后面
Express文档中Response部分就完成了，本人学识有限，难免有所纰漏，另外翻译仅仅是方便个人学习交流使用，无其他用意，原文地址：[expressjs.com](http://www.expressjs.com.cn/4x/api.html#res)



