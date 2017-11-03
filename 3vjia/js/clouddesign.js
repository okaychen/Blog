$(function () {
	//导航系列操作
    var subNav = $('.cloudDesignNav');
    if (subNav == undefined || subNav.offset() == undefined) return;
    var navTop = subNav.offset().top;
    $(window).scroll(function () {
    	var top1 = $(document).scrollTop();
        if(top1 >= navTop){
        	subNav.css({
        		'position': 'fixed',
        		'top': '0',
        		'left': '0',
        		'zIndex': '9999',
        		'borderBottom':'1px solid #c9c9c9'
        	});
        }else{
        	subNav.css({
        		'position': 'relative',
        		'zIndex': '0',
        		'borderBottom':'0'
        	});
        }
    });

    jQuery(".TYspecialFeatureCon1>div").slide({ mainCell: ".bd ul", autoPlay: true, delayTime: 2000 });
    jQuery(".CGspecialFeature7>div").slide({ mainCell: ".bd ul", autoPlay: true, trigger: "click", delayTime: 2000 });
    jQuery(".YGspecialFeature1>div").slide({ mainCell: ".bd ul", autoPlay: true, delayTime: 2000 });
    jQuery(".YGspecialFeature3>div").slide({ mainCell: ".bd ul", autoPlay: true, delayTime: 2000 });
    jQuery(".DDspecialFeature1").slide({ mainCell: ".bd ul", autoPlay: true, delayTime: 2000 });
    var PanoramaList = $('.PZworksPanoramaList');
    if (PanoramaList.length > 0)
    {
        var children = $('.PZworksPanoramaList>div');
        var PanoramaListTop = PanoramaList.get(0).getBoundingClientRect().top - 650;//元素顶端到可见区域顶端的距离
        var clientHeight = document.documentElement.clientHeight; //浏览器可见区域高度。
        $(window).on('scroll', function () {
            var scrollTop = $(document).scrollTop();
            if (PanoramaListTop <= scrollTop) {
                children.each(function (i) {
                    var num = i + 1;
                    $(this).addClass('animated' + num);
                });
            } else {
                children.each(function (i) {
                    var num = i + 1;
                    $(this).removeClass('animated' + num);
                });
            }
        });
        jQuery(".workListCon").slide({ mainCell: ".bd ul", effect: "leftLoop", autoPlay: true });
    }
});
//套餐页面套餐列表展开 收起
$(function () {
    var downBtn = $('.dropDown');
    var list = $('.taocanWrap');
    var downbol = true;
    downBtn.bind('click', function () {
        if (downbol) {
            list.animate({ height: 903 }, 1000);
            $(this).html('向上收回<i class="iconNew dropIcon up"></i>');
            downbol = false;
        } else {
            list.animate({ height: 329 }, 1000);
            $(this).html('查看更多<i class="iconNew dropIcon"></i>');
            downbol = true;
        }
    })
});
//单击马上体验判断跳转登录还是注册并携带手机号码
$(".experienceFrom a").click(function () {
    var pathUrl;
    var isMobile = /^(15|13|18|17|14)\d{9}$/; //手机号码验证规则
    var state = $(this).attr("data")
    var mobile = $.trim($(this).prev().val());
    if (mobile.length <= 0) {
        $(this).next().css('color', 'red');
        $(this).next().text('请输入手机号码').css('display', 'inline');
        return false;
    }
    if (!isMobile.test(mobile)) {
        $(this).next().css('color', 'red');
        $(this).next().text('手机号码格式错误').css('display', 'inline');
        return false;
    }
    $(this).next().text('').css('display', 'none');
    if (state == "dataLogin")
        pathUrl = "/Account/Login?returnUrl=/DesignArtifact/I3D&phone=" + mobile;
    else
        pathUrl = "/Register/Index?phone=" + mobile;

    window.location.href = pathUrl;
});

//QQ咨询
//BizQQWPA.addCustom({ aty: '0', nameAccount: 4008090630, selector: 'BizQQWPA7' }); 
//BizQQWPA.addCustom({ aty: '0', nameAccount: 4008090630, selector: 'BizQQWPA3' });
//BizQQWPA.addCustom({ aty: '0', nameAccount: 4008090630, selector: 'BizQQWPA4' });
//BizQQWPA.addCustom({ aty: '0', nameAccount: 4008090630, selector: 'BizQQWPA5' });
//BizQQWPA.addCustom({ aty: '0', nameAccount: 4008090630, selector: 'BizQQWPA6' });













