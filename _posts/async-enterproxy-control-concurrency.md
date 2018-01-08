---
title: 使用async和enterproxy控制并发数量
date: 2017-12-31 10:32:00
comments: true
tags:
    - node
    - 并发，并行
categories:
    - Node
---

# 聊聊并发与并行
并发我们经常提及之，不管是web server，app并发无处不在，操作系统中，指一个时间段中几个程序处于已经启动运行到完毕之间，且这几个程序都是在同一处理机上运行，并且任一个时间点只有一个程序在处理机上运行。很多网站都有并发连接数量的限制，所以当请求发送太快的时候会导致返回值为空或报错。更有甚者，有些网站可能因为你发出的并发连接数量过多而当你是在恶意请求，封掉你的ip。

相对于并发，并行可能陌生了不少，并行指一组程序按独立异步的速度执行，不等于时间上的重叠（同一个时刻发生），通过增加cpu核心来实现多个程序(任务)的同时进行。没错，并行做到了多任务的同时进行

# 使用enterproxy控制并发数量
enterproxy是朴灵大大为主要贡献的工具，带来一种事件式编程的思维变化，利用事件机制解耦复杂业务逻辑，解决了回调函数耦合性的诟病，将串行等待变成并行等待，提升多异步协作场景下的执行效率

我们如何使用enterproxy控制并发数量？通常如果我们不使用enterproxy和自制的计数器，我们如果抓取三个源：

这种深层嵌套，串行的方式
```js
    var render = function (template, data) {
    _.template(template, data);
    };
$.get("template", function (template) {
  // something
  $.get("data", function (data) {
    // something
    $.get("l10n", function (l10n) {
      // something
      render(template, data, l10n);
    });
  });
});
```

除去这种过去深层嵌套的方法，我们常规的写法的自己维护一个计数器
```js
(function(){
    var count = 0;
    var result  = {};
    
    $.get('template',function(data){
        result.data1 = data;
        count++;
        handle();
    })
    $.get('data',function(data){
        result.data2 = data;
        count++;
        handle();
    })
    $.get('l10n',function(data){
        result.data3 = data;
        count++;
        handle();
    })

    function handle(){
        if(count === 3){
            var html = fuck(result.data1,result.data2,result.data3);
            render(html);
        }
    }
})();
```

在这里，enterproxy就可以起到这个计数器的作用，它帮你管理这些异步操作是否完成，完成之后，他会自动调用你提供的处理函数，并将抓取到数据当做参数传递过来
```js
var ep = new enterproxy();
ep.all('data_event1','data_event2','data_event3',function(data1,data2,data3){
    var html = fuck(data1,data2,data3);
    render(html);
})

$.get('http:example1',function(data){
    ep.emit('data_event1',data);
})

$.get('http:example2',function(data){
    ep.emit('data_event2',data);
})

$.get('http:example3',function(data){
    ep.emit('data_event3',data);
})
```

