
const newstate = {
    TestValue:'测试中',
}
export default  (state = newstate,action)=>{
    switch(action.type) {
        case "getAllCompanies":
            return Object.assign({},state,action);
        case "login":
            return Object.assign({},state,action);
        case "Login_Success":
            return Object.assign({isLogin:true},state,action);
        case "Login_Fail":
            return Object.assign({isLogin:false},state,action);
        case "Login_Check_OK":
            return Object.assign({isLogin:true},state,action);
            case "Login_Check_NO":
            return Object.assign({isLogin:false},state,action);
        default:
            return Object.assign({},state,action);
    }
}