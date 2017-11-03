
$(function () {
     //初始化轮播
    //trigger: "click",
    $(".fullSlide").slide({titCell: ".hd li", mainCell: ".bd ul", effect: "fold", autoPlay: true, mouseOverStop: true, autoPage: false, interTime: 3000,
        startFun: function (i, c) {
            $ul = $('.hd > ul');
            $li = $('.hd > ul > li');
            $li.bind('mouseover', function () {
                var $this = $(this);
                $this.find('img').attr('src', '/Content/Images/feature1.png');
                $this.siblings().css('opacity', .7).find('img').attr('src', '/Content/Images/feature.png').end().removeClass('on').end().css('opacity', 1).addClass('on');
                $this.click();
            })

            $li.eq(i).find('img').attr('src', '/Content/Images/feature1.png').end().siblings().css('opacity', .7).find('img').attr('src', '/Content/Images/feature.png').end().end().css('opacity', 1);

            if (i == 3) {
                $ul.addClass('shadow');
                return;
            } else {
                $ul.removeClass('shadow');
            }
        }, endFun: function (i, c) {

        }
    });

    // 调用示例：（confrim可以自定义模板，传入的id为modal1,modal2,就可以得到两种不同样式）
    var $buyBtn = $('.buyBtn');
    var url;
    $buyBtn.find('a').bind('click', function (e) {
        var combname = $(this).data('combname');
        var pptype = $(this).closest('ul').data('sort');
        var prefix = App.HttpPrefix + 'admin.3vjia.com/mnmnh/common/moduleopen.aspx';
        var url = encodeURI(prefix + '?' + 'ComboID=' + combname + '&ppType=' + pptype);
        $('#iframeurl').val(url);
        $('#frameid').attr('src', url);
        e.preventDefault();
        if ($("#isLogin").val() == "loggedin") {
            model.model1 = modal.show('#modal1', function ($elem) {
                $elem.hide();
                modal.close();
            }, function ($elem) {
            })
        }
        else {
            $("#loginpop").show();
        }
    })
     
    function configlimit() {
        tools.confirm('#confirm2', '', function ($elem1) {
            var module1 = $elem1.find('#module1').val();
            var module2 = $elem1.find('#module2').val();
            console.log(module1, module2);
            if (module1 == '') {
                $elem1.find('.tip1').show();
                return;
            } else {
                $elem1.find('.tip1').hide();
            }
            if(module2 == '' ){
                $elem1.find('.tip2').show();
                return;
            } else {
                $elem1.find('.tip2').hide();
            }
            tools.alert('#alert1', '配置成功', function ($elem3) {
                $elem3.hide();
                $elem1.hide();
            })
        }, function ($elem2) {
            $elem2.hide();
        })
    }
    
    //buyItem
    var $buyContent = $('.buy-content');
    var $ctrl = $buyContent.find('.buyItem');
    $ctrl.bind('click', function () {
        var tab = $(this).data('tab');
        $(this).siblings().removeClass('active').end().addClass('active');
        $tab = $('#' + tab);
        $tab.fadeIn();
        $tab.siblings().fadeOut();
    })


    // midNav
    var $midli = $('.midNav > div > ul > li');
    $midli.find('a').bind('click', function (e) {
        e.preventDefault();
        $midli.removeClass('active');
        $(this).closest('li').addClass('active');
    })

    //vrglass
    $('#vrglass').bind('mouseover', function () {
        $(this).find('img').attr('src', '/Content/Images/vrglass2.png');
    })

    $('#vrglass').bind('mouseleave', function () {
        $(this).find('img').attr('src', '/Content/Images/vrglass1.png');
    })

    //scroll
    var scroll = {
        init: function () {
            this.scrollBar(720, 3892, 5982);
            // this.tabChange();
        },
        scrollBar: function (a, b, c) {
            var NavBox = $("#c-nav");
            var self = this;
            var nav = $("#c-nav li");
            var len = nav.length;
            $(document).scroll(function () {
                var barLen = $(document).scrollTop();
                if (barLen >= a + 70) {
                    NavBox.css('position', 'fixed').addClass('fixed1');
                } else {
                    NavBox.css('position', 'relative').removeClass('fixed1');
                };
                if (barLen < a) {
                    $(nav).removeClass("active");
                } else if (barLen >= a && barLen < b) {
                    $(nav[0]).addClass("active");
                    nav.not(nav[0]).removeClass("active");
                } else if (barLen >= b && barLen < c) {
                    $(nav[1]).addClass("active");
                    nav.not(nav[1]).removeClass("active");
                } else {
                    $(nav[2]).addClass("active");
                    nav.not(nav[2]).removeClass("active");
                }
            });
            for (var i = 0; i < len; i++) {
                (function (i) {
                    $(nav[i]).click(function () {
                        // self.shift(i);
                        var hash = $(this).find('a').data('hash');
                        // console.log($(this).data('hash'))
                        window.location.href = hash;
                    });
                }(i))
            }
        },
        shift: function (a) {
            if (a == 0) {
                $("body, html").animate({ scrollTop: 740 }, 1000);
            } else if (a == 1) {
                $("body, html").animate({ scrollTop: 3892 }, 1000);
            } else if (a == 2) {
                $("body, html").animate({ scrollTop: 5982 }, 1000);
            }
        }
    }
    scroll.init();
})