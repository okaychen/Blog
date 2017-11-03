/**********************************************************************************************************************************************/
/**********************************************************************************************************************************************/
/**********************************************************************************************************************************************/
/****************************************** 平台百度统计辅助脚本库 2016-01-28  安龙飞创建******************************************************/
/**********************************************************************************************************************************************/
/**********************************************************************************************************************************************/
/**********************************************************************************************************************************************/

/* 自定义变量：      _hmt.push(['_setCustomVar', index, name, value, opt_scope]);
                     index：是自定义变量所占用的位置。取值为从1到5。该项必选。
                     name：是自定义变量的名字。该项必选。
                     value：就是自定义变量的值。该项必选。
                     opt_scope：是自定义变量的作用范围。该项可选。1为访客级别（对该访客始终有效），2为访次级别（在当前访次内生效），3为页面级别（仅在当前页面生效）。默认为3。
     含义讲解：
                     index=1    用户角色_游客
                     index=2    用户角色_业主
                     index=3    用户角色_装企
                     index=4    用户角色_店长
                     index=5    用户角色_设计师
                     opt_scope=1   站点上VIP客户和普通客户的数量（访客级别）
                     opt_scope=2   登录用户的访次数量（访次级别）
                     opt_scope=3   页面上几个按钮中哪个是用户最常点击的（页面级别）


       事件：        _hmt.push(['_trackEvent', category, action, opt_label, opt_value]);
                     category：要监控的目标的类型名称，通常是同一组目标的名字，比如"视频"、"音乐"、"软件"、"游戏"等等。该项必选。
                     action：用户跟目标交互的行为，如"播放"、"暂停"、"下载"等等。该项必选。
                     opt_label：事件的一些额外信息，通常可以是歌曲的名称、软件的名称、链接的名称等等。该项可选。
                     opt_value：事件的一些数值信息，比如权重、时长、价格等等，在报表中可以看到其平均值等数据。该项可选。

    适用场景：       AJAX页面元素的点击
                     播放器的播放/停止操作
                     web小游戏的开始/暂停操作
                     文件下载

    百度API查看地址：http://tongji.baidu.com/open/api/more?p=guide_trackEvent
*/

var _hmt = _hmt || [];
/*统计当前页面所访问的角色类型*/
function SetCustomVarRoles(rolesID) {
    //alert(_hmt + " | " + rolesID);
    switch (rolesID)
    {
        case "1":
            _hmt.push(['_setCustomVar', 1, "Roles", "平台_游客", 1]);   //Roles|用户角色
            break;
        case "2":
            _hmt.push(['_setCustomVar', 2, "Roles", "平台_业主", 1]);
            break;
        case "3":
            _hmt.push(['_setCustomVar', 3, "Roles", "平台_装企", 1]);
            break;
        case "4":
            _hmt.push(['_setCustomVar', 4, "Roles", "平台_店长", 1]);
            break;
        case "5":
            _hmt.push(['_setCustomVar', 5, "Roles", "平台_设计师", 1]);
            break;
    }
}

/*事件统计*/
//监控的目标的角色类型      rolesID
//监控的目标的按钮页面位置  btnLocation
//监控的目标的按钮名称      btnName
//监控的目标的按钮所在页面  btnPageUrl
function SetEventClick(rolesID, btnLocation, btnName, btnPageUrl) {
    //alert(_hmt + " | " + rolesID + " | " + btnLocation + " | " + btnName + " | " + btnPageUrl);
    switch (rolesID) {
        case "1":
            _hmt.push(['_trackEvent', btnLocation, '游客_单击事件', btnName, btnPageUrl]);
            break;
        case "2":
            _hmt.push(['_trackEvent', btnLocation, '业主_单击事件', btnName, btnPageUrl]);
            break;
        case "3":
            _hmt.push(['_trackEvent', btnLocation, '装企_单击事件', btnName, btnPageUrl]);
            break;
        case "4":
            _hmt.push(['_trackEvent', btnLocation, '店长_单击事件', btnName, btnPageUrl]);
            break;
        case "5":
            _hmt.push(['_trackEvent', btnLocation, '设计师_单击事件', btnName, btnPageUrl]);
            break;
    }
}