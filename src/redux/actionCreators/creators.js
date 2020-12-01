const actions = {
  loginAction: (userId, password, type) => {
    return {
      type: "login",
      chooseType: type,
      payload: {
        [type === '学生'? 'studentId': 'teacherId']: userId,
        password: password
      }
    }
  },
  Login_Success: (message, data) => {
    return {
      type: "Login_Success",
      payload: {
        message: message,
        data: data,
      }
    }
  },
  Login_Fail: () => {
    return {
      type: "Login_Fail",
    }
  },
  Login_Check: () => {
    return {
      type: "Login_Check",
      payload: {
        userId: localStorage.getItem("userId")
      }
    }
  },
  Login_Check_OK: () => {
    return {
      type: "Login_Check_OK",
    }
  },
  Login_Check_NO: () => {
    return {
      type: "Login_Check_NO",
    }
  },
  getAllCompanies: (userId, page) => {
    return {
      type: "getAllCompanies",
      payload: {
        studentId: userId,
        currentPage: page,
      }
    }
  },
  getAllCompanies_OK: (data) => {
    return {
      type: "getAllCompanies_OK",
      payload: {
        ...data
      }
    }
  },

  Exit: () => {
    return {
      type: "Exit",
      payload:{
        userId: localStorage.getItem("userId")
      }
    }
  },
  Exit_OK: () => {
    return {
      type: "Exit_OK",
    }
  },
  Exit_NO: () => {
    return {
      type: "Exit_NO",
    }
  },
  
}
export default actions