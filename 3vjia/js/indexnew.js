//header banner scroll
$(function () {
	function DesignerXT(){
		var _this = this;
		this.banner = $('.bannerInner'),
		this.bannerW = $('.bannerWrap'),
		this.leftBtn = $('.leftBtn'),
		this.rightBtn = $('.rightBtn'),
		this.num = 0, 
        //this.init = function() {
        //    this.banner.find('li').eq(0).fadeIn().siblings().fadeOut();
        //},
		this.move = function () {
			this.banner.find('li').eq(this.num).fadeIn().siblings().fadeOut();
			this.banner
			.find('.bannerNav')
			.find('span')
			.eq(this.num)
			.addClass('active')
			.siblings()
			.removeClass('active');
		},
		this.next = function () {
			this.num++;
	        if (this.num >= this.banner.find('li').length) {
            console.log(this.banner.find('li').lenght);
	            this.num = 0;
	        }
	        this.move();
		}
	};
	var banner = new DesignerXT();
    //banner.init();
	var timer = setInterval(function () {
        banner.next();
    }, 3000);
	banner.rightBtn.bind('click', function () {
	    clearInterval(timer);
	    banner.next();
	});
    banner.leftBtn.bind('click', function () {
	    clearInterval(timer);
	    banner.num--;
	    if (banner.num <0 ) {
	        banner.num = banner.banner.find('li').length-1;
	    }
	    banner.move();
	});
    DesignerXT.prototype.clearTimer = function () {
    	clearInterval(timer);
        timer = setInterval(function () {
            banner.next();
        }, 3000);
    };
    banner.banner.hover(function() {
    	clearInterval(timer);
    }, function() {
    	timer = setInterval(function () {
            banner.next();
        }, 3000);
    });
    banner.banner.find('.bannerNav').find('span').on('mouseenter click', function () {
        clearInterval(timer);
    	var $index = $(this).index();
        console.log($index);
    	$(this).addClass('active').siblings().removeClass('active');
    	banner.banner.find('li').eq($index).fadeIn().siblings().fadeOut();
    })
});

    //Control head fixing
    var mainBav = $('.mainBav');
    var bannerWrap = $('.bannerWrap');
    var navTop = 0;
    if (bannerWrap != undefined && bannerWrap.offset() != undefined) {
        navTop = bannerWrap.offset().top;
    }
 
	$(window).scroll(function () {
	    var top1 = $(document).scrollTop();
	    if (top1 >= navTop) {
	        mainBav.css({
	            'position': 'fixed',
	            'top': '0',
	            'left': '0',
	            'zIndex': '9999',
	        });
	    } else {
	        mainBav.css({
	            'position': 'relative',
	            'zIndex': '800',
	        });
	    }
	});


	jQuery(".newsInner").slide({ titCell: "", mainCell: ".bd ul", autoPage: true, effect: "topLoop", autoPlay: true });

	function Advantages() {
	    var _ = this;
	    var data = [
			{
			    src: '/Content/images/index_images/advantages1.jpg',
			    con: '无需安装，在线设计；<br> 傻瓜化操作，不懂CAD也能做设计，普通门店导购也能轻松上手。'
			},
			{
			    src: '/Content/images/index_images/advantages2.jpg',
			    con: '一键复制样板间，轻松进行二次设计；<br> 一键生成柜体平面/立面/结构图，自动报价预算表，令3D大神瞬间崩溃。'
			},
			{
			    src: '/Content/images/index_images/advantages3.jpg',
			    con: '超越摄影棚级效果图，模拟自然光影特效，拥有精美细腻的真实质感；<br> 神奇极速渲染，瞬间让您成为效果图大神。'
			},
			{
			    src: '/Content/images/index_images/advantages7.jpg',
			    con: '设计案例可一键分享、精准引导客流；<br> 互动体验，沟通方便，提升成交；挖掘用户需求，提升客单价。'
			},
			{
			    src: '/Content/images/index_images/advantages5.jpg',
			    con: '逼真的全景效果，PC端和移动端均可自适应浏览；<br>720°漫游家装体验，提前让客户遇见未来的家。'
			},
			{
			    src: '/Content/images/index_images/advantages6.jpg',
			    con: '720°全景图结合三维家VR头盔浏览，第一时间吸引客户；<br> VR虚拟现实体验更真实，助您打造门店“试衣间”。'
			},
			{
			    src: '/Content/images/index_images/advantages4.jpg',
			    con: '汇集海量楼盘户型、海量3D样板间、海量素材库，每天实时更新；<br> 丰富优质的图库参考，满足您的设计需求。'
			},
			{
			    src: '/Content/images/index_images/advantages8.jpg',
			    con: '橱柜/衣柜/吊顶/铺砖，深度定制家居模块；<br>行业专业的3D云设计，邀请您使用体验。'
			}
	    ]
	    _.wrap = $('.advantagesList');
	    var advantagesItem = $('.advantagesItem');
	    var advantagesImg = $('.advantagesImg');
	    var advantagesCon = $('.advantagesCon p');
	    var li = advantagesItem.find('li');
	    var num = 0;
	    _.move = function () {
	        num++;
	        if (num > 7) {
	            num = 0;
	        }
	        li.eq(num).addClass('active').siblings().removeClass('active');
	        advantagesImg.attr('src', data[num].src);
	        advantagesCon.html(data[num].con);
	    }
	    _.init = function () {
	        var height = _.wrap.height();
	        var width = _.wrap.width() / 2;
	        li.height(height / 2);
	        li.width(width / 4 - 4);
	    }
	    _.initEvent = function () {
	        $(window).resize(function () {
	            _.init();
	        });
	        li.bind('click', function () {
	            clearInterval(timer);
	            var _this = $(this);
	            var $index = _this.index();
	            _this.addClass('active').siblings().removeClass('active');
	            advantagesImg.attr('src', data[$index].src);
	            advantagesCon.html(data[$index].con);
	            num = $index;
	        });
	        _.wrap.hover(function () {
	            clearInterval(timer);
	        }, function () {
	            timer = setInterval(_.move, 3000);
	        });
	    }
	    var timer = setInterval(_.move, 3000);
	    _.init();
	    _.initEvent();
    }

	function Works() {
	    var data = [
				{
				    href: [
                       { url: 'https://720.3vjia.com/S0CCFHEJK' },
                       { url: 'https://720.3vjia.com/S3CCFGLII' },
	                   { url: 'https://720.3vjia.com/S7CCFHJFF' },
	                   { url: 'https://720.3vjia.com/S0CCFGJKE' },    
	                   { url: 'https://720.3vjia.com/Q01269277' }
				    ]
				},
				{
				    href: [
                       { url: 'https://720.3vjia.com/S1CCGCCEE' },
                       { url: 'https://720.3vjia.com/S9CCFFLFI' },
                       { url: 'https://720.3vjia.com/S3CCFDIDK' },
                       { url: 'https://720.3vjia.com/S5CCFJJJK' },
                       { url: 'https://720.3vjia.com/S8CCGHCDE' },
                       { url: 'https://720.3vjia.com/S7CCEFKLC' }
				    ]
				},
				{
				    href: [
                       { url: 'https://720.3vjia.com/S4CCELGJJ' },
                       { url: 'https://720.3vjia.com/S2CCGCGGK' },
                       { url: 'https://720.3vjia.com/S7CCDEHEI' },
                       { url: 'https://720.3vjia.com/S0CCGCGID' },
                       { url: 'https://720.3vjia.com/S9CCDIDDD' },
                       { url: 'https://720.3vjia.com/S6CCEKFDG' }
				    ]
				},
				{
				    href: [
                       { url: 'https://720.3vjia.com/S7CCELEEL' },
                       { url: 'https://720.3vjia.com/S0CCECGJG' },
                       { url: 'https://720.3vjia.com/S8CCDGKHL' },
                       { url: 'https://720.3vjia.com/S6CCDFLLL' },
                       { url: 'https://720.3vjia.com/S7CCFFEKJ' },
                       { url: 'https://720.3vjia.com/S4CCFICKL' }
				    ]
				},
				{
				    href: [
                       { url: 'https://720.3vjia.com/S0CCFIGGI' },
                       { url: 'https://720.3vjia.com/F08327990' },
                       { url: 'https://720.3vjia.com/S5CCFKEFF' },
                       { url: 'https://720.3vjia.com/S9CCEKKLE' }
				    ]
				},
	    ];
	    var _ = this;
	    var worksCon = $('.worksCon');
	    var worksItem = worksCon.find('.worksItem');
	    var LcontrolBtn = worksItem.find('.leftBtn');
	    var RcontrolBtn = worksItem.find('.rightBtn');
        var width = 800;
        $(window).width() < 1370 ? width = 568 : width = 800;
	    _.init = function () {
	        for (var i = 0; i < worksItem.length; i++) {
	            worksItem.eq(i).find('ul li').first().addClass('active');
	            worksItem.eq(i).find('.pages span').html('1');
	            worksItem.eq(i).find('.panoramaHref').attr('href', data[i].href[0].url);
	        }
	    };
	    _.move = function (index, num) {
	        worksItem.eq(index)
				.find('ul li')
				.eq(num)
				.fadeIn().addClass('active')
				.siblings()
				.fadeOut().removeClass('active');
	    }
	    _.next = function (index) {
	        var num = worksItem.eq(index).find('ul li.active').index();
	        num++;
	        if (num >= worksItem.eq(index).find('ul li').length) {
	            num = 0;
	        }
	        _.move(index, num);
	        worksItem.eq(index).find('.panoramaHref').attr('href', data[index].href[num].url);
	        worksItem.eq(index).find('.pages span').html(num+1);
	    };
	    _.prev = function (index) {
	        var num = worksItem.eq(index).find('ul li.active').index();
	        num--;
	        if (num < 0) {
	            num = worksItem.eq(index).find('ul li').length - 1;
	        }
	        _.move(index, num);
	        worksItem.eq(index).find('.panoramaHref').attr('href', data[index].href[num].url);
	        worksItem.eq(index).find('.pages span').html(num+1);

	    };
	    _.initEvent = function () {
	        worksItem.bind('mouseenter', function () {
	            for (var i = 0, j = 0; i < worksItem.length; i++) {
	                if (worksItem.eq(i).width() == width) {
	                    j++;
	                }
	            }
	            if (j == 0) {
	                animateBol = true;
	            } else {
	                animateBol = false;
	            }
	            if (animateBol == false) {
	                $(this).addClass('active').siblings().removeClass('active');
	            } else {
	                return;
	            }

	        });

	        LcontrolBtn.bind('click', function () {
	            var index = $(this).parents('.worksItem').index();
	            _.next(index);
	        });
	        RcontrolBtn.bind('click', function () {
	            var index = $(this).parents('.worksItem').index();
	            _.prev(index);
	        });

	    };
	    _.init();
	    _.initEvent();
	}

	function Argument() {
	    var _ = this;
	    var argumentNav = $('.argumentNav');
	    var argumentCon = $('.argumentCon');
	    var kehuItem = argumentCon.find('.kehuItem');
	    var leftBtn = kehuItem.find('.leftBtn');
	    var rightBtn = kehuItem.find('.rightBtn');
	    var height = 618;
	    var timer = null;
	    var num = 0;

	    _.init = function () {
	        $(window).width() < 1370 ? height = 452 : height = 618;
	        kehuItem.height(height).find('li').first().addClass('active');
	        kehuItem.find('span').first().addClass('active');
	    };
	    _.initEvent = function () {
	        argumentNav.find('li').bind('click', function () {
	            var index = $(this).index();
	            if (index == 0) {
	                timer = setInterval(_.move, 3000);
	            } else {
	                clearInterval(timer);
	            }
	            $(this).addClass('active').siblings().removeClass('active');
	            argumentCon.find('.argumentItem').eq(index).css('display', 'block').siblings().css('display', 'none');
	        });
	        kehuItem.hover(function () {
	            clearInterval(timer);
	        }, function () {
	            timer = setInterval(_.move, 3000);
	        });
	        rightBtn.bind('click', function () {
	            clearInterval(timer);
	            _.move();
	        });
	        leftBtn.bind('click', function () {
	            clearInterval(timer);
	            num--;
	            if (num < 0) {
	                num = 4;
	            }
	            kehuItem.find('li').eq(num).addClass('active').siblings().removeClass('active');
	            kehuItem.find('span').eq(num).addClass('active').siblings().removeClass('active');
	        });
	        $(window).resize(function () {
	            _.init();
	        });
            
	    };
	    _.move = function () {
	        num++;
	        if (num >= 5) {
	            num = 0;
	        }
	        kehuItem.find('li').eq(num).addClass('active').siblings().removeClass('active');
	        kehuItem.find('span').eq(num).addClass('active').siblings().removeClass('active');
	    };
	    _.init();
	    _.initEvent();
	}

	var advantages = new Advantages();
	var works = new Works();
	var argument = new Argument();
	$("img.loadImg").lazyload({placeholder : "/Content/images/blank.gif",effect : "fadeIn",failurelimit : 10 ,threshold : 500 });
