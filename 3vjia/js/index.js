$(document).ready(function () {
    //$(".model-filter .filter-wp").show();
    //分类导航
    $(".filter > .cate-root").hover(function () {
        $(this).addClass('hover');
        $(this).children('.cate-list').css('display', 'block');
    }, function () {
        $(this).removeClass('hover');
        $(this).children('.cate-list').css('display', 'none');
    });
    //轮播图
    function DesignerXT() {
        var _this = this;
        this.banner = $('.bannerInner'),
		this.bannerW = $('.bannerWrap'),
		this.leftBtn = $('.leftBtn'),
		this.rightBtn = $('.rightBtn'),
		this.num = 0,
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
		        this.num = 0;
		    }
		    this.move();
		}
    };
    var banner = new DesignerXT();
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
        if (banner.num < 0) {
            banner.num = banner.banner.find('li').length - 1;
        }
        banner.move();
    });
    DesignerXT.prototype.clearTimer = function () {
        clearInterval(timer);
        timer = setInterval(function () {
            banner.next();
        }, 3000);
    };
    banner.banner.hover(function () {
        clearInterval(timer);
    }, function () {
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
   
    var sceneItems = [];
    var userid = $("#hidUserId").val();
    $("#items li.item").each(function () {
        var sceneid = $(this).find("input[name=mainScene]").val();
        if (sceneid.length > 0) {
            sceneItems.push(sceneid);
        }
    })
    if (sceneItems.length > 0) {
        abp.services.mms.scene.getMaterialList({ SceneId: sceneItems, RowNum: 5, UserId: userid }).done(function (data) {
            if (data != null) {
                for (var i = 0; i < data.length; i++) {
                    var html = "";
                    html += ' <li class=\"item-model  fl\">';
                    if (data[i].isFva) {
                        html += '   <a href="javascript:void(0);" class="pic J_img">';
                    } else {
                        html += '   <a href="javascript:void(0);" data-id="' + data[i].materialId + '" data-name="' + data[i].materialName + '" onclick="SetFav(this);" class="pic J_img">';
                    }
                    if (data[i].imagePath.length > 0) {
                        html += '  <img onerror=nofind("/Content/Images/nopic/nopi_90x90.jpg") class="lazyload" src="' + AddImageTag(data[i].imagePath.replace(".", "_130x100.")) + '" />';
                    } else {
                        html += '   <img class="lazyload" src="/Content/Images/nopic/nopi_90x90.jpg" />';
                    }
                    html += '    </a>';
                    html += '   <a href="javascript:;" class="J_collect collect ">';
                    html += '      <div class="bg"></div>';
                    html += '      <div class="wrapper">';
                    html += '          <i class="icon-sprite ' + (data[i].isFva ? "collected" : "") + '"></i>';
                    html += '          <h3 class="collectTxt">' + (data[i].isFva ? "已收藏" : "收藏") + '</h3>';
                    html += '      </div>';
                    html += '      <div class="magnifier" style="display: block;">';
                    html += '          <div class="magnifier-box">';
                    html += '               <div class="magnifierCon">';
                    if (data[i].imagePath.length > 0) {
                        html += '               <img onerror=nofind("/Content/Images/nopic/nopi_90x90.jpg") src="' + AddImageTag(data[i].imagePath.replace(".", "_200x200.")) + '" />';
                    } else {
                        html += '                <img src="/Content/Images/nopic/nopi_90x90.jpg" />';
                    }
                    html += '                </div>';
                    html += '                <p>' + data[i].materialName + '</p>';
                    html += '                <em class="arrow arrow1"></em>';
                    html += '                <em class="arrow arrow2"></em>';
                    html += '              <div></div>';
                    html += '           </div>';
                    html += '       </div>';
                    html += '    </a>';
                    html += ' </li>';
                    $(".item-models[data-sceneId=" + data[i].sceneId + "]").prepend(html);
                    //鼠标移上显示收藏
                    $(".item-model>.J_img").mouseover(function () {
                        $(this).next().show();
                    }).mouseout(function () {
                        $(this).next().hide();
                    })
                }
            }
        })
    }

    $(".action-collect a").bind("click", function () {
        var obj = $(this);
        if ($.trim(obj.find("span").text()) != "已收藏") {
            obj.unbind("click");
            $.ajax({
                url: "/Home/CheckUserIsLogin", success: function (result) {
                    if (result.length > 0) {
                        var materialId = obj.attr("data-id");
                        var groupid = obj.attr("data-gid") == undefined ? "" : obj.attr("data-gid");
                        var materialName = obj.attr("data-name");
                        var organid = $("#hidOrganId").val();
                        var userid = $("#hidUserId").val();
                        var deptid = $("#hidDeptId").val();
                        abp.services.mms.designmaterial.addCollectMaterial({
                            MaterialId: materialId,
                            GroupId: groupid,
                            MaterialName: materialName,
                            UserId: userid,
                            OrganId: organid,
                            DeptId: deptid
                        }).done(function (data) {
                            if (data.status == 1) {
                                $(obj).parents(".model-item").find(".info .collect-info i").addClass("collected");
                                var num = parseInt($(obj).parents(".model-item").find(".info .collect-info span.num").text());
                                $(obj).parents(".model-item").find(".info .collect-info span.num").text(num + 1);
                                obj.css("background-color", "#cccccc").css("cursor", "default");
                                obj.find("span").text("已收藏");
                            } else {
                                layer.msg("收藏失败!你已经收藏过该模型", { time: 3000, icon: 2 })
                            }
                            obj.bind("click");
                            return false;
                        })
                    } else {
                        //layer.msg('你还没有登陆哦！', { time: 3000, icon: 2 }, function () {
                            location.href = loginUrl + "returnUrl=" + document.URL;
                        //})
                    }
                }
            });
        }
    })
    $(".operation>a").bind("click", function () {
        var obj = $(this);
        if ($.trim(obj.text()) != "已收藏") {
            obj.unbind("click");
            $.ajax({
                url: "/Home/CheckUserIsLogin", success: function (result) {
                    if (result.length > 0) {
                        var materialId = obj.attr("data-id");
                        var groupid = obj.attr("data-gid") == undefined ? "" : obj.attr("data-gid");
                        var materialName = obj.attr("data-name");
                        var organid = $("#hidOrganId").val();
                        var userid = $("#hidUserId").val();
                        var deptid = $("#hidDeptId").val();
                        abp.services.mms.designmaterial.addCollectMaterial({
                            MaterialId: materialId,
                            GroupId: groupid,
                            MaterialName: materialName,
                            UserId: userid,
                            OrganId: organid,
                            DeptId: deptid
                        }).done(function (data) {
                            if (data.status == 1) {
                                $(obj).parent().find(".collect-info i").addClass("collected");
                                var num = parseInt($(obj).parent().find(".collect-info span.num").text());
                                $(obj).parent().find(".collect-info span.num").text(num + 1);
                                $(obj).css("background-color", "#cccccc").css("cursor", "default");
                                $(obj).text("已收藏");
                            } else {
                                layer.msg("收藏失败!你已经收藏过该模型", { time: 3000, icon: 2 })
                            }
                            obj.bind("click");
                            return false;
                        })
                    } else {
                        //layer.msg('你还没有登陆哦！', { time: 3000, icon: 2 }, function () {
                            location.href = loginUrl + "returnUrl=" + document.URL;
                        //})
                    }
                }
            })
        }
    })
});
function gourl(type) {
    var keyword = decodeURI(getUrlParams("keyword"));
    if (type == 0) {
        location.href = '/Home/SearchMaterial?keyword=' + encodeURI(keyword);
    } else {
        location.href = '/Home/SearchMaterialGroup?keyword=' + encodeURI(keyword);
    }
}

