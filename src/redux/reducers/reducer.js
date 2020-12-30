const newstate = {
  payload:{
    data:{
      object:[]
    }
  }
}
export default (state = newstate, action) => {
  var data = {CompanyData:state.CompanyData,CeoData:state.CeoData,ApplicationData:state.ApplicationData,FileData:state.FileData,MemberData:state.MemberData}
  switch (action.type) {
    case "getAllCompanies":
      return { isLogin:state.isLogin, ...data,  ...action}
    case "getAllCompanies_OK":
      return { isgetAllCompanies:true, isLogin:state.isLogin,  ...data,CompanyData:action.payload.data,}
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
      return {isShowCeo:true, isLogin:state.isLogin,...data, CeoData:action.payload.data,}
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
      return {isLogin:state.isLogin,...data, ...action}
    case "RunCeo_OK":
      return {isRunCeo:true, isLogin:state.isLogin,...data,  ...action.payload}
    case "RunCeo_NO":
      return {isRunCeo:false, isLogin:state.isLogin,...data,  ...action.payload}
    case "ShowApplication":
      return {isLogin:state.isLogin,...data, ...action}
    case "ShowApplication_OK":
      return {isShowApplication:true, isLogin:state.isLogin,...data, ApplicationData:action.payload.data}
    case "ShowApplication_NO":
      return {isShowApplication:false, ...data,isLogin:state.isLogin, ...action.payload}
    case "AddApplication":
      return {isLogin:state.isLogin,...data,...action}
    case "AddApplication_OK":
      return {isAddApplication:true, isLogin:state.isLogin,...data, ...action.payload}
    case "AddApplication_NO":
      return {isAddApplication:false, isLogin:state.isLogin,...data, ...action.payload}
    case "ShowFile":
      return {isLogin:state.isLogin,...data, ...action}
    case "ShowFile_OK":
      return {isShowFile:true, isLogin:state.isLogin,...data, FileData:action.payload.data}
    case "ShowFile_NO":
      return {isShowFile:false, ...data,isLogin:state.isLogin, ...action.payload}
    case "UploadFile":
      return {isLogin:state.isLogin,...data,...action}
    case "UploadFile_OK":
      return {isUploadFile:true, isLogin:state.isLogin,...data, ...action.payload}
    case "UploadFile_NO":
      return {isUploadFile:false, isLogin:state.isLogin,...data, ...action.payload}
    case "DownloadFile":
      return {isLogin:state.isLogin,...data,...action}
    case "DownloadFile_OK":
      return {isDownloadFile:true, isLogin:state.isLogin,...data, ...action.payload}
    case "DownloadFile_NO":
      return {isDownloadFile:false, isLogin:state.isLogin,...data, ...action.payload}
    case "DeleteFile":
      return {isLogin:state.isLogin,...data,...action}
    case "DeleteFile_OK":
      return {isDeleteFile:true, isLogin:state.isLogin,...data, ...action.payload}
    case "DeleteFile_NO":
      return {isDeleteFile:false, isLogin:state.isLogin,...data, ...action.payload}
    case "ShowCompanyMember":
      return {isLogin:state.isLogin,...data, ...action}
    case "ShowCompanyMember_OK":
      return {isShowCompanyMember:true, isLogin:state.isLogin,...data, MemberData:action.payload.data}
    case "ShowCompanyMember_NO":
      return {isShowCompanyMember:false, ...data,isLogin:state.isLogin, ...action.payload}
    case "Exist" :
      return {...data,...action,isLogin:state.isLogin}
    case "SET_HAS_COMPANY":
      return {...state, hasCompany: action.payload}
    default:
      return {...action,isLogin:state.isLogin,...data,};
  }
}
