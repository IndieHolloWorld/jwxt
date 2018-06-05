package cn.xm.jwxt.mapper.courseDesign.custom;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

public interface LookCourseDesignArrangeInfoMapper {

    /**
     *  学生查看课设安排情况
     * @param condition
     * @return
     */
    public List<Map<String,Object>> findCourseDesignArrangeByStudent(Map<String,Object> condition) throws SQLException;

    /**
     *  教师查看课设安排情况
     * @param condition
     * @return
     */
    public List<Map<String,Object>> findCourseDesignArrangeByTeacher(Map<String,Object> condition) throws SQLException;

    /**
     *  教师查看详细安排
     * @param courseDesignTeacherArrangeID
     * @return
     * @throws SQLException
     */
    public Map<String,Object> findCourseDesignDetailArrangeInfoByTeacher(String courseDesignTeacherArrangeID) throws SQLException;

    /**
     *  查询学生列表
     * @param courseDesignTeacherArrangeID
     * @return
     * @throws SQLException
     */
    public List<Map<String,Object>> findStuList(String courseDesignTeacherArrangeID) throws SQLException;


}
