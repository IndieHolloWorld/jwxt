<%@ page import="java.util.Date" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>修改中期答辩小组</title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/font.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/xadmin.css">
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/lib/layui/layui.js" charset="utf-8"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/xadmin.js"></script>
    <style>
        .layui-table td, .layui-table th{
            font-size:13px;
        }
    </style>
    <%--引入公共的标签--%>
    <%@ include file="/tag.jsp" %>
</head>

<div class="x-body">
    <form class="layui-form">
        <table class="layui-table" style="font-size: 13px;">
            <thead>
            <tr>
                <th>
                    <div class="layui-unselect header layui-form-checkbox" lay-skin="primary"><i class="layui-icon">
                        &#xe605;</i></div>
                </th>
                <th>学生姓名</th>
                <th>班级</th>
                <th>毕设题目</th>
                <th>指导教师</th>
                <th>已分配的检查教师</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th>
                    <div class="layui-unselect header layui-form-checkbox" lay-skin="primary"><i class="layui-icon">
                        &#xe605;</i></div>
                </th>
                <td>学生1</td>
                <td>软件工程1</td>
                <td>8888</td>
                <td>教师1</td>
                <td>教师2</td>
                <td>
                    <input type="radio" name="xuesheng1" lay-skin="primary" title="选择">
                    <input type="radio" name="xuesheng1" lay-skin="primary" title="取消">
                </td>
            </tr>
            <tr>
                <th>
                    <div class="layui-unselect header layui-form-checkbox" lay-skin="primary"><i class="layui-icon">
                        &#xe605;</i></div>
                </th>
                <td>学生1</td>
                <td>软件工程1</td>
                <td>8888</td>
                <td>教师1</td>
                <td>教师2</td>
                <td>
                    <input type="radio" name="xuesheng1" lay-skin="primary" title="选择">
                    <input type="radio" name="xuesheng1" lay-skin="primary" title="取消">
                </td>
            </tr>
            <tr>
                <th>
                    <div class="layui-unselect header layui-form-checkbox" lay-skin="primary"><i class="layui-icon">
                        &#xe605;</i></div>
                </th>
                <td>学生1</td>
                <td>软件工程1</td>
                <td>8888</td>
                <td>教师1</td>
                <td>教师2</td>
                <td>
                    <input type="radio" name="xuesheng1" lay-skin="primary" title="选择">
                    <input type="radio" name="xuesheng1" lay-skin="primary" title="取消">
                </td>
            </tr>
            <tr>
                <th>
                    <div class="layui-unselect header layui-form-checkbox" lay-skin="primary"><i class="layui-icon">
                        &#xe605;</i></div>
                </th>
                <td>学生1</td>
                <td>软件工程1</td>
                <td>8888</td>
                <td>教师1</td>
                <td>教师2</td>
                <td>
                    <input type="radio" name="xuesheng1" lay-skin="primary" title="选择">
                    <input type="radio" name="xuesheng1" lay-skin="primary" title="取消">
                </td>
            </tr>
            </tbody>
        </table>

        <!--10-->
        <div class="layui-form-item">
            <label class="layui-form-label"></label>
            <button class="layui-btn" lay-submit="" lay-filter="add">增加</button>
        </div>
    </form>
</div>
<script>
    layui.use(['form', 'layer'], function () {
        $ = layui.jquery;
        var form = layui.form
            , layer = layui.layer;

        //监听提交
        form.on('submit(add)', function (data) {
            console.log(data);
            //发异步，把数据提交给php
            layer.alert("增加成功", {icon: 6}, function () {
                // 获得frame索引
                var index = parent.layer.getFrameIndex(window.name);
                //关闭当前frame
                parent.layer.close(index);
            });
            return false;
        });


    });
</script>
</body>
</html>
