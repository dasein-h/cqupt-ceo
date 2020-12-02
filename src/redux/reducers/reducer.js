const newstate = {
  TestValue: '测试中',
}
export default (state = newstate, action) => {
  switch (action.type) {
    case "getAllCompanies":
      return {...action.payload, ...state};

    case "Login_Success":
      return {isLogin: true, ...action.payload.data, ...state};
    case "Login_Fail":
      return {isLogin: false, ...action.payload, ...state};
    case "Login_Check_OK":
      return {isLogin: true, ...action.payload, ...state};
    case "Login_Check_NO":
      return {isLogin: false, ...action.payload, ...state};
    case "Exit_OK":
      return {isLogin: false, ...action.payload, ...state}


    /* CEO */
    case "CEO_SET_MEMBER":
      return {
        ...state,
        // member: action.payload.member
        member: [
          {
            "id": 1,
            "ceoId": 0,
            "studentId": "1",
            "companyName": "qwqw",
            "position": "副总裁",
            "teacherId": "tiansh"
          },
          {
            "id": 2,
            "ceoId": 0,
            "studentId": "2",
            "companyName": "hhhh",
            "position": "副总裁",
            "teacherId": "tiansh"
          },
          {
            "id": 3,
            "ceoId": 0,
            "studentId": "2010211506",
            "companyName": "hhhh",
            "position": "ceo",
            "teacherId": "tiansh"
          },
          {
            "id": 4,
            "ceoId": 0,
            "studentId": "3",
            "companyName": "hhhh",
            "position": null,
            "teacherId": "tiansh"
          }
          ,
        ]
      }
    default:
      return {...action.payload};
  }
}
