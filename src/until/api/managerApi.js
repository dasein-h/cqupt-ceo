import Service from "../Service"
const ManagerApi = {
  // 展示所有的老师
    showTeacher: (currentPage) => {
    return Service.post('/admin/showteacher', {
      currentPage
    })
  }
}


export default ManagerApi;