//单击马上体验判断跳转登录还是注册并携带手机号码
$(".experienceFrom a").click(function () { 
    var pathUrl;
    var isMobile = /^(15|13|18|17|14)\d{9}$/; //手机号码验证规则
    var state=$(this).attr("data")
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
        pathUrl = "/Account/Login?returnUrl=/Home/Index&phone=" + mobile;
    else
        pathUrl = "/Register/Index?phone=" + mobile;
    
    window.location.href = pathUrl;
});

//var islogin = $("#hidIslogin").val();
//var usesrid = $("#hidUserId").val();
//var isbuyUrl = $("#hidIsUserBuy").val();
//if (islogin!=undefined && islogin.length > 0 && islogin == "loggedin") {
    //先判断该用户今日是否已弹过窗
//    var cookieObj = getCookie('FirstOpen_'+usesrid);
//    if (cookieObj == null || cookieObj == false) {

        //检查用户在没在当前营销名单内
 //       var data = $.ajax({ url: "/Home/GetTxtString", async: false });
//        var users = data.responseText;

        //说明包含在名单中
//        if (users != null && users.indexOf(usesrid) > -1) {
//            var param = { isdelete: 0, clientuserid: usesrid,orderstate:'Pay' };
//            var jsonstr = JSON.stringify(param);
//            $.ajax({
//                cache: false,
//                dataType: 'json',
//                type: 'POST',
//                contentType: 'application/json; charset=utf-8',
//                url: isbuyUrl,
//                data: jsonstr,
//                success: function (response) {

                    //如果用户没有买服务
