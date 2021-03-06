//初始化加载需要使用的layui模块
layui.use(['layer', 'form', 'element'], function(){
    $ = layui.jquery;
    var layer = layui.layer
        ,form = layui.form
        ,element = layui.element;
    //初始化表格
    findCollegeBaseInfo();
    findCollegeNameAndIdForSelect(form);

    //查询按钮事件过滤器
    form.on('submit(search)', function(data){
        //清空当前页和页号
        $("input[name='pagesize']").val('');
        $("input[name='currentpage']").val('');
        //调用查询方法
        findCollegeBaseInfo();
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });

});
//查询任务通知书基本信息
function findCollegeBaseInfo(){
    $.ajax({
        url : contextPath+'/collegeInfo/findCollegeInfoList.action',
        data : $("#selectCollegeInfoForm").serialize(),
        type : 'POST',
        dataType : 'json',
        async:true,
        success : showCollegeBaseInfo
    });
}
function showCollegeBaseInfo(pageInfo){
    // console.log(pageInfo) //测试是否有值
    var total = pageInfo.total;//页总数
    var pageNum = pageInfo.pageNum;//页号
    var pageSize = pageInfo.pageSize;//页大小
    var baseInfoList = pageInfo.list;
    $("#collegeBaseInfoList").html("");//清空表格中数据并重新填充数据
    for(var i=0,length_l = baseInfoList.length;i<length_l;i++){
        var index = (pageNum - 1) * pageSize + i + 1;
        var tr ="<tr><td>"
            +baseInfoList[i].collegenum+"</td><td>"
            +baseInfoList[i].collegename+"</td><td>"
            +baseInfoList[i].collegeshortname+"</td><td>"
            +baseInfoList[i].collegeintroduction+"</td><td>"
            +baseInfoList[i].collegepresident+"</td><td>"
            +baseInfoList[i].collegepresidentf+"</td>"
            +"<td class='td-manage'>"
            +"<a title='点击修改学院信息'  onclick=notice_tab_show('修改学院','college-modify.jsp?cId="+baseInfoList[i].collegeid+"') href='javascript:void(0);'><i class='layui-icon'>&#xe642;</i></a>"
            +" <a title='删除' onclick=deleteCollegeInfo('"+baseInfoList[i].collegeid+"') href='javascript:void(0);'><i class='layui-icon'>&#xe640;</i></a></td></tr>";
        $("#collegeBaseInfoList").append(tr);
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
            elem: 'demo7', //注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            limit:pageSize,//每页显示的条数。laypage将会借助 count 和 limit 计算出分页数。
            curr:pageNum,//当前页号
            limits:[6,10,15,20],
            layout:['limit','prev', 'page', 'next','skip','count'],//显示哪些分页组件
            jump: function(obj, first){//点击页号的时候执行的函数
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数

                $("[name='currentpage']").val(obj.curr);//向隐藏域设置当前页的值
                $("[name='pagesize']").val(obj.limit);//向隐藏域设置当前页的大小
                if(!first){//首次不执行(点击的时候才执行)
                    findCollegeBaseInfo();//执行查询分页函数(这个函数必须写在这里)
                }
            }
        });
    });
}

/*删除教学任务通知书基本信息*/
function deleteCollegeInfo(id) {
    layer.confirm('确认要删除吗？', function (index) {
        $.ajax({
            url:contextPath+"/collegeInfo/deleteCollegeInfo.action",
            type:"post",
            dataType:"text",
            data:{"collegeId":id},
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
function addCollege(){
    notice_tab_show('新增教师','./college-add.jsp')
}





/* S            弹出层相关操作 */
/*
    参数解释：
    title   标题
    url     请求的url
    id      需要操作的数据id
    w       弹出层宽度（缺省调默认值）
    h       弹出层高度（缺省调默认值）
*/
function notice_tab_show(title,url,w,h){
    if (title == null || title == '') {
        title=false;
    };
    if (url == null || url == '') {
        url="404.html";
    };
    if (w == null || w == '') {
        w=($(window).width()*0.90);
    };
    if (h == null || h == '') {
        h=($(window).height()-50);
    };
    layer.open({
        type: 2,
        area: [w+'px', h +'px'],
        fix: false, //不固定
        maxmin: true,
        shadeClose: true,
        shade:0.4,
        title: title,
        content: url
    });
}

//初始化学院下拉框
function findCollegeNameAndIdForSelect(form){
    $.ajax({
        url:contextPath+"/collegeInfo/findCollegeNameAndId.action",
        dataType:"json",
        type:"post",
        success:function (response) {
            //console.log(response)
            var optionStr = "<option value=''>请输入学院</option>";
            $("select[name='collegeid']").append(optionStr)
            for(var i=0;i<response.length;i++){
                optionStr = "<option value='" + response[i].collegeid+"'>"+response[i].collegename+"</option>";
                $("select[name='collegeid']").append(optionStr)
            }
            //更新渲染
            form.render('select');
        }
    })
}

/* E            弹出层相关操作 */