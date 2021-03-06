package cn.xm.jwxt.service.impl.baseInfo;

import cn.xm.jwxt.bean.arrangeCourse.custom.CommonQueryVo;
import cn.xm.jwxt.bean.baseInfo.TStudentBaseInfo;
import cn.xm.jwxt.bean.baseInfo.TTeacherBaseInfo;
import cn.xm.jwxt.bean.baseInfo.custom.CommonQuery;
import cn.xm.jwxt.bean.baseInfo.custom.StudentClassInfo;
import cn.xm.jwxt.bean.baseInfo.custom.TeacherMajorInfo;
import cn.xm.jwxt.mapper.baseInfo.TStudentBaseInfoMapper;
import cn.xm.jwxt.mapper.baseInfo.TTeacherBaseInfoMapper;
import cn.xm.jwxt.mapper.baseInfo.custom.TStudentBaseInfoCustomMapper;
import cn.xm.jwxt.service.baseInfo.ClassinfoService;
import cn.xm.jwxt.service.baseInfo.StudentinfoService;
import cn.xm.jwxt.utils.DefaultValue;
import cn.xm.jwxt.utils.UUIDUtil;
import cn.xm.jwxt.utils.ValidateCheck;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;
@Service
@Transactional
public class StudentinfoServiceImpl implements StudentinfoService {

    @Resource
    private TStudentBaseInfoMapper studentBaseInfoMapper;
    @Resource
    private TStudentBaseInfoCustomMapper studentBaseInfoCustomMapper;
    @Override
    public boolean addStudentInfo(TStudentBaseInfo studentBaseInfo) throws Exception {
        if(studentBaseInfo==null){
            throw new IllegalArgumentException("通知书基本信息不能为空!");
        }
        //设置主键
        studentBaseInfo.setStudentid(UUIDUtil.getUUID2());
        //是否删除字段默认使用
        studentBaseInfo.setIsdelete(DefaultValue.IS_NOT_USE);
        //是否删除字段默认使用
        studentBaseInfo.setIsgraduate(DefaultValue.IS_NOT_USE);
        int count = studentBaseInfoMapper.insertSelective(studentBaseInfo);
        return count>0?true:false;
    }

    @Override
    public boolean updateStudentInfoById(String studentid, TStudentBaseInfo studentinfo) throws Exception {
        if(ValidateCheck.isNull(studentid)){
            throw new IllegalArgumentException("通知书编号不能为空!");
        }
        if(studentinfo==null){
            throw new IllegalArgumentException("通知书基本信息不能为空!");
        }
        //设置通知书编号
        studentinfo.setStudentid(studentid);
        int count = studentBaseInfoMapper.updateByPrimaryKeySelective(studentinfo);
        return count>0?true:false;
    }

    @Override
    public boolean deleteStudentInfoById(String studentid) throws Exception {
        if(ValidateCheck.isNull(studentid)){
            throw new IllegalArgumentException("教师编号不能为空!");
        }
        int count = studentBaseInfoMapper.deleteByPrimaryKey(studentid);
        return count>0?true:false;
    }

    @Override
    public StudentClassInfo getStudentInfoById(String studentId) throws Exception {
        if(ValidateCheck.isNull(studentId)){
            throw new IllegalArgumentException("学生编号不能为空!");
        }
        StudentClassInfo studentBaseInfo = studentBaseInfoCustomMapper.getStudentInfoById(studentId);
        return studentBaseInfo;
    }


    @Override
    public PageInfo<StudentClassInfo> findStudentInfoByCondition(CommonQuery condition, Integer currentPage, Integer pageSize) throws Exception {
        if(currentPage==null||pageSize==null){
            throw new IllegalArgumentException("分页参数传递错误！");
        }
        if(condition==null){
            throw new IllegalArgumentException("查询条件参数传递错误!");
        }
        //采用PageHelper插件进行分页
        PageHelper.startPage(currentPage,pageSize,"studentNum DESC");
        List<StudentClassInfo> listInfo = studentBaseInfoCustomMapper.findStudentInfoListByCondition(condition);
        PageInfo<StudentClassInfo> pageInfo = new PageInfo<StudentClassInfo>(listInfo);
        return pageInfo;
    }

    @Override
    public List<StudentClassInfo> findStudentInfoByCondition(CommonQuery condition) throws Exception {
        if(condition==null){
            throw new IllegalArgumentException("查询条件参数传递错误!");
        }
        List<StudentClassInfo> listInfo = studentBaseInfoCustomMapper.findStudentInfoListByCondition(condition);
        return listInfo;
    }


    /**
     * 查询学生的名称和ID
     * @return
     * @throws Exception
     */
    @Override
    public List<Map<String, Object>> findStudentNameAndId() throws Exception {
        return studentBaseInfoCustomMapper.findStudentNameAndId();
    }

    @Override
    public boolean saveStudentInfoById(String classId, List<TStudentBaseInfo> detailInfoList) throws Exception {
        if(ValidateCheck.isNull(classId)){
            throw new IllegalArgumentException("班级编号不能为空!");
        }
        int total = detailInfoList.size();
        if(total <= 0){
            throw new IllegalArgumentException("明细集合参数传递错误!");
        }
        for (TStudentBaseInfo detailInfo:detailInfoList) {
            //设置通知书ID
            detailInfo.setClassid(classId);
            detailInfo.setStudentid(UUIDUtil.getUUID2());
        }
        int count = studentBaseInfoCustomMapper.saveStudentInfoList(detailInfoList);
        //修改是否上传参数
        //teacherinfoService.updateIsInputStatus(noticeId);
        return count == total;
    }

}