//首页设置是否收藏
function setIsFav() {
    var userid = $("#hidUserId").val();
    if (userid.length > 0) {
        var materialids = [];
        $(".single-model-board").each(function () {
            $(this).find("ul.models li.template-single-model").each(function () {
                materialids.push($(this).attr("data-id"));
            });
        })
        if (materialids.length > 0) {
            abp.services.mms.designmaterial.userIsFav({ MaterialId: materialids, UserId: userid }).done(function (data) {
                if (data != null) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].collectCount > 0) {
                            $("ul.models li.template-single-model[data-id=" + data[i].materialId + "]").find("li.action-collect a").css("background-color", "#cccccc").css("cursor", "default");
                            $("ul.models li.template-single-model[data-id=" + data[i].materialId + "]").find("li.action-collect a").find("span").text("已收藏");
                            $("ul.models li.template-single-model[data-id=" + data[i].materialId + "]").find(".info .collect-info i").addClass("collected");
                        }
                    }
                }
            })
        }
    }
}

//点击预览大图
$(document).on('click', '.info>.bigger', function () {
    var _this = $(this);//将当前的元素作为_this传入函数
    imgShow("#outerdiv", "#innerdiv", "#bigimg", _this);

    $("#outerdiv").click(function () {//再次点击淡出消失弹出层
        $(this).fadeOut("fast", function () {
            $("#bigimg").attr("src", "");
        });
    });

    });



//点击图片显示大图方法
function imgShow(outerdiv, innerdiv, bigimg, _this) {  
    var src = _this.parent().parent(".template-model-package").find(".cover").children().attr("src");//获取当前点击的i的父级的前一个兄弟元素下的cover下的img的src
    //用于替换图片规格,可以根据需要开启
    src = src.replace("_348x232", "");
    var windowW = $(window).width();//获取当前窗口宽度  
    var windowH = $(window).height();//获取当前窗口高度  
    $(bigimg).attr("src", src);//设置#bigimg元素的src属性  
    $(outerdiv).css("display", "block");//显示#outerdiv
    
    var w = (windowW - 800) / 2;//计算图片与窗口左边距  
    var h = (windowH - 600) / 2;//计算图片与窗口上边距  
    $(innerdiv).css({ "top": h, "left": w });//设置#innerdiv的top和left属性 
    $(".loading-icon").fadeOut(2000);
    $(innerdiv).css("display", "block");

}