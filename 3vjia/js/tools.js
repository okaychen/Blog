
var tools = {
    template: {
        $alert: $('.alertWrap'),
        $confirm: $('.confirmWrap')
    },
    /**
     * alert弹框组件
     * params: [string] 要显示的数据 [function] 回调函数(参数中会返回alert对象，可以用$elem.hide()关闭弹框)
     * 调用函数：tools.alert([string], function() {}) 
    **/
    alert: function(selector, msg, ok) {
        var _self = this;
        if (selector) {
            _self.template.$alert = $(selector);
            console.log(_self.template.$alert);
        }
        _self.template.$alert.find('.info').html(msg);
        this.template.$alert.show();
        _self.template.$alert.find('.close').bind('click', function() {
            _self.template.$alert.hide();
        })
        _self.template.$alert.find('.okBtn').bind('click', function() {
            if (ok) {
                ok(_self.template.$alert);
            }
        })
    },
    /**
     * confirm弹框组件
     * params: [string] alert弹框的jq选择器 [string] 要显示的数据 [function] 两个回调函数(参数中会返回confrim对象，可以用$elem.hide()关闭弹框)
     * 调用函数：tools.confirm([string], function() {}, function(){}) 
    **/
    confirm: function(selector, msg, save, cancel) {
        var _self = this;
        if (selector) {
            _self.template.$confirm = $(selector);
        }
        if (msg) {
            this.template.$confirm.find('.info').html(msg);
        }
        this.template.$confirm.show();
        this.template.$confirm.find('.close').bind('click', function() {
            _self.template.$confirm.hide();
        })
        this.template.$confirm.find('.save').bind('click', function() {
            if(save) {
                save(_self.template.$confirm);
            }
        });
        this.template.$confirm.find('.cancel').bind('click', function() {
            if (cancel) {
                cancel(_self.template.$confirm);
            }
        })
    }   
}
/**
 * modal 组件
 * params: [string] jquery选择器(有两种弹框可以选择：#modal1, #modal2)
 * 调用modal: modal.show([string])
 * 两个回调，一个可以在关闭弹框的时候执行，另外一个是初始化的时候执行。
**/
var modal = {
    data: {
        $modal:$('.modalWrap'),
        $closeBtn:$('.modalWrap').find('.close')
    },
    show: function(selector,onClose,always) {
        if (selector) {
            this.data.$modal = $(selector);
            this.data.$closeBtn = $(selector).find('.close');
        }
        var _self = this;
        this.data.$modal.show();
        this.data.$closeBtn.bind('click', function() {
            if(onClose) {
                onClose(_self.data.$modal);
                // _self.data.$modal.remove();
            }
        })
        if(always) {
            always(this.data.$modal)
        }
        return this.data.$modal;
    },
    close: function () {
        this.data.$modal.hide();
    }
}

modal.close = function () {
    $('.modalWrap').hide();
}

function configGuide(msg) {
    modal.show('#modal2', function ($elem) {
        $elem.hide();
        
    }, function ($elem) {
        if (msg) {
            $elem.find('.limitation > h3').html(msg);
        }
    })
}

