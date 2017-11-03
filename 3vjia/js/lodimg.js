//改变图片大小的函数 
function resizePhoto(wh) {
    // fix size
    var wrap = {
        width: $('#m-photo-view').width(),
        height: $('#m-photo-view').height()
    };
    var img = {
        width: wh.width,
        height: wh.height
    };
    var tmp = {};
    var ps = img.width / img.height;
    var img_ps_w = (img.width - wrap.width) / img.width;
    var img_ps_h = (img.height - wrap.height) / img.height;
    if (img_ps_w >= 0 && img_ps_w >= img_ps_h) {
        tmp.width = wrap.width - 82;//82是img外层的padding+border+margin
        tmp.height = tmp.width / ps - 82;
    } else if (img_ps_h >= 0 && img_ps_h >= img_ps_w) {
        tmp.height = wrap.height - 82;
        tmp.width = tmp.height * ps - 82;
    } else {
        tmp = img;
    }
    if (tmp.height < wrap.height) {
        tmp.marginTop = (wrap.height - tmp.height - 82) / 2 +20+ 'px';
    }
    return tmp;
}
//定义bol 展示方案图详情时用到 展示图片需要创建img 从而获取原始宽高
var imgBol = false;

$(function () {
    var targetLi = $('.thumbnail ul li');
    var tag = [];
    //为单页做准备
    loadImg(targetLi, tag, targetLi);
    //改变浏览器窗口大小 改变图片的大小
    $(window).resize(function () {
        var targetLi = $('.thumbnail ul li');
        if (imgBol) {
            loadImg(targetLi, tag, targetLi);
        }

    });
    //点击右边列表
    $(document).on('click', '.thumbnail ul li', function () {
        var targetLi = $('.thumbnail ul li');
        $('.thumbnail ul li').removeClass('active');
        $(this).addClass('active');
        var activeIndex = $('.thumbnail ul li.active').index();
        loadImg(targetLi.eq(activeIndex), [], targetLi);
        $('#m-photo-view .m-photo-box').css('marginTop', '20');
        var src = $(this).children().children('img').attr('data-img');
        changeImg(src);
        $("#download").attr('download-url', $(this).children().children('img').attr('download-url'));
    });

    //向前一张
    $(document).on('click', '.m-control-prev', function () {
        var targetLi = $('.thumbnail ul li');
        var activeIndex = $('.thumbnail ul li.active').index();
        //如果到第一张继续向前一张
        if (activeIndex == 0) {
            loadImg(targetLi.eq(targetLi.size() - 1), [], targetLi);
            var src = targetLi.eq(targetLi.size() - 1).children().children('img').attr('data-img');
            var downloadUrl = targetLi.eq(targetLi.size() - 1).children().children('img').attr('download-url');
            changeImg(src);
            $("#download").attr('download-url', downloadUrl);
            targetLi.removeClass('active');
            targetLi.eq(targetLi.size() - 1).addClass('active');
        }
        else {
            loadImg(targetLi.eq(activeIndex - 1), [], targetLi);
            var src = targetLi.eq(activeIndex - 1).children().children('img').attr('data-img');
            var downloadUrl = targetLi.eq(activeIndex - 1).children().children('img').attr('download-url');
            changeImg(src);
            $("#download").attr('download-url', downloadUrl);
            targetLi.removeClass('active');
            targetLi.eq(activeIndex - 1).addClass('active');
        }
    });

    //向后一张
    $(document).on('click', '.m-control-next', function () {
        var targetLi = $('.thumbnail ul li');
        var activeIndex = $('.thumbnail ul li.active').index();
        //如果到最后一张 继续向后
        if (activeIndex == targetLi.size() - 1) {
            loadImg(targetLi.eq(0), [], targetLi);
            var src = targetLi.eq(0).children().children('img').attr('data-img');
            var downloadUrl = targetLi.eq(0).children().children('img').attr('download-url');
            changeImg(src);
            $("#download").attr('download-url', downloadUrl);
            targetLi.removeClass('active');
            targetLi.eq(0).addClass('active');
        } else {
            loadImg(targetLi.eq(activeIndex + 1), [], targetLi);
            var src = targetLi.eq(activeIndex + 1).children().children('img').attr('data-img');
            var downloadUrl = targetLi.eq(activeIndex + 1).children().children('img').attr('download-url');
            changeImg(src);
            $("#download").attr('download-url', downloadUrl);
            targetLi.removeClass('active');
            targetLi.eq(activeIndex + 1).addClass('active');
        }
    });

    //列表点击弹框展示
    $(document).on('click', '.program_list .pic img,.decorate_list .pic img', function (event) {
        var schemeId = $(this).next(".picId").val();
        imgBol = true;
        sendRequest2("/PMC/Scheme/AjaxDetail", { Id: schemeId }, "m-pop-slide", "trTmpl");
        //HTML5动态改变url地址
        var url = $(this).attr('data-id')
        if ($("#pageName").val() == "dispaly")
        {
            url = $(this).attr('data-id') + "?from=innerScheme";
        }

        var state = { //这里可以是你想给浏览器的一个State对象，为后面的StateEvent做准备。
            title: "三维家",
            url: url
        };
        history.pushState(state, state.title, state.url);
        //end
        window.onpopstate = function (e) { document.title = state.title; }
        event.preventDefault();

        //等页面加载完成后在加载js，要不先加载，后面加载页面会覆盖状态 【改版隐藏免费预约，单空间隐藏，店铺不隐藏由于共用所以要特殊处理】
        if ($("#pageName").val() == "dispaly")
            $(".JsApplyBtn").show();
        else
            $(".JsApplyBtn").hide();
    });
});

