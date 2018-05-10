<%@page language="java" contentType="text/html;charset=utf-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>排课管理</title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport"
          content="width=device-width,user-scalable=yes, minimum-scale=0.4, initial-scale=0.8,target-densitydpi=low-dpi"/>
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
    <link rel="stylesheet" href="../../css/font.css">
    <link rel="stylesheet" href="../../css/xadmin.css">
    <script type="text/javascript" src="../../js/jquery.min.js"></script>
    <script type="text/javascript" src="../../lib/layui/layui.js" charset="utf-8"></script>
    <script type="text/javascript" src="../../js/xadmin.js"></script>

    <%--公共标签--%>
    <%@include file="/tag.jsp"%>
</head>

<body>

<!--主体-->
<div class="x-body">
    <!--查询-->
    <!--<div class="layui-row">
        <form class="layui-form layui-col-md12 x-so">
        	
            <div class="layui-input-inline">
                <select name="contrller">
                	<option>请输入专业</option>
                    <option>软件工程</option>
                    <option>物联网</option>
                    <option>计算机</option>
                </select>
            </div>
            <div class="layui-input-inline">
                <select name="contrller">
                	<option>请输入学年</option>
                    <option>2014-2015学年</option>
                    <option>2015-2016学年</option>
                    <option>2016-2017学年</option>
                </select>
            </div>
            <div class="layui-input-inline">
                <select name="contrller">
                	<option>请输入学期</option>
                    <option>第一学期</option>
                    <option>第二学期</option>
                    
                </select>
            </div>
        	
            <div class="layui-input-inline">
                 <button class="layui-btn" lay-submit="" lay-filter="sreach"><i class="layui-icon">&#xe615;</i></button>
            </div>
           
        </form>
    </div>-->
    <!--end查询-->

    <!--操作区域-->
    <xblock>
    	<button class="layui-btn" onclick="arrangeCourse()">使用</button>
    	 
    </xblock>
    <!--<h4 style="text-align: center; font-size: 18px;">太原科技大学教师排课计划表</h4>-->
    <!--<hr />-->
    <!--<h4 style="text-align: center; font-size: 14px;">计算机学院&nbsp;&nbsp;软件工程专业&nbsp;&nbsp;2016/2017学年&nbsp;&nbsp;第二学期</h4>-->
    <!--end 操作区域-->
    <!--<hr /><br/><br/>-->
    <!--<button class="layui-btn" onclick="arrangeCourseAdd()" style="margin-top: -27px;">新增 </button>-->
	
	<script>
		var chooseCourse=0;//判断是否选中课程
    	function panduan(){
    		$(".layui-form-checkbox").each(function() { 
				if ($(this).hasClass("layui-form-checked")) {
					chooseCourse++;
				}
			})
    	}
    	function arrangeCourse(){
    		panduan();//调用判断方法
    		if (chooseCourse>0) {
//							x_admin_show('使用历史排课计划','./useHistoryArrange.html')
							layer.confirm('您确定使用选中的历史排课记录至当前的排课任务中？',function(){
								x_admin_close()
							});
						}
    		else{
    			layer.alert('请先选择需要使用的历史排课计划');
    		}
    		chooseCourse=0;//清空值
    	}
    	/*function arrangeCourseAdd(){
    		x_admin_show('新增排课计划','./scheduleManage-add.jsp')
    	}*/
	</script>
    <!--表格内容-->
    <table class="layui-table">
        <thead>
        	
        	<tr>
    			 <th>
                <div  class="layui-unselect header layui-form-checkbox" lay-skin="primary"><i class="layui-icon">
                    &#xe605;</i></div>
            </th>
         	<th>序号</th>
            <th>任助课教师</th>
            <th>教师编号</th>
            <th>教师职称</th>
            <th>所任课程</th>
            <th>课程编号</th>
            
            <th>所任班级</th>
            <th>上课周数</th>
            <th>周学时数</th>
            <th>是否使用多媒体</th>
            <!--<th>操作</th>-->
		    </tr>
        </thead>
        <tbody>
        <tr>
            <td>
                <div class="layui-unselect layui-form-checkbox" lay-skin="primary" data-id='2'><i class="layui-icon">
                    &#xe605;</i></div>
            </td>
            <td>2</td>
            <td>201</td>
            <td>老王</td>
            <td>男</td>
            <td>1854-10-2</td>
            <td>软12004</td>
            <td>学生</td>
            <td>1854-10-2</td>
            <td>软12004</td>
            <td>学生</td>
            <!--<td class="td-manage">
                <a title="点击查看排课详细信息" onclick="x_admin_show('详细信息','scheduleManage-view.html')" href="javascript:;">
                    <i class="layui-icon">&#xe63c;</i>
                </a>
                <a title="点击修改排课计划"  onclick="x_admin_show('修改','scheduleManage-edit.html')" href="javascript:;">
                    <i class="layui-icon">&#xe642;</i>
                </a>
                <a title="删除" onclick="member_del(this,'要删除的id')" href="javascript:;">
                    <i class="layui-icon">&#xe640;</i>
                </a>
            </td>-->
        </tr>
        </tbody>
    </table>
    <!--end 表格内容-->

    <!--分页-->
    <div id="demo7"></div>
    <!--end 分页-->
</div>

<script>
    /*分页js*/
    layui.use(['laypage', 'layer'], function(){
        var laypage = layui.laypage
            ,layer = layui.layer;

        //完整功能
        laypage.render({
            elem: 'demo7'
            ,count: 100
            ,layout: ['count', 'prev', 'page', 'next', 'limit', 'skip']
            ,jump: function(obj){
                console.log(obj)
            }
        });
    });

    //点击关闭其他，触发事件
    function closeOther() {
        var closeTable = $(".layui-tab-title", parent.document).children("li");
        closeTable.each(function () {
            if ($(this).attr("class") == "") {
                $(this).children("i").trigger("click");
            }
        })
    }

    /*用户-删除*/
    function member_del(obj, id) {
        layer.confirm('确认要删除吗？', function (index) {
            //发异步删除数据
            $(obj).parents("tr").remove();
            layer.msg('已删除!', {icon: 1, time: 1000});
        });
    }
</script>

</body>

</html>