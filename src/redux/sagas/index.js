import {takeEvery, select, throttle, call, put, takeLatest} from 'redux-saga/effects'
import actions from '../actionCreators/creators'
import LoginApi from '../../until/api/LoginApi.js'
import StudentApi from '../../until/api/StudentApi'
import {getMember, setPosition} from "../../until/api/ceo";

function setLocalStorage(config) {
  Reflect.ownKeys(config).forEach(key => {
    localStorage.setItem(key, config[key])
  })
}

export default function* defSaga() {
  yield throttle(2000, 'login', function* () {

    const action = yield select();

    const res = yield call(LoginApi.Login, action.payload)
    console.log(res)

    if (res.status === 200 && res.data.flag)
    // if (res.status === 200 )
    {      
      
      yield put(actions.Login_Success(res.message, res.data))

      // setLocalStorage({
      //   name: res.data.data.userName,
      //   userId: res.data.data.userId,
      //   type: action.chooseType
      // })

      if(action.payload.studentId!==undefined){

        setLocalStorage({
          userId: action.payload.studentId,
          type: "学生"
        })
      }
      else{
        setLocalStorage({
          userId: action.payload.teacherId,
          type: "老师"
        })
      }
      setLocalStorage({
        userName:res.data.data.userName
      })
      if(localStorage.getItem("type")==="学生"){
        window.location="/Student/AllCompanies/ChosenClasses"
      }
      sessionStorage.clear()
      // yield put(actions.getAllCompanies(localStorage.getItem("userId")))
      // yield put(actions.ShowCeo(1,localStorage.getItem("userId")))
      // location.reload()
      // window.location="/Student/AllCompanies/ChosenClasses"
      
    }
    else {
      yield put(actions.Login_Fail(res.data));
    }

  })
  yield takeEvery('Login_Check', function* () {

    const action = yield select()

    const res = yield call(LoginApi.KeepLogin, localStorage.getItem("userId"))
    console.log(res)
    // if (res.status == 200 && res.data.flag)
    if (res.status == 200 && res.data.flag)
    //flag不对，向后端反映
     {
      yield put(actions.Login_Check_OK())
      // yield put(actions.getAllCompanies(localStorage.getItem("userId"),parseInt(sessionStorage.getItem("Page1"))||"1"))
    }
    else {
      yield put(actions.Login_Check_NO())

      console.log('clear localstorage')

      localStorage.clear()
      // //清除本地数据
      // yield put(actions.getAllCompanies(null,null))
    }
  })

  yield takeEvery('Exit', function* () {
    const action = yield select()
    const res = yield call(LoginApi.Exit, localStorage.getItem("userId"))
    // if (res.status === 200 && res.data.flag)
    if (res.status === 200)
    {
      console.log('clear localstorage')
      yield put(actions.Exit_OK())
      localStorage.clear()
      window.location="/Student/AllCompanies/ChosenClasses"
      sessionStorage.clear()
      // location.reload()
      //不再登录后清除本地数据
      // yield put(actions.getAllCompanies(null,null))
      // yield put(actions.ShowCeo(null,null))
    } else {
      alert('退出失败')
      yield put(actions.Exit_NO())
    }
  })

  yield takeEvery('getAllCompanies', function* () {
    const action = yield select()
    const res = yield call(StudentApi.ShowAllCompany, action.payload)
    console.log(res)
    if (res.status === 200 && res.data.flag) {
      yield put(actions.getAllCompanies_OK(res.data))
      //把获取到的数据发送到state，展示在页面上
    }
    else{
      yield put(actions.getAllCompanies_NO())
    }

  })
  yield takeEvery('VoteForCompany', function* () {
    const action = yield select()
    const res = yield call(StudentApi.VoteCompany, action.payload)
    console.log(res)
    if (res.status === 200 && res.data.flag) {
      yield put(actions.VoteForCompany_OK(res.data.message))
      yield put(actions.getAllCompanies(localStorage.getItem("userId"),parseInt(sessionStorage.getItem("Page1"))||"1"))
      //把获取到的数据发送到state，展示在页面上
    }
    else{
      yield put(actions.VoteForCompany_NO(res.data.message))
    }
  })
  yield takeEvery('ShowCeo', function* () {
    const action = yield select()
    const res = yield call(StudentApi.ShowCeo, action.payload)
    console.log(res)
    if (res.status === 200 && res.data.flag) {
      yield put(actions.ShowCeo_OK(res.data))
      //把获取到的数据发送到state，展示在页面上
    }
    else{
      yield put(actions.ShowCeo_NO())
    }
  })
  yield takeEvery('VoteForCeo', function* () {
    const action = yield select()
    const res = yield call(StudentApi.VoteCeo, action.payload)
    console.log(res)
    if (res.status === 200 && res.data.flag) {
      yield put(actions.VoteForCeo_OK(res.data.message))
      //把获取到的数据发送到state，展示在页面上
    }
    else{
      yield put(actions.VoteForCeo_NO(res.data.message))
    }
  })
  yield takeEvery('RunCeo', function* () {
    const action = yield select()
    const res = yield call(StudentApi.RunCeo, action.payload)
    console.log(res)
    if (res.status === 200 && res.data.flag) {
      yield put(actions.RunCeo_OK(res.data.message))
      //把获取到的数据发送到state，展示在页面上
    }
    else{
      yield put(actions.RunCeo_NO(res.data.message))
    }
  })
  yield takeEvery('ShowApplication', function* () {
    const action = yield select()
    const res = yield call(StudentApi.ShowApplication, action.payload)
    console.log(res)
    if (res.status === 200 && res.data.flag) {
      yield put(actions.ShowApplication_OK(res.data))
      //把获取到的数据发送到state，展示在页面上
    }
    else{
      yield put(actions.ShowApplication())
    }
  })
  /* CEO */
  // yield takeLatest('CEO_MEMBER', function* ceoSetMember(action) {
  //   action.cb && action.cb()
  //   const res = yield getMember(action.payload)
  //   action.cb && action.cb()
  //   yield put({
  //     type: 'CEO_SET_MEMBER',
  //     payload: {
  //       member: res.data
  //     }
  //   })
  // })
}
