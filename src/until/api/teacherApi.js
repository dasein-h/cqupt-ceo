import Service from "../Service";

/*展示所有老师已经选择过的班级*/
function selectedClassTeacher(teacherId, currentPage) {
  return Service.get('/teacher/exitclass', {
    params: {
      teacherId,
      currentPage
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

/*
老师批量选择的班级
可以传集合，类似于这种格式
{
    "list": [
        {
            "teacherId":"1",
            "cls":"0311203"
        },
        {
            "teacherId":"1",
            "cls":"0311201"
        }
    ]
}
* */
function addClass(list) {
  /*teacherId为集合
  * [
        {
            "teacherId":"1",
            "cls":"0311203"
        },
        {
            "teacherId":"1",
            "cls":"0311201"
        }
    ]
  * */
  const queryData = {
    list
  }
  return Service.post('/teacher/addclass', queryData)
}

/*老师批量删除班级*/
function deleteClass(teacherId, cls) {
  return Service.get('/teacher/deleteclass', {
    params: {
      teacherId,
      cls
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
  return Service.get('/teacher/runceo', {
    params: {
      teachclass
    }
  })
}

/*关闭ceo投票*/
function closeCeo(teachclass) {
  return Service.get('/teacher/closeceo', {
    params: {
      teachclass
    }
  })
}

/*老师展示ceo发起的公司改名字申请*/
function changeCompanyName(teachclass, currentPage, studentId) {
  return Service.get('/teacher/changeName', {
    params: {
      teachclass,
      currentPage,
      studentId
    }
  })
}

/*同意修改公司名*/
function agreeChange(ceo) {
  return Service.get('/teacher/agree', {
    params: {ceo}
  })
}

/*拒绝修改公司名*/
function rejectChange(ceo) {
  return Service.get('/teacher/refuse', {
    params: {
      ceo
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
    "teachclass": teachclass
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
  addClass,
  deleteClass,
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
  ShowComInfo,
  showAll,
  exportExc
}
