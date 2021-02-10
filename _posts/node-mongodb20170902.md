---
title: mongodb原生node驱动
date: 2017-09-02 03:55
cover: "https://cdn.jsdelivr.net/gh/okaychen/CDN@1.2/BlogSource/gallery/thumb_047.jpg"
tags:
    - Node
    - mongodb
categories:
    - Node
---
# 写在前面
最近读《node.js学习指南》，对于mongodb没有介绍太多的工作原理，但是对于一个前端开发者，即使你还没有用过这种数据库也可以让你很好的理解和使用

![](https://cdn.jsdelivr.net/gh/okaychen/CDN@2.2/BlogSource/cnblogs_img/1140602-20170902035102780-1333013103.png)   　　

一本非常好的介绍node.js的书，我一直把他放在触手可及的地方。　　--Mike Amundsen

MongoDB Native Node.js Driver模块是mongodb自带的node的驱动，这个驱动发出的mongodb指令和mongodb客户端发出的指令基本一致。

<!-- more -->

# 准备开始
　　1、首先我们应该确保我们的mongodb数据库本地安装可以正常运行，如果安装过程到遇到了问题可以简单参考我的上一篇博客（window下mongodb的配置与安装）

　　2、然后我们需要新建一个项目<nodeLearn> mkdir nodeLearn ,创建一个app.js文件作为项目启动文件。

　　3、然后我们需要在项目文件中安装MongoDB Native Node.js Driver： npm install mongodb 　

　　4、开始

1）引入模块，使用mongodb驱动，创建mongodb.Server对象来建立数据库的连接：

```js
var mongodb = require('mongodb')　　

var server = new mongodb.Server('localhost',27017,{auto_reconnect:true })
```
>注：Server构造函数的前两个参数分别是localhost和27017默认端口，第三个参数可选，选项被设置为true，表示如果连接断开driver会自动进行重连（还有一个参数pollSize，决定并发的TCP连接数量，我还没有接触到= =）。

2）使用mongodb.Db对象创建数据库

```js

var db = new mongodb.Db('mydb',server)
```
>注：第二个参数表示建立已经连接好的Mongodb server

# Mongodb Collection
在MongoDB中并没有表的概念，我们需要一个集合.

1、在数据库中创建一个collection集合对象
```js
db.createCollection('mycollection',function(err,collection){ })

db.collection('mycollection',function(err,collection){ })
```
>注：使用create和不使用有一些区别，使用create表示立即创建，如果对一个已经存在的collection使用createcollection方法，也可以直接访问该collection-driver，并不会覆盖。不使用create并没有创建实际的collection.

2、在数据库中彻底销毁一个collection
```js
db.dropCollection('mycollection',function(err,result){ })
```
# 为collection添加数据
　　在添加数据之前，我们要知道node mongodb driver 与mongodb数据类型存在一种映射关系（但是对于数据转换背后的处理机制我还不是理解的很清楚，这里为之后的一篇博客做伏笔- -）

　　添加数据：

　　　1、先用remove方法删除已有的collection文档以防止创建失败，

　　　2、使用insert方法插入数据（接受三个参数，safe模式，keepGoing【插入失败是否继续执行】、serializeFunctions【是否序列化】）

到这里我们已经可以连接到我们的mongodb数据库，并添加文档了，这对于一个大二的前端开发小伙伴来说是兴奋地，以至于半夜不睡觉发神经扰民- - 
```js
var mongodb = require('mongodb');

var server = new mongodb.Server('localhost', 27017, {auto_reconnect: true});
var db = new mongodb.Db('exampleDb', server);

db.open(function (err, db) {
    if (!err) {
        db.collection('widgets', function (err, collection) {
            //删除exampleDb数据库widgets集合中的数据
            collection.remove(null, {safe: true}, function (err, result) {
                if (!err) {
                    console.log('result of remove' + result);
                    //创建两条数据
                    var widget1 = {id: 1, title: 'First Great widget', desc: 'greatest widget of all', price: 14.99};
                    var widget2 = {
                        id: 2,
                        title: 'Second Great widget',
                        desc: 'second greatest widget of all',
                        price: 29.99
                    };
                    collection.insert(widget1);
                    collection.insert(widget2, {safe: true}, function (err, result) {
                        if (err) {
                            console.log(err)
                        } else {
                            collection.find().toArray(function (err, docs) {
                                console.log(docs);
                                //关闭数据库
                                db.close();
                            });
                        }
                    })
                }
            })
        })
    }
});
```
进入到项目文件，我们通过node命令启动app服务： `node app` ,

当然你如果你想避免每次修改之后通过node命令重启服务的繁琐，可以使用supervisor，通过 `npm install supervisor -g `安装在全局中，使用supervisor命令代替node，这样修改文件之后，不需要每次通过node命令重启服务

那么我们在命令行看下结果吧- -

![](https://cdn.jsdelivr.net/gh/okaychen/CDN@2.2/BlogSource/cnblogs_img/1140602-20170902020515468-95946655.png)

然后我们在mongodb数据库中看下数据结果：（如果你已经配置好了mongo的环境变量，以管理员身份打开cmd，通过mongo命令启动mongodb）

![](https://cdn.jsdelivr.net/gh/okaychen/CDN@2.2/BlogSource/cnblogs_img/1140602-20170902020820640-1818403613.png)

会看到数据库widgets文档中也加入了我们想要的两条数据，

如果批量处理文档数据，我们需要尽可能的设置keepGoing为true。

# 实现查询数据
对于MongoDB Native Node.js Driver来说有四种查询数据的方法：find()、findOne()、findAndRemove()、findAndModify()

 findOne()和find()支持以下三个参数：查询数据、可选参数、回调函数 。（对于可选参数和回调函数都是可选项、而且这两种选项的可选值非常多，但是大部分查询只会用到一小部分的选项值）

常用的
```txt
sort（文档排序，-1倒排序，1正排序）、

Field（查询语句并返回field）、

Skip（skip n个文档，用于跳页）

Hint（告诉数据库使用特定的索引）

returnKey（只返回索引的key）

Comment（为查询在log日志文件中添加描述）

showDiscLoc（显示结果在磁盘中的位置）
...
```

这些选项值我们同样可以在mongo下使用，进行数据的一些操作

1、接下来我们来用find()查询并返回我们数据库的内容，可以直接使用toArray()方法将结果转化为数组

2、使用可选值field来进行筛选，{fields:{ type=0 }} 设置为0来查询除type之外的字段，为1相反

```js
collection.find({type="A"},{fields:{type=0}}).toArray(function(err,docs){
    if(err){
        console.log(err)
    }else{
        console.log(docs);

         //关闭数据库链接
         db.close(); 
    }
})
```
我们来找到所有type为A，并且返回这条数据（不含type字段）。但是需要注意的一点是，我们设置为1，也并不是只出现type字段，系统生成的唯一标识符也就是_id总是会出现在查询结果中

# 更新、删除文档
修改、删除文档的方法：更新文档：update()   或者是upserts(如果不存在就添加文档)，删除文档remove()、查找并修改或者删除一个文档findAndModify()、查找并删除一个文档findAndRemove()

update/remove和后两个方法之间最本质的区别就在于后者两个方法都返回了被操作的文档

使用$set修改符代替field，$set修改符使只会修改作为属性传递给修改器的field
```js
var mongodb = require('mongodb');

var server = new mongodb.Server('localhost', 27017, {auto_reconnect: true});
var db = new mongodb.Db('exampleDb', server);

db.open(function (err, db) {
    if (!err) {
        db.collection('widgets', function (err, collection) {
            //更新数据
            collection.update({id: 2}, {$set: {title: "Super Bad Widget"}}, {safe: true}, function (err, result) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(result);
                    //查询更新数据库
                    collection.findOne({id: 2}, function (err, doc) {
                        if (!err) {
                            console.log(doc);
                            //关闭数据库
                            db.close();
                        }
                    })
                }
            })
        })
    }
});
```
更新后的数据库已经改变

![](https://cdn.jsdelivr.net/gh/okaychen/CDN@2.2/BlogSource/cnblogs_img/1140602-20170902032013249-495013699.png)

写在后面
 使用MongoDB Native Node.js Driver模块，驱动的指令基本上和mongodb客户端是一致的，如果你跟我一样对原始的驱动模块感兴趣，那么这个nodeJS Driver官网一定可以帮到你。

虽然原始驱动提供了数据库的连接，但是缺少更高级别的抽象，有些繁琐，所以有时候你需要使用类似mongoose的ODM，

mongoose构建在mongodb之上，提供了Schema、Model和Document对象，用起来更为方便。

下一次我会总结一下使用express + mongoose建立数据库的连接