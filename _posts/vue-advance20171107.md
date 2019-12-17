---
title: Vue起步 - 路由与页面间导航
date:  2017-11-07 16:43
cover: "https://cdn.jsdelivr.net/gh/okaychen/CDN@1.2/BlogSource/gallery/thumb_050.jpg"
tags:  
    - Vue 
categories:
    - Vue
---

# vue-router
我们知道路由定义了一系列访问的地址规则，路由引擎根据这些规则匹配找到对应的处理页面，然后将请求转发给页进行处理。可以说所有的后端开发都是这样做的，而前端路由是不存在"请求"一说的。

前端路由是找到地址匹配的一个组件或者对象将其渲染出来。改变浏览器地址不向服务器发送请求有两种方法，

一是在地址中加入#以欺骗浏览器，地址的改变是由于正在进行页内导航；二是使用HTML5的window.history功能，使用URL的hash来模拟一个完整的URL。

vue-router是官方提供的一套专用的路由工具库，是vue的一个插件，我们需要在全局引用中通过vue.use()将它引入到vue实例中，

<fancybox>![](https://www.chenqaq.com/assets/cnblogs_img/1140602-20171107001954622-121090007.png)</fancybox>

<!-- more -->

使用vue-cli创建项目后（init初始化时vue-router确认y）

我们先来看一下项目src的结构，通过cmd进入到项目src目录下，执行 tree -f > list.txt 生成结构树（保存在list.txt中）：

结构如下：

```js
src
├─assets      // 静态资源
│  └─image    // 图片
│          
├─components  // 组件    
│  └─HelloWorld
│          HelloWorld.vue
│          
└─router     // 路由配置
│  └─index.js
│      
│  App.vue  // 默认程序入口
│  main.js
│ 
```
1、打开main.js:
```js
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,  
  render: h => h(App)　
})
```
第10行将配置的路由绑定到vue实例上，第11行在vue实例中使用render方法来绘制这个vue组件(App)完成初始化

Render是vue2新增的具有特色的方法，为了得到更好的运行速度，vue2也采用的类似react的Virtual Dom（虚拟Dom）

2、然后我们在components中注册几个组件

3、打开router/index.js配置路由
```js
import Vue from 'vue'
import Router from 'vue-router'

import Singer from '@/components/rank/rank'

Vue.use(Router)  // 注册router

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: MHeader  // 路由中指定组件
    },
    {
      path: '/rank',
      name: 'rank',
      component: Rank
    }
  ]
})
```
# 路由的模式

我们可以在创建的Router中使用模式，如参数mode:history的参数，这个值意思是使用history模式，这种模式充分利用了history.pushState API来完成URL的跳转而无需重新加载页面 ，

如果不使用history模式，当访问rank的时候路由就会变成：

```js
http://localhost/#rank

// 反之为：

http://localhost/rank
```
这就是history模式和hash模式的区别，除此之外还有一种abstract模式

- Hash：使用URL hash值作为路由，
- History：依赖HTML5 History API和服务器配置
- Abstract：支持所有JavaScript运行环境，如node服务器端。如果发现没有浏览器的API，路由就会强制进入这个模式

# 路由与导航
vue-router提供两个指令标签组件来处理这个导航与自动渲染逻辑：

- `<router-view>`——渲染路径匹配到的组件视图，
- `<router-link>`——支持用户在具有路由功能的应用中导航
我们使用整两个标签组件来完成一个简单的页面布局：

<fancybox>![](https://www.chenqaq.com/assets/cnblogs_img/1140602-20171107124955231-721484257.png)</fancybox>

在路由使用时要明确一个原则就是：不直接引用路由定义，（即不要在router-link直接通过 to='conpontents/rank/rank' 来导向路由），当显式引用路由定义的URL一旦发生变化，所有引用的地方都要修改。

在router-link通过名称引用路由：向to属性传入一个对象显式的声明路由的名称：

```js
<router-link :to="{ name:'rank' }">
```
这里留意使用v-bind绑定（简写：），因为这里需要向router-link传递的是一个对象{ name:'rank' }而不是一个字符串

# 动态路由
vue-router将参数融入到路由的路径定义之内成为路由的一部分，我们称这种参数为"动态路径参数"；

使用非常简单，在参数名之前加上":"，然后将参数写在路由定义的path内，
```js
routers：[{
    name:'BookDetails',
    path:'books/:id',
    component:BookDetails      
}]
```
1、这样定义之后，vue-router就会自动匹配/books/1、/books/2、...、/books/n 形式的路由模式，因为这样定义的路由的数量是不确定的，所以也称为"动态路由"。

2、在<router-link>中我们就可以加入一个params的属性来指定具体的参数值：

```html
<router-link :to="{ name:'BookDetails'，params:{ id:1 } }">
    //...
</router-link>
```
3、当我们导航进入图书详情页之后，我们可能需要获取属性指定的参数值（即重新将:id参数读取出来），我们可以通过$router.params来完成：

```js
export default {
    created () {
       const bookID = this.$router.params.id
    }
}
```
# 嵌套式路由

我们利用下面的场景，首页/home/读书详情 页面，读书详情也我们不需要底部的导航区域，但是我们使用之前的路由定义，所有的页面都应该具有想用的底部导航条，按前面的路由结构是不可以导航到图书详情页的，如下：

<fancybox>![](https://www.chenqaq.com/assets/cnblogs_img/1140602-20171107172657200-669562006.png)</fancybox>

所以我们就需要另一种定义路由的方式，对前面的路由进行调整，

嵌套式路由又叫做子路由，要将路由显示到子视图中就要相应的子路由与之对应，我们只需要在路由定义中使用children数组属性就可以定义子路由了： 

```js
routers:[
  { 
     name:'Main',
     path:'/',
     component:Main,
     children:[
        { name:'Home',path:'home',component:Home }
        { name:'Me',path:'me',component:Me }
      ]   
   },
   { name:'BookDetail',path:'/books/:id',component:BookDetail }   
]
```
需要注意的是以"/"开头的嵌套路径会被当做根路径，所以不要在子路由上加上"/"；

# 重定向路由与别名
重定向也是通过 routes 配置来完成，下面例子是从 /a 重定向到 /b：
```js
routes: [
    { path: '/a', redirect: '/b' }
]

//重定向的目标也可以是一个命名的路由

routes: [
    { path: '/a', redirect: { name: 'foo' }}
]
```
另外我们需要区别重定向和别名，『重定向』的意思是，当用户访问 /a时，URL 将会被替换成 /b，然后匹配路由为 /b，那么『别名』又是什么呢？

/a 的别名是 /b，意味着，当用户访问 /b 时，URL 会保持为 /b，但是路由匹配则为 /a，就像用户访问 /a 一样：

利用alias给路由设置别名

```js
routes: [
`{ path: '/a', component: A, alias: '/b' }
]
```
# 总结
到这里vue路由的基础我们已经总结完毕，我们需要在实战中不断练习，多多的去解决问题，方能更好的使用路由 帮我们完成任务，同时为vue进阶的路由知识打基础

 