//                    if (response.success && response.result != null && response.result.returnObject == false) {

                        //判断用户是否满足弹窗
//                        if (IsShowOpen(usesrid)) {

                            //填充页面数据
//                            GetData();

                            //弹窗广告 Start
//                            layer.open({
//                                title: '',
//                                type: 1,
//                                area: ['700px', '800px'],
//                                content: $('.pop-advertisement'),
//                                closeBtn: 1,
//                                btn: false,
//                               cancel: function () {
//                                    var time = GetSurplusDateTime();
//                                    setCookie('FirstOpen_' + usesrid, "1", time);
//                                    layer.closeAll();
//                                }
//                            });
//                            $('.layui-layer').css('border-radius', '31px');

//                            $('.layui-layer-title').css('height', '210px');
//                            $('.layui-layer-setwin .layui-layer-close2').css({ 'right': '3px', 'top': '4px', 'background': 'transparent' })

//                        }
//                    }
//                }
//            })
//        }
//    }
//}


//显示登陆少于4次弹窗仍未购买的用户,继续弹
function IsShowOpen(usesrid) {
    var isfag = true;
    var cookieName = "ShowLayer_" + usesrid + "_Count"
    var cookieObj = getCookie(cookieName);
    if (cookieObj != null && cookieObj) {
        var num = parseInt(cookieObj);
        if (num < 4) {
            setCookie(cookieName, num + 1, 31536000); //31536000等于1年
        } else {
            isfag = false;
        }
    } else {
        //设置cookie最大时间失效
        setCookie(cookieName, 1, 31536000); //31536000等于1年
    }
    return isfag;
}



