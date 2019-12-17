---
title: RegExp正则匹配模式汇总
date: 2017-08-19 21:25
cover: "https://cdn.jsdelivr.net/gh/okaychen/CDN@1.2/BlogSource/gallery/thumb_029.jpg"
categories:
  - JavaScript
tags:
  - JavaScript
  - 正则
---
正则表达式提供另一种强大的文本搜索和处理方式，对于正则表达式，不同语言有着不同的实现，JavaScript采用的Perl5的语法。对于极少数匹配模式是简单的全字符文本的情况，我们往往会采用indexOf这样的方法，但是多数情况下，匹配模式往往都更为复杂。
<!-- more -->
# 1、语法
1）在JavaScript中我们可以采用内建构造器RegExp()来创建正则表达式的对象；
```js
var re = new RegExp("j.*t")
```
2）当然除了使用RegExp对象，我们可以采用更为简便的正则文本标记法
```js
var re = /j.*t/ 
```
# 2、RegExp对象属性
1、global：  是否打开全局搜索（默认是false，只匹配到第一个）

2、ignoreCase： 设置大小写相关性

3、multiline： 设置是否跨行搜索

4、lastIndex：搜索的开始索引位置，默认为0

5、source： 用于存储正则表达式的匹配模式

除了laseIndex外，上面所有属性在设置之后都不再被修改，也就是说：

```js
var re = /j.*t/ig; 　　
re.global   // true; 　　
re.global = false; 　　
re.global   // true;
```

# 3、RegExp对象的方法
RegExp对象中有两种方法可用于查找匹配内容的方法：test（）和exec（）。这两种方法的参数都是一个字符串，test（）方法返回的是一个布尔值、而exec（）返回的由匹配到字符串所组成的数组。
```js
/j.*t/.test("JavaScript");         //false
/j.*t/i.test("JavaScript");        //true
/j.*t/i.exec("JavaScript")[0];   //"JavaScript"
```
以正则表达式为参数的字符串的方法

1）match()        返回一个包含匹配内容的数组

2）search()      返回的是第一个匹配内容的所在位置

3）replace()  能将匹配的文本替换程指定字符串

4）split()    根据正则分割若干个数组元素

## match()方法
```js
var s = new String('HelloJavaScriptWorld'); 　　
s.match(/a/)     //["a"] 　　
s.match(/a/g)    // ["a","a"]　　
s.match(/j.*a/i) // ["Java"]
```
## search()方法
```js
search方法会返回匹配字符串的索引位置（从0开始）
s.search(/j.*a/i);  //5
```

## replace()方法
replace用于将匹配的文本替换掉
```js
s.replace(/[A-Z]/g,'_$&');   //_Hello_JavaScript_World
```
①$&保留原来匹配对象并在前面加_
②&1表示匹配的第一组以此类推
## split()方法
```js
var csv = "one,two,three,four";
csv.spilt(/\s*,\s*/);   //["one","two","three","four"]
```
①\s*用于匹配0个或者多个空格

# 4、回调式替换
当我们需要执行一些特定的替换操作时，也可以通过返回字符串的函数来完成。
```js
var global；
var callback = function () {
    global = argumens;
　　 return argumens[1] + 'a' + argumens[2] + 'dot' + arguments[3];
}
var re = /(.*)@(.*)\.(.*)/;
"OkayChen@cnblogs.com".replace(re,callback);  //OkayChen at cnblogs dot com
```

# 5、正则匹配模式　
匹配模式 |	相关说明
-|-
[abc] | 匹配的字符类信息 `"Some Text".match(/[otx]/g);   //['o','t','x','t']`
[a-z]	| [a-z]就相当于[abcd],[a-z]就表示我们要匹配所有的小写字母，而[a-zA-Z0-9_]就是匹配所有的字母、数字及下划线`"Some Text".match(/[a-z]/g);   //['o','m','e','e','x','t']`
[^abc]|匹配所有不属于限定范围内的字符`"Some Text".match(/[^a-z]/g);//['S','','T']; `
a｜b	| 这里匹配的是a或者b`"Some Text".match(/t|T/g);//['T','t'];`
a(?=b) | 匹配所有后面跟着b的a的信息`"Some Text".match(/Some(?= Tex)/g);//["some"]`，`"Some Text".match(/Some(?=Tex)/g);　//null`.
a(?！b)	| 匹配所有后面不跟着b的a的信息`"Some Text".match(/Some(?!Tex)/g);//["some"]`，`"Some Text".match(/Some(?! Tex)/g);//null`.
\　| 反斜杠主要用于帮助我们匹配一些模式文本中的特殊字符`"R2-D2".match(/[2\-3]/g);//["2","-","2"]`
\n | 换行符
\r | 回车符
\f | 换页符
\t | 横向制表符
\v | 纵向制表符
\s | 这是匹配的空白符，包含上面五个转义字符`"R2\n D2".match(/\s/g);//["n",""]`
\S | 匹配除空白符以外的内容，就相当于  [^\s]
\w | 匹配所有的字母、数字和下划线，相当于  [A-Za-z0-9_]
\W | 刚好与\w相反
\d | 匹配所有的数字类信息 相当于 [0-9]
\D | 刚好与\d相反
\b | 匹配一个单词的边界，例如空格和标点符号
\B | 刚好与\b相反
[\b] | 匹配的是退格键符（Backspace）
\0 | 这里匹配的是null　　  　　　  
\uoooo | 这里匹配的是一个unicode字符，并且是一个四位16进制数来表示，` "CTOH".match(/\u0441\u0442\u943E/)　　//["CTO"]` 　　　
\x00 | 这里匹配的是一个字符，该字符的编码是一个两位十六进制数来表示的`"dude".match(/x64/g);// ["d","d"]`
^	| 匹配字符串的开头部分，如果设置了m，那就是匹配每一行的开头 
$ | 匹配字符串的结尾部分，如果设置了m，那就是匹配每一行的结尾 
.	| 这里 匹配的是除了换行符以为的任何字符
*	| 这里匹配的是模式中间出现0次或者多次的内容。例如/.*/可以匹配任何内容 
? | 匹配模式中间出现0次或者1次的内容`"anything".match(/ng?/g);   //["ng","n"]`
+	| 这里匹配的是模式中间至少出现一次或者多次的内容`"R2-D2" and C-3PO".match("/[a-z+/gi"); 　//["R","D","and","C","po"]`
{n} | 匹配模式中出现n次的内容`"regular expression".match(/\b\w{3}/g);　　　//["reg","exp"]`
{min,max}	| 匹配模式中间出现次数在min和max之间的信息 ，如果省略了max，则意味着没有最多次数`"goooooooooole".match(/o{2 , }/g);　　//["oo","oo","oo","oo","oo"]`
(pattern)	| 捕获模式`"regular expression".match(/(r)/g , '$1$1' );　　　　 //rregularr exprression`，｀"regular expression".match(/(r)(e)/g , "$2$1");　　  //ergular expression｀
(?:pattern)	| 这不是捕获模式,不能用$1,$2等参数来记录匹配串`"regular expression".match(/(？:r)(e)/g , '$1$1' );//eegular expeession`

　　
上面是《JavaScript面向对象编程指南》附录中30种正则匹配模式，可以分为直接量字符、字符类、复制、选择引用分组、以及指定匹配的位置。

其中有一些等价关系的存在、比如:

\w就相当于[A-Za-z0-9_],

\d相当于[0-9],

\D就相当于[^0-9]或[^\d]

记录这篇正则匹配模式，希望以后自己在用到有需要可以及时翻阅。