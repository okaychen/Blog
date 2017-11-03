function SetFav(ckobj) {
    var obj = $(ckobj);
    if ($.trim(obj.parent().find(".collectTxt").text()) != "已收藏") {
        obj.unbind("click");
        $.ajax({
            url: "/Home/CheckUserIsLogin", success: function (result) {
                if (result.length > 0) {
                    var materialId = obj.attr("data-id");
                    var groupid = "";
                    var materialName = obj.attr("data-name");
                    var organid = $("#hidOrganId").val();
                    var userid = $("#hidUserId").val();
                    var deptid = $("#hidDeptId").val();
                    var scenePackageId = obj.parents('li.item').attr("data-id");
                    abp.services.mms.designmaterial.addCollectMaterial({
                        MaterialId: materialId,
                        GroupId: groupid,
                        MaterialName: materialName,
                        UserId: userid,
                        OrganId: organid,
                        DeptId: deptid,
                        ScenePackageId: scenePackageId
                    }).done(function (data) {
                        if (data.status == 1) {
                            obj.parent().find("i").addClass("collected");
                            obj.parent().find(".collectTxt").text("已收藏");
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
}