//获取地址栏参数
(function ($) {
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURIComponent(r[2]);
        return null
    };
})(jQuery);

//发送请求并绑定数据
function sendRequest2(url, params, containerId, trTmplId) {
    $.ajax({
        dataType: 'json',
        type: 'POST',
        data: params,
        url: url,
        success: function (data) {
            $("#" + containerId + "").empty().html($("#" + trTmplId + "").render(data));
        }, complete: function () {
            //完成函数  完成后直接调用loadImg加载一张图片在左边部分  图片的src为右边列表的第一张
            var targetLi = $('.thumbnail ul li');
            var len = targetLi.length//获取右边列表个数
            //判断方案数  如果没有或者只有一张 左右的按钮隐藏
            if (len == 1 || len == 0) {
                $('.m-control-next,.m-control-prev').hide();
            } else {
                $('.m-control-next,.m-control-prev').show();
            }
            var src = targetLi.eq(0).children().children('img').attr('data-img');
            changeImg(src);
            $("#m-photo-view img").hide();
            loadImg(targetLi.eq(0), [], targetLi);
            $('.m-mask').css('display', 'block');
            $('.m-pop-slide').css('display', 'block');
            $('body,html').css('overflowY', 'hidden');
        }, error: function (response) {
            $('.m-mask').css('display', 'none');
            $('.m-pop-slide').css('display', 'none');
            layer.msg("访问服务器发生异常，请联系管理员，谢谢！");
        }
    });
}

function changeImg(src) {
    //使用阿里云后在页面直接使用阿里云缩略不需要在走切图模式了
    //var im = new Image();
    //im.src = src;
    //var width = 0;
    //var height = 0;
    //im.onload = function () {
    //    if (im.width > 1280)
    //        width = 1280;
    //    else
    //        width = im.width;

    //    if (im.height > 960)
    //        height = 960;
    //    else
    //        height = im.height;

    //    src = src.substring(0, src.lastIndexOf(".")) + "_" + width + "w" + height + "h" + src.substring(src.lastIndexOf("."), src.length);

    //    src = src.replace("/UpFile/", "/api/images/UpFile/") + "x";
    //    src = src.replace("/UpFile_Render/", "/api/images/UpFile_Render/");   //此处不需要加x，否则会出现两个xx
    //    $("#m-photo-view img").attr('src', src);
    //    $("#panoramic").attr('href', src);
    //}

    $("#m-photo-view img").attr('src', src);
    $("#panoramic").attr('href', src);
    $(".m-photo").attr('src', src);
}

//计算图片宽高
function loadImg(target, tag, targetLi) {
    var im = new Image();
    var url = target.find('img').attr('data-img') == undefined ? "" : target.find('img').attr('data-img');
    im.src = url;
    im.onload = function () {
        //tag[0] = im.width,
        //tag[1] = im.height;

        if (im.width > 1280)
            tag[0] = 1280;
        else
            tag[0] = im.width;

        if (im.height > 960)
            tag[1] = 960;
        else
            tag[1] = im.height;

        img_wh = { width: tag[0] + 82, height: tag[1] + 82 };
        var new_wh = resizePhoto(img_wh);
        cssStyle(new_wh, targetLi);
    }
    $("#panoramic").attr('href', url);
    $("#download").attr('download-url', target.find('img').attr('download-url'));
}

