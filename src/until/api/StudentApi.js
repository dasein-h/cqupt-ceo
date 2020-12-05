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
        return Service.post('/student/voteForCeo',{
                ...payload
        })
    },

    ShowCeo : (payload) => {    
        return Service.post('/student/showCeoVote',{
                ...payload
        })
    },

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
        return Service.post('/student/voteForCompany',{
                ...payload
        })
    },
}
export default StudentApi