//获取服务数据
function GetData() {
    var ajaxurl = $("#hidServicesDataUrl").val();
    var skuids =$("#hidServicesKuids").val();
    var jsonstr = JSON.stringify({isdelete: 0, serviceskuids: skuids });
    $.ajax({
        cache: true,
        dataType: 'json',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        url: ajaxurl,
        data: jsonstr,
        success: function (response) {
            if (response.success && response.result != null && response.result.items != null) {
                var items = response.result.items;
                var html = "";
                for (var i = 0; i < items.length; i++) {
                    html += "<li>";
                    html += " <div class=\"content-wrap\">";
                    html += "   <div class=\"photograph\">";
                    html += "       <a target=\"_blank\" href=\"" + GetLinkUrl(items[i].name, items[i].serviceid) + "\"><img src=\"" + GetImage(items[i].imgpath) + "\"></a>";
                    html += "       <div><a target=\"_blank\" href=\"" + GetLinkUrl(items[i].name, items[i].serviceid) + "\">" + items[i].name + "</a></div>";
                    html += "   </div>";
                    html += "   <div class=\"detail\">";
                    html += "       <div>版本：<span>" + items[i].propotyvalue + "</span></div>";
                    html += "       <div>周期：<span>一个月</span></div>";
                    html += "       <div>促销：<span class=\"money\">" + items[i].price + "</span>元</div>";
                    html += "       <a href=\"" + BuyLinkUrl(items[i].serviceskuid) + "\" class=\"order\" onclick=\"SetEventClick(,'首页_服务营销弹窗_" + items[i].name + "_订购按钮','" + items[i].name + "','/home/index')\" target=\"_blank\">立即订购</a>";
                    html += "   </div>";
                    html += " </div>";
                    html += "</li>";
                }
                var serviceImgPrefix = $("#hidImagePrefix").val();
                html += "<li>";
                //html += "<a target=\"_blank\" href=\"" + serviceImgPrefix + "\">";
                html += "   <div class=\"content-wrap\">";
                html += "     <div class=\"forenotice\">";
                html += "       <a class=\"skip\" target=\"_blank\" href=\"" + serviceImgPrefix + "\"></a>";
                html += "       <p>更多优惠套餐</p>";
                html += "      <div class='left'>";
                html += "        <div class='left-p'>灵活搭配</div>";
                html += "        <div class='left-p'>价格更优惠</div>";
                html += "      </div>";
                html += "      <i></i>";
                html += "     </div>";
                html += "   </div>";
                //html += "</a>";
                html += "</li>";
                $("#customized").empty().append(html);
            }
        }
    })
}
//获取当天剩余的时间数
function GetSurplusDateTime() {
    var curDate = new Date();
    //当前时间戳  
    var curTamp = curDate.getTime();
    //当日凌晨的时间戳,减去一毫秒是为了防止后续得到的时间不会达到00:00:00的状态  
    var curWeeHours = new Date(curDate.toLocaleDateString()).getTime() - 1;

    //当日已经过去的时间（毫秒）  
    var passedTamp = curTamp - curWeeHours;

    //当日剩余时间  
    var leftTamp = 24 * 60 * 60 - (passedTamp/1000);
    //var leftTime = new Date();
    //leftTime.setTime(leftTamp + curTamp);
    //return leftTime.toGMTString();
    return leftTamp;
}
//点击订购的链接
function BuyLinkUrl(serviceskuid) {
    var buyurl = $("#hidBuyLinkUrl").val();
    if (buyurl.length > 0) {
        buyurl += serviceskuid + "?Count=1&Type=ServiceType_Service";
    }
    return buyurl;
}

//获取图片缩略图
function GetImage(imgpath){
    var serviceImgPrefix = $("#hidImagePrefix").val();
    if (imgpath != null && imgpath.length > 0) {
        return serviceImgPrefix + imgpath.replace(".", "_100x100.");
    } else {
        return imgpath;
    }
}
//根据服务名称跳转不同的链接
function GetLinkUrl(name, serviceskuid) {
    var serverInfoPage = $("#hidServiceMarketPage").val();
    var url = "";
    if (name.indexOf("橱柜") > -1) {
        url = "/DesignArtifact/Cabinet";
    }
    else if (name.indexOf("顶墙") > -1) {
        url = "/DesignArtifact/Ceiling";
    }
    else if (name.indexOf("铺砖") > -1) {
        url = "/DesignArtifact/BrickPaving";
    }
    else if (name.indexOf("衣柜") > -1) {
        url = "/DesignArtifact/Wardrobe";
    } else {
        url = serverInfoPage + serviceskuid;
    }
    return url;
}




































