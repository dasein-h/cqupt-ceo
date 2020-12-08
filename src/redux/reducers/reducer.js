const newstate = {
  payload:{
    data:{
      object:[]
    }
  }
}
export default (state = newstate, action) => {
  var data = {CompanyData:state.CompanyData,CeoData:state.CeoData,ApplicationData:state.ApplicationData}
  switch (action.type) {
    case "getAllCompanies":
      return { isLogin:state.isLogin, ...data,  ...action}
    case "getAllCompanies_OK":
      return { isgetAllCompanies:true, isLogin:state.isLogin,  CompanyData:action.payload.data,CeoData:state.CeoData,ApplicationData:state.ApplicationData,}
    case "login":
      return {   isLogin:state.isLogin,  ...action}
    case "Login_Success":
      return {isLogin: true, ...action.payload.data, };
    case "Login_Fail":
      return {isLogin: false, ...action.payload, };
    case "Login_Check_OK":
      return {isLogin: true, ...data,...action.payload, };
    case "Login_Check_NO":
      return {isLogin: false, ...action.payload, };
    case "Exit_OK":
      return {isLogin: false, ...action.payload, }
    case "VoteForCompany":
      return {isLogin:state.isLogin,...data, ...action}
    case "VoteForCompany_OK":
      return {isVoteForCompany:true,...data, isLogin:state.isLogin, ...action.payload}
    case "VoteForCompany_NO":
      return {isVoteForCompany:false, ...data,isLogin:state.isLogin, ...action.payload}
    case "ShowCeo_OK":
      return {isShowCeo:true, isLogin:state.isLogin, CeoData:action.payload.data,CompanyData:state.CompanyData,ApplicationData:state.ApplicationData}
    case "ShowCeo_NO":
      return {isShowCeo:false,...data, isLogin:state.isLogin, ...action.payload}
    /* CEO */
    case "VoteForCeo":
      return {isLogin:state.isLogin,...data, ...action}
    case "VoteForCeo_OK":
      return {isVoteForCeo:true, isLogin:state.isLogin,...data,  ...action.payload}
    case "VoteForCeo_NO":
      return {isVoteForCeo:false, isLogin:state.isLogin, ...data, ...action.payload}
    case "RunCeo":
      return {isLogin:state.isLogin,...data, ...action.payload}
    case "RunCeo_OK":
      return {isRunCeo:true, isLogin:state.isLogin,...data,  ...action.payload}
    case "RunCeo_NO":
      return {isRunCeo:false, isLogin:state.isLogin,...data,  ...action.payload}
    case "ShowApplication":
      return {isLogin:state.isLogin,...data, ...action}
    case "ShowApplication_OK":
      return {isShowApplication:true, isLogin:state.isLogin, ApplicationData:action.payload.data,CompanyData:state.CompanyData,CeoData:state.CeoData}
    case "ShowApplication_NO":
      return {isShowApplication:false, ...data,isLogin:state.isLogin, ...action.payload}
    case "AddApplication":
      return {isLogin:state.isLogin,...data,...action}
    case "AddApplication_OK":
      return {isAddApplication:true, isLogin:state.isLogin,...data, ...action.payload}
    case "AddApplication_NO":
      return {isAddApplication:false, isLogin:state.isLogin,...data, ...action.payload}
    case "Exist" :
      return {...data,...action,isLogin:state.isLogin}
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
      return {...action,isLogin:state.isLogin,...data,};
  }
}
