import Service from "../Service"
const ManagerApi = {
  // 展示所有的老师
    showTeacher: (currentPage) => {
    return Service.post('/admin/showteacher', {
      currentPage
    })
  },
  /*批量删除班级*/
    deleteClass: (list) => {
      const queryData = {
        list
      }
    return Service.post('/admin/deleteclass', queryData)
  },

  // 批量选择班级
    addClass: (list) => {
      const queryData = {
        list
      }
      return Service.post('/admin/addclass', queryData)
    },
    //查询老师名字
    searchTeacher: (studentId,currentPage) => {
      return Service.post('/teacher/searchTeacher', {
        studentId,
        currentPage
    })
    }
}



export default ManagerApi;