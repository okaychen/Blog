(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.mms.designmaterial');

    serviceNamespace.getTopDesignMaterial = function(categoryid, rownum, organId, isNew, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/mms/designmaterial/GetTopDesignMaterial?categoryid=' + escape(categoryid) + '&rownum=' + escape(rownum) + '&organId=' + escape(organId) + '&isNew=' + escape(isNew) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getCategoryMaterialLis = function(inputDto, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/mms/designmaterial/GetCategoryMaterialLis',
            type: 'POST',
            data: JSON.stringify(inputDto)
        }, ajaxParams));
    };

    serviceNamespace.getMaterialInfo = function(materialId, userid, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/mms/designmaterial/GetMaterialInfo?materialId=' + escape(materialId) + '&userid=' + escape(userid) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.userIsFav = function(inputDto, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/mms/designmaterial/UserIsFav',
            type: 'POST',
            data: JSON.stringify(inputDto)
        }, ajaxParams));
    };

    serviceNamespace.getCollectCountAndIsFav = function(inputDto, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/mms/designmaterial/GetCollectCountAndIsFav',
            type: 'POST',
            data: JSON.stringify(inputDto)
        }, ajaxParams));
    };

    serviceNamespace.addCollectMaterial = function(inputDto, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/mms/designmaterial/AddCollectMaterial',
            type: 'POST',
            data: JSON.stringify(inputDto)
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.mms.scene');

    serviceNamespace.getMaterialList = function(inputDto, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/mms/scene/GetMaterialList',
            type: 'POST',
            data: JSON.stringify(inputDto)
        }, ajaxParams));
    };

    serviceNamespace.getSceneInfo = function(scenePackageId, categoryId, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/mms/scene/GetSceneInfo?scenePackageId=' + escape(scenePackageId) + '&categoryId=' + escape(categoryId) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getMaterialListBySceneIdAndCategoryId = function(inputDto, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/mms/scene/GetMaterialListBySceneIdAndCategoryId',
            type: 'POST',
            data: JSON.stringify(inputDto)
        }, ajaxParams));
    };


})();


