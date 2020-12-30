import Service from "../Service"
const LoginApi = {
  Login: (payload) => {
    return Service.post('/login/user', {
        ...payload
    })
  },
  KeepLogin: (payload) => {
    return Service.post('/login/keepLogin', {
      userId:payload
    })
  },
  Exit: () => {
    return Service.post('/login/quituser')
  },
}
export default LoginApi