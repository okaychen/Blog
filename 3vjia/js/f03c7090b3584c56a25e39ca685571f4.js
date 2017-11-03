(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.userSyste.user');

    serviceNamespace.getUsers = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/userSyste/user/GetUsers',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getUserMobile = function(userId, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/userSyste/user/GetUserMobile?userId=' + escape(userId) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getUserName = function(userId, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/userSyste/user/GetUserName?userId=' + escape(userId) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.bbs.appmodle');

    serviceNamespace.getAppCount = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/appmodle/GetAppCount',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.bbs.basic');

    serviceNamespace.getHomeQQ = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/basic/GetHomeQQ',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.setHomeQQ = function(content, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/basic/SetHomeQQ?content=' + escape(content) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.bbs.case');


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.bbs.casefiles');


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.bbs.category');

    serviceNamespace.getCategoryByParentId = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/category/GetCategoryByParentId',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getCategoryListByTopParent = function(code, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/category/GetCategoryListByTopParent?code=' + escape(code) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getCategoryByNameAndCode = function(code, name, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/category/GetCategoryByNameAndCode?code=' + escape(code) + '&name=' + escape(name) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getCategoryIdByNameAndCode = function(code, name, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/category/GetCategoryIdByNameAndCode?code=' + escape(code) + '&name=' + escape(name) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getCategoryNameById = function(categoryid, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/category/GetCategoryNameById?categoryid=' + escape(categoryid) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.bbs.integraldetails');


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.bbs.ratingpoints');


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.bbs.coursebooking');

    serviceNamespace.checkUserTodayIsBooking = function(mobile, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/coursebooking/CheckUserTodayIsBooking?mobile=' + escape(mobile) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.userCourseBooking = function(inputDto, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/coursebooking/UserCourseBooking',
            type: 'POST',
            data: JSON.stringify(inputDto)
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.bbs.lecturer');

    serviceNamespace.editLecturer = function(inputDto, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/lecturer/EditLecturer',
            type: 'POST',
            data: JSON.stringify(inputDto)
        }, ajaxParams));
    };

    serviceNamespace.getLecturerInfo = function(lecturerId, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/lecturer/GetLecturerInfo?lecturerId=' + escape(lecturerId) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getPageList = function(inputMod, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/lecturer/GetPageList',
            type: 'POST',
            data: JSON.stringify(inputMod)
        }, ajaxParams));
    };

    serviceNamespace.deleteLecturer = function(lecturerIds, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/lecturer/DeleteLecturer?lecturerIds=' + escape(lecturerIds) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getLectureList = function(lecturetype, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/lecturer/GetLectureList?lecturetype=' + escape(lecturetype) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.bbs.teachcast');

    serviceNamespace.editTeachCast = function(inputDto, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/teachcast/EditTeachCast',
            type: 'POST',
            data: JSON.stringify(inputDto)
        }, ajaxParams));
    };

    serviceNamespace.getPageList = function(inputMod, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/teachcast/GetPageList',
            type: 'POST',
            data: JSON.stringify(inputMod)
        }, ajaxParams));
    };

    serviceNamespace.getTeachcastInfo = function(teachcastid, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/teachcast/GetTeachcastInfo?teachcastid=' + escape(teachcastid) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.deleteTeachCast = function(teachCastIds, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/teachcast/DeleteTeachCast?teachCastIds=' + escape(teachCastIds) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getTeachCast = function(teachDto, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/teachcast/GetTeachCast',
            type: 'POST',
            data: JSON.stringify(teachDto)
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.bbs.teachvideo');

    serviceNamespace.editTeachVideo = function(inputDto, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/teachvideo/EditTeachVideo',
            type: 'POST',
            data: JSON.stringify(inputDto)
        }, ajaxParams));
    };

    serviceNamespace.getPageList = function(inputMod, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/teachvideo/GetPageList',
            type: 'POST',
            data: JSON.stringify(inputMod)
        }, ajaxParams));
    };

    serviceNamespace.getTeachVideoInfo = function(courseId, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/teachvideo/GetTeachVideoInfo?courseId=' + escape(courseId) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.deleteTeachVideo = function(courseIds, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/teachvideo/DeleteTeachVideo?courseIds=' + escape(courseIds) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.updateTeachVideoModle = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/teachvideo/UpdateTeachVideoModle',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.updateRecemand = function(courseId, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/teachvideo/UpdateRecemand?courseId=' + escape(courseId) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.updateSort = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/teachvideo/UpdateSort',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.updateRecemandImage = function(file, width, height, sort, courseId, content, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/teachvideo/UpdateRecemandImage?width=' + escape(width) + '&height=' + escape(height) + '&sort=' + escape(sort) + '&courseId=' + escape(courseId) + '&content=' + escape(content) + '',
            type: 'POST',
            data: JSON.stringify(file)
        }, ajaxParams));
    };

    serviceNamespace.updateRecommendSort = function(courseId, sort, videoImage, content, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/teachvideo/UpdateRecommendSort?courseId=' + escape(courseId) + '&sort=' + escape(sort) + '&videoImage=' + escape(videoImage) + '&content=' + escape(content) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getRecomandCastVideo = function(num, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/teachvideo/GetRecomandCastVideo?num=' + escape(num) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getTeachVideoList = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/teachvideo/GetTeachVideoList',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getVideoInfo = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/teachvideo/GetVideoInfo',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.addViewCount = function(courseId, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/teachvideo/AddViewCount?courseId=' + escape(courseId) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.bbs.comment');

    serviceNamespace.addAdminCommon = function(inputMod, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/comment/AddAdminCommon',
            type: 'POST',
            data: JSON.stringify(inputMod)
        }, ajaxParams));
    };

    serviceNamespace.getCommentPageList = function(inputMod, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/comment/GetCommentPageList',
            type: 'POST',
            data: JSON.stringify(inputMod)
        }, ajaxParams));
    };

    serviceNamespace.deleteComment = function(ids, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/comment/DeleteComment?ids=' + escape(ids) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getReplyComment = function(inputMod, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/comment/GetReplyComment',
            type: 'POST',
            data: JSON.stringify(inputMod)
        }, ajaxParams));
    };

    serviceNamespace.getCommentList = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/comment/GetCommentList',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.addComment = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/comment/AddComment',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.bbs.topic');

    serviceNamespace.getPageList = function(inputMod, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/topic/GetPageList',
            type: 'POST',
            data: JSON.stringify(inputMod)
        }, ajaxParams));
    };

    serviceNamespace.getTopicInfo = function(topicId, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/topic/GetTopicInfo?topicId=' + escape(topicId) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.topicEdit = function(editMod, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/topic/TopicEdit',
            type: 'POST',
            data: JSON.stringify(editMod)
        }, ajaxParams));
    };

    serviceNamespace.deleteTopicByIds = function(ids, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/topic/DeleteTopicByIds?ids=' + escape(ids) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.updateModle = function(inputDto, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/topic/UpdateModle',
            type: 'POST',
            data: JSON.stringify(inputDto)
        }, ajaxParams));
    };

    serviceNamespace.updateRecomand = function(inputDto, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/topic/UpdateRecomand',
            type: 'POST',
            data: JSON.stringify(inputDto)
        }, ajaxParams));
    };

    serviceNamespace.updateStatus = function(inputDto, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/topic/UpdateStatus',
            type: 'POST',
            data: JSON.stringify(inputDto)
        }, ajaxParams));
    };

    serviceNamespace.activeTopicEdit = function(editMod, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/topic/ActiveTopicEdit',
            type: 'POST',
            data: JSON.stringify(editMod)
        }, ajaxParams));
    };

    serviceNamespace.getActivePageList = function(inputMod, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/topic/GetActivePageList',
            type: 'POST',
            data: JSON.stringify(inputMod)
        }, ajaxParams));
    };

    serviceNamespace.getHelpTopic = function(num, isNew, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/topic/GetHelpTopic?num=' + escape(num) + '&isNew=' + escape(isNew) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getHomeActiveList = function(num, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/topic/GetHomeActiveList?num=' + escape(num) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.updateSort = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/topic/UpdateSort',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getMyQuestionTopic = function(inputMod, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/topic/GetMyQuestionTopic',
            type: 'POST',
            data: JSON.stringify(inputMod)
        }, ajaxParams));
    };

    serviceNamespace.addHelpTopic = function(inputParam, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/topic/AddHelpTopic',
            type: 'POST',
            data: JSON.stringify(inputParam)
        }, ajaxParams));
    };

    serviceNamespace.getHelpTopicList = function(inputMod, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/topic/GetHelpTopicList',
            type: 'POST',
            data: JSON.stringify(inputMod)
        }, ajaxParams));
    };

    serviceNamespace.getForntTopicInfo = function(topicId, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/topic/GetForntTopicInfo?topicId=' + escape(topicId) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.addViewCount = function(topicId, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/topic/AddViewCount?topicId=' + escape(topicId) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.seachList = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/topic/SeachList',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.bbs.userpreferences');

    serviceNamespace.getPreferencesByUserId = function(preferences, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/userpreferences/GetPreferencesByUserId',
            type: 'POST',
            data: JSON.stringify(preferences)
        }, ajaxParams));
    };

    serviceNamespace.updateUserPreferencesById = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/userpreferences/UpdateUserPreferencesById',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.bbs.blacklist');

    serviceNamespace.addBlack = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/blacklist/AddBlack',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getPageList = function(inputMod, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/blacklist/GetPageList',
            type: 'POST',
            data: JSON.stringify(inputMod)
        }, ajaxParams));
    };

    serviceNamespace.blackRestore = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/blacklist/BlackRestore',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.userIsBlack = function(userId, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/blacklist/UserIsBlack?userId=' + escape(userId) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.bbs.guest');

    serviceNamespace.getUserInfo = function(userId, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/guest/GetUserInfo?userId=' + escape(userId) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.bbs.articles');

    serviceNamespace.getHomeArticleList = function(num, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/articles/GetHomeArticleList?num=' + escape(num) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getArticleList = function(articleInput, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/articles/GetArticleList',
            type: 'POST',
            data: JSON.stringify(articleInput)
        }, ajaxParams));
    };

    serviceNamespace.getPageList = function(inputMod, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/articles/GetPageList',
            type: 'POST',
            data: JSON.stringify(inputMod)
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.bbs.video');

    serviceNamespace.editVideo = function(inputDto, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/video/EditVideo',
            type: 'POST',
            data: JSON.stringify(inputDto)
        }, ajaxParams));
    };

    serviceNamespace.getPageList = function(inputMod, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/video/GetPageList',
            type: 'POST',
            data: JSON.stringify(inputMod)
        }, ajaxParams));
    };

    serviceNamespace.setRecommend = function(inputDto, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/video/SetRecommend',
            type: 'POST',
            data: JSON.stringify(inputDto)
        }, ajaxParams));
    };

    serviceNamespace.deleteVideoByIds = function(ids, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/video/DeleteVideoByIds?ids=' + escape(ids) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.updateVideoDayByIds = function(inputDto, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/video/UpdateVideoDayByIds',
            type: 'POST',
            data: JSON.stringify(inputDto)
        }, ajaxParams));
    };

    serviceNamespace.getNewhandPageList = function(inputDto, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/video/GetNewhandPageList',
            type: 'POST',
            data: JSON.stringify(inputDto)
        }, ajaxParams));
    };

    serviceNamespace.updateSort = function(inputDto, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/video/UpdateSort',
            type: 'POST',
            data: JSON.stringify(inputDto)
        }, ajaxParams));
    };

    serviceNamespace.deleteNewHandByIds = function(ids, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/video/DeleteNewHandByIds?ids=' + escape(ids) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getVideoInfo = function(videoId, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/video/GetVideoInfo?videoId=' + escape(videoId) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getCategoryName = function(categoryId, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/video/GetCategoryName?categoryId=' + escape(categoryId) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getHomeVideoInfo = function(videoId, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/video/GetHomeVideoInfo?videoId=' + escape(videoId) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getHomeDayList = function(day, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/video/GetHomeDayList?day=' + escape(day) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.relateVideoList = function(day, count, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/video/RelateVideoList?day=' + escape(day) + '&count=' + escape(count) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.addLikeCount = function(videoId, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/video/AddLikeCount?videoId=' + escape(videoId) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.addClickCount = function(videoId, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/bbs/video/AddClickCount?videoId=' + escape(videoId) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };


})();


