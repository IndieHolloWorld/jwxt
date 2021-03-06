/**
 * @author: ll
 * @createtime: 2018/5/1 11:25
 * @description: 通知书管理JS
 */
//初始化加载需要使用的layui模块
layui.use(['layer', 'form', 'element'], function(){
    $ = layui.jquery;
    var layer = layui.layer
        ,form = layui.form
        ,element = layui.element;
    //初始化表格
    findTaskNoticeBaseInfo();
    //初始化学院下拉框
    findCollegeNameAndId(form);
    //查询按钮事件过滤器
    form.on('submit(search)', function(data){
        //清空当前页和页号
        $("input[name='pageSize']").val('');
        $("input[name='currentPage']").val('');
        //调用查询方法
        findTaskNoticeBaseInfo();
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });

});
//查询任务通知书基本信息
function findTaskNoticeBaseInfo(){
    $.ajax({
        url : contextPath+'/arrangeCourse/findTaskNoticeInfoList.action',
        data : $("#selectNoticeInfoForm").serialize(),
        type : 'POST',
        dataType : 'json',
        async:true,
        success : showTaskNoticeBaseInfo
    });
}
function showTaskNoticeBaseInfo(pageInfo){
   // console.log(pageInfo) //测试是否有值
    var total = pageInfo.total;//页总数
    var pageNum = pageInfo.pageNum;//页号
    var pageSize = pageInfo.pageSize;//页大小
    var baseInfoList = pageInfo.list;
    $("#noticeBaseInfoList").html("");//清空表格中数据并重新填充数据
    for(var i=0,length_l = baseInfoList.length;i<length_l;i++){
        var index = (pageNum - 1) * pageSize + i + 1;
        var tr ="<tr><td><input type='radio' name='noticeRadio' value='"+baseInfoList[i].noticeBookId+"'/>"
            +"<input type='hidden' name='sel_noticeBookName' value='"+baseInfoList[i].noticeBookName+"'>"
            +"<input type='hidden' name='sel_isInput' value='"+baseInfoList[i].isInput+"'></td><td>"
            +index+"</td><td>"
            +baseInfoList[i].academicName+"</td><td>"
            +baseInfoList[i].academicYear+"</td><td>"
            +termStatusReplace(baseInfoList[i].term)+"</td><td>"
            +baseInfoList[i].createrName+"</td><td>"
            +baseInfoList[i].createTime+"</td><td>"
            +(baseInfoList[i].isInput>0?'已导入':'未导入')+"</td>"
            +"<td class='td-manage'><a title='点击查看通知书详细信息' onclick=x_admin_show('教学通知书详细信息','adviceBook-view.jsp?noticeId="+baseInfoList[i].noticeBookId+"') href='javascript:void(0);')><i class='layui-icon'>&#xe63c;</i></a>";
            if(baseInfoList[i].isInput == 0) {
                tr += "<a title='点击修改通知书信息'  onclick=x_admin_show('修改通知书','adviceBook-edit.jsp?noticeId=" + baseInfoList[i].noticeBookId + "') href='javascript:void(0);'><i class='layui-icon'>&#xe642;</i></a>";
            }
            tr += "<a title='删除' onclick=deleteNoticeBookInfo('" + baseInfoList[i].noticeBookId + "') href='javascript:void(0);'><i class='layui-icon'>&#xe640;</i></a>";
            tr +="</td></tr>";
        $("#noticeBaseInfoList").append(tr);
    }
    //开启分页组件
    noticeInfoListPage(total,pageNum,pageSize);

}

//分页函数
function noticeInfoListPage(total,pageNum,pageSize){
    /*分页js*/
    layui.use(['laypage', 'layer'], function(){
        var laypage = layui.laypage,layer = layui.layer;

        //完整功能
        laypage.render({
            elem: 'noticePage', //注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            limit:pageSize,//每页显示的条数。laypage将会借助 count 和 limit 计算出分页数。
            curr:pageNum,//当前页号
            limits:[6,10,15,20],
            layout:['limit','prev', 'page', 'next','skip','count'],//显示哪些分页组件
            jump: function(obj, first){//点击页号的时候执行的函数
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数
                $("[name='currentPage']").val(obj.curr);//向隐藏域设置当前页的值
                $("[name='pageSize']").val(obj.limit);//向隐藏域设置当前页的大小
                if(!first){//首次不执行(点击的时候才执行)
                    findTaskNoticeBaseInfo();//执行查询分页函数(这个函数必须写在这里)
                }
            }
        });
    });
}

/*删除教学任务通知书基本信息*/
function deleteNoticeBookInfo(id) {
    layer.confirm('确认要删除吗？', function (index) {
        $.ajax({
            url:contextPath+"/arrangeCourse/deleteNoticeBaseInfo.action",
            type:"post",
            dataType:"text",
            data:{"noticeBookId":id},
            success:function (response) {
                layer.msg(response, {icon: 1, time: 1000},function (){
                    //刷新父页面
                    window.location.reload();
                })
            }
        })
    });
}


//新增任务
function addTask(){
    x_admin_show('新增通知书','./adviceBook-add.jsp')
}

//导入任务通知书按钮
function importNoticeBook(){
    var checked = $("[name='noticeRadio']:checked").length>0?true:false;
    if(!checked){
        layer.alert('请先选择需要导入课程的任务通知书！');
        return;
    }
    var sel_isInput = $("[name='noticeRadio']:checked ~ input[name='sel_isInput']").val();
    if(sel_isInput==1){
        layer.alert('该任务通知书已经导入课程！');
        return;
    }
    var noticeBookId = $("[name='noticeRadio']:checked").val();//获取需要上传资料的课程主键
    var sel_noticeBookName = $("[name='noticeRadio']:checked + input[name='sel_noticeBookName']").val();
    x_admin_show('导入课程', './adviceBook-import.jsp?noticeBookId='+noticeBookId+'&noticeBookName='+sel_noticeBookName);
}

//初始化学院下拉框
function findCollegeNameAndId(form){
    $.ajax({
        url:contextPath+"/arrangeCourse/findAllCollegeInfo.action",
        dataType:"json",
        type:"post",
        success:function (response) {
            //console.log(response);
            var optionStr = "<option value=''>请输入学院</option>";
            $("select[name='academicId']").append(optionStr)
            for(var i=0;i<response.length;i++){
                optionStr = "<option value='"+response[i].collegeId+" ' >"+response[i].collegeName+"</option>";
                $("select[name='academicId']").append(optionStr)
            }
            //更新渲染
            form.render('select');
        }
    })
}