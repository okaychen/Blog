---
title: css标准盒模型、怪异模式&&box-sizing属性
date: 2017-12-09 23:33:26
comments: true
tags:
    - CSS
    - layout
categories:
    - HTML/CSS
---
# 盒模型

## DTD规范

盒模型分为：标准w3c盒模型、IE盒模型、以及css中的伸缩盒模型

当我们使用编辑器创建一个html页面时，我们一定会发现最顶上的`DOCTYPE`标签

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">

<!DOCTYPE HTML>
```
>上面这些doctype都是标准的文档类型，无论我们使用哪种模式都会触发标准模式，而如果doctype缺失，则在ie6、ie7、ie8将会触发怪异模式(quirks);

一旦为页面设置了恰当的`DTD(文档定义类型)`,大多数浏览器都会按照标准盒模型来呈现内容，但是ie5和ie6的呈现却是不正确的.

根据w3c规范，元素内容占据空间是由`width`属性设置的，而内容周围的padding和border都是另外计算的。

不幸的是，IE5.X 和 6 在怪异模式中使用自己的非标准模型。这些浏览器的 width 属性不是内容的宽度，而是内容、内边距和边框的宽度的总和。

## 举个栗子

我们用一个div块来演示标准模式和怪异模式的区别：
```css
.box{
    width:200px;
    height:200px;
    border:20px solid black;
    padding:50px;
    margin:50px;
}
```
### 标准盒模型

在标准模式下的盒模型如下图所示，盒子总宽度/高度=width/height+padding+border+margin

![标准盒模型](http:www.chenqaq.com/assets/images/box-model1.png)

### 怪异模式

在怪异模式下的盒模型如下图所示，盒子的总宽度和高度是包含内边距padding和边框border宽度在内的

盒子总宽度/高度=width/height + margin = 内容区宽度/高度 + padding + border + margin;

也即是说 `width = 内容区宽度 + padding + border`

![怪异盒模型](http:www.chenqaq.com/assets/images/box-model2.png)

# CSS3的box-sizing属性

语法：

```CSS
box-sizing : content-box || border-box || inherit;
```

- 当设置为content-box时，将采取标准模式进行解析计算
- 当设置为border-box时，将采取怪异模式解析计算






