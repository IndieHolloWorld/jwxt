//审核的时候，院长获取教研室的审核信息为最新信息。时间为最新
layui.use('laydate', function () {
    var laydate = layui.laydate;
    laydate.render({
        elem: '#L_pass' //指定元素
        ,format: 'yyyy年MM月dd日'
    });
});

var bookID = "";

$(function () {
    //初始化时间为当前时间
    var myDate = new Date;
    var year = myDate.getFullYear();//获取当前年
    var month = myDate.getMonth()+1;//获取当前月
    var date = myDate.getDate();
    if (month < 10) month = "0" + month;
    if (date < 10) date = "0" + date;

    bookID = getUrlParam(bookID);

    $("#L_pass").val(year + "年" + month + "月" + date + "日");
    //初始化教研室审核信息
    initData()
});

function initData() {
    $.ajax({
        url : contextPath+'/assignmentManage/getAuditFirstInfo.do',
        data: bookID,
        type : 'POST',
        dataType : 'json',
        async:true,
        success : function(data){
            return true;
        }
    });
}

layui.use(['form', 'layer'], function () {
    var form = layui.form
        , layer = layui.layer;

    //审核人为当前用户。到controller获取
    //监听提交
    form.on('submit(add)', function (data) {

        layer.confirm("确认提交?提交之后不能更改!!!",function (index) {
            //获取url参数值
            var checkResult = $("input[name='checkResult']:checked").val();
            var checkDesc = $("#checkDesc").val();
            var checkTime = $("#L_pass").val();
            //验证通过的话就提交表单
            $.post(
                contextPath+"/assignmentManage/addAuditInfo.do",
                {"bookID":bookID,"checkResult":checkResult,
                    "checkDesc":checkDesc,"checkTime":checkTime},
                function (response) {
                    layui.alert(response);
                    closePage();
                },
                'text')
        });
        return false;
    });
});