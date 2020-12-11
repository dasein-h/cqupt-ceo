import Service from "../Service"
const ManagerApi = {
    showTeacher: (currentPage) => {
    return Service.post('/admin/showteacher', {
      currentPage
    })
  },
  upLoadStu:(file)=> { 
    return Service.post('/admin/stufile', {
      processData: false,
      file
    })
  },
  upLoadClass:(file)=> { 
    return Service.post('/admin/teafile', {
      processData: false,
      file
    })
  }
}





export default ManagerApi
