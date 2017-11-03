
//中场后台登录
var headers = {};
headers['X-XSRF-Token'] = $('input[name="__RequestVerificationToken"]').val();

$(function () {
    //首页体验传参手机号码时绑定到用户名
    var para = $.getUrlParam('phone');
    if (null != para && para != "")
    {
        $("#UserName").val(para);
        $("#Password").focus();
    }

    $('.reg >a').hover(
        function () {
            $(this).css({ 'color': '#eb7a34' });
        },
        function () {
            $(this).css({ 'color': '#a7a7a7' });
        });
    $('.reg > span >a').hover(
        function () {
            $(this).css({ 'color': '#eb7a34' });
        },
        function () {
            $(this).css({ 'color': '#a7a7a7' });
        });
    $('.button').hover(
        function () {
            $(this).css({ 'background': '#f7f8c7' });
        },
        function () {
            $(this).css({ 'background': '#ffffff' });
        });

         var errorCount = getCookie("errorCount");
         if(errorCount!=false&&parseInt(errorCount)+1>=3){
            $(".loginCode").show();
        }
});

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
    var code =$("#txtvalidateCode").val();
    if($(".loginCode").is(":hidden")==false){
        if(code.length<=0){
            layer.msg('验证码不能为空');
            $("#txtvalidateCode").focus();
            return false; 
        }
    }
    $("#submit").val("正在登录中...");
    $("#submit").css("background-color", "#e2e2e2");
    $("#submit").attr("disabled", "disabled");
    $.ajax({
        cache: false,
        dataType: 'json',
        type: 'POST',
        headers: headers,
        data: JSON.stringify({
            userName: username,
            password: password,
            returnUrl: $('input[name="returnUrl"]').val(),
            useType: "",
            code:code
        }),
        contentType: 'application/json; charset=utf-8',
        url: '/Account/Login',
        success: function (response) {
            if (response && response.Status == 1) {
                var isPwd =/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;
               if (!isPwd.test(password)||username ==password) {
                   //layer.alert('<div class="alert"><div class="alertTitle">尊敬的三维家客户：</div><div class="alertContent">我们发现您的密码设置过于简单，存在被盗的风险，为保障您的账号安全，请尽快修改密码。</div><div class="btncls"><a href="/Member/Setting/UpdatePassWord" class="update">马上修改</a><a href="javascript:void(0);" onclick="setUrl(\''+response.BackUrl+'\');" class="notupdate">暂不修改</a></div></div>', {
                   //    btn: [],
                   //    area: '430px',
                   //    title: "帐号安全提示",
                   //    move: false,
                   //    cancel: function () {
                   //        //右上角关闭回调
                   //        location.href = response.BackUrl;
                   //    }
                   //});

                   setCookie("simplePwd",1,1440); //密码过于简单

               }
                $("#submit").val("正在跳转页面...");
                //登录成功百度统计
                SetEventClick($("#userRoles").val(), "平台登录_登录_按钮", "平台登录", "/Account/Login")
                location.href = response.BackUrl;
               
            } else {
                $("#submit").removeAttr("disabled");
                $("#submit").css("background-color", "#37b5f9");
                $("#submit").val("立即登录");
                layer.msg(response.MSG);
                f.Password.value = "";
                
                //验证登陆失败是否超过3次，超过3次则显示验证码
                var errorCount = getCookie("errorCount");
                if(errorCount==false){
                    setCookie("errorCount",1,1440);
                }else{
                    if(parseInt(errorCount)+1>=3){
                        $(".loginCode").show();
                        $("#txtvalidateCode").focus();
                        $("#txtvalidateCode").val("");
                        $("#GL_StandardCode").click();
                    }else{
                         setCookie("errorCount", parseInt(errorCount)+1,1440);
                    }
                }

            }
        }, error: function (response) {
            //layer.msg('访问服务器发生异常，请联系管理员，谢谢！');
        }
    });
}
function setUrl(url) {
    location.href = url;
}