enterproxy还提供了其他不少场景所需的API，可以自行学习下这个API [enterproxy](https://github.com/JacksonTian/eventproxy)


# 使用async控制并发数量
假如我们有40个请求需要发出，很多网站可能会因为你发出的并发连接数太多而当你是在恶意请求，把你的IP封掉。
所以我们总是需要控制并发数量，然后慢慢抓取完这40个链接。

使用async中mapLimit控制一次性并发数量为5，一次性只抓取5个链接。

```js
 async.mapLimit(arr, 5, function (url, callback) {
      // something
    }, function (error, result) {
      console.log("result: ")
      console.log(result);
    })
```

我们首先应该知道什么是`并发`，为什么需要限制并发数量，都有哪些处理方案。然后就可以去文档具体看一下API如何使用。[async文档](https://caolan.github.io/async/)可以很好的学习这些语法。

模拟一组数据，这里返回的数据是假的，返回的延时是随机的。
```js
var concurreyCount = 0;
var fetchUrl = function(url,callback){
    // delay 的值在 2000 以内，是个随机的整数 模拟延时
    var delay =  parseInt((Math.random()* 10000000) % 2000,10);
    concurreyCount++;
    console.log('现在并发数是 ' , concurreyCount , ' 正在抓取的是' , url , ' 耗时' + delay + '毫秒');
    setTimeout(function(){
        concurreyCount--;
        callback(null,url + ' html content');
    },delay);
}

var urls = [];
for(var i = 0;i<30;i++){
    urls.push('http://datasource_' + i)
}
```
然后我们使用`async.mapLimit`来并发抓取，并获取结果。
```js
async.mapLimit(urls,5,function(url,callback){
    fetchUrl(url,callbcak);
},function(err,result){
    console.log('result: ');
    console.log(result);
})
```
模拟摘自[alsotang](https://github.com/alsotang/node-lessons/tree/master/lesson5)

运行输出后得到以下结果

![](http://www.chenqaq.com/assets/images/concurrency1.png)

我们发现，并发数从1开始增长，但是增长到5时，就不在增加。然有任务时就继续抓取，并发连接数量始终控制在5个。

# 完成node简易爬虫系统
因为alsotang前辈的[《node包教不包会》](https://github.com/alsotang/node-lessons)教程例子中使用的eventproxy控制的并发数量，我们就来完成一个使用async控制并发数量的node简易爬虫。

爬取的目标就是[本站首页](http://www.chenqaq.com)（手动护脸）

第一步，首先我们需要用到以下的模块：
- url ： 用于url解析，这里用到`url.resolve()`生成一个合法的域名
- async ： 一个实用的模块，提供了强大的功能和异步JavaScript工作
- cheerio ： 为服务器特别定制的，快速，灵活，实施的jQuery核心实现
- superagent ： nodejs里一个非常方便的客户端请求代理模块
<!--  -->
通过`npm`安装依赖模块

![](http://www.chenqaq.com/assets/images/concurrency2.png)

第二步，通过require引入依赖模块，确定爬取对象URL：
```js
var url = require("url");
var async = require("async");
var cheerio = require("cheerio");
var superagent = require("superagent");

var baseUrl = 'http://www.chenqaq.com';
```

第三步：使用superagent请求目标URL，并使用cheerio处理baseUrl得到目标内容url，并保存在数组arr中
```js
superagent.get(baseUrl)
  .end(function (err, res) {
    if (err) {
      return console.error(err);
    }
    var arr = [];
    var $ = cheerio.load(res.text);
    // 下面和jQuery操作是一样一样的..
    $(".post-list .post-title-link").each(function (idx, element) {
      $element = $(element);
      var _url = url.resolve(baseUrl, $element.attr("href"));
      arr.push(_url);
    });

    // 验证得到的所有文章链接集合
    output(arr);
    // 第四步：接下来遍历arr，解析每一个页面需要的信息

})
```

我们需要一个函数验证抓取的url对象，很简单我们只需要一个函数遍历arr并打印出来就可以：
```js
function output(arr){
    for(var i = 0;i<arr.length;i++){
        console.log(arr[i]);
    }
}
```

第四步：我们需要遍历得到的URL对象，解析每一个页面需要的信息。

这里就需要用到`async`控制并发数量，如果你上一步获取了一个庞大的arr数组，有多个url需要请求，如果同时发出多个请求，一些网站就可能会把你的行为当做恶意请求而封掉你的ip

```js
async.mapLimit(arr,3,function(url,callback){
    superagent.get(url)
        .end(function(err,mes){
            if(err){
                console.error(err);
                console.log('message info ' + JSON.stringify(mes));
            }
            console.log('「fetch」' + url + ' successful！');
            var $ = cheerio.load(mes.text);
            var jsonData = {
                title:$('.post-card-title').text().trim(),
                href: url,
            };
            callback(null,jsonData);
        },function(error,results){
            console.log('results ');
            console.log(results);
        })
    })
```

得到上一步保存url地址的数组arr，限制最大并发数量为3，然后用一个回调函数处理 「该回调函数比较特殊，在iteratee方法中一定要调用该回调函数，有三种方式」

- `callback(null)` 调用成功
- `callback(null，data)` 调用成功，并且返回数据data追加到results
- `callback(data)` 调用失败，不会再继续循环，直接到最后的callback

好了，到这里我们的node简易的小爬虫就完成了，来看看效果吧

![](http://www.chenqaq.com/assets/images/concurrency3.png)

嗨呀，首页数据好少，但是成功了呢。

# 参考资料

[Node.js 包教不包会 - alsotang](https://github.com/alsotang/node-lessons)

[enterproxy](https://github.com/JacksonTian/eventproxy)

[async](https://github.com/caolan/async)

[async Documentation](https://caolan.github.io/async)