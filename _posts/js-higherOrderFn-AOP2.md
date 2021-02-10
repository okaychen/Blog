---
title: 用AOP装饰函数-实践篇
date: 2018-10-23 16:16:47
cover: "https://cdn.jsdelivr.net/gh/okaychen/CDN@1.2/BlogSource/gallery/thumb_026.jpg"
categories:
  - [JavaScript]
  - [设计模式]
tags:
  - JavaScript
  - 设计模式
  - AOP
---
# 后续：纸上得来终觉浅
老大见小T终于摸清了用AOP装饰函数的一些套路，很是欣慰，决定用实际情景让他试一试，老大拿出了一个最常见的AOP的经典应用之一—数据统计上报的情景，分离业务代码和数据统计上报的代码，在实际开发中项目结尾阶段难免要加上很多统计数据的代码，这个过程可能被迫改动早已封装好的函数.
<!--more-->
1.老大给小T设定了一个情景如下：页面中有一个登录的button，点击这个button会弹出登录的浮层，与此同时需要进行数据上报来统计有多少用户点击了这个登录的button(这个任务可能是在项目结尾阶段进行的)，让小T发现问题并进行改写：
```html
<html>
    <input type="button" value="login" id="login" />
    <script>
        const login = document.getElementById('login');
        const textlogin = login.tagName;
        let x = 0;
        let showLogin = function () {
            console.log('打开登录浮层');
            log(textlogin);
        }

        let log = function (tag) {
            x = x + 1;
            console.log('上报标签为：' + tag +','+ '上报次数为：' + x);
            // 这里我简单的用login按钮单击的次数来模拟，上报过程略
        }
        login.onclick = showLogin;
    </script>
</html>
```
小T发现在showLogin函数里既要弹层又要上报点击次数，两个层面的功能，却被耦合在一个函数中，决定用昨天刚写好的AOP试一试:
```html
<html>
    <input type="button" value="login" id="login" />
    <script>
        Function.prototype.after = function(afterfn){
            let _self = this;
            return function(){
                let ret = _self.apply(this,arguments);
                afterfn.apply(this,arguments);
                return ret;
            }
        }
        const login = document.getElementById('login');
        const textlogin = login.tagName;
        let x = 0;
        let showLogin = function(){
            console.log('打开登录浮层');
        }
        let log = function(){
            x = x+1;
            console.log('上报标签为：' + tag +','+ '上报次数为：' + x);
        }
        showLogin = showLogin.after(log); // 打开登录浮层后上报数据
        login.onclick = showLogin;
    </script>
</html>
```
小T欣喜若狂，这样两个不同层面功能的函数就可以单独维护，不存在耦合问题，决定把自己的成果给老大展示一番，老大看了微微一笑点了点头，觉得小T的进步着实很快，决定让他尝试一下用AOP动态改变函数的参数。

2.现有一个用于发起ajax请求的函数，这个函数负责项目中所有ajax的异步请求，这个ajax函数一直运转良好，跟CGI合作也很愉快，直到一次遭受了CSRF攻击，解决CSRF攻击最简单的方法就是在HTTP请求中加一个token参数，我们虽然可以选择直接多加一个token参数在ajax函数中。但是整个函数会变得十分僵硬，虽然对于现在的项目没有问题，但是将来把这个函数移植到其他项目，或者一个开源库中供他人使用，token参数都将是多余的。
```js
//向后台 cgi 发起一个请求来获取用户信息,传递给 cgi 的参数是baseParam和{ name:'sven' }
let baseParam = {
    modname: modname,
    orgcode: localorgcode,
    cmduuid: cmduuid
}
let ajax = function(type,url,data){
    console.log(dir);
    return new Promise(function (resolve, reject) {
        $.ajax({
            type:type,
            url:url,
            data:JSON.stringify(Object.assign({}, baseParam, data)),
            success:function(data){
                // 简单假设不做处理
                resolve(data);
            },
            error:function(data){
                reject(data);
            }
        })
    })
}
ajax('get','http:// xxx.com/userinfo',{name:'sven'});

//用于生成token的函数
let getToken = function(){
    return 'Token';
}

//僵硬的在ajax函数中添加
var ajax = function(type,url,data){
    data = data || {};
    data.token = getToken();
    // 发送ajax请求略
}
```
小T看到这里，觉得老大讲的确实有道理，僵硬的在ajax函数中增加传递参数也是正确的，但是复用性不大，无论是换一个项目还是在开源库中供别人使用，这个token都可能会是多余的，小T决定在不修改ajax原函数的情况下用AOP试一下改变函数的参数：
```js
Function.prototype.before = function(beforefn){
    let _self = this;
    return function(){
        beforefn.apply(this,arguments);
        return _self.apply(this,arguments);
    }
}
let getToken = function(){
    return 'Token';
}
ajax = ajax.before(function(type,url,data){
    data.Token = getToken();
})
ajax( 'get', 'http:// xxx.com/userinfo', { name:'sven' } );
```
小T打印出来向后台cgi传递的参数，发现多了token参数`{name: "sven", Token: "Token"}`，小T发现用AOP的方式给ajax函数动态装饰上Token参数，保证了ajax是一个纯净的函数，提高ajax函数的复用性。
最后老大决定拿出来杀手锏，插件式的表单验证，想试一下小T是不是能融会贯通:

