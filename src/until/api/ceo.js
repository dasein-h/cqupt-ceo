import Service from "../Service";

async function getMember(ceoId) {
  let res = await Service.get('/student/showCompanyMember', {
    params: {
      ceoId
    }
  })
  res = res.data
  return res
}

async function setPosition(ceoId, studentId, position) {
  let res
  res = await Service.get('/student/setPosition', {
    params: {
      ceoId,
      studentId,
      position
    }
  })
  res = res.data
  return res
}

async function showApplication(currentPage, studentId) {
  let res = await Service.get('/application/showApplication', {
    params: {
      currentPage,
      studentId
    }
  })
  res = res.data
  return res
}

export {
  getMember,
  setPosition
}
