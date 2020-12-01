
const newstate = {
  TestValue: '测试中',
}
export default (state = newstate, action) => {
  switch (action.type) {
    case "getAllCompanies":
      return { ...action.payload};

    case "Login_Success":
      return { isLogin: true ,  ...action.payload.data};
    case "Login_Fail":
      return { isLogin: false ,  ...action.payload};
    case "Login_Check_OK":
      return { isLogin: true ,  ...action.payload};
    case "Login_Check_NO":
      return { isLogin: false ,  ...action.payload};
    case "Exit_OK":
      return { isLogin: false ,  ...action.payload}
      
    default:
      return {  ...action.payload};
  }
}
