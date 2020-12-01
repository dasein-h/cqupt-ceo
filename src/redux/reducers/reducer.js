
const newstate = {
  TestValue: '测试中',
}
export default (state = newstate, action) => {
  switch (action.type) {
    case "getAllCompanies":
      return { ...state,   ...action}
    case "getAllCompanies_OK":
      return { ...state,   ...action}
    case "Login_Success":
      return { isLogin: true ,  ...action}
    case "Login_Fail":
      return { isLogin: false ,   ...action}
    case "Login_Check_OK":
      return { isLogin: true ,  ...action}
    case "Login_Check_NO":
      return { isLogin: false ,   ...action}
    case "Exit_OK":
      return { isLogin: false ,  ...action}
      
    default:
      return {  ...state, ...action}
  }
}
