import Service from "../Service"
const StudentApi = {
    ShowAllCompany : (payload) => {
        return Service.post('/student/showCompany',{
            ...payload
        })
    },
    RunCeo : (payload) => {
        return Service.get('/student/runForCeo',{
            params:{
                ...payload
            }
        })
    },
    VoteCeo : (payload) => {
        return Service.get('/student/voteForCeo',{
            params:{
                ...payload
            }
        })
    },

    // ShowCeo : (payload) => {
    //     return Service.get('/application/addApplication',{
    //         params:{
    //             ...payload
    //         }
    //     })
    // },
    //后端的接口文档上面没有写地址，已经反映

    AddApplication : (payload) => {
        return Service.get('/application/addApplication',{
            params:{
                ...payload
            }
        })
    },
    ShowApplication : (payload) => {
            //CEO和学生均可以调用，返回不同的数据
        return Service.get('/application/showApplication',{
            params:{
                ...payload
            }
        })
    },

    VoteCompany : (payload) => {
        return Service.get('/student/voteForCompany',{
            params:{
                ...payload
            }
        })
    },
}
export default StudentApi