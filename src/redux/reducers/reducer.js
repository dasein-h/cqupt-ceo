
const newstate = {
    TestValue:'测试中',
}
export default  (state = newstate,action)=>{
    switch(action.type) {
        case "getAllCompanies":
            return Object.assign({},state,action.payload);
        case "login":
            return Object.assign({},state,action.payload);
        case "Login_Success":
            return Object.assign({isLogin:true},state,action.payload);
        case "Login_Fail":
            return {isLogin:false};
        default:
            return Object.assign({},state,action.payload);
    }
}