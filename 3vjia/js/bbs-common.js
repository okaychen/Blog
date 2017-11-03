var BBS_Com = (function () {
    var Confirm = function(){
        this.template = '<div class="pop-up">' +
            '<div class="popUp-header">' +
            '<span class="pupUp-title">#title#</span>' +
            '<div class="shut"></div>' +
            '</div>' +
            '<div class="popUp-body">' +
            '<div class="remind">#content#</div>' +
            '<button class="pop-y">确定</button>' +
            '<button class="pop-n">取消</button>' +
            '</div>' +
            '</div>';
    }
    Confirm.prototype = {
        init: function(params,success, fail, always) {
            var _self = this;
            var template = _self.template;

            if (params.title) {
                template = template.replace('#title#', params.title);
            } else {
                template = template.replace('#title#', '');
            }

            if (params.msg) {
                template = template.replace('#content#', params.msg);
            } else {
                template = template.replace('#content#', '');
            }

            var $popUp = $(template).css({

            })

            // bind
            $popUp.find('.shut').bind('click', function() {
                $popUp.hide();
            })

            // callback
            if (success) {
                $popUp.find('.pop-y').bind('click', function() {
                    success();
                    $popUp.hide();
                })
            }

            if (fail) {
                $popUp.find('.pop-n').bind('click', function() {
                    fail();
                    $popUp.hide();
                })
            }

            if (always) {
                always();
            }

            $popUp.appendTo($('body'));

        }
    }

    var BBS_Com = {
        Confirm: Confirm
    }

    return BBS_Com;
})()
1
/**参数说明：
 * 根据长度截取先使用字符串，超长部分追加…
 * str 对象字符串
 * len 目标字节长度
 * 返回值： 处理结果字符串
 */
function cutString(str, len) {
    //length属性读出来的汉字长度为1
    if (str.length * 2 <= len) {
        return str;
    }
    var strlen = 0;
    var s = "";
    for (var i = 0; i < str.length; i++) {
        s = s + str.charAt(i);
        if (str.charCodeAt(i) > 128) {
            strlen = strlen + 2;
            if (strlen >= len) {
                return s.substring(0, s.length - 1) + "...";
            }
        } else {
            strlen = strlen + 1;
            if (strlen >= len) {
                return s.substring(0, s.length - 2) + "...";
            }
        }
    }
    return s;
}


//取得cookie    
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');    //把cookie分割成组    
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];                      //取得字符串    
        while (c.charAt(0) == ' ') {          //判断一下字符串有没有前导空格    
            c = c.substring(1, c.length);      //有的话，从第二位开始取    
        }
        if (c.indexOf(nameEQ) == 0) {       //如果含有我们要的name    
            return unescape(c.substring(nameEQ.length, c.length));    //解码并截取我们要值    
        }
    }
    return false;
}

//清除cookie    
function clearCookie(name) {
    setCookie(name, "", -1);
}

