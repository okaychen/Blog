//var App = {};
$(function () {
    //当页面加载的时候未登录的状态处理
    if ($(".h_mname").length > 0 && $(".h_mname_1").text() == "1") {
        //首页按钮
        $(".banner-text").find("a").attr("href", App.HttpPrefix + "admin.3vjia.com/3D/v2/default.aspx");
        //云设计页面按钮
        $(".designfl").find(".active").attr("href", App.HttpPrefix + "admin.3vjia.com/3D/v2/default.aspx");
        $(".startBtn").attr("href", App.HttpPrefix + "admin.3vjia.com/3D/v2/default.aspx");
        $(".workBtn").attr("href", App.HttpPrefix + "admin.3vjia.com/mnmnh/mywork.aspx");
    } else {//未登录状态

    }

    // $("#mainTop").val() 为了区分新头部和旧头部兼容，避免新头部走两次/Member/Store/UserProfile
    if ($(".h_mname").length > 0 && $("#mainTop").val() == undefined) {
        $(function () {
            $.post("/Member/Store/UserProfile", {}, function (data) {
                if (data == null) {
                    //登录出错清理所有Cookie
                    $.post("/Account/Logout", {}, function () {
                        location.href = "/home/index"
                    });
                    return;
                }

                $("#Favories").text(data.Favories);
                $("#Collects").text(data.Collects);
                $("#orders").text(data.orders);

                var headico = data.HeadIco;
                var AccountType = $('#accountType').val();
                var imgSrc = $('#imgSrc').val();
                if (headico.indexOf("http") == 0)
                { $(".h_pic").html("<a href='/Member/MemberIndex/Index' target='_blank'><img src=" + headico + " onerror=\"this.src='/Content/images/mark_03.png'\" /></a>"); }
                else
                { $(".h_pic").html("<a href='/Member/MemberIndex/Index' target='_blank'><img src='" + imgSrc + "" + headico + "x' onerror=\"this.src='/Content/images/mark_03.png'\"/></a>"); }


                var domain = data.Domain;
                if (AccountType == 1)
                { $(".h_handle").html("<a href='" + domain + "' target='_blank'>店铺主页</a><span class='string'>|</span><a href='/Account/Logout' id='btnExit'>退出</a>"); }
                else
                { $(".h_handle").html("<a href='/Account/Logout' id='btnExit'>退出</a>"); }
            }, "json")
            .error(function () {
                //$.post("/Account/Logout");  //登录出错清理所有Cookie
            })
        })
        //$("#btnExit").click(function () { QC.Login.signOut(); });
    }
});
//内页头部搜索代码
$(function () {

    //控制头部导航的激活选项卡
    var url = new Array();
    var navList = $(".nav ul>li");
    var activeNum = 0;
    navList.each(function (i) {
        url[i] = $(this).find('a').attr('href');
        $(this).removeClass("active");
    });
    navList.each(function (i) {
        var url1 = $.trim(window.location.pathname).toLowerCase();
        if (url1 == '/') {
            navList.eq(0).addClass('active');
        }
        switch (url1) {
            case '/home/index':
                navList.eq(0).addClass('active');
                break;
            case '/designartifact/contentcenter':
                navList.eq(1).addClass('active');
                break;
            case '/pmc/scheme/panorama':  
                navList.eq(2).addClass('active');
                break;
            case 'http://mx.3vjia.com/':
                navList.eq(3).addClass('active');
                break;
            case 'http://fw.3vjia.com':
                navList.eq(4).addClass('active');
                break;
            case 'http://bbs.3vjia.com/':
                navList.eq(5).addClass('active');
                break;
            case '/pmc/decorate/index':
            case '/pmc/scheme/sscheme':
            case '/pmc/scheme/mscheme':
            case '/pmc/scheme/bscheme':
            case '/pmc/building/index':
            case '/pmc/store/index':
            case '/pmc/neighbor/index':
            case '/seo/index':
            case '/seo/seolist':
            case '/seo/seodetail':
                navList.eq(6).addClass('active');
                break;
            case '/about/index':
                navList.eq(7).addClass('active');
                break;
            default:
                break;
        }
        if (navList.eq(i).hasClass('active')) {
            activeNum = i;
        }
    });
    navList.hover(function () {
        $(this).addClass('active').siblings().removeClass('active');
    }, function () {
        $(this).removeClass('active');
        navList.eq(activeNum).addClass('active');
    });

});
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

        $.post("/home/CreateGuestAppointment", { appointmentType: _guestType.val(), guestName: _guestName, mobile: _mobile, guestSource: _guestSource, buyModule: _funModule }, function (data) {
            if (data == "Existing") {
                $('.BerrorInfor').text("您当天已经申请过预约！");
                $('.BerrorInfor').get(0).style.display = "block";

                $(".JS_Bsub").val("提交");
                $(".JS_Bsub").css("background-color", "#3771d4");
                $(".JS_Bsub").removeAttr("disabled");
                return;
            }

            if (data != null && data != "") 
            {
                //SetCustomer("Intention",_mobile,_guestName, _guestType.val(),_funModule);
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


    //云量尺-购买登记
    $('.btnCloudCoverBuy').click(function () {
        var _guestType = $.trim($('#pageType').val()); 
        var _guestSource = $.trim($('#pageSource').val());
        var _guestName = $.trim($('#username').val());
        var _mobile = $.trim($('#usertel').val());
        var _funModule = $.trim($('#funModule').val()); 
        if (_guestName == '') {
            $('.proxyerrorInfor').text("请填写您的真实姓名！");
            $('.proxyerrorInfor').css("display", "block");
            return false;
        }
        if (_mobile == '') {
            $('.proxyerrorInfor').text("请填写您的手机号码！");
            $('.proxyerrorInfor').css("display", "block");
            return false;
        }

        //为了判断座机，故此先截图
        if (_mobile.substring(0, 2) == "13" || _mobile.substring(0, 2) == "14" || _mobile.substring(0, 2) == "15" || _mobile.substring(0, 2) == "17" || _mobile.substring(0, 2) == "18") {
            if (!isMobile.test(_mobile)) {
                $('.proxyerrorInfor').text("您填写手机号码格式错误！");
                $('.proxyerrorInfor').css("display", "block");
                return false;
            }
        }
        else {
            if (!isTel.test(_mobile)) {
                $('.proxyerrorInfor').text("您填写座机号码格式错误！");
                $('.proxyerrorInfor').css("display", "block");
                return false;
            }
        }
        
        $(".btnCloudCoverBuy").val("正在提交申请...");
        $(".btnCloudCoverBuy").css("background-color", "#e2e2e2");
        $(".btnCloudCoverBuy").attr("disabled", "disabled");
        $.post("/home/CreateGuestAppointment", { appointmentType: _guestType, guestName: _guestName, mobile: _mobile, guestSource: _guestSource, buyModule: _funModule }, function (data) {
            if (data == "Existing") {
                $('.proxyerrorInfor').text("您当天已经申请过购买！");
                $('.proxyerrorInfor').css("display", "block");

                $(".btnCloudCoverBuy").val("登记购买");
                $(".btnCloudCoverBuy").css("background-color", "#3771d4");
                $(".btnCloudCoverBuy").removeAttr("disabled");
                return;
            }
            if (data != null && data != "") {
                //SetCustomer("CloudCover", _mobile, _guestName, "none", "0");
                $('.proxyerrorInfor').css("display", "none");
                $('.tanKuangBuy').css("display", "none");
                $('.submitOver').css("display", "block");
                $("html").css("overflow", "auto");

                //清空填写内容
                $('.proxyerrorInfor').text("温馨提示：请填写完整信息再提交");
                $('#username').val("");
                $('#usertel').val("");
                setTimeout("$('.submitOver').css('display', 'none')",3000)
            }
            else {
                $('.proxyerrorInfor').text("服务器繁忙,请您稍后提交！");
                $('.proxyerrorInfor').css("display", "block");
            }

            $(".btnCloudCoverBuy").val("登记购买");
            $(".btnCloudCoverBuy").css("background-color", "#3771d4");
            $(".btnCloudCoverBuy").removeAttr("disabled");
        });
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
                //SetCustomer("Agent", _mobile, _guestName, "none", "0");
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

//BizQQWPA.addCustom({ aty: '1', a: '1003', nameAccount: 4008090630, selector: 'BizQQWPA' });
//BizQQWPA.addCustom({ aty: '1', a: '1003', nameAccount: 4008090630, selector: 'BizQQWPA1' });
//BizQQWPA.addCustom({ aty: '1', a: '1003', nameAccount: 4008090630, selector: 'BizQQWPA2' });
//BizQQWPA.addCustom({ aty: '2', a: '1003', nameAccount: 800819418, selector: 'BizQQWPA98' });
//点击分享按钮 分享列表出现
$(function () {
    var shareBol = true;
    var mobile = '';
    $(document).delegate('.j_open-share', 'click', function (event) {
        var w = $(this).attr("data-width");
        var h = $(this).attr("data-height");
        var wh = w ? w : 80;
        var ht = h ? h : 80;
        event.preventDefault();
        if (shareBol) {
            $(this).parent().children('.share').css('display', 'block');
            //微信分享
            var url = App.HttpPrefix + 'www.3vjia.com' + $(this).parents('.shareCont').find('.shareUrl').val();
            //方案库分享
            if ($.trim(window.location.pathname).toLowerCase().indexOf('scheme') != -1) {
                if ($.trim(window.location.pathname).toLowerCase().indexOf('imagedetail') != -1) {
                    mobile = window.location.href;
                } else {
                    mobile = App.HttpPrefix + 'www.3vjia.com/app/caseDetail.html?SchemeId=' + $(this).parents('.shareCont').find('.shareId').val();
                    //mobile = 'https://admin.3vjia.com/PMC/Panorama/Show360Test.aspx?SchemeId=' + $(this).parents('.shareCont').find('.shareId').val();
                }
            } else if ($.trim(window.location.pathname).toLowerCase().indexOf('neighbor') != -1) {//全屋方案分享
                mobile = window.location.href;
            }
            $(this).parents('.shareCont').find("#code").html('');
            $(this).parents('.shareCont').find("#code").qrcode({
                render: "canvas", //table方式 
                width: wh, //宽度 
                height: ht, //高度 
                text: mobile //任意内容 
            });
            shareBol = false;
        }
        else {
            $(this).parent().children('.share').css('display', 'none');
            shareBol = true;
        }
    });

    // 鼠标移出 分享列表消失
    $(document).on('mouseleave', '.program_detail,.program_bigdetails,.item,.m-scheme ul li,.lj_pic_main', function () {
        $(this).children().find('.share').css('display', 'none');
        shareBol = true;
    });
})

// 点击按钮 收藏 再次点击 取消收藏
$(function () {
    $(document).delegate('.fav_btn', 'click', function (event) {
        event.stopPropagation();
        var jqObj = $(this);
        if ($(".h_mname").length <= 0) {//未登录状态
            $("#loginpop").show();
        } else {
            var collectBol = jqObj.attr("collectScheme"); //是否收藏标识
            if (collectBol == 1) {
                jqObj.removeClass('fav').addClass('fav_active').html('<i></i>已收藏');
                $.msgBoxObj.showInfo('您已收藏了该方案~');
                return;
            } else {
                var schemeId = jqObj.attr("datavaule");  //方案Id
                $.post("/PMC/Scheme/Collect", { objectId: schemeId, moduleName: 'Platform_DesignScheme_Like' }, function (data) {
                    if (data.Status != 5) {
                        jqObj.removeClass('fav').addClass('fav_active').html('<i></i>已收藏');
                        jqObj.attr("collectScheme", "1");
                    }
                    $.msgProcess(data);
                }, "json");
            }
        }
    });
})

// 点击按钮 复制 再次点击 提示已复制
$(function () {
    if ($(".copy_btn").attr("copyScheme") == 1) {
        $(".copy_btn").attr("copyScheme").attr("disabled", "disabled");
    }
    $(document).delegate('.copy_btn', 'click', function (event) {
        event.stopPropagation();
        var jqObj = $(this);
        if ($(".h_mname").length <= 0) {//未登录状态
            $("#loginpop").show();
        } else {
            var collectBol = jqObj.attr("copyScheme"); //是否收藏标识
            if (collectBol == 1) {
                jqObj.removeClass('copy').addClass('copy_active').html('<i></i>已复制');
                jqObj.attr("disabled", "disabled");

                layer.confirm('此全景方案您已经复制过了，确定再次复制吗？', {
                    btn: ['确定', '取消'] //按钮
                }, function () {
                    var schemeId = jqObj.attr("datavaule");  //方案Id
                    $.post("/PMC/Scheme/Copy", { SchemelId: schemeId }, function (data) {
                        if (data.Status != 5) {
                            jqObj.removeClass('copy').addClass('copy_active').html('<i></i>已复制');
                            jqObj.attr("copyScheme", "1");
                        }
                        $.msgProcess(data);
                    }, "json");
                }, function () {
                    return;
                });
                //$.msgBoxObj.showInfo('您已复制了该方案~');
                //return;
            } else {
                var schemeId = jqObj.attr("datavaule");  //方案Id
                $.post("/PMC/Scheme/Copy", { SchemelId: schemeId }, function (data) {
                    if (data.Status != 5) {
                        jqObj.removeClass('copy').addClass('copy_active').html('<i></i>已复制');
                        jqObj.attr("copyScheme", "1");
                    }
                    $.msgProcess(data);
                }, "json");
            }
        }
    });
});

//取得cookie    
function getCookie(name) {    
 var nameEQ = name + "=";    
 var ca = document.cookie.split(';');    //把cookie分割成组    
 for(var i=0;i < ca.length;i++) {    
 var c = ca[i];                      //取得字符串    
 while (c.charAt(0)==' ') {          //判断一下字符串有没有前导空格    
 c = c.substring(1,c.length);      //有的话，从第二位开始取    
 }    
 if (c.indexOf(nameEQ) == 0) {       //如果含有我们要的name    
 return unescape(c.substring(nameEQ.length,c.length));    //解码并截取我们要值    
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
 if (seconds != 0 ) {      //设置cookie生存时间    
 var date = new Date();    
 date.setTime(date.getTime()+(seconds*1000));    
 expires = "; expires="+date.toGMTString();    
 }    
 document.cookie = name+"="+escape(value)+expires+"; path=/";   //转码并赋值    
}



$(function () {
    //QQ空间分享
    $(document).delegate('.bds_qzone,.q-zone_share', 'click', function () {
        var title = $(this).parents('.shareCont').find('.shareTitle').val();
        var url = $(this).parents('.shareCont').find('.shareUrl').val();
        var pic = $(this).parents('.shareCont').find('.shareImg').val();
        qzone_share(title, url, pic);
    });
    //新浪微博分享
    $(document).delegate('.bds_tsina,.weibo_share', 'click', function () {
        var title = $(this).parents('.shareCont').find('.shareTitle').val();
        var url = $(this).parents('.shareCont').find('.shareUrl').val();
        var pic = $(this).parents('.shareCont').find('.shareImg').val();
        sina_weibo_share(title, url, pic);
    });
    //QQ分享
    $(document).delegate('.bds_sqq,.qq_share', 'click', function () {
        var title = $(this).parents('.shareCont').find('.shareTitle').val();
        var url = $(this).parents('.shareCont').find('.shareUrl').val();
        var pic = $(this).parents('.shareCont').find('.shareImg').val();
        qq_share(title, url, pic);
    });
});

var App = {};
/*
   Description：分页函数。
   Container：容器对象
   total: 参数值
   pageSize: 是否初始化页码
   pageNumber：当前页
*/
function getPage(Container, total, pageSize, pageNumber, length) {
    Container.smartpaginator({
        totalrecords: total,
        recordsperpage: pageSize,
        initval: pageNumber,
        length: length ? length : 10,
        next: '>>',
        prev: '<<',
        first: '首页',
        last: '尾页',
        theme: 'orange',
        display: 'single',
        controlsalways: false,
        onchange: function (pageIndex) {
            window.location = getUrl('i', pageIndex);
        }
    });
}
/*
   Description：在原始url上根据当前的过滤参数名称和参数值生成新的请求url。
   n：参数名称
   v: 参数值
   f: 是否初始化页码
   p：页索引形参名称
   url:需要替换的url默认当前
*/
function getUrl(n, v, f, p, url) {
    var url = url ? url : window.location.href;
    var pattern = /(\w+)=(\w+)/ig;
    var parames = {};
    url.replace(pattern, function (a, b, c) {
        parames[b] = c;
    });
    var i = window.location.href.indexOf("?");
    var u = (i != -1 ? url.substring(0, i) : url) + '?';
    if (v == "0" || v == "" || v == null) {
        delete parames[n.toString()];
    } else {
        parames[n] = v;
    }
    if (f == true) {
        parames[p] = 1;
    }
    for (var m in parames) {
        u = u + m + '=' + parames[m] + '&';
    }
    return u.substring(0, u.length - 1);
}
var model = '';
function getHtml(content) {
    if(content=="[]") content="[客厅]";  //设置默认值
    model = '<div id="error-msg-store">' +
       '<div class="search_no_result">' +
          '<i></i>' +
           '<h3 class="no_result_warn"><span>非常抱歉</span>，没有跟<span id="searchResult">' + content + '</span>的相关结果。</h3> ' +
      '</div>' +
   '</div>'
}

//获取指定名称的参数值
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

(function ($) {
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURIComponent(r[2]);
        return null
    };
})(jQuery);

function SetSelectOptions(optionDatas, obj, districtId, defautId) {
    var district = optionDatas;
    $("." + obj).empty();
    $("." + obj).prepend("<option value='0'>请选择</option>");
    if (typeof (district) == "object") {
        $(district).each(function (index) {
            var vv = district[index];
            if (vv.ParentId == districtId) {
                $("." + obj).append("<option value='" + vv.DistrictId + "'>" + vv.DistrictName + "</option>")
            }
        })
    }
};

//方案库左侧缩放
$(function () {
    $('.type-title-content').addClass('type-title-content-click').next('ul').show().end().click(function () {
        var $this = $(this);
        if ($this.next('ul').is(':hidden')) {
            $this.addClass('type-title-content-click').next('ul').slideDown();
        } else {
            $this.removeClass('type-title-content-click').next('ul').slideUp();
        }
    });
});
//lazyload frame
!(function ($, window) { var $window = $(window); $.fn.lazyload = function (options) { var elements = this; var $container; var settings = { threshold: 0, failure_limit: 0, event: "scroll", effect: "show", container: window, data_attribute: "original", skip_invisible: true, appear: null, load: null }; function update() { var counter = 0; elements.each(function () { var $this = $(this); if (settings.skip_invisible && !$this.is(":visible")) { return }; if ($.abovethetop(this, settings) || $.leftofbegin(this, settings)) { } else if (!$.belowthefold(this, settings) && !$.rightoffold(this, settings)) { $this.trigger("appear") } else { if (++counter > settings.failure_limit) { return false } } }) }; if (options) { if (undefined !== options.failurelimit) { options.failure_limit = options.failurelimit; delete options.failurelimit }; if (undefined !== options.effectspeed) { options.effect_speed = options.effectspeed; delete options.effectspeed }; $.extend(settings, options) }; $container = (settings.container === undefined || settings.container === window) ? $window : $(settings.container); if (0 === settings.event.indexOf("scroll")) { $container.bind(settings.event, function (event) { return update() }) }; this.each(function () { var self = this; var $self = $(self); self.loaded = false; $self.one("appear", function () { if (!this.loaded) { if (settings.appear) { var elements_left = elements.length; settings.appear.call(self, elements_left, settings) }; $("<img />").bind("load", function () { $self.hide().attr("src", $self.data(settings.data_attribute))[settings.effect](settings.effect_speed); self.loaded = true; var temp = $.grep(elements, function (element) { return !element.loaded }); elements = $(temp); if (settings.load) { var elements_left = elements.length; settings.load.call(self, elements_left, settings) } }).attr("src", $self.data(settings.data_attribute)) } }); if (0 !== settings.event.indexOf("scroll")) { $self.bind(settings.event, function (event) { if (!self.loaded) { $self.trigger("appear") } }) } }); $window.bind("resize", function (event) { update() }); update(); return this }; $.belowthefold = function (element, settings) { var fold; if (settings.container === undefined || settings.container === window) { fold = $window.height() + $window.scrollTop() } else { fold = $(settings.container).offset().top + $(settings.container).height() }; return fold <= $(element).offset().top - settings.threshold }; $.rightoffold = function (element, settings) { var fold; if (settings.container === undefined || settings.container === window) { fold = $window.width() + $window.scrollLeft() } else { fold = $(settings.container).offset().left + $(settings.container).width() }; return fold <= $(element).offset().left - settings.threshold }; $.abovethetop = function (element, settings) { var fold; if (settings.container === undefined || settings.container === window) { fold = $window.scrollTop() } else { fold = $(settings.container).offset().top }; return fold >= $(element).offset().top + settings.threshold + $(element).height() }; $.leftofbegin = function (element, settings) { var fold; if (settings.container === undefined || settings.container === window) { fold = $window.scrollLeft() } else { fold = $(settings.container).offset().left }; return fold >= $(element).offset().left + settings.threshold + $(element).width() }; $.inviewport = function (element, settings) { return !$.rightofscreen(element, settings) && !$.leftofscreen(element, settings) && !$.belowthefold(element, settings) && !$.abovethetop(element, settings) }; $.extend($.expr[':'], { "below-the-fold": function (a) { return $.belowthefold(a, { threshold: 0 }) }, "above-the-top": function (a) { return !$.belowthefold(a, { threshold: 0 }) }, "right-of-screen": function (a) { return $.rightoffold(a, { threshold: 0 }) }, "left-of-screen": function (a) { return !$.rightoffold(a, { threshold: 0 }) }, "in-viewport": function (a) { return !$.inviewport(a, { threshold: 0 }) }, "above-the-fold": function (a) { return !$.belowthefold(a, { threshold: 0 }) }, "right-of-fold": function (a) { return $.rightoffold(a, { threshold: 0 }) }, "left-of-fold": function (a) { return !$.rightoffold(a, { threshold: 0 }) } }) })(jQuery, window);
//瀑布流
!(function (jq, window, document, undefined) { 'use strict'; var $window = jq(window), pluginName = 'waterfall', defaults = { itemCls: 'waterfall-item', prefix: 'waterfall', fitWidth: true, colWidth: 240, gutterWidth: 10, gutterHeight: 10, align: 'center', minCol: 1, maxCol: undefined, maxPage: undefined, bufferPixel: -50, containerStyle: { position: 'relative' }, resizable: true, isFadeIn: false, isAnimated: true, animationOptions: {}, isAutoPrefill: false, checkImagesLoaded: true, params: {}, headers: {}, state: { isDuringAjax: false, isProcessingData: false, isResizing: false, isPause: false, curPage: 1 }, debug: false }; function Waterfall(element, options) { this.$element = jq(element); this.options = jq.extend(true, {}, defaults, options); this.colHeightArray = []; this.styleQueue = []; this._init() } Waterfall.prototype = { constructor: Waterfall, _debug: function () { if (true !== this.options.debug) { return }; if (typeof console !== 'undefined' && typeof console.log === 'function') { if ((Array.prototype.slice.call(arguments)).length === 1 && typeof Array.prototype.slice.call(arguments)[0] === 'string') { console.log((Array.prototype.slice.call(arguments)).toString()) } else { console.log(Array.prototype.slice.call(arguments)) } } else if (!Function.prototype.bind && typeof console !== 'undefined' && typeof console.log === 'object') { Function.prototype.call.call(console.log, console, Array.prototype.slice.call(arguments)) } }, _init: function (callback) { var options = this.options; this._setColumns(); this._resetColumnsHeightArray(); this.reLayout(callback); if (options.isAutoPrefill) { }; if (options.resizable) { this._doResize() } }, _getColumns: function () { var options = this.options, $container = options.fitWidth ? this.$element.parent() : this.$element, containerWidth = $container[0].tagName === 'BODY' ? $container.width() - 20 : $container.width(), colWidth = options.colWidth, gutterWidth = options.gutterWidth, minCol = options.minCol, maxCol = options.maxCol, cols = Math.floor((containerWidth + gutterWidth) / (colWidth + gutterWidth)), col = Math.max(cols, minCol); return !maxCol ? col : (col > maxCol ? maxCol : col) }, _setColumns: function () { this.cols = this._getColumns() }, _getItems: function ($content) { var $items = $content.filter('.' + this.options.itemCls).css({ 'position': 'absolute' }); return $items }, _resetColumnsHeightArray: function () { var cols = this.cols, i; this.colHeightArray.length = cols; for (i = 0; i < cols; i++) { this.colHeightArray[i] = 0 } }, layout: function ($content, callback) { var options = this.options, $items = this.options.isFadeIn ? this._getItems($content).css({ opacity: 0 }).animate({ opacity: 1 }) : this._getItems($content), styleFn = (this.options.isAnimated && this.options.state.isResizing) ? 'animate' : 'css', animationOptions = options.animationOptions, colWidth = options.colWidth, gutterWidth = options.gutterWidth, len = this.colHeightArray.length, align = options.align, fixMarginLeft, obj, i, j, itemsLen, styleLen; this.$element.append($items); if (align === 'center') { fixMarginLeft = (this.$element.width() - colWidth * len - gutterWidth * (len - 1)) / 2; fixMarginLeft = fixMarginLeft > 0 ? fixMarginLeft : 0 } else if (align === 'left') { fixMarginLeft = 0 } else if (align === 'right') { fixMarginLeft = this.$element.width() - colWidth * len - gutterWidth * (len - 1) }; for (i = 0, itemsLen = $items.length; i < itemsLen; i++) { this._placeItems($items[i], fixMarginLeft) }; for (j = 0, styleLen = this.styleQueue.length; j < styleLen; j++) { obj = this.styleQueue[j]; obj.$el[styleFn](obj.style, animationOptions) }; this.$element.height(Math.max.apply({}, this.colHeightArray)); this.styleQueue = []; this.options.state.isResizing = false; this.options.state.isProcessingData = false }, reLayout: function (callback) { var $content = this.$element.find('.' + this.options.itemCls); this._resetColumnsHeightArray(); this.layout($content, callback); this.$element.parent().attr('style', ''); this.$element.parent().find('div.new_loading').hide() }, _placeItems: function (item, fixMarginLeft) { var $item = jq(item), options = this.options, colWidth = options.colWidth, gutterWidth = options.gutterWidth, gutterHeight = options.gutterHeight, colHeightArray = this.colHeightArray, len = colHeightArray.length, minColHeight = Math.min.apply({}, colHeightArray), minColIndex = jq.inArray(minColHeight, colHeightArray), colIndex, position; colIndex = minColIndex; position = { left: (colWidth + gutterWidth) * colIndex + fixMarginLeft, top: colHeightArray[colIndex] }; this.styleQueue.push({ $el: $item, style: position }); colHeightArray[colIndex] += $item.outerHeight() + gutterHeight }, removeItems: function ($items, callback) { this.$element.find($items).remove(); this.reLayout(callback) }, pause: function (callback) { this.options.state.isPause = true; if (typeof callback === 'function') { callback() } }, resume: function (callback) { this.options.state.isPause = false; if (typeof callback === 'function') { callback() } }, _resize: function () { var cols = this.cols, newCols = this._getColumns(); if (newCols !== cols || this.options.align !== 'left') { this.options.state.isResizing = true; this.cols = newCols; this.reLayout() } }, _doResize: function () { var self = this, resizeTimer; $window.bind('resize', function () { if (resizeTimer) { clearTimeout(resizeTimer) }; resizeTimer = setTimeout(function () { self._resize() }, 1000) }) } }; jq.fn[pluginName] = function (options) { if (typeof options === 'string') { var args = Array.prototype.slice.call(arguments, 1); this.each(function () { var instance = jq.data(this, 'plugin_' + pluginName); if (!instance) { instance._debug('instance is not initialization'); return } if (!jq.isFunction(instance[options]) || options.charAt(0) === '_') { instance._debug('no such method "' + options + '"'); return } instance[options].apply(instance, args) }) } else { this.each(function () { if (!jq.data(this, 'plugin_' + pluginName)) { jq.data(this, 'plugin_' + pluginName, new Waterfall(this, options)) } }) }; return this } }(jQuery, window, document));
//jsrender.min.js在页面中直接应用模版
!function (e) { var t = (0, eval)("this"), n = t.jQuery; "function" == typeof define && define.amd ? define(e) : "object" == typeof exports ? module.exports = n ? e(n) : function (t) { if (t && !t.fn) throw "Provide jQuery or null"; return e(t) } : e(!1) }(function (e) { "use strict"; function t(e, t) { return function () { var n, r = this, i = r.base; return r.base = e, n = t.apply(r, arguments), r.base = i, n } } function n(e, n) { return z(n) && (n = t(e ? e._d ? e : t(a, e) : a, n), n._d = 1), n } function r(e, t) { for (var r in t.props) xe.test(r) && (e[r] = n(e[r], t.props[r])) } function i(e) { return e } function a() { return "" } function o(e) { try { throw "dbg breakpoint" } catch (t) { } return this.base ? this.baseApply(arguments) : e } function s(e) { ne._dbgMode = e !== !1 } function d(t) { this.name = (e.link ? "JsViews" : "JsRender") + " Error", this.message = t || this.name } function p(e, t) { var n; for (n in t) e[n] = t[n]; return e } function l(e, t, n) { return (0 !== this || e) && (ae = e ? e.charAt(0) : ae, oe = e ? e.charAt(1) : oe, se = t ? t.charAt(0) : se, de = t ? t.charAt(1) : de, pe = n || pe, e = "\\" + ae + "(\\" + pe + ")?\\" + oe, t = "\\" + se + "\\" + de, H = "(?:(?:(\\w+(?=[\\/\\s\\" + se + "]))|(?:(\\w+)?(:)|(>)|!--((?:[^-]|-(?!-))*)--|(\\*)))\\s*((?:[^\\" + se + "]|\\" + se + "(?!\\" + de + "))*?)", te.rTag = H + ")", H = new RegExp(e + H + "(\\/)?|(?:\\/(\\w+)))" + t, "g"), D = new RegExp("<.*>|([^\\\\]|^)[{}]|" + e + ".*" + t)), [ae, oe, se, de, pe] } function u(e, t) { t || (t = e, e = void 0); var n, r, i, a, o = this, s = !t || "root" === t; if (e) { if (a = o.type === t ? o : void 0, !a) if (n = o.views, o._.useKey) { for (r in n) if (a = n[r].get(e, t)) break } else for (r = 0, i = n.length; !a && i > r; r++) a = n[r].get(e, t) } else if (s) for (; o.parent.parent;) a = o = o.parent; else for (; o && !a;) a = o.type === t ? o : void 0, o = o.parent; return a } function c() { var e = this.get("item"); return e ? e.index : void 0 } function f() { return this.index } function g(e) { var t, n = this, r = n.linkCtx, i = (n.ctx || {})[e]; return void 0 === i && r && r.ctx && (i = r.ctx[e]), void 0 === i && (i = Y[e]), i && z(i) && !i._wrp && (t = function () { return i.apply(this && this !== B ? this : n, arguments) }, t._wrp = !0, p(t, i)), t || i } function v(e, t, n, i) { var a, o, s = "number" == typeof n && t.tmpl.bnds[n - 1], d = t.linkCtx; return void 0 !== i ? n = i = { props: {}, args: [i] } : s && (n = s(t.data, t, Z)), o = n.args[0], (e || s) && (a = d && d.tag, a || (a = p(new te._tg, { _: { inline: !d, bnd: s, unlinked: !0 }, tagName: ":", cvt: e, flow: !0, tagCtx: n }), d && (d.tag = a, a.linkCtx = d), n.ctx = J(n.ctx, (d ? d.view : t).ctx)), a._er = i && o, r(a, n), n.view = t, a.ctx = n.ctx || {}, n.ctx = void 0, t._.tag = a, o = a.cvtArgs(a.convert || "true" !== e && e)[0], o = s && t._.onRender ? t._.onRender(o, t, s) : o, t._.tag = void 0), void 0 != o ? o : "" } function m(e) { var t = this, n = t.tagCtx, r = n.view, i = n.args; return e = t.convert || e, e = e && ("" + e === e ? r.getRsc("converters", e) || V("Unknown converter: '" + e + "'") : e), i = i.length || n.index ? e ? i.slice() : i : [r.data], e && (e.depends && (t.depends = te.getDeps(t.depends, t, e.depends, e)), i[0] = e.apply(t, i)), i } function h(e, t) { for (var n, r, i = this; void 0 === n && i;) r = i.tmpl && i.tmpl[e], n = r && r[t], i = i.parent; return n || Z[e][t] } function w(e, t, n, i, a, o) { t = t || P; var s, d, p, l, u, c, f, g, v, m, h, w, b, x, _, y, k, j, C, A = "", R = t.linkCtx || 0, M = t.ctx, $ = n || t.tmpl, N = "number" == typeof i && t.tmpl.bnds[i - 1]; for ("tag" === e._is ? (s = e, e = s.tagName, i = s.tagCtxs, p = s.template) : (d = t.getRsc("tags", e) || V("Unknown tag: {{" + e + "}} "), p = d.template), void 0 !== o ? (A += o, i = o = [{ props: {}, args: [] }]) : N && (i = N(t.data, t, Z)), g = i.length, f = 0; g > f; f++) m = i[f], (!R || !R.tag || f && !R.tag._.inline || s._er) && ((w = m.tmpl) && (w = m.content = $.tmpls[w - 1]), m.index = f, m.tmpl = p || w, m.render = T, m.view = t, m.ctx = J(m.ctx, M)), (n = m.props.tmpl) && (n = "" + n === n ? t.getRsc("templates", n) || W(n) : n, m.tmpl = n), s || (s = new d._ctr, b = !!s.init, s.parent = c = M && M.tag, s.tagCtxs = i, C = s.dataMap, R && (s._.inline = !1, R.tag = s, s.linkCtx = R), (s._.bnd = N || R.fn) ? s._.arrVws = {} : s.dataBoundOnly && V("{^{" + e + "}} tag must be data-bound")), i = s.tagCtxs, C = s.dataMap, m.tag = s, C && i && (m.map = i[f].map), s.flow || (h = m.ctx = m.ctx || {}, l = s.parents = h.parentTags = M && J(h.parentTags, M.parentTags) || {}, c && (l[c.tagName] = c), l[s.tagName] = h.tag = s); if ((N || R) && (t._.tag = s), !(s._er = o)) { for (r(s, i[0]), s.rendering = {}, f = 0; g > f; f++) m = s.tagCtx = i[f], k = m.props, y = s.cvtArgs(), (x = k.dataMap || C) && (y.length || k.dataMap) && (_ = m.map, (!_ || _.src !== y[0] || a) && (_ && _.src && _.unmap(), _ = m.map = x.map(y[0], k, void 0, !s._.bnd)), y = [_.tgt]), s.ctx = m.ctx, f || (b && (j = s.template, s.init(m, R, s.ctx), b = void 0, s.template !== j && (s._.tmpl = s.template)), R && (R.attr = s.attr = R.attr || s.attr), u = s.attr, s._.noVws = u && u !== je), v = void 0, s.render && (v = s.render.apply(s, y)), y.length || (y = [t]), void 0 === v && (v = m.render(y.length ? y[0] : t, !0) || (a ? void 0 : "")), A = A ? A + (v || "") : v; s.rendering = void 0 } return s.tagCtx = i[0], s.ctx = s.tagCtx.ctx, s._.noVws && s._.inline && (A = "text" === u ? X.html(A) : ""), N && t._.onRender ? t._.onRender(A, t, N) : A } function b(e, t, n, r, i, a, o, s) { var d, p, l, u, f = this, g = "array" === t; f.content = o, f.views = g ? [] : {}, f.parent = n, f.type = t || "top", f.data = r, f.tmpl = i, u = f._ = { key: 0, useKey: g ? 0 : 1, id: "" + ye++, onRender: s, bnds: {} }, f.linked = !!s, n ? (d = n.views, p = n._, p.useKey ? (d[u.key = "_" + p.useKey++] = f, f.index = Re, f.getIndex = c, l = p.tag, u.bnd = g && (!l || !!l._.bnd && l)) : d.length === (u.key = f.index = a) ? d.push(f) : d.splice(a, 0, f), f.ctx = e || n.ctx) : f.ctx = e } function x(e) { var t, n, r, i, a, o, s; for (t in Me) if (a = Me[t], (o = a.compile) && (n = e[t + "s"])) for (r in n) i = n[r] = o(r, n[r], e, 0), i._is = t, i && (s = te.onStore[t]) && s(r, i, o) } function _(e, t, r) { function i() { var t = this; t._ = { inline: !0, unlinked: !0 }, t.tagName = e } var a, o, s, d = new te._tg; if (z(t) ? t = { depends: t.depends, render: t } : "" + t === t && (t = { template: t }), o = t.baseTag) { t.flow = !!t.flow, t.baseTag = o = "" + o === o ? r && r.tags[o] || ee[o] : o, d = p(d, o); for (s in t) d[s] = n(o[s], t[s]) } else d = p(d, t); return void 0 !== (a = d.template) && (d.template = "" + a === a ? W[a] || W(a) : a), d.init !== !1 && ((i.prototype = d).constructor = d._ctr = i), r && (d._parentTmpl = r), d } function y(e) { return this.base.apply(this, e) } function k(t, n, r, i) { function a(n) { var a, s; if ("" + n === n || n.nodeType > 0 && (o = n)) { if (!o) if (/^\.\/[^\\:*?"<>]*$/.test(n)) (s = W[t = t || n]) ? n = s : o = document.getElementById(n); else if (e.fn && !D.test(n)) try { o = e(document).find(n)[0] } catch (d) { } o && (i ? n = o.innerHTML : (a = o.getAttribute(Ae), a ? a !== Te ? (n = W[a], delete W[a]) : e.fn && (n = e.data(o)[Te]) : (t = t || (e.fn ? Te : n), n = k(t, o.innerHTML, r, i)), n.tmplName = t = t || a, t !== Te && (W[t] = n), o.setAttribute(Ae, t), e.fn && e.data(o, Te, n))), o = void 0 } else n.fn || (n = void 0); return n } var o, s, d = n = n || ""; return 0 === i && (i = void 0, d = a(d)), i = i || (n.markup ? n : {}), i.tmplName = t, r && (i._parentTmpl = r), !d && n.markup && (d = a(n.markup)) && d.fn && (d = d.markup), void 0 !== d ? (d.fn || n.fn ? d.fn && (s = d) : (n = C(d, i), $(d.replace(ge, "\\$&"), n)), s || (x(i), s = p(function () { return n.render.apply(n, arguments) }, n)), t && !r && t !== Te && (Ve[t] = s), s) : void 0 } function j(e) { function t(t, n) { this.tgt = e.getTgt(t, n) } return z(e) && (e = { getTgt: e }), e.baseMap && (e = p(p({}, e.baseMap), e)), e.map = function (e, n) { return new t(e, n) }, e } function C(t, n) { var r, i = ne.wrapMap || {}, a = p({ tmpls: [], links: {}, bnds: [], _is: "template", render: T }, n); return a.markup = t, n.htmlTag || (r = he.exec(t), a.htmlTag = r ? r[1].toLowerCase() : ""), r = i[a.htmlTag], r && r !== i.div && (a.markup = e.trim(a.markup)), a } function A(e, t) { function n(i, a, o) { var s, d, p, l; if (i && typeof i === Ce && !i.nodeType && !i.markup && !i.getTgt) { for (p in i) n(p, i[p], a); return Z } return void 0 === a && (a = i, i = void 0), i && "" + i !== i && (o = a, a = i, i = void 0), l = o ? o[r] = o[r] || {} : n, d = t.compile, null === a ? i && delete l[i] : (a = d ? d(i, a, o, 0) : a, i && (l[i] = a)), d && a && (a._is = e), a && (s = te.onStore[e]) && s(i, a, d), a } var r = e + "s"; Z[r] = n } function T(e, t, n, r, i, a) { var o, s, d, p, l, u, c, f, g = r, v = ""; if (t === !0 ? (n = t, t = void 0) : typeof t !== Ce && (t = void 0), (d = this.tag) ? (l = this, p = d._.tmpl || l.tmpl, g = g || l.view, arguments.length || (e = g)) : p = this, p) { if (!g && e && "view" === e._is && (g = e), g && e === g && (e = g.data), p.fn || (p = d._.tmpl = W[p] || W(p)), u = !g, re = re || u, g || ((t = t || {}).root = e), !re || ne.useViews || p.useViews || g && g !== P) v = R(p, e, t, n, g, i, a, d); else { if (g ? (c = g.data, f = g.index, g.index = Re) : (g = P, g.data = e, g.ctx = t), G(e) && !n) for (o = 0, s = e.length; s > o; o++) g.index = o, g.data = e[o], v += p.fn(e[o], g, Z); else v += p.fn(e, g, Z); g.data = c, g.index = f } u && (re = void 0) } return v } function R(e, t, n, r, i, a, o, s) { function d(e) { _ = p({}, n), _[x] = e } var l, u, c, f, g, v, m, h, w, x, _, y, k = ""; if (s && (w = s.tagName, y = s.tagCtx, n = n ? J(n, s.ctx) : s.ctx, m = y.content, y.props.link === !1 && (n = n || {}, n.link = !1), (x = y.props.itemVar) && ("~" !== x.charAt(0) && M("Use itemVar='~myItem'"), x = x.slice(1))), i && (m = m || i.content, o = o || i._.onRender, n = n || i.ctx), a === !0 && (v = !0, a = 0), o && (n && n.link === !1 || s && s._.noVws) && (o = void 0), h = o, o === !0 && (h = void 0, o = i._.onRender), n = e.helpers ? J(e.helpers, n) : n, _ = n, G(t) && !r) for (c = v ? i : void 0 !== a && i || new b(n, "array", i, t, e, a, m, o), x && (c.it = x), x = c.it, l = 0, u = t.length; u > l; l++) x && d(t[l]), f = new b(_, "item", c, t[l], e, (a || 0) + l, m, o), g = e.fn(t[l], f, Z), k += c._.onRender ? c._.onRender(g, f) : g; else x && d(t), c = v ? i : new b(_, w || "data", i, t, e, a, m, o), s && !s.flow && (c.tag = s), k += e.fn(t, c, Z); return h ? h(k, c) : k } function V(e, t, n) { var r = ne.onError(e, t, n); if ("" + e === e) throw new te.Err(r); return !t.linkCtx && t.linked ? X.html(r) : r } function M(e) { V("Syntax error\n" + e) } function $(e, t, n, r, i) { function a(t) { t -= f, t && v.push(e.substr(f, t).replace(ce, "\\n")) } function o(t, n) { t && (t += "}}", M((n ? "{{" + n + "}} block has {{/" + t + " without {{" + t : "Unmatched or missing {{/" + t) + ", in template:\n" + e)) } function s(s, d, c, h, w, b, x, _, y, k, j, C) { b && (w = ":", h = je), k = k || n && !i; var A = (d || n) && [[]], T = "", R = "", V = "", $ = "", N = "", F = "", I = "", J = "", U = !k && !w && !x; c = c || (y = y || "#data", w), a(C), f = C + s.length, _ ? u && v.push(["*", "\n" + y.replace(/^:/, "ret+= ").replace(fe, "$1") + ";\n"]) : c ? ("else" === c && (me.test(y) && M('for "{{else if expr}}" use "{{else expr}}"'), A = m[7] && [[]], m[8] = e.substring(m[8], C), m = g.pop(), v = m[2], U = !0), y && S(y.replace(ce, " "), A, t).replace(ve, function (e, t, n, r, i, a, o, s) { return r = "'" + i + "':", o ? (R += a + ",", $ += "'" + s + "',") : n ? (V += r + a + ",", F += r + "'" + s + "',") : t ? I += a : ("trigger" === i && (J += a), T += r + a + ",", N += r + "'" + s + "',", l = l || xe.test(i)), "" }).slice(0, -1), A && A[0] && A.pop(), p = [c, h || !!r || l || "", U && [], E($, N, F), E(R, T, V), I, J, A || 0], v.push(p), U && (g.push(m), m = p, m[8] = f)) : j && (o(j !== m[0] && "else" !== m[0] && j, m[0]), m[8] = e.substring(m[8], C), m = g.pop()), o(!m && j), v = m[2] } var d, p, l, u = ne.allowCode || t && t.allowCode, c = [], f = 0, g = [], v = c, m = [, , c]; return u && (t.allowCode = u), n && (e = ae + e + de), o(g[0] && g[0][2].pop()[0]), e.replace(H, s), a(e.length), (f = c[c.length - 1]) && o("" + f !== f && +f[8] === f[8] && f[0]), n ? (d = I(c, e, n), N(d, [c[0][7]])) : d = I(c, t), d } function N(e, t) { var n, r, i = 0, a = t.length; for (e.deps = []; a > i; i++) { r = t[i]; for (n in r) "_jsvto" !== n && r[n].length && (e.deps = e.deps.concat(r[n])) } e.paths = r } function E(e, t, n) { return [e.slice(0, -1), t.slice(0, -1), n.slice(0, -1)] } function F(e, t) { return "\n	" + (t ? t + ":{" : "") + "args:[" + e[0] + "]" + (e[1] || !t ? ",\n	props:{" + e[1] + "}" : "") + (e[2] ? ",\n	ctx:{" + e[2] + "}" : "") } function S(e, t, n) { function r(r, h, w, b, x, _, y, k, j, C, A, T, R, V, N, E, F, S, I, J) { function U(e, n, r, o, s, d, u, c) { var f = "." === r; if (r && (x = x.slice(n.length), f || (e = (o ? 'view.hlp("' + o + '")' : s ? "view" : "data") + (c ? (d ? "." + d : o ? "" : s ? "" : "." + r) + (u || "") : (c = o ? "" : s ? d || "" : r, "")), e += c ? "." + c : "", e = n + ("view.data" === e.slice(0, 9) ? e.slice(5) : e)), p)) { if (q = "linkTo" === i ? a = t._jsvto = t._jsvto || [] : l.bd, B = f && q[q.length - 1]) { if (B._jsv) { for (; B.sb;) B = B.sb; B.bnd && (x = "^" + x.slice(1)), B.sb = x, B.bnd = B.bnd || "^" === x.charAt(0) } } else q.push(x); m[g] = I + (f ? 1 : 0) } return e } b = p && b, b && !k && (x = b + x), _ = _ || "", w = w || h || T, x = x || j, C = C || F || ""; var K, O, q, B, L; if (!y || d || s) { if (p && E && !d && !s && (!i || o || a) && (K = m[g - 1], J.length - 1 > I - (K || 0))) { if (K = J.slice(K, I + r.length), O !== !0) if (q = a || u[g - 1].bd, B = q[q.length - 1], B && B.prm) { for (; B.sb && B.sb.prm;) B = B.sb; L = B.sb = { path: B.sb, bnd: B.bnd } } else q.push(L = { path: q.pop() }); E = oe + ":" + K + " onerror=''" + se, O = f[E], O || (f[E] = !0, f[E] = O = $(E, n, !0)), O !== !0 && L && (L._jsv = O, L.prm = l.bd, L.bnd = L.bnd || L.path && L.path.indexOf("^") >= 0) } return d ? (d = !R, d ? r : T + '"') : s ? (s = !V, s ? r : T + '"') : (w ? (m[g] = I++, l = u[++g] = { bd: [] }, w) : "") + (S ? g ? "" : (c = J.slice(c, I), (i ? (i = o = a = !1, "\b") : "\b,") + c + (c = I + r.length, p && t.push(l.bd = []), "\b")) : k ? (g && M(e), p && t.pop(), i = x, o = b, c = I + r.length, b && (p = l.bd = t[i] = []), x + ":") : x ? x.split("^").join(".").replace(le, U) + (C ? (l = u[++g] = { bd: [] }, v[g] = !0, C) : _) : _ ? _ : N ? (v[g] = !1, l = u[--g], N + (C ? (l = u[++g], v[g] = !0, C) : "")) : A ? (v[g] || M(e), ",") : h ? "" : (d = R, s = V, '"')) } M(e) } var i, a, o, s, d, p = t && t[0], l = { bd: p }, u = { 0: l }, c = 0, f = n ? n.links : p && (p.links = p.links || {}), g = 0, v = {}, m = {}; return (e + (n ? " " : "")).replace(ue, r) } function I(e, t, n) { var r, i, a, o, s, d, p, l, u, c, f, g, v, m, h, w, b, x, _, y, k, j, A, T, R, V, $, E, S, J, U = 0, K = ne.useViews || t.useViews || t.tags || t.templates || t.helpers || t.converters, O = "", q = {}, B = e.length; for ("" + t === t ? (x = n ? 'data-link="' + t.replace(ce, " ").slice(1, -1) + '"' : t, t = 0) : (x = t.tmplName || "unnamed", t.allowCode && (q.allowCode = !0), t.debug && (q.debug = !0), f = t.bnds, b = t.tmpls), r = 0; B > r; r++) if (i = e[r], "" + i === i) O += '\n+"' + i + '"'; else if (a = i[0], "*" === a) O += ";\n" + i[1] + "\nret=ret"; else { if (o = i[1], k = !n && i[2], s = F(i[3], "params") + "}," + F(v = i[4]), E = i[5], J = i[6], j = i[8] && i[8].replace(fe, "$1"), (R = "else" === a) ? g && g.push(i[7]) : (U = 0, f && (g = i[7]) && (g = [g], U = f.push(1))), K = K || v[1] || v[2] || g || /view.(?!index)/.test(v[0]), (V = ":" === a) ? o && (a = o === je ? ">" : o + a) : (k && (_ = C(j, q), _.tmplName = x + "/" + a, _.useViews = _.useViews || K, I(k, _), K = _.useViews, b.push(_)), R || (y = a, K = K || a && (!ee[a] || !ee[a].flow), T = O, O = ""), A = e[r + 1], A = A && "else" === A[0]), S = E ? ";\ntry{\nret+=" : "\n+", m = "", h = "", V && (g || J || o && o !== je)) { if ($ = "return {" + s + "};", w = 'c("' + o + '",view,', $ = new Function("data,view,j,u", " // " + x + " " + U + " " + a + "\n" + $), $._er = E, m = w + U + ",", h = ")", $._tag = a, n) return $; N($, g), c = !0 } if (O += V ? (n ? (E ? "\ntry{\n" : "") + "return " : S) + (c ? (c = void 0, K = u = !0, w + (g ? (f[U - 1] = $, U) : "{" + s + "}") + ")") : ">" === a ? (p = !0, "h(" + v[0] + ")") : (l = !0, "((v=" + (v[0] || "data") + ')!=null?v:"")')) : (d = !0, "\n{view:view,tmpl:" + (k ? b.length : "0") + "," + s + "},"), y && !A) { if (O = "[" + O.slice(0, -1) + "]", w = 't("' + y + '",view,this,', n || g) { if (O = new Function("data,view,j,u", " // " + x + " " + U + " " + y + "\nreturn " + O + ";"), O._er = E, O._tag = y, g && N(f[U - 1] = O, g), n) return O; m = w + U + ",undefined,", h = ")" } O = T + S + w + (U || O) + ")", g = 0, y = 0 } E && (K = !0, O += ";\n}catch(e){ret" + (n ? "urn " : "+=") + m + "j._err(e,view," + E + ")" + h + ";}\n" + (n ? "" : "ret=ret")) } O = "// " + x + "\nvar v" + (d ? ",t=j._tag" : "") + (u ? ",c=j._cnvt" : "") + (p ? ",h=j.converters.html" : "") + (n ? ";\n" : ',ret=""\n') + (q.debug ? "debugger;" : "") + O + (n ? "\n" : ";\nreturn ret;"), ne._dbgMode && (O = "try {\n" + O + "\n}catch(e){\nreturn j._err(e, view);\n}"); try { O = new Function("data,view,j,u", O) } catch (L) { M("Compiled template code:\n\n" + O + '\n: "' + L.message + '"') } return t && (t.fn = O, t.useViews = !!K), O } function J(e, t) { return e && e !== t ? t ? p(p({}, t), e) : e : t && p({}, t) } function U(e) { return ke[e] || (ke[e] = "&#" + e.charCodeAt(0) + ";") } function K(e) { var t, n, r = []; if (typeof e === Ce) for (t in e) n = e[t], n && n.toJSON && !n.toJSON() || z(n) || r.push({ key: t, prop: n }); return r } function O(t, n, r) { var i = this.jquery && (this[0] || V('Unknown template: "' + this.selector + '"')), a = i.getAttribute(Ae); return T.call(a ? e.data(i)[Te] : W(i), t, n, r) } function q(e) { return void 0 != e ? be.test(e) && ("" + e).replace(_e, U) || e : "" } var B = (0, eval)("this"), L = e === !1; e = e && e.fn ? e : B.jQuery; var Q, H, D, P, Z, z, G, W, X, Y, ee, te, ne, re, ie = "v1.0.0-beta", ae = "{", oe = "{", se = "}", de = "}", pe = "^", le = /^(!*?)(?:null|true|false|\d[\d.]*|([\w$]+|\.|~([\w$]+)|#(view|([\w$]+))?)([\w$.^]*?)(?:[.[^]([\w$]+)\]?)?)$/g, ue = /(\()(?=\s*\()|(?:([([])\s*)?(?:(\^?)(!*?[#~]?[\w$.^]+)?\s*((\+\+|--)|\+|-|&&|\|\||===|!==|==|!=|<=|>=|[<>%*:?\/]|(=))\s*|(!*?[#~]?[\w$.^]+)([([])?)|(,\s*)|(\(?)\\?(?:(')|("))|(?:\s*(([)\]])(?=\s*[.^]|\s*$|[^\(\[])|[)\]])([([]?))|(\s+)/g, ce = /[ \t]*(\r\n|\n|\r)/g, fe = /\\(['"])/g, ge = /['"\\]/g, ve = /(?:\x08|^)(onerror:)?(?:(~?)(([\w$_\.]+):)?([^\x08]+))\x08(,)?([^\x08]+)/gi, me = /^if\s/, he = /<(\w+)[>\s]/, we = /[\x00`><"'&]/g, be = /[\x00`><\"'&]/, xe = /^on[A-Z]|^convert(Back)?$/, _e = we, ye = 0, ke = { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\x00": "&#0;", "'": "&#39;", '"': "&#34;", "`": "&#96;" }, je = "html", Ce = "object", Ae = "data-jsv-tmpl", Te = "jsvTmpl", Re = "For #index in nested block use #getIndex().", Ve = {}, Me = { template: { compile: k }, tag: { compile: _ }, helper: {}, converter: {} }, $e = B.jsrender, Ne = $e && e && !e.render; if (Z = { jsviews: ie, settings: function (e) { p(ne, e), s(ne._dbgMode), ne.jsv && ne.jsv() }, sub: { View: b, Err: d, tmplFn: $, parse: S, extend: p, syntaxErr: M, onStore: {}, _ths: r, _tg: function () { } }, map: j, _cnvt: v, _tag: w, _err: V }, (d.prototype = new Error).constructor = d, c.depends = function () { return [this.get("item"), "index"] }, f.depends = "index", b.prototype = { get: u, getIndex: f, getRsc: h, hlp: g, _is: "view" }, !($e || e && e.render)) { for (Q in Me) A(Q, Me[Q]); W = Z.templates, X = Z.converters, Y = Z.helpers, ee = Z.tags, te = Z.sub, ne = Z.settings, te._tg.prototype = { baseApply: y, cvtArgs: m }, P = te.topView = new b, e ? (e.fn.render = O, e.observable && (p(te, e.views.sub), Z.map = e.views.map)) : (e = {}, L && (B.jsrender = e), e.renderFile = e.__express = e.compile = function () { throw "Node.js: use npm jsrender, or jsrender-node.js" }, e.isFunction = function (e) { return "function" == typeof e }, e.isArray = Array.isArray || function (e) { return "[object Array]" === {}.toString.call(e) }, e.toJq = function (t) { e !== t && (p(t, this), e = t, e.fn.render = O) }, e.jsrender = ie), z = e.isFunction, G = e.isArray, e.render = Ve, e.views = Z, e.templates = W = Z.templates, Z.compile = function (e, t) { return t = t || {}, t.markup = e, W(t) }, ne({ debugMode: s, delimiters: l, onError: function (e, t, n) { return t && (e = void 0 === n ? "{Error: " + (e.message || e) + "}" : z(n) ? n(e, t) : n), void 0 == e ? "" : e }, _dbgMode: !1 }), ee({ "if": { render: function (e) { var t = this, n = t.tagCtx, r = t.rendering.done || !e && (arguments.length || !n.index) ? "" : (t.rendering.done = !0, t.selected = n.index, n.render(n.view, !0)); return r }, flow: !0 }, "for": { render: function (e) { var t, n = !arguments.length, r = this, i = r.tagCtx, a = "", o = 0; return r.rendering.done || (t = n ? i.view.data : e, void 0 !== t && (a += i.render(t, n), o += G(t) ? t.length : 1), (r.rendering.done = o) && (r.selected = i.index)), a }, flow: !0 }, props: { baseTag: "for", dataMap: j(K), flow: !0 }, include: { flow: !0 }, "*": { render: i, flow: !0 }, ":*": { render: i, flow: !0 }, dbg: Y.dbg = X.dbg = o }), X({ html: q, attr: q, url: function (e) { return void 0 != e ? encodeURI("" + e) : null === e ? e : "" } }), l() } return Ne && $e.toJq(e), e || $e });
//Pagination.min.js分页插件
!function (a, b) { function c(a) { throw new Error("Pagination: " + a) } function d(a) { a.dataSource || c('"dataSource" is required.'), "string" == typeof a.dataSource ? "undefined" == typeof a.totalNumber ? c('"totalNumber" is required.') : b.isNumeric(a.totalNumber) || c('"totalNumber" is incorrect. (Number)') : i.isObject(a.dataSource) && ("undefined" == typeof a.locator ? c('"dataSource" is a Object, please specify "locator".') : "string" == typeof a.locator || b.isFunction(a.locator) || c("" + a.locator + " is incorrect. (String | Function)")) } function e(a) { var b; return ("object" == (b = typeof a) ? null == a && "null" || Object.prototype.toString.call(a).slice(8, -1) : b).toLowerCase() } "undefined" == typeof b && c("Pagination requires jQuery."); var f = "pagination", g = "addHook", h = "__pagination-"; b.fn.pagination && (f = "pagination2"), b.fn[f] = function (e) { if ("undefined" == typeof e) return this; var f = b(this), g = { initialize: function () { var a = this; if (f.data("pagination") || f.data("pagination", {}), a.callHook("beforeInit") !== !1) { f.data("pagination").initialized && b(".paginationjs", f).remove(); var c = a.model = { pageRange: k.pageRange, pageSize: k.pageSize }; a.parseDataSource(k.dataSource, function (b) { if (a.sync = i.isArray(b), a.sync && (c.totalNumber = k.totalNumber = b.length), c.totalPage = a.getTotalPage(), !(k.hideWhenLessThanOnePage && c.totalPage <= 1)) { var d = a.render(!0); k.className && d.addClass(k.className), c.el = d, f["bottom" === k.position ? "append" : "prepend"](d), a.observer(), f.data("pagination").initialized = !0, a.callHook("afterInit", d) } }) } }, render: function (a) { var c = this, d = c.model, e = d.el || b('<div class="paginationjs"></div>'), f = a !== !0; c.callHook("beforeRender", f); var g = d.pageNumber || k.pageNumber, h = k.pageRange, i = d.totalPage, j = g - h, l = g + h; return l > i && (l = i, j = i - 2 * h, j = 1 > j ? 1 : j), 1 >= j && (j = 1, l = Math.min(2 * h + 1, i)), e.html(c.createTemplate({ currentPage: g, pageRange: h, totalPage: i, rangeStart: j, rangeEnd: l })), c.callHook("afterRender", f), e }, createTemplate: function (a) { var c, d, e = this, f = a.currentPage, g = a.totalPage, h = a.rangeStart, i = a.rangeEnd, j = k.totalNumber, l = k.showPrevious, m = k.showNext, n = k.showPageNumbers, o = k.showNavigator, p = k.showGoInput, q = k.showGoButton, r = k.pageLink, s = k.prevText, t = k.nextText, u = k.ellipsisText, v = k.goButtonText, w = k.classPrefix, x = k.activeClassName, y = k.disableClassName, z = k.ulClassName, A = b.isFunction(k.formatNavigator) ? k.formatNavigator() : k.formatNavigator, B = b.isFunction(k.formatGoInput) ? k.formatGoInput() : k.formatGoInput, C = b.isFunction(k.formatGoButton) ? k.formatGoButton() : k.formatGoButton, D = b.isFunction(k.autoHidePrevious) ? k.autoHidePrevious() : k.autoHidePrevious, E = b.isFunction(k.autoHideNext) ? k.autoHideNext() : k.autoHideNext, F = b.isFunction(k.header) ? k.header() : k.header, G = b.isFunction(k.footer) ? k.footer() : k.footer, H = "", I = '<input type="text" class="J-paginationjs-go-pagenumber">', J = '<input type="button" class="J-paginationjs-go-button" value="' + v + '">'; if (F && (c = e.replaceVariables(F, { currentPage: f, totalPage: g, totalNumber: j }), H += c), l || n || m) { if (H += '<div class="paginationjs-pages">', H += z ? '<ul class="' + z + '">' : "<ul>", l && (1 === f ? D || (H += '<li class="' + w + "-prev " + y + '"><a>' + s + "</a></li>") : H += '<li class="' + w + '-prev J-paginationjs-previous" data-num="' + (f - 1) + '" title="Previous page"><a href="' + r + '">' + s + "</a></li>"), n) { if (3 >= h) for (d = 1; h > d; d++) H += d == f ? '<li class="' + w + "-page J-paginationjs-page " + x + '" data-num="' + d + '"><a>' + d + "</a></li>" : '<li class="' + w + '-page J-paginationjs-page" data-num="' + d + '"><a href="' + r + '">' + d + "</a></li>"; else k.showFirstOnEllipsisShow && (H += '<li class="' + w + "-page " + w + '-first J-paginationjs-page" data-num="1"><a href="' + r + '">1</a></li>'), H += '<li class="' + w + "-ellipsis " + y + '"><a>' + u + "</a></li>"; for (d = h; i >= d; d++) H += d == f ? '<li class="' + w + "-page J-paginationjs-page " + x + '" data-num="' + d + '"><a>' + d + "</a></li>" : '<li class="' + w + '-page J-paginationjs-page" data-num="' + d + '"><a href="' + r + '">' + d + "</a></li>"; if (i >= g - 2) for (d = i + 1; g >= d; d++) H += '<li class="' + w + '-page J-paginationjs-page" data-num="' + d + '"><a href="' + r + '">' + d + "</a></li>"; else H += '<li class="' + w + "-ellipsis " + y + '"><a>' + u + "</a></li>", k.showLastOnEllipsisShow && (H += '<li class="' + w + "-page " + w + '-last J-paginationjs-page" data-num="' + g + '"><a href="' + r + '">' + g + "</a></li>") } m && (f == g ? E || (H += '<li class="' + w + "-next " + y + '"><a>' + t + "</a></li>") : H += '<li class="' + w + '-next J-paginationjs-next" data-num="' + (f + 1) + '" title="Next page"><a href="' + r + '">' + t + "</a></li>"), H += "</ul></div>" } return o && A && (c = e.replaceVariables(A, { currentPage: f, totalPage: g, totalNumber: j }), H += '<div class="' + w + '-nav J-paginationjs-nav">' + c + "</div>"), p && B && (c = e.replaceVariables(B, { currentPage: f, totalPage: g, totalNumber: j, input: I }), H += '<div class="' + w + '-go-input">' + c + "</div>"), q && C && (c = e.replaceVariables(C, { currentPage: f, totalPage: g, totalNumber: j, button: J }), H += '<div class="' + w + '-go-button">' + c + "</div>"), G && (c = e.replaceVariables(G, { currentPage: f, totalPage: g, totalNumber: j }), H += c), H }, go: function (a, c) { function d(a) { if (g.direction = "undefined" == typeof g.pageNumber ? 0 : h > g.pageNumber ? 1 : -1, g.pageNumber = h, e.render(), e.disabled && !e.sync && e.enable(), f.data("pagination").model = g, b.isFunction(k.formatResult)) { var d = b.extend(!0, [], a); i.isArray(a = k.formatResult(d)) || (a = d) } f.data("pagination").currentPageData = a, e.callHook("beforePaging"), e.doCallback(a, c), e.callHook("afterPaging"), 1 == h && e.callHook("afterIsFirstPage"), h == g.totalPage && e.callHook("afterIsLastPage") } var e = this, g = e.model; if (!e.disabled) { var h = a, j = k.pageSize, l = g.totalPage; if (h = parseInt(h), !(!h || 1 > h || h > l)) { if (e.sync) return void d(e.getDataSegment(h)); var m = {}, n = k.alias || {}; m[n.pageSize ? n.pageSize : "pageSize"] = j, m[n.pageNumber ? n.pageNumber : "pageNumber"] = h; var o = { type: "get", cache: !1, data: {}, contentType: "application/x-www-form-urlencoded; charset=UTF-8", dataType: "json", async: !0 }; b.extend(!0, o, k.ajax), b.extend(o.data || {}, m), o.data = JSON.stringify(o.data), o.url = k.dataSource, o.success = function (a) { d(e.filterDataByLocator(a)) }, o.error = function (a, b, c) { k.formatAjaxError && k.formatAjaxError(a, b, c), e.enable() }, e.disable(), b.ajax(o) } } }, doCallback: function (a, c) { var d = this, e = d.model; b.isFunction(c) ? c(a, e) : b.isFunction(k.callback) && k.callback(a, e) }, destroy: function () { this.callHook("beforeDestroy") !== !1 && (this.model.el.remove(), f.off(), b("#paginationjs-style").remove(), this.callHook("afterDestroy")) }, previous: function (a) { this.go(this.model.pageNumber - 1, a) }, next: function (a) { this.go(this.model.pageNumber + 1, a) }, disable: function () { var a = this, b = a.sync ? "sync" : "async"; a.callHook("beforeDisable", b) !== !1 && (a.disabled = !0, a.model.disabled = !0, a.callHook("afterDisable", b)) }, enable: function () { var a = this, b = a.sync ? "sync" : "async"; a.callHook("beforeEnable", b) !== !1 && (a.disabled = !1, a.model.disabled = !1, a.callHook("afterEnable", b)) }, show: function () { var a = this; a.model.el.is(":visible") || a.model.el.show() }, hide: function () { var a = this; a.model.el.is(":visible") && a.model.el.hide() }, replaceVariables: function (a, b) { var c; for (var d in b) { var e = b[d], f = new RegExp("<%=\\s*" + d + "\\s*%>", "img"); c = (c || a).replace(f, e) } return c }, getDataSegment: function (a) { var b = k.pageSize, c = k.dataSource, d = k.totalNumber, e = b * (a - 1) + 1, f = Math.min(a * b, d); return c.slice(e - 1, f) }, getTotalPage: function () { return Math.ceil(k.totalNumber / k.pageSize) }, getLocator: function (a) { var d; return "string" == typeof a ? d = a : b.isFunction(a) ? d = a() : c('"locator" is incorrect. (String | Function)'), d }, filterDataByLocator: function (a) { var d, e = this.getLocator(k.locator); if (i.isObject(a)) { try { b.each(e.split("."), function (b, c) { d = (d ? d : a)[c] }) } catch (f) { } d ? i.isArray(d) || c("dataSource." + e + " must be an Array.") : c("dataSource." + e + " is undefined.") } return d || a }, parseDataSource: function (a, d) { var e = this, f = arguments; i.isObject(a) ? d(k.dataSource = e.filterDataByLocator(a)) : i.isArray(a) ? d(k.dataSource = a) : b.isFunction(a) ? k.dataSource(function (a) { b.isFunction(a) && c('Unexpect parameter of the "done" Function.'), f.callee.call(e, a, d) }) : "string" == typeof a ? (/^https?|file:/.test(a) && (k.ajaxDataType = "jsonp"), d(a)) : c('Unexpect data type of the "dataSource".') }, callHook: function (c) { var d, e = f.data("pagination"), g = Array.prototype.slice.apply(arguments); return g.shift(), k[c] && b.isFunction(k[c]) && k[c].apply(a, g) === !1 && (d = !1), e.hooks && e.hooks[c] && b.each(e.hooks[c], function (b, c) { c.apply(a, g) === !1 && (d = !1) }), d !== !1 }, observer: function () { var a = this, d = a.model.el; f.unbind(h + "go").on(h + "go", function (d, e, f) { e = parseInt(b.trim(e)), e && (b.isNumeric(e) || c('"pageNumber" is incorrect. (Number)'), a.go(e, f)) }), d.unbind(".J-paginationjs-page").delegate(".J-paginationjs-page", "click", function (c) { var d = b(c.currentTarget), e = b.trim(d.attr("data-num")); return !e || d.hasClass(k.disableClassName) || d.hasClass(k.activeClassName) ? void 0 : a.callHook("beforePageOnClick", c) === !1 ? !1 : (a.go(e), a.callHook("afterPageOnClick", c), k.pageLink ? void 0 : !1) }), d.unbind(".J-paginationjs-previous").delegate(".J-paginationjs-previous", "click", function (c) { var d = b(c.currentTarget), e = b.trim(d.attr("data-num")); return e && !d.hasClass(k.disableClassName) ? a.callHook("beforePreviousOnClick", c) === !1 ? !1 : (a.go(e), a.callHook("afterPreviousOnClick", c), k.pageLink ? void 0 : !1) : void 0 }), d.unbind(".J-paginationjs-next").delegate(".J-paginationjs-next", "click", function (c) { var d = b(c.currentTarget), e = b.trim(d.attr("data-num")); return e && !d.hasClass(k.disableClassName) ? a.callHook("beforeNextOnClick", c) === !1 ? !1 : (a.go(e), a.callHook("afterNextOnClick", c), k.pageLink ? void 0 : !1) : void 0 }), d.unbind(".J-paginationjs-go-button").delegate(".J-paginationjs-go-button", "click", function () { var c = b(".J-paginationjs-go-pagenumber", d).val(); return a.callHook("beforeGoButtonOnClick", event, c) === !1 ? !1 : (f.trigger(h + "go", c), void a.callHook("afterGoButtonOnClick", event, c)) }), d.unbind(".J-paginationjs-go-pagenumber").delegate(".J-paginationjs-go-pagenumber", "keyup", function (c) { if (13 === c.which) { var e = b(c.currentTarget).val(); if (a.callHook("beforeGoInputOnEnter", c, e) === !1) return !1; f.trigger(h + "go", e), b(".J-paginationjs-go-pagenumber", d).focus(), a.callHook("afterGoInputOnEnter", c, e) } }), f.unbind(h + "previous").on(h + "previous", function (b, c) { a.previous(c) }), f.unbind(h + "next").on(h + "next", function (b, c) { a.next(c) }), f.unbind(h + "disable").on(h + "disable", function () { a.disable() }), f.unbind(h + "enable").on(h + "enable", function () { a.enable() }), f.unbind(h + "show").on(h + "show", function () { a.show() }), f.unbind(h + "hide").on(h + "hide", function () { a.hide() }), f.unbind(h + "destroy").on(h + "destroy", function () { a.destroy() }), (g.sync || k.triggerPagingOnInit) && f.trigger(h + "go", Math.min(k.pageNumber, a.model.totalPage)) } }; if (f.data("pagination") && f.data("pagination").initialized === !0) { if (b.isNumeric(e)) return f.trigger.call(this, h + "go", e, arguments[1]), this; if ("string" == typeof e) { var j = Array.prototype.slice.apply(arguments); switch (j[0] = h + j[0], e) { case "previous": case "next": case "go": case "disable": case "enable": case "show": case "hide": case "destroy": f.trigger.apply(this, j); break; case "getSelectedPageNum": return f.data("pagination").model ? f.data("pagination").model.pageNumber : f.data("pagination").attributes.pageNumber; case "getTotalPage": return f.data("pagination").model.totalPage; case "getSelectedPageData": return f.data("pagination").currentPageData; case "isDisabled": return f.data("pagination").model.disabled === !0; default: c("Pagination do not provide action: " + e) } return this } } else i.isObject(e) || c("options is illegal"); var k = b.extend({}, arguments.callee.defaults, e); return d(k), g.initialize(), this }, b.fn[f].defaults = { totalNumber: 1, pageNumber: 1, pageSize: 10, pageRange: 2, showPrevious: !0, showNext: !0, showPageNumbers: !0, showNavigator: !1, showGoInput: !1, showGoButton: !1, pageLink: "", prevText: "&laquo;", nextText: "&raquo;", ellipsisText: "...", goButtonText: "Go", classPrefix: "paginationjs", activeClassName: "active", disableClassName: "disabled", inlineStyle: !0, formatNavigator: "<%= currentPage %> / <%= totalPage %>", formatGoInput: "<%= input %>", formatGoButton: "<%= button %>", position: "bottom", autoHidePrevious: !1, autoHideNext: !1, triggerPagingOnInit: !0, hideWhenLessThanOnePage: !1, showFirstOnEllipsisShow: !0, showLastOnEllipsisShow: !0, callback: function () { } }, b.fn[g] = function (a, d) { arguments.length < 2 && c("Missing argument."), b.isFunction(d) || c("callback must be a function."); var e = b(this), f = e.data("pagination"); f || (e.data("pagination", {}), f = e.data("pagination")), !f.hooks && (f.hooks = {}), f.hooks[a] = f.hooks[a] || [], f.hooks[a].push(d) }, b[f] = function (a, d) { arguments.length < 2 && c("Requires two parameters."); var e; return e = "string" != typeof a && a instanceof jQuery ? a : b(a), e.length ? (e.pagination(d), e) : void 0 }; var i = {}; b.each(["Object", "Array"], function (a, b) { i["is" + b] = function (a) { return e(a) === b.toLowerCase() } }), "function" == typeof define && (define.amd || define.cmd) && define(function () { return b }) }(this, window.jQuery);
/*! SWJ.Paging.min.js依赖Pagination.min.js分页插件*/
!function (jqObj) { function paging(a, b, c, d, e, f, g) { if (isNaN(f) || parseInt(f) <= 0) return !1; var h = { pagingctrl: c, url: a, params: b, totalNum: f, pageSize: b.PageSize, beforeSend: d, callback: e, isModifyUrl: !0 }, i = getPageIndex(h.pageSize, h.totalNum); 1 != i && (h.pageNumber = i), 0 == g && (h.isModifyUrl = !1), initPaginControl(h) } function asyncPaging(a, b, c, d, e, f, g) { $(".loadingWrap").append('<div class="loadingBox"></div>'), $(".loadingBox").show(), 1 == f && modifyUrl(), $.post(a, JSON.stringify(b), function (f) { $(".loadingBox").remove(); var h = getObject(f), i = { pagingctrl: c, url: a, params: b, totalNum: h.total, pageSize: b.PageSize, beforeSend: d, callback: e, isModifyUrl: !0 }, j = getPageIndex(i.pageSize, i.totalNum); 1 != j && (i.pageNumber = j), 0 == g && (i.isModifyUrl = !1), initPaginControl(i), h.hasOwnProperty("rows") ? e(h.rows, h.total) : e(h) }, "json") } function initPaginControl(a) { if (void 0 == a) return void alert("Failed to initialize，parmsObj undefined!"); if (void 0 == a.pagingctrl) return void alert("pagingctrl undefined!"); var b = null; if ("string" == typeof a.pagingctrl) { if (b = $("#" + a.pagingctrl), 0 == b.length) return void alert(a.pagingctrl + "undefined!") } else b = a.pagingctrl; var c = !1; isNaN(a.pageNumber) || (c = !0), b.pagination({ dataSource: a.url, ajax: { type: "post", dataType: "json", data: a.params, cache: !1, beforeSend: function (b) { a.beforeSend(b) } }, hideWhenLessThanOnePage: !0, locator: "rows", totalNumber: a.totalNum, pageNumber: a.pageNumber, pageSize: a.pageSize, triggerPagingOnInit: c, pageRange: 3, alias: { pageNumber: "PageIndex", pageSize: "PageSize" }, className: "paginationjs-theme-yellow paginationjs-big", callback: function (b, c) { a.callback(getObject(b), a.totalNum, c), a.isModifyUrl && modifyUrl(c.pageNumber) } }) } function getObject(data) { var dataObj = null; if ("string" == typeof data) try { dataObj = eval(data) } catch (e) { try { dataObj = eval("(" + data + ")") } catch (e1) { alert("格式错误：必须为json格式字符串~！") } } else dataObj = data; return dataObj } function getPageIndex(a, b) { var c = window.location.hash, d = $.trim(c).toLowerCase().replace(/^#p/, ""); if ("" == d || isNaN(d) || 0 == a) return 1; d = parseInt(d, 10); var e = Math.ceil(b / a); return 0 > d ? 1 : d >= e ? e : d } function modifyUrl(a) { var b = window.location.pathname.trim().replace(/\/$/, ""); isNaN(a) || (b = b + "/#p" + a); var c = { title: "三维家", url: b }; history.pushState(c, c.title, c.url) } jqObj.extend(jqObj, { paging: paging, asyncPaging: asyncPaging }) }(window.$);
/*! smartpaginator.min.js - v1.0.0 - 2015-11-13 第二个分页插件 */
!function (a) { a.fn.extend({ smartpaginator: function (b) { var c = a.extend({ totalrecords: 0, recordsperpage: 0, length: 10, next: "Next", prev: "Prev", first: "First", last: "Last", go: "Go", theme: "green", display: "double", initval: 1, datacontainer: "", dataelement: "", onchange: null, controlsalways: !1 }, b); return this.each(function () { function b(b) { l.find("span").remove(); var d = (b + 1) * c.recordsperpage; d > c.totalrecords && (d = c.totalrecords), l.append(a("<span/>").append(a("<b/>").text(b * c.recordsperpage + 1))).append(a("<span/>").text("-")).append(a("<span/>").append(a("<b/>").text(d))).append(a("<span/>").text("of")).append(a("<span/>").append(a("<b/>").text(c.totalrecords))) } function d(d) { if (o.find("li").remove(), !(c.totalrecords <= c.recordsperpage)) { for (var g = d; g < d + c.length && g != j; g++) o.append(a("<li/>").append(a("<a>").attr("id", g + 1).addClass(c.theme).addClass("normal").attr("href", "javascript:void(0)").text(g + 1)).click(function () { h = d + a(this).closest("li").prevAll().length, e(h) })); b(d), t.val(d + 1), o.find("li a").addClass(c.theme).removeClass("active"), o.find("li:eq(0) a").addClass(c.theme).addClass("active"); var i = o.find("li:eq(0) a").outerWidth() + 2 * parseInt(o.find("li:eq(0)").css("margin-left")), k = i * o.find("li").length; o.css({ width: k }), f(d) } } function e(e) { var g = e, i = c.length / 2; c.length % 2 > 0 && (i = (c.length + 1) / 2); var l = 0; if (e >= 0 && j > e) { e >= i && (j - e > i ? l = e - (i - 1) : j > c.length && (l = j - c.length)), d(l), b(h), o.find("li a").removeClass("active"), t.val(h + 1), o.find('li a[id="' + (g + 1) + '"]').addClass("active"); var p = h * c.recordsperpage, q = p + c.recordsperpage; if (q > c.totalrecords && (q = c.totalrecords % q), k && null != c.onchange && c.onchange(h + 1, p, q), null != m && m.length > 0) { n.css("display", "none"), a(n[0]).find("th").length > 0 && (a(n[0]).css("display", ""), p++, q++); for (var r = p; q > r; r++) a(n[r]).css("display", "") } f() } } function f() { j > c.length ? (h > 0 ? c.controlsalways ? p.css("display", "").removeClass("disabled") : p.css("display", "") : c.controlsalways ? p.css("display", "").addClass("disabled") : p.css("display", "none"), h > c.length / 2 - 1 ? c.controlsalways ? r.css("display", "").removeClass("disabled") : r.css("display", "") : c.controlsalways ? r.css("display", "").addClass("disabled") : r.css("display", "none"), h == j - 1 ? c.controlsalways ? q.css("display", "").addClass("disabled") : q.css("display", "none") : c.controlsalways ? q.css("display", "").removeClass("disabled") : q.css("display", ""), j > c.length && h < j - c.length / 2 - 1 ? c.controlsalways ? s.css("display", "").removeClass("disabled") : s.css("display", "") : c.controlsalways ? s.css("display", "").addClass("disabled") : s.css("display", "none")) : c.controlsalways ? (r.css("display", "").addClass("disabled"), p.css("display", "").addClass("disabled"), q.css("display", "").addClass("disabled"), s.css("display", "").addClass("disabled")) : (r.css("display", "none"), p.css("display", "none"), q.css("display", "none"), s.css("display", "none")) } function g(a) { var b = a.get(0).selectionStart, c = a.get(0).selectionEnd, d = document.selection; return d && 0 != d.createRange().text.length ? !0 : d || 0 == a.val().substring(b, c).length ? !1 : !0 } var h = 0, i = 0, j = parseInt(c.totalrecords / c.recordsperpage); c.totalrecords % c.recordsperpage > 0 && j++; var k = !1, l = a(this).addClass("pager").addClass(c.theme); l.find("ul").remove(), l.find("div").remove(), l.find("span").remove(); var m, n; "" != c.datacontainer && (m = a("#" + c.datacontainer), n = a("" + c.dataelement, m)); var o = a("<ul/>"), p = a("<div/>").text(c.prev).click(function () { return a(this).hasClass("disabled") ? !1 : (h = parseInt(o.find("li a.active").text()) - 1, void e(--h)) }).addClass("btn"), q = a("<div/>").text(c.next).click(function () { return a(this).hasClass("disabled") ? !1 : (h = parseInt(o.find("li a.active").text()), void e(h)) }).addClass("btn"), r = a("<div/>").text(c.first).click(function () { return a(this).hasClass("disabled") ? !1 : (h = 0, void e(0)) }).addClass("btn"), s = a("<div/>").text(c.last).click(function () { return a(this).hasClass("disabled") ? !1 : (h = j - 1, void e(h)) }).addClass("btn"), t = a("<input/>").attr("type", "text").keydown(function (a) { if (g(t) && t.val(""), a.which >= 48 && a.which < 58) { var b = parseInt(t.val() + (a.which - 48)); b > 0 && j >= b || a.preventDefault() } else 8 != a.which && 46 != a.which && a.preventDefault() }), u = a("<input/>").attr("type", "button").attr("value", c.go).addClass("btn").click(function () { return "" == t.val() ? !1 : (h = parseInt(t.val()) - 1, void e(h)) }); l.append(r).append(p).append(o).append(q).append(s).append(a("<div/>").addClass("short").append(t).append(u)), "single" == c.display && (u.css("display", "none"), t.css("display", "none")), d(i), 0 == c.initval && (c.initval = 1), h = c.initval - 1, e(h), k = !0 }) } }) }(jQuery);
/*! jquery.qrcode.min.js 2015-11-16 */
!function (a) { a.fn.qrcode = function (b) { function c(a) { this.mode = h, this.data = a } function d(a, b) { this.typeNumber = a, this.errorCorrectLevel = b, this.modules = null, this.moduleCount = 0, this.dataCache = null, this.dataList = [] } function e(a, b) { if (void 0 == a.length) throw Error(a.length + "/" + b); for (var c = 0; c < a.length && 0 == a[c];) c++; this.num = Array(a.length - c + b); for (var d = 0; d < a.length - c; d++) this.num[d] = a[d + c] } function f(a, b) { this.totalCount = a, this.dataCount = b } function g() { this.buffer = [], this.length = 0 } var h; c.prototype = { getLength: function () { return this.data.length }, write: function (a) { for (var b = 0; b < this.data.length; b++) a.put(this.data.charCodeAt(b), 8) } }, d.prototype = { addData: function (a) { this.dataList.push(new c(a)), this.dataCache = null }, isDark: function (a, b) { if (0 > a || this.moduleCount <= a || 0 > b || this.moduleCount <= b) throw Error(a + "," + b); return this.modules[a][b] }, getModuleCount: function () { return this.moduleCount }, make: function () { if (1 > this.typeNumber) { for (var a = 1, a = 1; 40 > a; a++) { for (var b = f.getRSBlocks(a, this.errorCorrectLevel), c = new g, d = 0, e = 0; e < b.length; e++) d += b[e].dataCount; for (e = 0; e < this.dataList.length; e++) b = this.dataList[e], c.put(b.mode, 4), c.put(b.getLength(), i.getLengthInBits(b.mode, a)), b.write(c); if (c.getLengthInBits() <= 8 * d) break } this.typeNumber = a } this.makeImpl(!1, this.getBestMaskPattern()) }, makeImpl: function (a, b) { this.moduleCount = 4 * this.typeNumber + 17, this.modules = Array(this.moduleCount); for (var c = 0; c < this.moduleCount; c++) { this.modules[c] = Array(this.moduleCount); for (var e = 0; e < this.moduleCount; e++) this.modules[c][e] = null } this.setupPositionProbePattern(0, 0), this.setupPositionProbePattern(this.moduleCount - 7, 0), this.setupPositionProbePattern(0, this.moduleCount - 7), this.setupPositionAdjustPattern(), this.setupTimingPattern(), this.setupTypeInfo(a, b), 7 <= this.typeNumber && this.setupTypeNumber(a), null == this.dataCache && (this.dataCache = d.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)), this.mapData(this.dataCache, b) }, setupPositionProbePattern: function (a, b) { for (var c = -1; 7 >= c; c++) if (!(-1 >= a + c || this.moduleCount <= a + c)) for (var d = -1; 7 >= d; d++) -1 >= b + d || this.moduleCount <= b + d || (this.modules[a + c][b + d] = c >= 0 && 6 >= c && (0 == d || 6 == d) || d >= 0 && 6 >= d && (0 == c || 6 == c) || c >= 2 && 4 >= c && d >= 2 && 4 >= d ? !0 : !1) }, getBestMaskPattern: function () { for (var a = 0, b = 0, c = 0; 8 > c; c++) { this.makeImpl(!0, c); var d = i.getLostPoint(this); (0 == c || a > d) && (a = d, b = c) } return b }, createMovieClip: function (a, b, c) { for (a = a.createEmptyMovieClip(b, c), this.make(), b = 0; b < this.modules.length; b++) for (var c = 1 * b, d = 0; d < this.modules[b].length; d++) { var e = 1 * d; this.modules[b][d] && (a.beginFill(0, 100), a.moveTo(e, c), a.lineTo(e + 1, c), a.lineTo(e + 1, c + 1), a.lineTo(e, c + 1), a.endFill()) } return a }, setupTimingPattern: function () { for (var a = 8; a < this.moduleCount - 8; a++) null == this.modules[a][6] && (this.modules[a][6] = 0 == a % 2); for (a = 8; a < this.moduleCount - 8; a++) null == this.modules[6][a] && (this.modules[6][a] = 0 == a % 2) }, setupPositionAdjustPattern: function () { for (var a = i.getPatternPosition(this.typeNumber), b = 0; b < a.length; b++) for (var c = 0; c < a.length; c++) { var d = a[b], e = a[c]; if (null == this.modules[d][e]) for (var f = -2; 2 >= f; f++) for (var g = -2; 2 >= g; g++) this.modules[d + f][e + g] = -2 == f || 2 == f || -2 == g || 2 == g || 0 == f && 0 == g ? !0 : !1 } }, setupTypeNumber: function (a) { for (var b = i.getBCHTypeNumber(this.typeNumber), c = 0; 18 > c; c++) { var d = !a && 1 == (b >> c & 1); this.modules[Math.floor(c / 3)][c % 3 + this.moduleCount - 8 - 3] = d } for (c = 0; 18 > c; c++) d = !a && 1 == (b >> c & 1), this.modules[c % 3 + this.moduleCount - 8 - 3][Math.floor(c / 3)] = d }, setupTypeInfo: function (a, b) { for (var c = i.getBCHTypeInfo(this.errorCorrectLevel << 3 | b), d = 0; 15 > d; d++) { var e = !a && 1 == (c >> d & 1); 6 > d ? this.modules[d][8] = e : 8 > d ? this.modules[d + 1][8] = e : this.modules[this.moduleCount - 15 + d][8] = e } for (d = 0; 15 > d; d++) e = !a && 1 == (c >> d & 1), 8 > d ? this.modules[8][this.moduleCount - d - 1] = e : 9 > d ? this.modules[8][15 - d - 1 + 1] = e : this.modules[8][15 - d - 1] = e; this.modules[this.moduleCount - 8][8] = !a }, mapData: function (a, b) { for (var c = -1, d = this.moduleCount - 1, e = 7, f = 0, g = this.moduleCount - 1; g > 0; g -= 2) for (6 == g && g--; ;) { for (var h = 0; 2 > h; h++) if (null == this.modules[d][g - h]) { var j = !1; f < a.length && (j = 1 == (a[f] >>> e & 1)), i.getMask(b, d, g - h) && (j = !j), this.modules[d][g - h] = j, e--, -1 == e && (f++, e = 7) } if (d += c, 0 > d || this.moduleCount <= d) { d -= c, c = -c; break } } } }, d.PAD0 = 236, d.PAD1 = 17, d.createData = function (a, b, c) { for (var b = f.getRSBlocks(a, b), e = new g, h = 0; h < c.length; h++) { var j = c[h]; e.put(j.mode, 4), e.put(j.getLength(), i.getLengthInBits(j.mode, a)), j.write(e) } for (h = a = 0; h < b.length; h++) a += b[h].dataCount; if (e.getLengthInBits() > 8 * a) throw Error("code length overflow. (" + e.getLengthInBits() + ">" + 8 * a + ")"); for (e.getLengthInBits() + 4 <= 8 * a && e.put(0, 4) ; 0 != e.getLengthInBits() % 8;) e.putBit(!1); for (; !(e.getLengthInBits() >= 8 * a) && (e.put(d.PAD0, 8), !(e.getLengthInBits() >= 8 * a)) ;) e.put(d.PAD1, 8); return d.createBytes(e, b) }, d.createBytes = function (a, b) { for (var c = 0, d = 0, f = 0, g = Array(b.length), h = Array(b.length), j = 0; j < b.length; j++) { var k = b[j].dataCount, l = b[j].totalCount - k, d = Math.max(d, k), f = Math.max(f, l); g[j] = Array(k); for (var m = 0; m < g[j].length; m++) g[j][m] = 255 & a.buffer[m + c]; for (c += k, m = i.getErrorCorrectPolynomial(l), k = new e(g[j], m.getLength() - 1).mod(m), h[j] = Array(m.getLength() - 1), m = 0; m < h[j].length; m++) l = m + k.getLength() - h[j].length, h[j][m] = l >= 0 ? k.get(l) : 0 } for (m = j = 0; m < b.length; m++) j += b[m].totalCount; for (c = Array(j), m = k = 0; d > m; m++) for (j = 0; j < b.length; j++) m < g[j].length && (c[k++] = g[j][m]); for (m = 0; f > m; m++) for (j = 0; j < b.length; j++) m < h[j].length && (c[k++] = h[j][m]); return c }, h = 4; for (var i = { PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]], G15: 1335, G18: 7973, G15_MASK: 21522, getBCHTypeInfo: function (a) { for (var b = a << 10; 0 <= i.getBCHDigit(b) - i.getBCHDigit(i.G15) ;) b ^= i.G15 << i.getBCHDigit(b) - i.getBCHDigit(i.G15); return (a << 10 | b) ^ i.G15_MASK }, getBCHTypeNumber: function (a) { for (var b = a << 12; 0 <= i.getBCHDigit(b) - i.getBCHDigit(i.G18) ;) b ^= i.G18 << i.getBCHDigit(b) - i.getBCHDigit(i.G18); return a << 12 | b }, getBCHDigit: function (a) { for (var b = 0; 0 != a;) b++, a >>>= 1; return b }, getPatternPosition: function (a) { return i.PATTERN_POSITION_TABLE[a - 1] }, getMask: function (a, b, c) { switch (a) { case 0: return 0 == (b + c) % 2; case 1: return 0 == b % 2; case 2: return 0 == c % 3; case 3: return 0 == (b + c) % 3; case 4: return 0 == (Math.floor(b / 2) + Math.floor(c / 3)) % 2; case 5: return 0 == b * c % 2 + b * c % 3; case 6: return 0 == (b * c % 2 + b * c % 3) % 2; case 7: return 0 == (b * c % 3 + (b + c) % 2) % 2; default: throw Error("bad maskPattern:" + a) } }, getErrorCorrectPolynomial: function (a) { for (var b = new e([1], 0), c = 0; a > c; c++) b = b.multiply(new e([1, j.gexp(c)], 0)); return b }, getLengthInBits: function (a, b) { if (b >= 1 && 10 > b) switch (a) { case 1: return 10; case 2: return 9; case h: return 8; case 8: return 8; default: throw Error("mode:" + a) } else if (27 > b) switch (a) { case 1: return 12; case 2: return 11; case h: return 16; case 8: return 10; default: throw Error("mode:" + a) } else { if (!(41 > b)) throw Error("type:" + b); switch (a) { case 1: return 14; case 2: return 13; case h: return 16; case 8: return 12; default: throw Error("mode:" + a) } } }, getLostPoint: function (a) { for (var b = a.getModuleCount(), c = 0, d = 0; b > d; d++) for (var e = 0; b > e; e++) { for (var f = 0, g = a.isDark(d, e), h = -1; 1 >= h; h++) if (!(0 > d + h || d + h >= b)) for (var i = -1; 1 >= i; i++) 0 > e + i || e + i >= b || 0 == h && 0 == i || g == a.isDark(d + h, e + i) && f++; f > 5 && (c += 3 + f - 5) } for (d = 0; b - 1 > d; d++) for (e = 0; b - 1 > e; e++) f = 0, a.isDark(d, e) && f++, a.isDark(d + 1, e) && f++, a.isDark(d, e + 1) && f++, a.isDark(d + 1, e + 1) && f++, (0 == f || 4 == f) && (c += 3); for (d = 0; b > d; d++) for (e = 0; b - 6 > e; e++) a.isDark(d, e) && !a.isDark(d, e + 1) && a.isDark(d, e + 2) && a.isDark(d, e + 3) && a.isDark(d, e + 4) && !a.isDark(d, e + 5) && a.isDark(d, e + 6) && (c += 40); for (e = 0; b > e; e++) for (d = 0; b - 6 > d; d++) a.isDark(d, e) && !a.isDark(d + 1, e) && a.isDark(d + 2, e) && a.isDark(d + 3, e) && a.isDark(d + 4, e) && !a.isDark(d + 5, e) && a.isDark(d + 6, e) && (c += 40); for (e = f = 0; b > e; e++) for (d = 0; b > d; d++) a.isDark(d, e) && f++; return a = Math.abs(100 * f / b / b - 50) / 5, c + 10 * a } }, j = { glog: function (a) { if (1 > a) throw Error("glog(" + a + ")"); return j.LOG_TABLE[a] }, gexp: function (a) { for (; 0 > a;) a += 255; for (; a >= 256;) a -= 255; return j.EXP_TABLE[a] }, EXP_TABLE: Array(256), LOG_TABLE: Array(256) }, k = 0; 8 > k; k++) j.EXP_TABLE[k] = 1 << k; for (k = 8; 256 > k; k++) j.EXP_TABLE[k] = j.EXP_TABLE[k - 4] ^ j.EXP_TABLE[k - 5] ^ j.EXP_TABLE[k - 6] ^ j.EXP_TABLE[k - 8]; for (k = 0; 255 > k; k++) j.LOG_TABLE[j.EXP_TABLE[k]] = k; return e.prototype = { get: function (a) { return this.num[a] }, getLength: function () { return this.num.length }, multiply: function (a) { for (var b = Array(this.getLength() + a.getLength() - 1), c = 0; c < this.getLength() ; c++) for (var d = 0; d < a.getLength() ; d++) b[c + d] ^= j.gexp(j.glog(this.get(c)) + j.glog(a.get(d))); return new e(b, 0) }, mod: function (a) { if (0 > this.getLength() - a.getLength()) return this; for (var b = j.glog(this.get(0)) - j.glog(a.get(0)), c = Array(this.getLength()), d = 0; d < this.getLength() ; d++) c[d] = this.get(d); for (d = 0; d < a.getLength() ; d++) c[d] ^= j.gexp(j.glog(a.get(d)) + b); return new e(c, 0).mod(a) } }, f.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]], f.getRSBlocks = function (a, b) { var c = f.getRsBlockTable(a, b); if (void 0 == c) throw Error("bad rs block @ typeNumber:" + a + "/errorCorrectLevel:" + b); for (var d = c.length / 3, e = [], g = 0; d > g; g++) for (var h = c[3 * g + 0], i = c[3 * g + 1], j = c[3 * g + 2], k = 0; h > k; k++) e.push(new f(i, j)); return e }, f.getRsBlockTable = function (a, b) { switch (b) { case 1: return f.RS_BLOCK_TABLE[4 * (a - 1) + 0]; case 0: return f.RS_BLOCK_TABLE[4 * (a - 1) + 1]; case 3: return f.RS_BLOCK_TABLE[4 * (a - 1) + 2]; case 2: return f.RS_BLOCK_TABLE[4 * (a - 1) + 3] } }, g.prototype = { get: function (a) { return 1 == (this.buffer[Math.floor(a / 8)] >>> 7 - a % 8 & 1) }, put: function (a, b) { for (var c = 0; b > c; c++) this.putBit(1 == (a >>> b - c - 1 & 1)) }, getLengthInBits: function () { return this.length }, putBit: function (a) { var b = Math.floor(this.length / 8); this.buffer.length <= b && this.buffer.push(0), a && (this.buffer[b] |= 128 >>> this.length % 8), this.length++ } }, "string" == typeof b && (b = { text: b }), b = a.extend({}, { render: "canvas", width: 256, height: 256, typeNumber: -1, correctLevel: 2, background: "#ffffff", foreground: "#000000" }, b), this.each(function () { var c; if ("canvas" == b.render) { c = new d(b.typeNumber, b.correctLevel), c.addData(b.text), c.make(); var e = document.createElement("canvas"); e.width = b.width, e.height = b.height; for (var f = e.getContext("2d"), g = b.width / c.getModuleCount(), h = b.height / c.getModuleCount(), i = 0; i < c.getModuleCount() ; i++) for (var j = 0; j < c.getModuleCount() ; j++) { f.fillStyle = c.isDark(i, j) ? b.foreground : b.background; var k = Math.ceil((j + 1) * g) - Math.floor(j * g), l = Math.ceil((i + 1) * g) - Math.floor(i * g); f.fillRect(Math.round(j * g), Math.round(i * h), k, l) } } else for (c = new d(b.typeNumber, b.correctLevel), c.addData(b.text), c.make(), e = a("<table></table>").css("width", b.width + "px").css("height", b.height + "px").css("border", "0px").css("border-collapse", "collapse").css("background-color", b.background), f = b.width / c.getModuleCount(), g = b.height / c.getModuleCount(), h = 0; h < c.getModuleCount() ; h++) for (i = a("<tr></tr>").css("height", g + "px").appendTo(e), j = 0; j < c.getModuleCount() ; j++) a("<td></td>").css("width", f + "px").css("background-color", c.isDark(h, j) ? b.foreground : b.background).appendTo(i); c = e, jQuery(c).appendTo(this) }) } }(jQuery);
/*! schemeshare.min.js - 2015-11-16 */
function sina_weibo_share(a, b, c) { host = window.location.host, b = "https://" + host + b; var d = { url: b, type: "3", count: "1", appkey: "", title: a, pic: c, ralateUid: "", language: "zh_cn", rnd: (new Date).valueOf() }, e = []; for (var f in d) e.push(f + "=" + encodeURIComponent(d[f] || "")); var g = "https://service.weibo.com/share/share.php?" + e.join("&"); window.open(g, "", "width=615, height=505, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no") } function qzone_share(a, b, c) { host = window.location.host, b = "https://" + host + b; var d = { url: b, showcount: "0", desc: "", summary: a, title: a, site: "", pics: c }, e = []; for (var f in d) e.push(f + "=" + encodeURIComponent(d[f] || "")); var g = "https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?" + e.join("&"); window.open(g, "", "width=615, height=505, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no") } function qq_share(a, b, c) { host = window.location.host, b = "https://" + host + b; var d = { url: location.href, showcount: "0", desc: "", summary: a, title: a, site: b, pics: c }, e = []; for (var f in d) e.push(f + "=" + encodeURIComponent(d[f] || "")); var g = "https://connect.qq.com/widget/shareqq/index.html?" + e.join("&"); window.open(g, "", "width=1220, height=600, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no") } function shareToHuaban() { var a = { url: location.href, description: "{$schemeDetail.SchemeName}", media: "{$schemeDetail.ImagePath}" }, b = []; for (var c in a) b.push(c + "=" + encodeURIComponent(a[c] || "")); var d = "https://huaban.com/bookmarklet/?" + b.join("&"); window.open(d, "", "status=no,resizable=no,scrollbars=yes,personalbar=no,directories=no,location=no,toolbar=no,menubar=no,width=632,height=270,left=0,top=0") } function shareToRenren() { var a = { resourceUrl: location.href, pic: "{$schemeDetail.ImagePath}", title: "{$schemeDetail.SchemeName}", description: "{$schemeDetail.SchemeName}" }, b = []; for (var c in a) b.push(c + "=" + encodeURIComponent(a[c] || "")); var d = "https://widget.renren.com/dialog/share?" + b.join("&"); window.open(d, "", "width=615, height=505, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no") } function processString(a) { var b = { title: "", summary: "" }; if ("undefined" == b || "" == b) return b; var c = a.split("|"); if (0 == c.length) return b; b.title = c[0], b.summary = ""; for (var d = 1; d < c.length; d++) "undefined " != c[d] && "" != c[d] && (b.summary += c[d] + " ，"); return b.summary.substring(0, b.summary.length - 1), b }
/*! jquery.lazyloading.min.js - 2015-11-16 */
function DomInfo(a, b, c, d, e) { this.id = a, this.offsetTop = b, this.offsetLeft = c, this.width = d, this.height = e } function SamkinLoading() { this.iconUrlPrix = "", this.loading = function (a) { }, this.getLoadingDivInfo = function (a) { for (var b = document.getElementById(a), c = b.offsetTop, d = b.offsetLeft, e = b.clientHeight, f = b.clientWidth; b = b.offsetParent;) c += b.offsetTop, d += b.offsetLeft; return new DomInfo(a, c, d, f, e) }, this.createDiv = function (a) { var b, c = this.getLoadingDivInfo(a); if (b = document.getElementById("   " + a), !b) { b = document.createElement("div"), b.setAttribute("id", "loadingDiv_" + c.id); var d = document.createElement("div"); d.className = "samkin-loading-top-div", b.appendChild(d), document.body.appendChild(b) } b.style.top = c.offsetTop + "px", b.style.left = c.offsetLeft + "px", b.style.width = c.width + "px", b.style.height = c.height + "px", b.setAttribute("class", "samkin-loading-bottom-div"), b.className = "samkin-loading-bottom-div", b.style.display = document.getElementById(c.id).style.display }, this.isIE = function () { return document.body.addEventListener ? !1 : document.body.attachEvent ? !0 : void 0 }, this.showLoading = function (a) { this.createDiv(a) }, this.hideLoading = function (a) { var b = document.getElementById("loadingDiv_" + a); b && $("#loadingDiv_" + a).remove() }, this.createLoadingObj = function (a) { }, this.test = function (a) { this.showLoading(a) } } var $_yxj = new SamkinLoading; !function (a) { a && a.fn.extend({ showLoading: function () { a(this).css("height", a(this).attr("ht") + "px"), $_yxj.showLoading(a(this).attr("id")) }, hideLoading: function () { a(this).css("height", "auto"), $_yxj.hideLoading(a(this).attr("id")) } }) }(jQuery);
/*! jquery.scrollLoading.min.js - 2015-11-16 */
!function (a) { a.fn.scrollLoading = function (b) { var c = function () { var c = { attr: "data-url" }, d = a.extend({}, c, b || {}); return d.cache = [], a(".loadingImg").each(function () { var b = "img", c = a(this).attr(d.attr); if (c) { var e = { obj: a(this), tag: b, url: c }; d.cache.push(e) } }), d }, d = function () { var b = a(window).scrollTop(), d = b + a(window).height(), e = c(); return a.each(e.cache, function (a, c) { var e = c.obj, f = c.tag, g = c.url; e && (post = e.offset().top, posb = post + e.height(), (post > b && post < d || posb > b && posb < d) && ("img" === f ? e.attr("src", g) : e.load(g), c.obj = null)) }), !1 }; d(), a(window).bind("scroll", d) } }(jQuery);
/*! jquery.SuperSlide.min.js - 2015-11-16 */
!function (a) { a.fn.slide = function (b) { return a.fn.slide.defaults = { type: "slide", effect: "fade", autoPlay: !1, delayTime: 500, interTime: 2500, triggerTime: 150, defaultIndex: 0, titCell: ".hd li", mainCell: ".bd", targetCell: null, trigger: "mouseover", scroll: 1, vis: 1, titOnClassName: "on", autoPage: !1, prevCell: ".prev", nextCell: ".next", pageStateCell: ".pageState", opp: !1, pnLoop: !0, easing: "swing", startFun: null, endFun: null, switchLoad: null, playStateCell: ".playState", mouseOverStop: !0, defaultPlay: !0, returnDefault: !1 }, this.each(function () { var c = a.extend({}, a.fn.slide.defaults, b), d = a(this), e = c.effect, f = a(c.prevCell, d), g = a(c.nextCell, d), h = a(c.pageStateCell, d), i = a(c.playStateCell, d), j = a(c.titCell, d), k = j.size(), l = a(c.mainCell, d), m = l.children().size(), n = c.switchLoad, o = a(c.targetCell, d), p = parseInt(c.defaultIndex), q = parseInt(c.delayTime), r = parseInt(c.interTime); parseInt(c.triggerTime); var Q, t = parseInt(c.scroll), u = parseInt(c.vis), v = "false" == c.autoPlay || 0 == c.autoPlay ? !1 : !0, w = "false" == c.opp || 0 == c.opp ? !1 : !0, x = "false" == c.autoPage || 0 == c.autoPage ? !1 : !0, y = "false" == c.pnLoop || 0 == c.pnLoop ? !1 : !0, z = "false" == c.mouseOverStop || 0 == c.mouseOverStop ? !1 : !0, A = "false" == c.defaultPlay || 0 == c.defaultPlay ? !1 : !0, B = "false" == c.returnDefault || 0 == c.returnDefault ? !1 : !0, C = 0, D = 0, E = 0, F = 0, G = c.easing, H = null, I = null, J = null, K = c.titOnClassName, L = j.index(d.find("." + K)), M = p = -1 == L ? p : L, N = p, O = p, P = m >= u ? 0 != m % t ? m % t : t : 0, R = "leftMarquee" == e || "topMarquee" == e ? !0 : !1, S = function () { a.isFunction(c.startFun) && c.startFun(p, k, d, a(c.titCell, d), l, o, f, g) }, T = function () { a.isFunction(c.endFun) && c.endFun(p, k, d, a(c.titCell, d), l, o, f, g) }, U = function () { j.removeClass(K), A && j.eq(N).addClass(K) }; if ("menu" == c.type) return A && j.removeClass(K).eq(p).addClass(K), j.hover(function () { Q = a(this).find(c.targetCell); var b = j.index(a(this)); I = setTimeout(function () { switch (p = b, j.removeClass(K).eq(p).addClass(K), S(), e) { case "fade": Q.stop(!0, !0).animate({ opacity: "show" }, q, G, T); break; case "slideDown": Q.stop(!0, !0).animate({ height: "show" }, q, G, T) } }, c.triggerTime) }, function () { switch (clearTimeout(I), e) { case "fade": Q.animate({ opacity: "hide" }, q, G); break; case "slideDown": Q.animate({ height: "hide" }, q, G) } }), B && d.hover(function () { clearTimeout(J) }, function () { J = setTimeout(U, q) }), void 0; if (0 == k && (k = m), R && (k = 2), x) { if (m >= u) if ("leftLoop" == e || "topLoop" == e) k = 0 != m % t ? (0 ^ m / t) + 1 : m / t; else { var V = m - u; k = 1 + parseInt(0 != V % t ? V / t + 1 : V / t), 0 >= k && (k = 1) } else k = 1; j.html(""); var W = ""; if (1 == c.autoPage || "true" == c.autoPage) for (var X = 0; k > X; X++) W += "<li>" + (X + 1) + "</li>"; else for (var X = 0; k > X; X++) W += c.autoPage.replace("$", X + 1); j.html(W); var j = j.children() } if (m >= u) { l.children().each(function () { a(this).width() > E && (E = a(this).width(), D = a(this).outerWidth(!0)), a(this).height() > F && (F = a(this).height(), C = a(this).outerHeight(!0)) }); var Y = l.children(), Z = function () { for (var a = 0; u > a; a++) Y.eq(a).clone().addClass("clone").appendTo(l); for (var a = 0; P > a; a++) Y.eq(m - a - 1).clone().addClass("clone").prependTo(l) }; switch (e) { case "fold": l.css({ position: "relative", width: D, height: C }).children().css({ position: "absolute", width: E, left: 0, top: 0, display: "none" }); break; case "top": l.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; height:' + u * C + 'px"></div>').css({ top: -(p * t) * C, position: "relative", padding: "0", margin: "0" }).children().css({ height: F }); break; case "left": l.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; width:' + u * D + 'px"></div>').css({ width: m * D, left: -(p * t) * D, position: "relative", overflow: "hidden", padding: "0", margin: "0" }).children().css({ "float": "left", width: E }); break; case "leftLoop": case "leftMarquee": Z(), l.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; width:' + u * D + 'px"></div>').css({ width: (m + u + P) * D, position: "relative", overflow: "hidden", padding: "0", margin: "0", left: -(P + p * t) * D }).children().css({ "float": "left", width: E }); break; case "topLoop": case "topMarquee": Z(), l.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; height:' + u * C + 'px"></div>').css({ height: (m + u + P) * C, position: "relative", padding: "0", margin: "0", top: -(P + p * t) * C }).children().css({ height: F }) } } var $ = function (a) { var b = a * t; return a == k ? b = m : -1 == a && 0 != m % t && (b = -m % t), b }, _ = function (b) { var c = function (c) { for (var d = c; u + c > d; d++) b.eq(d).find("img[" + n + "]").each(function () { var b = a(this); if (b.attr("src", b.attr(n)).removeAttr(n), l.find(".clone")[0]) for (var c = l.children(), d = 0; d < c.size() ; d++) c.eq(d).find("img[" + n + "]").each(function () { a(this).attr(n) == b.attr("src") && a(this).attr("src", a(this).attr(n)).removeAttr(n) }) }) }; switch (e) { case "fade": case "fold": case "top": case "left": case "slideDown": c(p * t); break; case "leftLoop": case "topLoop": c(P + $(O)); break; case "leftMarquee": case "topMarquee": var d = "leftMarquee" == e ? l.css("left").replace("px", "") : l.css("top").replace("px", ""), f = "leftMarquee" == e ? D : C, g = P; if (0 != d % f) { var h = Math.abs(0 ^ d / f); g = 1 == p ? P + h : P + h - 1 } c(g) } }, ab = function (a) { if (!A || M != p || a || R) { if (R ? p >= 1 ? p = 1 : 0 >= p && (p = 0) : (O = p, p >= k ? p = 0 : 0 > p && (p = k - 1)), S(), null != n && _(l.children()), o[0] && (Q = o.eq(p), null != n && _(o), "slideDown" == e ? (o.not(Q).stop(!0, !0).slideUp(q), Q.slideDown(q, G, function () { l[0] || T() })) : (o.not(Q).stop(!0, !0).hide(), Q.animate({ opacity: "show" }, q, function () { l[0] || T() }))), m >= u) switch (e) { case "fade": l.children().stop(!0, !0).eq(p).animate({ opacity: "show" }, q, G, function () { T() }).siblings().hide(); break; case "fold": l.children().stop(!0, !0).eq(p).animate({ opacity: "show" }, q, G, function () { T() }).siblings().animate({ opacity: "hide" }, q, G); break; case "top": l.stop(!0, !1).animate({ top: -p * t * C }, q, G, function () { T() }); break; case "left": l.stop(!0, !1).animate({ left: -p * t * D }, q, G, function () { T() }); break; case "leftLoop": var b = O; l.stop(!0, !0).animate({ left: -($(O) + P) * D }, q, G, function () { -1 >= b ? l.css("left", -(P + (k - 1) * t) * D) : b >= k && l.css("left", -P * D), T() }); break; case "topLoop": var b = O; l.stop(!0, !0).animate({ top: -($(O) + P) * C }, q, G, function () { -1 >= b ? l.css("top", -(P + (k - 1) * t) * C) : b >= k && l.css("top", -P * C), T() }); break; case "leftMarquee": var c = l.css("left").replace("px", ""); 0 == p ? l.animate({ left: ++c }, 0, function () { l.css("left").replace("px", "") >= 0 && l.css("left", -m * D) }) : l.animate({ left: --c }, 0, function () { l.css("left").replace("px", "") <= -(m + P) * D && l.css("left", -P * D) }); break; case "topMarquee": var d = l.css("top").replace("px", ""); 0 == p ? l.animate({ top: ++d }, 0, function () { l.css("top").replace("px", "") >= 0 && l.css("top", -m * C) }) : l.animate({ top: --d }, 0, function () { l.css("top").replace("px", "") <= -(m + P) * C && l.css("top", -P * C) }) } j.removeClass(K).eq(p).addClass(K), M = p, y || (g.removeClass("nextStop"), f.removeClass("prevStop"), 0 == p && f.addClass("prevStop"), p == k - 1 && g.addClass("nextStop")), h.html("<span>" + (p + 1) + "</span>/" + k) } }; A && ab(!0), B && d.hover(function () { clearTimeout(J) }, function () { J = setTimeout(function () { p = N, A ? ab() : "slideDown" == e ? Q.slideUp(q, U) : Q.animate({ opacity: "hide" }, q, U), M = p }, 300) }); var bb = function (a) { H = setInterval(function () { w ? p-- : p++, ab() }, a ? a : r) }, cb = function (a) { H = setInterval(ab, a ? a : r) }, db = function () { z || (clearInterval(H), bb()) }, eb = function () { (y || p != k - 1) && (p++, ab(), R || db()) }, fb = function () { (y || 0 != p) && (p--, ab(), R || db()) }, gb = function () { clearInterval(H), R ? cb() : bb(), i.removeClass("pauseState") }, hb = function () { clearInterval(H), i.addClass("pauseState") }; if (v ? R ? (w ? p-- : p++, cb(), z && l.hover(hb, gb)) : (bb(), z && d.hover(hb, gb)) : (R && (w ? p-- : p++), i.addClass("pauseState")), i.click(function () { i.hasClass("pauseState") ? gb() : hb() }), "mouseover" == c.trigger ? j.hover(function () { var a = j.index(this); I = setTimeout(function () { p = a, ab(), db() }, c.triggerTime) }, function () { clearTimeout(I) }) : j.click(function () { p = j.index(this), ab(), db() }), R) { if (g.mousedown(eb), f.mousedown(fb), y) { var ib, jb = function () { ib = setTimeout(function () { clearInterval(H), cb(0 ^ r / 10) }, 150) }, kb = function () { clearTimeout(ib), clearInterval(H), cb() }; g.mousedown(jb), g.mouseup(kb), f.mousedown(jb), f.mouseup(kb) } "mouseover" == c.trigger && (g.hover(eb, function () { }), f.hover(fb, function () { })) } else g.click(eb), f.click(fb) }) } }(jQuery), jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, { def: "easeOutQuad", swing: function (a, b, c, d, e) { return jQuery.easing[jQuery.easing.def](a, b, c, d, e) }, easeInQuad: function (a, b, c, d, e) { return d * (b /= e) * b + c }, easeOutQuad: function (a, b, c, d, e) { return -d * (b /= e) * (b - 2) + c }, easeInOutQuad: function (a, b, c, d, e) { return (b /= e / 2) < 1 ? d / 2 * b * b + c : -d / 2 * (--b * (b - 2) - 1) + c }, easeInCubic: function (a, b, c, d, e) { return d * (b /= e) * b * b + c }, easeOutCubic: function (a, b, c, d, e) { return d * ((b = b / e - 1) * b * b + 1) + c }, easeInOutCubic: function (a, b, c, d, e) { return (b /= e / 2) < 1 ? d / 2 * b * b * b + c : d / 2 * ((b -= 2) * b * b + 2) + c }, easeInQuart: function (a, b, c, d, e) { return d * (b /= e) * b * b * b + c }, easeOutQuart: function (a, b, c, d, e) { return -d * ((b = b / e - 1) * b * b * b - 1) + c }, easeInOutQuart: function (a, b, c, d, e) { return (b /= e / 2) < 1 ? d / 2 * b * b * b * b + c : -d / 2 * ((b -= 2) * b * b * b - 2) + c }, easeInQuint: function (a, b, c, d, e) { return d * (b /= e) * b * b * b * b + c }, easeOutQuint: function (a, b, c, d, e) { return d * ((b = b / e - 1) * b * b * b * b + 1) + c }, easeInOutQuint: function (a, b, c, d, e) { return (b /= e / 2) < 1 ? d / 2 * b * b * b * b * b + c : d / 2 * ((b -= 2) * b * b * b * b + 2) + c }, easeInSine: function (a, b, c, d, e) { return -d * Math.cos(b / e * (Math.PI / 2)) + d + c }, easeOutSine: function (a, b, c, d, e) { return d * Math.sin(b / e * (Math.PI / 2)) + c }, easeInOutSine: function (a, b, c, d, e) { return -d / 2 * (Math.cos(Math.PI * b / e) - 1) + c }, easeInExpo: function (a, b, c, d, e) { return 0 == b ? c : d * Math.pow(2, 10 * (b / e - 1)) + c }, easeOutExpo: function (a, b, c, d, e) { return b == e ? c + d : d * (-Math.pow(2, -10 * b / e) + 1) + c }, easeInOutExpo: function (a, b, c, d, e) { return 0 == b ? c : b == e ? c + d : (b /= e / 2) < 1 ? d / 2 * Math.pow(2, 10 * (b - 1)) + c : d / 2 * (-Math.pow(2, -10 * --b) + 2) + c }, easeInCirc: function (a, b, c, d, e) { return -d * (Math.sqrt(1 - (b /= e) * b) - 1) + c }, easeOutCirc: function (a, b, c, d, e) { return d * Math.sqrt(1 - (b = b / e - 1) * b) + c }, easeInOutCirc: function (a, b, c, d, e) { return (b /= e / 2) < 1 ? -d / 2 * (Math.sqrt(1 - b * b) - 1) + c : d / 2 * (Math.sqrt(1 - (b -= 2) * b) + 1) + c }, easeInElastic: function (a, b, c, d, e) { var f = 1.70158, g = 0, h = d; if (0 == b) return c; if (1 == (b /= e)) return c + d; if (g || (g = .3 * e), h < Math.abs(d)) { h = d; var f = g / 4 } else var f = g / (2 * Math.PI) * Math.asin(d / h); return -(h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g)) + c }, easeOutElastic: function (a, b, c, d, e) { var f = 1.70158, g = 0, h = d; if (0 == b) return c; if (1 == (b /= e)) return c + d; if (g || (g = .3 * e), h < Math.abs(d)) { h = d; var f = g / 4 } else var f = g / (2 * Math.PI) * Math.asin(d / h); return h * Math.pow(2, -10 * b) * Math.sin((b * e - f) * 2 * Math.PI / g) + d + c }, easeInOutElastic: function (a, b, c, d, e) { var f = 1.70158, g = 0, h = d; if (0 == b) return c; if (2 == (b /= e / 2)) return c + d; if (g || (g = e * .3 * 1.5), h < Math.abs(d)) { h = d; var f = g / 4 } else var f = g / (2 * Math.PI) * Math.asin(d / h); return 1 > b ? -.5 * h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g) + c : .5 * h * Math.pow(2, -10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g) + d + c }, easeInBack: function (a, b, c, d, e, f) { return void 0 == f && (f = 1.70158), d * (b /= e) * b * ((f + 1) * b - f) + c }, easeOutBack: function (a, b, c, d, e, f) { return void 0 == f && (f = 1.70158), d * ((b = b / e - 1) * b * ((f + 1) * b + f) + 1) + c }, easeInOutBack: function (a, b, c, d, e, f) { return void 0 == f && (f = 1.70158), (b /= e / 2) < 1 ? d / 2 * b * b * (((f *= 1.525) + 1) * b - f) + c : d / 2 * ((b -= 2) * b * (((f *= 1.525) + 1) * b + f) + 2) + c }, easeInBounce: function (a, b, c, d, e) { return d - jQuery.easing.easeOutBounce(a, e - b, 0, d, e) + c }, easeOutBounce: function (a, b, c, d, e) { return (b /= e) < 1 / 2.75 ? d * 7.5625 * b * b + c : 2 / 2.75 > b ? d * (7.5625 * (b -= 1.5 / 2.75) * b + .75) + c : 2.5 / 2.75 > b ? d * (7.5625 * (b -= 2.25 / 2.75) * b + .9375) + c : d * (7.5625 * (b -= 2.625 / 2.75) * b + .984375) + c }, easeInOutBounce: function (a, b, c, d, e) { return e / 2 > b ? .5 * jQuery.easing.easeInBounce(a, 2 * b, 0, d, e) + c : .5 * jQuery.easing.easeOutBounce(a, 2 * b - e, 0, d, e) + .5 * d + c } });

//图片延迟加载
$(function () {
    $(".loadingImg").scrollLoading();
});
/*! jquery.placeholder.min.js - 2015-11-18 */
!function (a) { "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof module && module.exports ? require("jquery") : jQuery) }(function (a) { function b(b) { var c = {}, d = /^jQuery\d+$/; return a.each(b.attributes, function (a, b) { b.specified && !d.test(b.name) && (c[b.name] = b.value) }), c } function c(b, c) { var d = this, f = a(d); if (d.value == f.attr("placeholder") && f.hasClass(m.customClass)) if (f.data("placeholder-password")) { if (f = f.hide().nextAll('input[type="password"]:first').show().attr("id", f.removeAttr("id").data("placeholder-id")), b === !0) return f[0].value = c; f.focus() } else d.value = "", f.removeClass(m.customClass), d == e() && d.select() } function d() { var d, e = this, f = a(e), g = this.id; if ("" === e.value) { if ("password" === e.type) { if (!f.data("placeholder-textinput")) { try { d = f.clone().attr({ type: "text" }) } catch (h) { d = a("<input>").attr(a.extend(b(this), { type: "text" })) } d.removeAttr("name").data({ "placeholder-password": f, "placeholder-id": g }).bind("focus.placeholder", c), f.data({ "placeholder-textinput": d, "placeholder-id": g }).before(d) } f = f.removeAttr("id").hide().prevAll('input[type="text"]:first').attr("id", g).show() } f.addClass(m.customClass), f[0].value = f.attr("placeholder") } else f.removeClass(m.customClass) } function e() { try { return document.activeElement } catch (a) { } } var f, g, h = "[object OperaMini]" == Object.prototype.toString.call(window.operamini), i = "placeholder" in document.createElement("input") && !h, j = "placeholder" in document.createElement("textarea") && !h, k = a.valHooks, l = a.propHooks; if (i && j) g = a.fn.placeholder = function () { return this }, g.input = g.textarea = !0; else { var m = {}; g = a.fn.placeholder = function (b) { var e = { customClass: "placeholder" }; m = a.extend({}, e, b); var f = this; return f.filter((i ? "textarea" : ":input") + "[placeholder]").not("." + m.customClass).bind({ "focus.placeholder": c, "blur.placeholder": d }).data("placeholder-enabled", !0).trigger("blur.placeholder"), f }, g.input = i, g.textarea = j, f = { get: function (b) { var c = a(b), d = c.data("placeholder-password"); return d ? d[0].value : c.data("placeholder-enabled") && c.hasClass(m.customClass) ? "" : b.value }, set: function (b, f) { var g = a(b), h = g.data("placeholder-password"); return h ? h[0].value = f : g.data("placeholder-enabled") ? ("" === f ? (b.value = f, b != e() && d.call(b)) : g.hasClass(m.customClass) ? c.call(b, !0, f) || (b.value = f) : b.value = f, g) : b.value = f } }, i || (k.input = f, l.value = f), j || (k.textarea = f, l.value = f), a(function () { a(document).delegate("form", "submit.placeholder", function () { var b = a("." + m.customClass, this).each(c); setTimeout(function () { b.each(d) }, 10) }) }), a(window).bind("beforeunload.placeholder", function () { a("." + m.customClass).each(function () { this.value = "" }) }) } });
$('input, textarea').placeholder();

//login function
function refreshUserInfo() {
    $.get('/Account/UserInfo', function (data) { //'@Url.Action("UserInfo", "Account", new { area = "" })'
        $(".divUserInfoDisplay").html(data);
        $('#loginpop').hide();
        if ($("#signin").attr("data") == "true") {
            $(".comment_tit .more_comment").trigger("click");
            $("#signin").attr("data", "false");
        } else {
            $("#signin").attr("data", "false");
        }
    });
}

function checklogin(f) {
    var username = f.UserName.value;
    var password = f.Password.value;
    if (username.length == "") {
        layer.msg('用户名或者手机号不能为空');
        f.UserName.focus();
        return;
    }
    if (password == "") {
        layer.msg('密码不能为空');
        f.Password.focus();
        return false;
    }


    //中场后台登录
    var headers = {};
    headers['X-XSRF-Token'] = $('input[name="__RequestVerificationToken"]').val();

    $.ajax({
        cache: false,
        dataType: 'json',
        type: 'POST',
        headers: headers,
        data: JSON.stringify({
            userName: username,
            password: password,
            returnUrl: $('input[name="returnUrl"]').val()
        }),
        contentType: 'application/json; charset=utf-8',
        url: '/Account/Login',// /Account/Login @Url.Action("Login", "Account", new { area = "" })
        beforeSend: function () {
            $('.submit_btn').val('登录中...').prop("disabled", true);
        },
        success: function (response) {
            if (response && response.Status == 1) {
                layer.msg("登录成功！");
                refreshUserInfo();
                window.location = window.location.href;
            } else {
                layer.msg(response.MSG);
                f.Password.value = "";
            }
        }, error: function (response) {
            layer.msg('访问服务器发生异常，请联系管理员，谢谢！');
        }, complete: function () {
            $('.submit_btn').val('登录').prop("disabled", false);
        }
    });
}

$(document).ready(function () {
    $('.loginbox').click(function () {
        $('#loginpop').show();
    });
    $('.loginmask').click(function () {
        $('#loginpop').hide();
    });
    $('.pop_close').click(function () {
        $('#loginpop').hide();
    });

    //var domainName = window.location.hostname;
    //if (domainName.indexOf("www.") != 0)
    //{
    //    $("#UnionDetail").hide();
    //}
});

//apply function
//预约弹框验证码操作
$(function () {
    /*-------------------------------------------*/
    var InterValObj; //timer变量，控制时间
    var count = 60; //间隔函数，1秒执行
    var curCount = 60;//当前剩余秒数
    var code = ""; //验证码
    var codeLength = 6;//验证码长度
    var states = true;
    $("#msgs-bin").click(function () {
        if ($(".umobile").val() === '') {
            layer.msg('请填写手机号码！');
            return false;
        }
        if (!checkMobile($(".umobile").val())) {
            layer.msg('请输入正确手机号码！');
            return false;
        }
        if (states) {
            states = false;
            curCount = count;
            var dealType; //验证方式e
            //设置button效果，开始计时
            $(this).addClass("msgs1");
            $(this).html(curCount + "秒");
            InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
            //向后台发送处理数据
            $.ajax({
                type: "POST", //用POST方式传输
                dataType: "JSON", //数据格式:JSON
                url: App.BasePath + 'api/guest/send/Order/' + $(".umobile").val(),
                error: function (XMLHttpRequest, textStatus, errorThrown) { },
                success: function (response) {
                    if (response.Status != 1) {
                        curCount = 0;
                        layer.msg(response.MSG);
                    }
                }
            });
        }
    });
    //timer处理函数
    function SetRemainTime() {
        if (curCount == 0) {
            window.clearInterval(InterValObj);//停止计时器
            $(".msgs").html("重新获取");
            $(".msgs").removeClass("msgs1");
            code = ""; //清除验证码。如果不清除，过时间后，输入收到的验证码依然有效
            states = true;
        }
        else {
            states = false;
            curCount--;
            $(".msgs").html(curCount + "秒");
        }
    };
    function checkMobile(s) {
        var reg = /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$/;
        if (s !== "" && !reg.test(s) || s.length !== 11) {
            return false;
        } else {
            return true;
        }
    }

});

$(document).ready(function () {
    $('.applybox').click(function () {
        $(".apply-bin").val("申请提交");
        $('#applypop').show();
    });
    $('.applymask').click(function () {
        $(".apply-bin").val("申请提交");
        $('#applypop').hide();
    });
    $('.pop_close').click(function () {
        $(".apply-bin").val("申请提交");
        $('#applypop').hide();
    });


    /*省市联动  strat*/
    var district = base_districts;
    var cities = base_cities;

    //设置省份
    SetSelectOptions(district, 'apply_province', 1);

    SetSelectOptions(district, 'apply_city', 0);

    //绑定apply_province的onchange事件
    $(".apply_province").change(function () {
        SetSelectOptions(district, 'apply_city', $(".apply_province").val());
    })

    //解析IP自动绑定省和市
    var province = $('#ApplyProvince').val();
    var city = $('#ApplyCity').val();
    if (province != "0" && city != "0") {
        var provinceId = getProCityId(district, $.trim(province));
        if (provinceId != '0') {
            $(".apply_province").val(provinceId);
            $(".apply_province").change();
        }
        var cityId = getProCityId(district, $.trim(city));
        if (cityId != '0') {
            $(".apply_city").val(cityId);
        }
    }
});

//根据名称得到省市Id
function getProCityId(district, name) {
    var proCityId = '0';
    $(district).each(function (index) {
        var vv = district[index];
        var result = vv.DistrictName.replace('省', '').replace('市', '');
        if (result == name) {
            proCityId = vv.DistrictId;
        }
    });
    return proCityId;
}

//var regname= /[\u4e00-\u9fa5]/; //中文正则表达式
var regmobile = /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$/;//手机验证表达式

function checkApply(f) {
    if (f.province.value == "0") {
        layer.msg('请选择省份');
        f.province.focus();
        return false;
    }
    if (f.city.value == "0") {
        layer.msg('请选择城市');
        f.city.focus();
        return false;
    }
    if (f.username.value == '' || f.username.value.length > 25) {
        layer.msg('亲,请输入真实姓名,长度为24个字符');
        f.username.focus();
        return false;
    }
    if (f.mobile.value == "" || !regmobile.test(f.mobile.value)) {
        layer.msg('亲,请输入正确的手机号码！');
        f.mobile.focus();
        return false;
    }
    if (f.voty.value == "") {
        layer.msg('请输入验证码！');
        f.voty.focus();
        return false;
    }

    $("#submit").val("正在提交预约申请...");
    $("#submit").css("background-color", "#e2e2e2");
    $("#submit").attr("disabled", "disabled");

    var reserverStr = f.city.value + "," + f.province.value + "," + f.username.value + "," + f.mobile.value + "," + rsType + "," + rsId + "," + f.voty.value;
    $.post("/PMC/Decorate/GetCreateReservesType", { reserverStr: reserverStr }, function (data) {
        if (data.Status == 6) {
            $("#submit").removeAttr("disabled");
            $("#submit").css("background-color", "#f8ac19");
            $("#submit").val("申请提交");
            layer.msg(data.MSG);
        }
        else if (data.Status == 1) {
            if (data.MSG != "false") {
                //不能清空地址栏
                //$("#province").val("0");
                //$("#city").val("0");
                //$("input[name='username']").val("");
                //$("input[name='mobile']").val("");
                $("input[name='voty']").val("");
                layer.msg('申请成功！');
                $('#applypop').hide();
            }
            else {
                layer.msg('申请失败！');
            }

            $("#submit").removeAttr("disabled");
            $("#submit").css("background-color", "#f8ac19");
            $("#submit").val("申请提交");
        }
        else if (data.Status == 3) {
            //if (confirm("申请操作失败,该手机还未注册!")) {
            //    return;
            //}

            var accountInfo = {};
            accountInfo.Account = $("input[name='mobile']").val();
            accountInfo.Password = $("input[name='mobile']").val();
            accountInfo.Mobile = $("input[name='mobile']").val();
            accountInfo.NickName = $("input[name='username']").val();
            accountInfo.Captcha = $("input[name='voty']").val();

            $.ajax({
                cache: false,
                dataType: 'json',
                type: 'POST',
                url: "/Register/Owner_ByApplypop",
                data: accountInfo,
                success: function (response) {
                    if (response) {
                        if (response.Status == 1) {
                            $(".apply-bin").click();
                        } else {
                            layer.msg(response.MSG);
                        }
                    }

                    $("#submit").removeAttr("disabled");
                    $("#submit").css("background-color", "#f8ac19");
                    $("#submit").val("申请提交");
                }, error: function (response) {
                    //layer.msg('访问服务器发生异常，请联系管理员，谢谢！');

                    //异步只能写里面
                    $("#submit").removeAttr("disabled");
                    $("#submit").css("background-color", "#f8ac19");
                    $("#submit").val("申请提交");
                }
            });
        }

    }, "json");

    return false;
}

//跟李波对接， 注册，沟通入驻，代理，云量尺等同步数据
//function SetCustomer(dataSource,mobile,nickName,userType,buyModule)
//{
//    $.ajax({
//        type: "get",
//        data: { DataSource: dataSource, Mobile:mobile,NickName:nickName,UserType:userType, BuyModule:buyModule,Addtime:""},
//        async: false,
//        url: "https://xm.3vjia.cn/api/Getcustomer",
//        dataType: "jsonp",//数据类型为jsonp  
//        success: function (data) {},
//        error: function () {}
//    });
//}
   
