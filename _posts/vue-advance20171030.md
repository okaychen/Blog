---
title: Vue起步 - 从场景中看父子组件间通信
date: 2017-10-30 20:54
cover: "https://cdn.jsdelivr.net/gh/okaychen/CDN@1.2/BlogSource/gallery/thumb_049.jpg"
tags:  
    - Vue 
categories:
    - Vue
---

<fancybox>![](https://www.chenqaq.com/assets/cnblogs_img/1140602-20171025194848754-2026039505.png)</fancybox>

组件间通信是组件开发的，我们既希望组件的独立性，数据能互不干扰，又不可避免组件间会有联系和交互。

在vue中，父子组件的关系可以总结为props down，events up；

在vue2.0中废弃了$dispatch和$broadcast，子组件使用event发出自定义事件

<fancybox>![](https://www.chenqaq.com/assets/cnblogs_img/1140602-20171029212721976-1727722995.png)</fancybox>

思考场景如下：

> 一个总群（父组件）中大家做自我介绍，陌陌、小小、可可、天天 收到 总群发来的消息之后（父传子），将自己的信息发送到总群（子传父）

<!-- more -->

父组件 
```css
<template>
    <div>
        <h4>父组件>></h4>
        <div>
            <span>{{ somebody }}</span> 说: 我来自 <span>{{ city }} </span>
        </div>
        <hr>
        <!-- aGirls和noticeGirl通过props传递给子组件 -->
        <!-- introduce通过$emit子组件传递给父组件 -->
        <v-girl-group :girls="aGirls" :noticeGirl="noticeGirl" @introduce="introduceSelf"></v-girl-group>
    </div>
</template>
```
我使用的组件间通信：
- aGirls和noticeGirl通过 props 传递给子组件
- 通过 $emit 子组件传递给父组件，v-on来监听父组件自定义事件（$emit的变化）
```js
<script>
import vGirlGroup from './components/HelloWorld'
export default {
    name: 'girl',
    components: {
        vGirlGroup
    },
    data () {
        return {
            aGirls:[{
                name:'陌陌',
                city:'GuangZhou'
            },{
                name:'小小',
                city:'BeiJing'
            },{
                name:'可可',
                city:'American'
            },{
                name:'天天',
                city:'HangZhou'
            }],
            somebody:'',
            city:'',
            noticeGirl:''
        }
    },
    methods: {
        introduceSelf (opt) {
            this.somebody = opt.name;
            this.city = opt.city;

            // 通知girl收到消息
            this.noticeGirl = opt.name + ',已收到消息';
        }
    }
}
</script>
```
这里的 introduceSelf 就是父组件接收到子组件发出的$emit事件处理程序

子组件
```css
<template>
    <div>
      <h4>子组件>></h4>
       <ul>
           <li v-for="(value, index) in girls">
                {{ index }} - {{ value.name }} - {{ value.city }} 
                <button @click="noticeGroup(value.name,value.city)">发送消息</button>
            </li> 
       </ul>
       <div class="msg">接收来自父组件的消息:{{ noticeGirl }}</div>
    </div>
</template>
```

子组件通过$emit发出自定义事件
```js
<script>
export default {
    name: 'girl-group',
    props: {
        girls: {
            type: Array,
            required: true
        },
        noticeGirl: {
            type: String,
            required: false
        }
    },
    methods: {
        noticeGroup (name, age) {
            this.$emit('introduce',{
                name: name,
                age: age
            })
        }
    }
}
</script>
```
结果
 
<fancybox>![](https://www.chenqaq.com/assets/cnblogs_img/1140602-20171030204023230-773657287.gif)</fancybox>

到这里，我们已经根据vue2.0父子间通信实现了上面提出的一个场景 .

相比vue1.0的变化：具体可以参考：[https://cn.vuejs.org/v2/guide/migration.html#dispatch-和-broadcast-替换](https://cn.vuejs.org/v2/guide/migration.html#dispatch-和-broadcast-替换)

 