//重置左边大图片样式
function cssStyle(style, target) {
    $('#m-photo-view .m-photo-box').css(style);
    $('#m-photo-view .m-photo-box').css('marginTop', '20');
    $('#m-photo-view img.m-photo').css(style);
    $('#m-photo-view img.m-photo').css('marginTop', '0');
    $('.scheme-num em').eq(0).html($('.thumbnail ul li.active').index() + 1);
    $('.scheme-num em').eq(1).html(target.size());
    $("#m-photo-view img").show();
};

//点击关闭按钮 或者蒙版 弹出层消失
$(document).on('click', '.m-mask,.m-slide-close', function () {
    history.go(-1);
    $('.m-mask').css('display', 'none');
    $('.m-pop-slide').css('display', 'none');
    $('body,html').css('overflowY', 'auto');
    imgBol = false;
});

var url = $(".thumbnail").find(".active").find("img").attr("data-img");
$(".m-photo").attr("src", url);
$(".m-photo").hide();

//点击关注按钮 加关注
$(document).on('click', '.view', function () {
    if ($(".h_mname").length > 0) {
        var jqObj = $(this);  //当前Jquery对象
        var isAttention = $("#considerableEployeeId").val();
        if (isAttention == 1) {
            jqObj.removeClass('view').addClass('alview').text('已关注');
            $.msgBoxObj.showInfo("您已关注该设计师~");
            return;
        } else {
            //请求ajax事件
            $.post("/PMC/Scheme/Collect", { objectId: $("#employeeId").val(), moduleName: "Platform_Designer_Like" }, function (data) {
                jqObj.removeClass('view').addClass('alview').text('已关注');
                $("#considerableEployeeId").val(1);
                $.msgProcess(data);
            }, "json");
        }
    } else {//未登录状态
        $("#loginpop").show();
    }
});

//控制提交按钮的出现 消失
$(document).on('click', '.comment_area textarea', function () {
    if ($(".h_mname").length > 0) {
        return true;
    } else {//未登录状态
        $("#loginpop").show();
    }
});
$(document).on('keyup', '.comment_area textarea', function () {
    if ($(this).val().length != 0) {
        $('.comment_area .comment_sub').slideDown();
    } else {
        $('.comment_area .comment_sub').slideUp();
    }
});

//点击预约弹框
$(document).on('click', '.JsApplyBtn', function () {
    $(".apply-bin").val("申请提交");
    rsType = $(this).attr("re_type");
    rsId = $(this).attr("re_id");
    $('#applypop').show();
});

//添加评论
function addComments(pageindex, pagesize, orderby, subjectid, module, category) {
    if ($(".h_mname").length > 0) {
        var content = $("#dcontents").val();
        if (content.trim() == '') {
            $.msgBoxObj.showInfo("评论内容不能为空~");
            return false;
        }
        if (content.length > 140) {
            $.msgBoxObj.showInfo("评论内容不能超过140个字符!");
            return false;
        }
        $.post("/Home/SynchronousComments", {
            pageIndex: pageindex,
            pageSize: pagesize,
            orderBy: orderby,
            subjectId: subjectid,
            module: module,
            category: category,
            content: content
        }, function (data) {
            if (!data.Success) {
                $.msgBoxObj.showFailed("添加失败~");
                return;
            }
            $("#totalCount").html('(' + data.DataSource.total + ')');
            $("#containerByContent").empty().html($("#templateContent").render(data.DataSource.rows));
            $("#dcontents").val('');
            $('.comment_area .comment_sub').slideUp();
        }, "json");
    } else {//未登录状态
        $("#loginpop").show();
    }
}

//评论框下面按钮 添加评论方法
function singleAddComments(pageindex, pagesize, orderby, subjectid, module, category) {
    if ($(".h_mname").length > 0) {
        var content = $("#dcontents").val().trim();
        if (content == '') {
            $.msgBoxObj.showInfo("评论内容不能为空~");
            return false;
        }
        if (content.length > 140) {
            $.msgBoxObj.showInfo("评论内容不能超过140个字符!");
            return false;
        }
        $.post("/Home/SynchronousComments", {
            pageIndex: pageindex,
            pageSize: pagesize,
            orderBy: orderby,
            subjectId: subjectid,
            module: module,
            category: category,
            content: $("#dcontents").val()
        }, function (data) {
            if (!data.Success) {
                $.msgBoxObj.showFailed("评论失败!");
                return;
            }
            $("#totalCount").html('(' + data.DataSource.total + ')');
            $("#containerByContent").empty().html($("#templateContent").render(data.DataSource.rows));
            $("#dcontents").val('');
            $('.comment_area .comment_sub').slideUp();
        }, "json");
    } else {//未登录状态
        $("#loginpop").show();
    }
    $(".m-photo").show();
}