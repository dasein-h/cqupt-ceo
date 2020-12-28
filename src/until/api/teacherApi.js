import Service from "../Service";

/*展示所有老师已经选择过的班级*/
function selectedClassTeacher(teacherId, currentPage, pageSize1) {
  return Service.get('/teacher/exitclass', {
    params: {
      teacherId,
      currentPage,
      pageSize1
    }
  })
}

/*老师选择班级时展示的没有选择的班级，选择了的不会出现在这里面*/
function unSelectedClassTeacher(teacherId, currentPage) {
  return Service.get('/teacher/allclass', {
    params: {
      teacherId,
      currentPage
    }
  })
}


// 展示竞选ceo同学及投票数
function showCeo(currentPage,teachclass){
  return Service.post('/student/showCeoVote',{
      currentPage,
      teachclass
  })
}

// 展示所有学生信息
function showAll(teachclass,currentPage){
  return Service.post('/teacher/showall',{
      teachclass,currentPage
  })
}
/*开启ceo投票*/
function runCeo(teachclass) {
  return Service.post('/teacher/runceo', {
      teachclass
  })
}

/*关闭ceo投票*/
function closeCeo(teachclass) {
  return Service.post('/teacher/closeceo', {
      teachclass
  })
}

//判断是否开启投票
function isRunVote(teachclass){
  return Service.post('/teacher/checkceo',{
    teachclass
  })
}

/*老师展示ceo发起的公司改名字申请*/
function changeCompanyName(teacherId, currentPage, studentId) {
  return Service.get('/teacher/changeName', {
    params: {
      teacherId,
      currentPage,
      studentId
    }
  })
}

/*同意修改公司名*/
function agreeChange(teacherId, ceo, companyName) {
  return Service.get('/teacher/agree', {
    params: {teacherId, ceo, companyName}
  })
}

/*拒绝修改公司名*/
function rejectChange(teacherId, ceo) {
  return Service.get('/teacher/refuse', {
    params: {
      teacherId, ceo
    }
  })
}
/*删除公司*/
function deleteCompany(ceo) {
  return Service.post('/teacher/deletecompany', {
    ceo
  })
}

/*撤销ceo*/
function deleteCeo(studentId) {
  return Service.post('/teacher/deleteceo', {
    studentId
  })
}
/*选择ceo*/
function decideCeo(studentId) {
  return Service.post('/teacher/decideceo', {
    studentId
  })
}
/*给公司打分*/
function putScore(teacherId,scoreTeacher,companyName) {
  return Service.post('/teacher/companyscore', {
    teacherId,scoreTeacher,companyName
  })
}
/*老师修改宣讲状态*/
function voteStatus(flag, teacherId) {
  return Service.post('/teacher/speakvote', {
    flag, teacherId
  })
}
/*给学生打分*/
function setScore(teacherId, studentId, teacherScore) {
  return  Service.post('/teacher/setstuscore', {
    teacherId, studentId, teacherScore
  })
}

// 查看公司信息
function ShowComInfo(teachclass) {
  return Service.post('/student/showCompany', {
    teachclass
  })
}
// 导出
function exportExc(teachclass){
  return Service.post('/upload/export',{
    teachclass
  })
}
export{
  selectedClassTeacher,
  unSelectedClassTeacher,
  runCeo,
  closeCeo,
  changeCompanyName,
  agreeChange,
  rejectChange,
  deleteCompany,
  decideCeo,
  deleteCeo,
  putScore,
  voteStatus,
  setScore,
  showCeo,
  exportExc,
  ShowComInfo,
  isRunVote
}
