var o ='';
$(function(){
// 点击左侧导航 筛选
$('.type-title ul li').bind('click', function () {
    var _this = $(this);
    var index = _this.parent().parent(".type-title").index();
    var num = $(".aside-nav").find(".nav_wrap").size();
    index =  num ? index - num: index;
    if ($(this).children().size() == 1) {
        $(this).html($(this).text());
        if (index == 0) {
            //roomType空间
            window.location = getUrl('r', "", true, 'i');
        } else if (index == 1) {
            //style风格
            window.location = getUrl('s', "", true, 'i');
        } else if (index == 2) {
            window.location = getUrl('a', "", true, 'i');
        };
    } else {
        for (var i = 0; i < _this.siblings().length; i++) {
            _this.siblings().eq(i).html(_this.siblings().eq(i).text())
        };
        if (index == 0) {
            //roomType空间
            var r = _this.attr('id');
            window.location = getUrl('r', r, true, 'i');
        } else if (index == 1) {
            //style风格
            var s = _this.attr('id');
            window.location = getUrl('s', s, true, 'i');
        } else if (index == 2) {
            //area面积
            var a = _this.attr('id');
            window.location = getUrl('a', a, true, 'i');
        };
    }
});
//roomType空间
$('.screening ').delegate('.condition-one', 'click', function () {
    window.location = getUrl('r', "", true, 'i');
});
//style风格
$('.screening ').delegate('.condition-two', 'click', function () {
    window.location = getUrl('s', "", true, 'i');
});
//area面积
$('.screening ').delegate('.condition-three', 'click', function () {
    window.location = getUrl('a', "", true, 'i');
});

//排序点击筛选
$(".program_select1 ul li").click(function () {
    $(this).addClass('active').siblings().removeClass('active');
    var sort = $(this).attr('ordertype');
    window.location = getUrl('o', sort, true, 'i');

});
//排序点击筛选
$("#choosePresent li a").click(function () {
    var url = $(this).parent().attr('data-url');
    var u = App.HttpPrefix + window.location.host + url + window.location.search;
    window.location = getUrl('i', "1", true, 'i',u);

});
//全景图排序
$(".orderby-pa ul li").click(function () {
    $(this).addClass('active').siblings().removeClass('active');
    var sort = $(this).attr('ordertype');
    window.location = getUrl('o', sort, true, 'i');
});
if (o) {
    $(".program_select1 ul li,.orderby-pa ul li").each(function () {
        $(this).removeClass("active");
        if (o == $(this).attr("ordertype")) {
            $(this).addClass("active");
        }
    });
}

    //点击预约弹框
$(document).on('click', '.JsApplyBtn', function () {
    $(".apply-bin").val("申请提交");
    rsType = $(this).attr("re_type");
    rsId = $(this).attr("re_id");
    $('#applypop').show();
});

//方案库大图点击关注按钮 加关注
$('.infor_designer .viewBtn').on('click', function () {
    if ($(".h_mname").length > 0) {
        var jqObj = $(this);  //当前Jquery对象
        var isAttention = jqObj.attr('datavaule');
        if (isAttention == 1) {
            jqObj.removeClass('viewBtn').addClass('alview').text('已关注');
            $.msgBoxObj.showInfo("您已关注该设计师~");
            return;
        } else {
            //请求ajax事件
            $.post("/PMC/Scheme/Collect", { objectId: jqObj.attr('employeeid'), moduleName: "Platform_Designer_Like" }, function (data) {
                if (data.Status != 5) {
                    jqObj.removeClass('viewBtn').addClass('alview').text('已关注');
                    jqObj.attr('datavaule', '1');
                    $.msgBoxObj.showOK("关注成功！");
                }
                $.msgProcess(data);
            }, "json");
        }
    } else {//未登录状态
        $("#loginpop").show();
    }
});
    //全景图设计师添加关注
$('.detail-designer-title .detail-designer-like').on('click', function () {
    var curThis = this;
    var employeeId = $(curThis).attr("id");
    if ($(".h_mname").length <= 0) {//未登录状态
        $("#loginpop").show();
    } else {
        var res = $(curThis).attr("stylist");
        if (res == '1') {
            $.msgBoxObj.showInfo('您已关注该设计师~');
            return;
        } else {
            $.post("/PMC/Scheme/Collect", { objectId: employeeId, moduleName: "Platform_Designer_Like" }, function (data) {
                $(curThis).attr("stylist", "1");
                $(curThis).attr("class", "detail-designer-like cur");
                $(curThis).html("已关注");
                $.msgProcess(data);
            }, "json");
        }
    }
});
    //已关注的给出提示
$('.detail-designer-title .cur,.infor_designer .alview').on('click', function () {
    $.msgBoxObj.showInfo('您已关注该设计师~');
});
});



$("#containerByPanorama li").each(function(){
    var obj =$(this);
    obj.find(".pcode").qrcode({
        render: "canvas", //table方式 
        width: 240, //宽度 
        height:240, //高度 
        text: App.HttpPrefix + "www.3vjia.com" + obj.find(".linkUrl").val() //任意内容 
    });
    obj.find(".shareList a.QQ").on('click', function () {
         var url = obj.find(".shareUrl").val(); 
         var title = obj.find(".shareTitle").val();
         var pic = obj.find(".shareImg").val();
          qzone_share(title, url, pic);
    });
      obj.find(".shareList a.WB").on('click', function () {
         var url = obj.find(".shareUrl").val(); 
         var title = obj.find(".shareTitle").val();
         var pic = obj.find(".shareImg").val();
          sina_weibo_share(title, url, pic);
    });
})

$(document).delegate('.pfav_btn', 'click', function (event) {
    event.stopPropagation();
    var jqObj = $(this);
    if ($(".h_mname").length <= 0) {//未登录状态
        $("#loginpop").show();
    } else {
        var collectBol = jqObj.attr("collectScheme"); //是否收藏标识
        if (collectBol == 1) {
            //jqObj.removeClass('collect').addClass('collected');
            $.msgBoxObj.showInfo('您已收藏了该方案~');
            return;
        } else {
            var schemeId = jqObj.attr("datavaule");  //方案Id
            $.post("/PMC/Scheme/Collect", { objectId: schemeId, moduleName: 'Platform_DesignScheme_Like' }, function (data) {
                if (data.Status != 5) {
                    jqObj.removeClass('collect').addClass('collected');
                    jqObj.attr("collectScheme", "1");
                }
                $('.collectSuccess').fadeIn(100).delay(2000).fadeOut(500);
            }, "json");
        }
    }
});
$(".pNavWrap li a").each(function(){
    var txt =  $(this).parent().find("label").text();
    $(this).bind("click",function(){
        var id = $(this).attr("data-val");
        if(txt =="空间"){
           window.location = getUrl('r', id, true, 'i');      
        }else if(txt=="风格"){
           window.location = getUrl('s', id, true, 'i');
        }else{
           window.location = getUrl('a', id, true, 'i');
        }
    })
})