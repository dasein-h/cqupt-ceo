const actions = {
    loginAction : (userId,password) => {
        return {
            type:"login",
            payload:{        
                userId:userId,
                password:password
            }
        }
    },
    getAllCompanies : (userId,page,rows) => {
        return {
            type:"getAllCompanies",
            payload:{        
                userId:userId,
                page:page,
                rows:rows
            }
        }
    },
    Login_Success : (message,data) => {
        return {
            type:"Login_Success",
            payload:{        
                message:message,
                data:data,
            }
        }
    },
    Login_Fail : () => {
        return {
            type:"Login_Fail",
        }
    },
}
export default actions