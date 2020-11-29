import Service from "../Service"
const LoginApi = {
    Login: (payload) => {
        return Service.get('/login/user', {
          params: {
            ...payload
          }
        })
    },
    KeepLogin: (payload) => {
        return Service.post('/login/keepLogin',{
            ...payload
        })
    },
    Exit : (payload) => {
        return Service.post('/login/quituser',{
            payload
        })
    },
}
  export default LoginApi