//设置cookie    
function setCookie(name, value, seconds) {
    seconds = seconds || 0;   //seconds有值就直接赋值，没有为0，这个根php不一样。    
    var expires = "";
    if (seconds != 0) {      //设置cookie生存时间    
        var date = new Date();
        date.setTime(date.getTime() + (seconds * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    document.cookie = name + "=" + escape(value) + expires + "; path=/";   //转码并赋值    
}

function htmlTemplate(template, data, allowEmpty, chats) {
    if (template != undefined) {
        var regExp;
        chats = chats || ['\\$\\{', '\\}'];
        regExp = [chats[0], '([_\\w]+[\\w\\d_]?)', chats[1]].join('');
        regExp = new RegExp(regExp, 'g');
        return template.replace(regExp,
            function (s, s1) {
                if (data[s1] != null && data[s1] != undefined) {
                    return data[s1];
                } else {
                    return allowEmpty ? '' : s;
                }
            });
    }
}
///检查手机号码
function checkMobile(mobile) {
    var isMobile = /^(15|13|18|17|14)\d{9}$/; //手机号码验证规则
    return isMobile.test(mobile);
}
//检查验证码we

function checkCode(code) {
    var pattern = /^[a-zA-Z0-9]{4}$/; 
    return pattern.test(code);
}

layer.config({
    skin: 'demo-class',
    width: 300,
    title: ' ',
})
function delHtmlTag(str) {
    if (str != null && str.length > 0) {
        return str.replace(/<[^>]+>/g, "");//去掉所有的html标记
    } else {
        return "";
    }
}
function SetPageActive(value) {
    $(".pagination li").removeClass("active");
    $(".pagination li").each(function () {
        if (value == $(this).find("a").text()) {
            $(this).addClass("active");
            return false;
        }
    })
}
function formatSeconds2(min) {
    a = min * 60;
    var hh = parseInt(a / 3600);
    if (hh < 10) hh = "0" + hh;
    var mm = parseInt((a - hh * 3600) / 60);
    if (mm < 10) mm = "0" + mm;
    var ss = parseInt((a - hh * 3600) % 60);
    if (ss < 10) ss = "0" + ss;
    var length = hh + ":" + mm + ":" + ss;
    if (a > 0) {
        return length;
    } else {
        return "NaN";
    }
}
/**
 * 返回指定format的string
 * format eg:'yyyy-MM-dd hh:mm:ss'
 **/
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

/**参数说明：
 * 根据长度截取先使用字符串，超长部分追加…
 * str 对象字符串
 * len 目标字节长度
 * 返回值： 处理结果字符串
 */
function cutString(str, len) {
    //length属性读出来的汉字长度为1
    if (str.length * 2 <= len) {
        return str;
    }
    var strlen = 0;
    var s = "";
    for (var i = 0; i < str.length; i++) {
        s = s + str.charAt(i);
        if (str.charCodeAt(i) > 128) {
            strlen = strlen + 2;
            if (strlen >= len) {
                return s.substring(0, s.length - 1) + "...";
            }
        } else {
            strlen = strlen + 1;
            if (strlen >= len) {
                return s.substring(0, s.length - 2) + "...";
            }
        }
    }
    return s;
}
function getDateTimeStamp(dateStr) {
    return Date.parse(dateStr.replace(/-/gi, "/"));
}
//JavaScript函数：
var minute = 1000 * 60;
var hour = minute * 60;
var day = hour * 24;
var halfamonth = day * 15;
var month = day * 30;
function getDateDiff(dateTimeStamp) {
    var now = new Date().getTime();
    var diffValue = now - dateTimeStamp;
    if (diffValue < 0) {
        //若日期不符则弹出窗口告之
        //alert("结束日期不能小于开始日期！");
    }
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;
    if (monthC >= 1) {
        result = "发表于" + parseInt(monthC) + "个月前";
    }
    else if (weekC >= 1) {
        result = "发表于" + parseInt(weekC) + "周前";
    }
    else if (dayC >= 1) {
        result = "发表于" + parseInt(dayC) + "天前";
    }
    else if (hourC >= 1) {
        result = "发表于" + parseInt(hourC) + "个小时前";
    }
    else if (minC >= 1) {
        result = "发表于" + parseInt(minC) + "分钟前";
    } else
        result = "刚刚发表";
    return result;
}
$(document).ready(function () {
    $("#btnSeach").bind("click", function () {
        var keyword = $(this).next().find("input").val();
        if (keyword != "" && keyword.length > 0) {
             window.open("/Home/Search?keyword=" + encodeURI(keyword));
        } else {
            window.open("/Home/Search");
        }
    })
})
function iphoneCheck(mobile) {
    var re = /^[1][34587]\d{9}$/;//手机号码验证正则表达式
    if (re.test(mobile)) {
        var myphone = mobile.substr(3, 4);
        return mobile.replace(myphone, "****");
    } else {
        return mobile;
    }
}
//点击图片显示大图方法
function imgShow(outerdiv, innerdiv, bigimg, _this) {
    var src = _this.attr("src");//获取当前点击的pimg元素中的src属性  
    $(bigimg).attr("src", src);//设置#bigimg元素的src属性  

    /*获取当前点击图片的真实大小，并显示弹出层及大图*/
    $("<img/>").attr("src", src).load(function () {
        var windowW = $(window).width();//获取当前窗口宽度  
        var windowH = $(window).height();//获取当前窗口高度  
        var realWidth = this.width;//获取图片真实宽度  
        var realHeight = this.height;//获取图片真实高度  
        var imgWidth, imgHeight;
        var scale = 0.9;//缩放尺寸，当图片真实宽度和高度大于窗口宽度和高度时进行缩放  

        if (realHeight > windowH * scale) {//判断图片高度  
            imgHeight = windowH * scale;//如大于窗口高度，图片高度进行缩放  
            imgWidth = imgHeight / realHeight * realWidth;//等比例缩放宽度  
            if (imgWidth > windowW * scale) {//如宽度扔大于窗口宽度  
                imgWidth = windowW * scale;//再对宽度进行缩放  
            }
        } else if (realWidth > windowW * scale) {//如图片高度合适，判断图片宽度  
            imgWidth = windowW * scale;//如大于窗口宽度，图片宽度进行缩放  
            imgHeight = imgWidth / realWidth * realHeight;//等比例缩放高度  
        } else {//如果图片真实高度和宽度都符合要求，高宽不变  
            imgWidth = realWidth;
            imgHeight = realHeight;
        }
        $(bigimg).css("width", imgWidth);//以最终的宽度对图片缩放  

        var w = (windowW - imgWidth) / 2;//计算图片与窗口左边距  
        var h = (windowH - imgHeight) / 2;//计算图片与窗口上边距  
        $(innerdiv).css({ "top": h, "left": w });//设置#innerdiv的top和left属性  
        $(outerdiv).fadeIn("fast");//淡入显示#outerdiv及.pimg  
    });
}

//首页轮播
//$(function () {
//    function lunbo() {
//        var $panelbody = $('.r-panel .panel-body');
//        var $paneltabs = $panelbody.find('.panel-tab');
//        var $ctrl = $panelbody.find('.ctrl');
//        var len = $paneltabs.length;
//        var selectedIndex = $ctrl.find('.on').data('index');
//        if (len == 1) {
//            clearInterval(start);
//            return;
//        }
//        if (selectedIndex == len-1) {
//            selectedIndex = 0;
//        } else {
//            selectedIndex += 1;
//        }
//        $paneltabs.hide();
//        $ctrl.find('li').removeClass('on');
//        $paneltabs.eq(selectedIndex).fadeIn();
//        $ctrl.find('li').eq(selectedIndex).addClass('on');
//    }


//    var start = setInterval(lunbo, 3000);
//        $panelbody = $('.r-panel .panel-body'),
//        $ctrlli = $('.r-panel .panel-body').find('li');
//    $ctrlli.bind('mouseover', function () {
//        clearInterval(start);
//        var index = $(this).data('index');
//        var paneltab = $panelbody.find('.panel-tab').eq(index)
//        console.log(paneltab)
//    })
//    $ctrlli.bind('mouseleave', function () {
//        start = setInterval(lunbo, 3000);
//    })
//})
//右侧固定的操作
$(function () {
    $(window).scroll(function () {
        if ($(window).scrollTop() > 100) {  //距顶部100像素时，出现返回顶部按钮
            $("#side-bar .gotop").fadeIn();
        }
        else {
            $("#side-bar .gotop").hide();
        }
    });
    $("#side-bar .gotop").click(function () {
        $('html,body').animate({ 'scrollTop': 0 }, 500); //返回顶部动画 数值越小时间越短
    });

    var ruzhuBtn = $('.ruzhu');
    var proxyBtn = $('.weibo');
    //var bannerContact = $('.bannerContact')
    var bannerContact = $('.intention');

    //var proxy = $('.proxy')
    var proxy = $('.proxy1');
    var closeBtn1 = bannerContact.find('.title i')
    var closeBtn2 = proxy.find('.title i')
    ruzhuBtn.on('click', function () {
        proxy.fadeOut();
        //bannerContact.is(':hidden') ? $('.bannerContact').fadeIn() : $('.bannerContact').fadeOut();
        bannerContact.is(':hidden') ? bannerContact.fadeIn() : bannerContact.fadeOut();
    });
    closeBtn1.on('click', function () {
        bannerContact.fadeOut();
    });
    proxyBtn.on('click', function () {
        $('.bannerContact').fadeOut()
        proxy.is(':hidden') ? proxy.fadeIn() : proxy.fadeOut();
    });
    closeBtn2.on('click', function () {
        proxy.fadeOut();
    });
    bannerContact.on('click', function (e) {
        e.stopPropagation()
    });
    proxy.on('click', function (e) {
        e.stopPropagation()
    });
    //首页入驻预约
    var isTel = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/
    var isMobile = /(^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$)/;
    function submitB() {
        var _guestType = $('.BselectWrap').find("input:checked");

        var _guestName = $.trim($('#Busername').val());
        var _mobile = $.trim($('#Busertel').val());
        var _guestSource = $.trim($('#pageTop').val());
        if (_guestType.length < 1) {
            $('.BerrorInfor').text("请选择您的身份！");
            $('.BerrorInfor').get(0).style.display = "block";
            return false;
        }

        var _funModule = "";
        $(".ideaWrap").find("input[type=checkbox]:checked").each(function () {
            _funModule += $(this).val() + ",";
        });
        if (_funModule.length <= 0) {
            $('.BerrorInfor').text("请选择意向购买模块！");
            $('.BerrorInfor').get(0).style.display = "block";
            return false;
        }
        _funModule = _funModule.substring(0, _funModule.length - 1);

        if (_guestName == '') {
            $('.BerrorInfor').text("请填写您的真实姓名！");
            $('.BerrorInfor').get(0).style.display = "block";
            return false;
        }
        if (_mobile == '') {
            $('.BerrorInfor').text("请填写您的手机号码！");
            $('.BerrorInfor').get(0).style.display = "block";
            return false;
        }
        if (_mobile.substring(0, 2) == "13" || _mobile.substring(0, 2) == "14" || _mobile.substring(0, 2) == "15" || _mobile.substring(0, 2) == "17" || _mobile.substring(0, 2) == "18") {
            if (!isMobile.test(_mobile)) {
                $('.BerrorInfor').text("您填写手机号码格式错误！");
                $('.BerrorInfor').get(0).style.display = "block";
                return false;
            }
        }
        else {
            if (!isTel.test(_mobile)) {
                $('.BerrorInfor').text("您填写座机号码格式错误！");
                $('.BerrorInfor').get(0).style.display = "block";
                return false;
            }
        }

        $(".JS_Bsub").val("正在提交申请...");
        $(".JS_Bsub").css("background-color", "#e2e2e2");
        $(".JS_Bsub").attr("disabled", "disabled");
        $.post("www.3vjia.com/home/CreateGuestAppointment", { appointmentType: _guestType.val(), guestName: _guestName, mobile: _mobile, guestSource: _guestSource, buyModule: _funModule }, function (data) {
            if (data == "Existing") {
                $('.BerrorInfor').text("您当天已经申请过预约！");
                $('.BerrorInfor').get(0).style.display = "block";

                $(".JS_Bsub").val("提交");
                $(".JS_Bsub").css("background-color", "#3771d4");
                $(".JS_Bsub").removeAttr("disabled");
                return;
            }

            if (data != null && data != "") {
                SetCustomer("Intention", _mobile, _guestName, _guestType.val(), _funModule);
                $('.BerrorInfor').get(0).style.display = "none";
                $('.submitWrap').get(0).style.display = "none";
                $('.submitOver').get(0).style.display = "block";

                //清空填写内容
                $('.BerrorInfor').text("温馨提示：请填写完整信息再提交");
                $('.BselectWrap').find("input:checked").removeAttr("checked");
                $('#Busername').val("");
                $('#Busertel').val("");

                setTimeout("$('.bannerContact').css('display', 'none')", 3000)
            }
            else {
                $('.BerrorInfor').text("服务器繁忙,请您稍后提交！");
                $('.BerrorInfor').get(0).style.display = "block";
            }

            $(".JS_Bsub").val("提交");
            $(".JS_Bsub").css("background-color", "#3771d4");
            $(".JS_Bsub").removeAttr("disabled");
        });
    }

    //预约操作
    $('.JS_Bsub').click(function () {
        submitB();
    });
    //申请成为代理商
    function submitP() {
        var _guestName = $.trim($('#proxyusername').val());
        var _mobile = $.trim($('#proxyusertel').val());
        var _guestSource = $.trim($('#pageTop').val());
        if (_guestName == '') {
            $('.proxyerrorInfor').text("请填写您的昵称！");
            $('.proxyerrorInfor').get(0).style.display = "block";
            return false;
        }
        if (_mobile == '') {
            $('.proxyerrorInfor').text("请您填写手机号码！");
            $('.proxyerrorInfor').get(0).style.display = "block";
            return false;
        }
        if (_mobile.substring(0, 2) == "13" || _mobile.substring(0, 2) == "14" || _mobile.substring(0, 2) == "15" || _mobile.substring(0, 2) == "17" || _mobile.substring(0, 2) == "18") {
            if (!isMobile.test(_mobile)) {
                $('.proxyerrorInfor').text("您填写手机号码格式错误！");
                $('.proxyerrorInfor').get(0).style.display = "block";
                return false;
            }
        }
        else {
            if (!isTel.test(_mobile)) {
                $('.proxyerrorInfor').text("您填写座机号码格式错误！");
                $('.proxyerrorInfor').get(0).style.display = "block";
                return false;
            }
        }

        $(".JS_Psub").val("正在提交申请...");
        $(".JS_Psub").css("background-color", "#e2e2e2");
        $(".JS_Psub").attr("disabled", "disabled");
        $.post("/home/CreateGuestApplyForAgent", { guestName: _guestName, mobile: _mobile, guestSource: _guestSource }, function (data) {
            if (data == "Existing") {
                $('.proxyerrorInfor').text("您当天已经申请过预约！");
                $('.proxyerrorInfor').get(0).style.display = "block";

                $(".JS_Psub").val("提交");
                $(".JS_Psub").css("background-color", "#3771d4");
                $(".JS_Psub").removeAttr("disabled");
                return;
            }

            if (data != null && data != "") {
                SetCustomer("Agent", _mobile, _guestName, "none", "0");
                $('.proxyerrorInfor').get(0).style.display = "none";
                $('.proxySub').get(0).style.display = "none";
                $('.applyId').get(0).style.display = "block";

                //清空填写内容
                $('.proxyerrorInfor').text("温馨提示：请填写完整再提交");
                $('#proxyusername').val("");
                $('#proxyusertel').val("");

                setTimeout("$('.bannerContact').css('display', 'none')", 3000)
            }
            else {
                $('.proxyerrorInfor').text("服务器繁忙,请您稍后提交！");
                $('.proxyerrorInfor').get(0).style.display = "block";
            }

            $(".JS_Psub").val("提交");
            $(".JS_Psub").css("background-color", "#3771d4");
            $(".JS_Psub").removeAttr("disabled");
        });
    }

    //预约操作
    $('.JS_Psub').click(function () {
        submitP();
    });
});
//跟李波对接， 注册，沟通入驻，代理，云量尺等同步数据
function SetCustomer(dataSource, mobile, nickName, userType, buyModule) {
    $.ajax({
        type: "get",
        data: { DataSource: dataSource, Mobile: mobile, NickName: nickName, UserType: userType, BuyModule: buyModule, Addtime: "" },
        async: false,
        url: "http://xm.3vjia.cn/api/Getcustomer",
        dataType: "jsonp",//数据类型为jsonp  
        success: function (data) { },
        error: function () { }
    });
}