3.在web项目中，可能存在非常多的表单，如登录，注册，修改用户信息。在表单数据提交给后台之前，常常需要做一些校验，比如登录时需要验证用户名和密码是否为空，这样形如一个formSubmit函数就既要承担提交ajax请求，还要验证用户输入的合法性。这样一来就会造成代码的臃肿，职责混乱，二来谈不上复用性。
```html
<html>
    <body>
        用户名：<input id="username" type="text">
        密码：<input id="password" type="password">
        <input id="submitBtn" type="button" value="提交">
    </body>
    <script>
        let username = document.getElementById( 'username' ),
            password = document.getElementById( 'password' ),
            submitBtn = document.getElementById( 'submitBtn' );

            const formSubmit = function(){
                if(username.value == ''){
                    retrun alert('用户名不能为空');
                }
                if(password.value == ''){
                    return alert('密码不能为空');
                }

                let param = {
                    username = username.value,
                    password = password.value
                }

                ajax('http://xxx.com/login',param); //ajax实现略
            }

            submitBtn.onclick = function(){
                formSubmit();
            }
    </script>
</html>
```
小T看到这，决定先把校验的逻辑放到validata函数中：
```js
const validata = function(){
    if(username.value == ''){
        retrun alert('用户名不能为空');
    }
    if(password.value == ''){
        return alert('密码不能为空');
    }
}

const formSubmit = function(){
    if( validata() === false ){ //校验未通过
        return;
    }
    let param = {
        username = username.value,
        password = password.value
    }
   ajax('http://xxx.com/login',param); 
}

submitBtn.onclick = function(){
    formSubmit();
}
```
现在代码有了一些改进，小T已经把校验的逻辑放到了validata函数中，但是formSubmit函数内部还要计算validata函数的返回值，因为返回值的表明了是否通过校验。接下来小T想通过AOP来优化这段代码，使validata函数和formSubmit函数完全分离开来，这里小T发现些不一样的地方，因为要先校验，如果校验不通过不能执行后面的ajax代码，小T决定对上面学习的AOP进行改写：
```js
Function.prototype.before = function(beforefn){
    let _self = this;
    return function(){
        if(beforefn.apply(this,arguments) == false){
            // beforefn返回false，直接return，不在执行后面的原函数
            return;
        }
        return _self.apply(this,arguments);
    }
}

const validata = function(){
    if ( username.value === '' ){
        alert ( '用户名不能为空' );
        return false;
    }
    if ( password.value === '' ){
        alert ( '密码不能为空' );
        return false;
    }
}

const formSubmit = function(){
    const param = {
    username: username.value,
    password: password.value
    }
    ajax( 'http:// xxx.com/login', param );
}

formSubmit = formSubmit.before( validata );

submitBtn.onclick = function(){
    formSubmit();
}
```
到这里，校验输入和提交表单的代码就完全分离开来，它们不在存在耦合关系，如同把校验规则动态接在formSubmit函数之前，validata成了一个即插即用的函数，它甚至可以写成配置文件的形式，非常有利于分开维护这两个函数。

但是慢慢的小T也发现了用AOP装饰函数的一些缺点：因为函数通过Function.prototype.before和Function.prototype.after被装饰之后，返回的实际是一个新的函数，如果在原函数上保存了一些属性，那么这些属性会丢失：
```js
var func = function (){
    alert(1);
}

func.a = 'a';

func = func.after(function(){
    alert(2);
})

alert(func.a); //输出undefined
```
除此之外，用AOP装饰方式也叠加了函数的作用域，如果装饰的链条过长，性能上也会受到一定的影响。
# 金风玉露一相逢
小T终于完成了用AOP装饰函数的学习旅程，短短三天，小T与AOP从素未谋面到彼此熟悉，最后相熟相知，小T终于可以用AOP融会贯通的处理日常一些分离代码功能提高代码复用性的任务。渐渐的小T也了解到了用AOP装饰函数方式的缺点，更加游刃有余的结合实际开发进行运用

**人物与故事纯属虚构**
## 特别鸣谢
《JavaScript设计模式与开发实践》 -  AlloyTeam曾探