//okayChen(9月9日)
//这里不要在写window.onload;会和canvas.js中的冲突
var mapNavWrapper = document.querySelector('#mapNavWrapper');   //导航图
var createMapNav = document.querySelector('.createMapNav');     //导航图放大
var mapNavHeaderI = document.querySelector('.mapNav-header-i'); //导航图复原

var mapResultWrapper = document.querySelector('.mapResultWrapper'); //效果图
var createMapResult = document.querySelector('.createMapResult');   //效果图放大
var mapResultHeaderI = document.querySelector('.mapResult-header-i');   //效果图复原

var mapList = document.querySelector('.map-list');

var x = 0, y = 0;
var timer;
//导航图 <复杂值>
var mapMove = {
    maxRight: 0, //具右边最大为0
    minRight: -202,//具右边最小，多出2px使完全溢出
    //导航图放大移动
    navRight: function () {
        x = x + 1;
        createMapResult.style.top = 100 + 6 * x + 'px';     //效果图放大后下移动
        mapResultWrapper.style.top = 100 + 6 * x + 'px';    //效果图下移动
        createMapNav.style.right = -200 + 10 * x + 'px';
        //根据效果图判断是否移动mapList
        if (mapResultWrapper.style.right < 0 + 'px') {
            mapList.style.marginRight = 40 + 10 * x + 'px';
        }
        //移动到页面后停止
        if (parseInt(createMapNav.style.right) > mapMove.maxRight) {
            clearInterval(timer);   //清除定时器
            createMapNav.style.right = mapMove.maxRight + 'px';
            x = 0;   //[必须] 重置x，以便让动画重复进行
        }
    },
    navLeft: function () {
        y = y + 1;
        createMapResult.style.top = 220 - 6 * y + 'px';
        mapResultWrapper.style.top = 220 - 6 * y + 'px';
        createMapNav.style.right = -10 * y + 'px';
        //根据效果图判断是否移动mapList
        if (mapResultWrapper.style.right < 0) {
            mapList.style.marginRight = 290 - 10 * y + 'px';
        }
        if (parseInt(createMapNav.style.right) < mapMove.minRight) {
            clearInterval(timer);   //清除定时器
            createMapNav.style.right = mapMove.minRight + 'px';
            if (mapResultWrapper.style.right < 0) {
                mapList.style.marginRight = 90 + 'px';
            }
            y = 0;   //[必须] 重置y
        }
    },
    //效果图放大移动
    resultRight: function () {
        x = x + 1;
        createMapResult.style.right = -200 + 10 * x + 'px';
        //根据导航图判断是否移动mapList
        if (createMapNav.style.right < 0 + 'px') {
            mapList.style.marginRight = 40 + 10 * x + 'px';
        }
        /*console.log(createMapNav.style.right);*/
        //移动到页面后停止
        if (parseInt(createMapResult.style.right) > mapMove.maxRight) {
            clearInterval(timer);   //清除定时器
            createMapResult.style.right = mapMove.maxRight + 'px';
            x = 0;
        }
    },
    resultLeft: function () {
        y = y + 1;
        createMapResult.style.right = -10 * y + 'px';
        //根据导航图判断是否移动mapList
        if (createMapNav.style.right < 0 + 'px') {
            mapList.style.marginRight = 290 - 10 * y + 'px';
        }
        if (parseInt(createMapResult.style.right) < mapMove.minRight) {
            clearInterval(timer);   //清除定时器
            createMapResult.style.right = mapMove.minRight + 'px';
            if (createMapNav.style.right < 0) {
                mapList.style.marginRight = 90 + 'px';
            }
            y = 0;
        }
    }
};

//导航图注册事件
mapNavWrapper.addEventListener('click', function (e) {
    clearInterval(timer);
    timer = setInterval(mapMove.navRight, 30);
}, false); //默认false执行事件冒泡
mapNavHeaderI.addEventListener('click', function (e) {
    timer = setInterval(mapMove.navLeft, 30)
}, false);
//效果图注册事件
mapResultWrapper.addEventListener('click', function (e) {
    clearInterval(timer);
    timer = setInterval(mapMove.resultRight, 30);
});
mapResultHeaderI.addEventListener('click', function (e) {
    timer = setInterval(mapMove.resultLeft, 30);
});


/********(***********选项卡**************)*****/
function tabChange(item, tab, active) {
    for (var i = 0; i < item.length; i++) {
        item[i].index = i;   //给每个按钮添加一个索引值，让每一按钮的序号，等于它自己的下标
        item[i].onclick = function () {
            for (var i = 0; i < item.length; i++) {
                item[i].classList.remove(active);
                tab[i].style.display = 'none';
            }
            this.classList.add(active);
            tab[this.index].style.display = 'block';
        }
    }
}

var leftBarItem = document.querySelectorAll('.leftBar-item');
var leftBarTab = document.querySelectorAll('.leftBar-tab');
tabChange(leftBarItem, leftBarTab, 'leftBar-active');

var cloudAsideItem = document.querySelectorAll('.cloud-aside-item');
var leftBarAsideTab = document.querySelectorAll('.leftBar-aside-tab');
tabChange(cloudAsideItem, leftBarAsideTab, 'aside-tab-active');


