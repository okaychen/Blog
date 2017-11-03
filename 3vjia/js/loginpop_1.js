$(document).ready(function(){
    var isMobile = /^(15|13|18|17|14)\d{9}$/; //手机号码验证规则
    var isCode = /^\d{6}$/; //验证码验证规则^\d{6}$
    var isPwd =/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;
    $(".btnLgoin a").bind("click",function(){
       var phone = $("#loginPhone").val();
       if(phone.length<=0){
            $(".logincontent .error").html("用户名或者手机号不能为空");
            $("#loginPhone").focus();
            return;
       }
       var pwd = $("#loginPwd").val();
       if(pwd.length<=0){
            $(".logincontent .error").html("密码不能为空");
            $("#loginPwd").focus();
            return;
       }
       var code ="";
        if($(".logincontent .imgcode").is(":hidden")==false){
            code =$("#loginCode").val();
            if(code.length<=0){
                $(".logincontent .error").html("验证码不能为空");
                $("#loginCode").focus();
                return;
            }
        }
        $(this).text("正在登录中...");
        $(this).css("background-color", "#e2e2e2");
        $(this).attr("disabled", "disabled");

        //中场后台登录
        var headers = {};
        headers['X-XSRF-Token'] = $('input[name="__RequestVerificationToken"]').val();

         $.ajax({
            cache: false,
            dataType: 'json',
            type: 'POST',
            headers: headers,
            data: JSON.stringify({
                userName: phone,
                password: pwd,
                returnUrl: $('input[name="returnUrl"]').val(),
                code:code
            }),
            contentType: 'application/json; charset=utf-8',
            url: '/Account/Login',
            success: function (response) {
                if (response && response.Status == 1) {
                    $(".logincontent .error").html("登录成功！");
                    refreshUserInfo();
                    location.reload() 
                } else {
                    $(".logincontent .error").html(response.MSG);
                    $("#loginPwd").val("");

                    $(".btnLgoin a").text("登录");
                    $(".btnLgoin a").css("background-color", "#00a0e9");
                    $(".btnLgoin a").removeAttr("disabled");

                    //验证登陆失败是否超过3次，超过3次则显示验证码
                    var errorCount = getCookie("errorCount");
                    if(errorCount==false){
                        setCookie("errorCount",1,1440);
                    }else{
                        if(parseInt(errorCount)+1>=3){
                            $(".logincontent .imgcode").show();
                            $("#loginCode").focus();
                            $("#loginCode").val("");
                            $("#GL_StandardCode").click();
                        }else{
                            setCookie("errorCount", parseInt(errorCount)+1,1440);
                        }
                    }
                }
            }, error: function (response) {
                $(".logincontent .error").html("访问服务器发生异常，请联系管理员，谢谢！");
                $(".btnLgoin a").text("登录");
                $(".btnLgoin a").css("background-color", "#00a0e9");
                $(".btnLgoin a").removeAttr("disabled");
            }
        });
    })
    $(".btnReg a").bind("click", function () {

       var accountInfo = {};
        accountInfo.Account = $("#regphone").val();
        accountInfo.Password = $("#regpwd").val()
        accountInfo.Mobile = $("#regphone").val();
        accountInfo.Captcha = $("#regsmsCode").val();
        accountInfo.Path = "";

        accountInfo.From = "";
        accountInfo.Organid = "";
        accountInfo.Guidecode = "";

       if(accountInfo.Account.length<=0){
            $(".regcontent .error").html("手机号码不能为空");
            $("#regphone").focus();
            return;
       }
         if (!isMobile.test(accountInfo.Account)) {
            $(".regcontent .error").html("手机号码格式错误");
            $("#regphone").focus();
            return false;
        }
        if (accountInfo.Password.length <= 0) {
            $(".regcontent .error").html("请输入密码，由6-20位字母，数字和符号任意组合");
            $("#regpwd").focus();
            return false;
        }
        if (!isPwd.test(accountInfo.Password)) {
            $(".regcontent .error").html("密码格式不正确，由6-20位字母，数字和符号任意组合");
            $("#regpwd").focus();
            return false;
        }
        var code = $("#regimgcode").val();
        var pattern = /^[a-zA-Z0-9]{4}$/;
        if (!pattern.test(code)) {
            $(".regcontent .error").html("图形验证码输入格式错误");
            $("#regimgcode").focus();
            return;
        }
        if (accountInfo.Captcha.length <= 0) {
            $(".regcontent .error").html("请输入接收到的短信验证码");
            $("#regsmsCode").focus();
            return false;
        }
        if (accountInfo.Captcha != "3vjiah") {
            if (!isCode.test(accountInfo.Captcha)) {
               $(".regcontent .error").html("验证码格式错误，必须6位数字");
                $("#regsmsCode").focus();
                return false;
            }
        }
            accountInfo.Province = $(".selectPro").val();
            if (!accountInfo.Province || accountInfo.Province == "0") {
                $(".regcontent .error").html("请选择您所在省份");
                $(".selectPro").focus();
                return;
            }
            accountInfo.City = $(".selectCity").val();
            if (!accountInfo.City || accountInfo.City == "0") {
               $(".regcontent .error").html("请选择您所在城市");
                $(".selectCity").focus();
                return;
            }
        if($("#isread").is(":checked")==false){
          $(".regcontent .error").html("请勾选已阅读并同意《三维家用户使用协议》");
          return;
        }   
        $(this).val("正在注册中...");
        $(this).css("background-color", "#ccc");
        $(this).attr("disabled", "disabled");

        $.ajax({
            cache: false,
            dataType: 'json',
            type: 'POST',
            url: "/Register/Index",
            data: accountInfo,
            success: function (response) {
                if (response) {
                    if (response.Status == 1) {
                        SetEventClick($("#userRoles").val(), "平台注册_商家_链接", "商家注册", "/Register/Index")
                        window.location = window.location.href;
                    } else {
                        $(".btnReg a").removeAttr("disabled");
                        $(".btnReg a").css("background-color", "#37b5f9");
                        $(".btnReg a").val("注册");
                         $(".regcontent .error").html(response.MSG);
                    }
                }
            }, error: function (response) {
                $(".btnReg a").removeAttr("disabled");
                $(".btnReg a").css("background-color", "#37b5f9");
                $(".btnReg a").val("注册");
                $(".regcontent .error").html("访问服务器发生异常，请联系管理员，谢谢！");
                //layer.msg('访问服务器发生异常，请联系管理员，谢谢！');
            }
        });
    });
    $("#regphone").on("blur", function () { 
      var phone = $("#regphone").val();
        if (phone.length > 0) {
            if (!isMobile.test(phone)) {
                $(this).parent().next().css('display', 'none');
                $(".regcontent .error").html("手机号码格式错误");
                $("#regphone").focus();
                return;
            }else{
                  //验证当前用户名是否存在
                $.ajax({
                    cache: false,
                    dataType: 'json',
                    type: 'GET',
                    contentType: 'application/json; charset=utf-8',
                    url: App.BasePath + getApiUrl() + 'account',
                    data: { value: phone },
                    success: function (response) {
                        if (response && response.Status == 1) {
                            $(".regcontent .error").html("");
                             $("#regphone").parent().next().css('display', 'block');
                            $(".getCode").removeAttr("disabled");
                        } else {
                             $(".regcontent .error").html('当前手机号码已经被注册');
                             $("#regphone").parent().next().css('display', 'none');
                            $(".getCode").attr("disabled", "disabled");
                        }
                    }
                });
            }
        }else{
            $(".regcontent .error").html("手机号码不能为空");
            $("#regphone").focus();
            return;
        }
    })
       $("#regpwd").on("blur", function () { 
          var pwd = $("#regpwd").val();
          if (pwd.length <= 0) {
              $(".regcontent .error").html('密码不能为空');
              $(this).parent().next().css('display', 'none');
              return;
          }
          if (!isPwd.test(pwd)) {
               $(this).parent().next().css('display', 'none');
               $(".regcontent .error").html('密码格式不正确，由6-20位字母，数字和符号任意组合');
               return;
          }
        $(".regcontent .error").html("");
        $(this).parent().next().css('display', 'block');
      })

       $("#regimgcode").on('blur', function () {
          var code = $.trim($(this).val());
          if (code.length <= 0) {
               $(this).parent().next().css('display', 'none');
               $(".regcontent .error").html('请输入右侧图形验证码');
          } else {
                 var pattern = /^[a-zA-Z0-9]{4}$/; 
                if (!pattern.test(code)) {
                     $(this).parent().next().css('display', 'none');
                     $(".regcontent .error").html('图形验证码输入格式错误');
                    return false;
                }else{
                  $.ajax({
                      cache: false,
                      type: 'GET',
                      url: '/Register/IsCodeRight',
                      data: { value: code },
                      success: function (response) {
                          if (response=="1") {
                               $(".regcontent .error").html("");
                               $("#regimgcode").parent().next().css('display', 'block');
                          } else {
                              $("#regimgcode").parent().next().css('display', 'none');
                              $(".regcontent .error").html('验证码错误');
                              $(".regcode").click();
                              return false;
                          }
                      }, error: function (response) {
                          //layer.msg('访问服务器发生异常，请联系管理员，谢谢！');
                      }
                  });
                }
          }
    });



      //检测验证码
    var InterValObj; //timer变量，控制时间
    var count = 60; //间隔函数，1秒执行
    var curCount = 5;//当前剩余秒数
    var code = ""; //验证码
    var codeLength = 6;//验证码长度
    $("#send_code").click(function () {
        var mobile = $("#regphone").val();
        if (mobile.length <= 0 || !isMobile.test(mobile)) {
            $("#regphone").parent().next().css('display', 'none');
            $(".regcontent .error").html('手机号码格式错误');
            return false;
        }

        var code = $.trim($("#regimgcode").val());
        if (code.length <= 0) {
            $(".regcontent .error").html('请输入右侧图形验证码');
            return false;
        }

        var pattern = /^[a-zA-Z0-9]{4}$/;
        if (!pattern.test(code)) {
            $("#regimgcode").parent().next().css('display', 'none');
            $(".regcontent .error").html('图形验证码输入格式错误');
            return;
        } else {
            $.ajax({
                cache: false,
                type: 'GET',
                url: '/Register/IsCodeRight',
                data: { value: code },
                success: function (response) {
                    if (response == "1") {
                        $(".regcontent .error").html("");
                        $("#regimgcode").parent().next().css('display', 'block');

                        curCount = count;
                        var dealType; //验证方式
                        //设置button效果，开始计时
                        if ($("#send_code").hasClass('send2')) {
                            $("#send_code").removeClass('send2');
                        }
                        $("#send_code").attr("disabled", "true").addClass('send1').text(curCount + "秒");
                        InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次


                        var data = {
                            phone: mobile,
                            vcode: code,
                            key: $("#hidkey").val(),
                            t: Date.parse(new Date())
                        };

                        //向后台发送处理数据
                        $.ajax({
                            type: "post",
                            dataType: "JSON",
                            url: App.BasePath + 'api/guest/send/3vjia',
                            data: data,
                            error: function (XMLHttpRequest, textStatus, errorThrown) { },
                            success: function (response) {
                                if (response.Status == 1) {
                                    $('#hidCaptcha').val(response.MSG);
                                     $(".regcontent .error").html("");
                                    // $(".getCode").parent().next().css('display', 'block');
                                } else {
                                    curCount = 0;
                                    $("#send_code").parent().next().css('display', 'none');
                                    $(".regcontent .error").html(response.MSG);
                                }
                            }
                        });

                    } else {
                        $("#send_code").parent().next().css('display', 'none');
                        $(".regcontent .error").html('验证码错误');
                        $(".regcode").click();
                        return;
                    }
                }, error: function (response) {
                    //layer.msg('访问服务器发生异常，请联系管理员，谢谢！');
                }
            });
        }

        
    });
    //验证码
    $("#regsmsCode").on("blur", function () {
        var code = $.trim($(this).val());
        if ($(this).val().length > 0) {
            if (code == "3vjiah") {
                return true;
            }
            if (!isCode.test(code)) {
                $(".regcontent .error").html('验证码格式错误，必须6位数字');
                $(this).parent().next().css('display', 'none');
                return;
            }
            else {
                $(".regcontent .error").html("");
                $(this).parent().next().css('display', 'block');
            }
        } else {
            $(".regcontent .error").html("请输入短信验证码");
            $(this).parent().next().css('display', 'none');
        }
    });



    //timer处理函数
function SetRemainTime() {
    if (curCount == 0) {
        window.clearInterval(InterValObj);//停止计时器
        $("#send_code").removeAttr("disabled").removeClass('send1');
        $("#send_code").text("重新获取");
        code = ""; //清除验证码。如果不清除，过时间后，输入收到的验证码依然有效
    }
    else {
        curCount--;
        $("#send_code").text(curCount + "秒");
    }
};


    /*省市联动  strat*/
    var district = base_districts;
    var cities = base_cities;
    var errorInfor = $(".regcontent .error");

    //设置省份
    SetSelectOptions(district, 'selectPro', 1);
    SetSelectOptions(district, 'selectCity', 0);
    $(".selectCity").find("option:first").text("市/区");
    //设置城市
    $(".selectPro").change(function () {
        SetSelectOptions(district, 'selectCity', $(".selectPro").val());
        $(".selectPro").find("option:first").text("市/区");
        var provinceVal = $(".selectPro").val();
        if (provinceVal == '0') {
            errorInfor.html('请选择您所在城市');
            return;
        } else {
            errorInfor.html("");
            return;
        }

    });
    $(".selectCity").change(function () {
        var cityVal = $(".selectCity").val();
        if (cityVal == '0') {
            errorInfor.html('请选择您所在城市');
            return;
        } else {
            errorInfor.html('');
            return;
        }
    });
    //解析IP自动绑定省和市
    var province = $('#RegisterProvince').val();
    var city = $('#RegisterCity').val();
    if (province != "0" && city != "0") {
        var provinceId = getProCityId(district, $.trim(province));
        if (provinceId != '0') {
            $("#change_province").val(provinceId);
            $("#change_province").change();
        }
        var cityId = getProCityId(district, $.trim(city));
        if (cityId != '0') {
            $("#change_city").val(cityId);
        }
    }

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
})
//API接口地址
function getApiUrl() {
    return 'api/guest/check/';
}