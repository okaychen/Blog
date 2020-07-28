---
title: "手起刀落-一起写经典的贪吃蛇游戏"
date: 2017-12-5 23:30
cover: "https://cdn.jsdelivr.net/gh/okaychen/CDN@1.2/BlogSource/gallery/thumb_033.jpg"
comments: true
top: 98
tags:  
    - 小游戏
    - JavaScript
    - Canvas
categories: 
    - JavaScript
---

# 回味

小时候玩的经典贪吃蛇游戏我们印象仍然深刻，策划了几天，小时候喜欢玩的游戏，长大了终于有能力把他做出来(从来都没有通关过，不知道自己写的程序，是不是能通关了...)，好了，闲话不多谈，先来看一下效果吧！！

![效果图](https://cdn.jsdelivr.net/gh/okaychen/CDN@1.2/BlogSource/images/4tjOY7QXHK.gif)

功能和小时候玩的贪吃蛇一样，

>    1.选择速度 ：
>        slow
>        normal
>        fast

>    2.选择是否有墙作为障碍物：
>        on
>        off

看完效果就先附上地址喽：[github](https://github.com/okaychen/practice)，欢迎fork.
<!-- more -->
# 结构分解
如果构建一个简单的经典贪吃蛇游戏呢？我们根据面板可以分解出如下结构：

![面板结构分解](https://cdn.jsdelivr.net/gh/okaychen/CDN@1.2/BlogSource/images/snake1.png)

因为其他面板比较简单，我们重点来看一下游戏面板

## 游戏面板
游戏面板是核心，在游戏面板中，我们来分解一下游戏面板我们需要的因素：
    
![](https://cdn.jsdelivr.net/gh/okaychen/CDN@1.2/BlogSource/images/snake2.png)

### 场景、snake、食物
首先我们需要一个游戏场景、snake、食物这些基础设施
   这里使用canvas作为我们的整个游戏的场景：
```
<canvas class="wrap" id="snake" width="400" height="400" tabindex="1"></canvas>
```
需要一只snake,后面初始化他的位置
```
var activeDot = function (x, y) {
    ctx.fillStyle = "#eee";
    ctx.fillRect(x * 10, y * 10, 10, 10);
}
```
需要食物作为对象(关于食物我们需要定义一些规则，如食物的产生)
```
var food = {
    x: 0,
    y: 0
};
```
### 规则
规则是游戏的核心
    
关于游戏的规则
    
snake的方向控制：(使用键盘的上下左右键控制蛇的方向)
```JavaScript
 // changer dir
    var changeDir = function (key) {
        if (key == 38 && snake_dir != 2) {
            snake_next_dir = 0;
        } else {
            if (key == 39 && snake_dir != 3) {
                snake_next_dir = 1;
            } else {
                if (key == 40 && snake_dir != 0) {
                    snake_next_dir = 2;
                } else {
                    if (key == 37 && snake_dir != 1) {
                        snake_next_dir = 3;
                    }
                }
            }
        }
    }
```
关于食物，如果食物被吃掉，我们就需要产生新的食物
```JavaScript
  // add food
    var addFood = function () {
        food.x = Math.floor(Math.random() * ((canvas.width / 10) - 1));
        food.y = Math.floor(Math.random() * ((canvas.height / 10) - 1));
        for (var i = 0; i < snake.length; i++) {
            // 如果食物被吃就增加食物
            if (checkBlock(food.x, food.y, snake[i].x, snake[i].y)) {
                addFood();
            }
        }
    }

    var checkBlock = function (x, y, _x, _y) {
        return (x == _x && y == _y) ? true : false;
    }

```
接下来是核心的函数，根据选择的速度和是否有墙体作为障碍物的设置，让蛇运动起来，并且实现
    
>   1、根据选择slow、norma、fast决定蛇运动速度速度;

>   2、如果蛇碰到自己==自杀，游戏结束

>   3、有墙模式碰到墙体，游戏结束

>    4、无墙模式蛇穿过墙体，从另一侧出现

>    5、使蛇碰到食物就加入自身身体的一部分，执行增加食物函数

```javascript
 var mainLoop = function () {
        var _x = snake[0].x;
        var _y = snake[0].y;
        snake_dir = snake_next_dir;
        //  0 — up  1 — right   2 — down  3 — left
        switch (snake_dir) {
            case 0:
                _y--;
                break;
            case 1:
                _x++;
                break;
            case 2:
                _y++;
                break;
            case 3:
                _x--;
                break;
        }
        snake.pop();
        snake.unshift({
            x: _x,
            y: _y
        })

        // --wall
        if (wall == 1) {
            if (snake[0].x < 0 || snake[0].x == canvas.width / 10 || snake[0].y < 0 || snake[0].y == canvas.height / 10) {
                showScreen(3);
                return;
            }
        } else {
            //  off 无墙
            for (var i = 0, x = snake.length; i < x; i++) {
                if (snake[i].x < 0) {
                    snake[i].x = snake[i].x + (canvas.width / 10);
                }
                if (snake[i].x == canvas.width / 10) {
                    snake[i].x = snake[i].x - (canvas.width / 10);
                }
                if (snake[i].y < 0) {
                    snake[i].y = snake[i].y + (canvas.height / 10);
                }
                if (snake[i].y == canvas.height / 10) {
                    snake[i].y = snake[i].y - (canvas.height / 10);
                }
            }
        }

        //  Autophagy death
        for (var i = 1; i < snake.length; i++) {
            if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
                showScreen(3);
                return;
            }
        }

        // Eat food
        if (checkBlock(snake[0].x, snake[0].y, food.x, food.y)) {
            snake[snake.length] = {
                x: snake[0].x,
                y: snake[0].y
            };
            score += 1;
            altScore(score);
            addFood();
            activeDot(food.x, food.y);
        }

        // --------------------

        ctx.beginPath();
        ctx.fillStyle = "#111";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // --------------------

        for (var i = 0; i < snake.length; i++) {
            activeDot(snake[i].x, snake[i].y);
        }

        // --------------------

        activeDot(food.x, food.y);

        setTimeout(mainLoop, snake_speed);
    }
```

ok以上展示出一些核心部分，构建出一个舞台中一只小蛇的故事.

<video controls="" src="http://gslb.miaopai.com/stream/9Sve8-3osRBmmpEvONt~uKP-WbvOSRLH.mp4?ssig=3a4333a30009844032269e50b9be79b7&time_stamp=1512196508068&cookie_id=&vend=1&os=3&partner=1&platform=2&cookie_id=&refer=miaopai&scid=9Sve8-3osRBmmpEvONt%7EuKP-WbvOSRLH" loop="false" width="100%" height="420">embed: cat.mov</video>


小时候爸妈手机里有一款小游戏叫贪吃蛇。就是一条小蛇，不停地在屏幕上游走，吃各个方向出现的食物，越吃越长。只要蛇头碰到屏幕四周，或者碰到自己的身子，小蛇就立即毙命。方寸的舞台间，亦有无限精彩；


最后附上源码：[https://github.com/okaychen/practice](https://github.com/okaychen/practice)
在线测试：[PC端浏览器戳我试玩](https://www.chenqaq.com/lab/RetroSnake/index.html)

