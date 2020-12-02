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
    console.log(action)
    const res = yield call(LoginApi.Login, action.payload)
    console.log(res)
    console.log(action)
    if (res.status === 200 && res.data.flag)
    // if (res.status === 200 )
    {      
      
      yield put(actions.Login_Success(res.message, res.data))

      // setLocalStorage({
      //   name: res.data.data.userName,
      //   userId: res.data.data.userId,
      //   type: action.chooseType
      // })
      console.log(action)
      if(action.studentId!==undefined){

        setLocalStorage({
          userId: action.studentId,
          type: "学生"
        })
      }
      else{
        setLocalStorage({
          userId: action.teacherId,
          type: "老师"
        })
      }
      console.log(localStorage.getItem("userId"))
    }
    else {
      yield put(actions.Login_Fail());
    }

  })
  yield takeEvery('Login_Check', function* () {
    console.log(localStorage.getItem("userId"))
    const action = yield select()
    console.log(action)
    const res = yield call(LoginApi.KeepLogin, localStorage.getItem("userId"))
    console.log(res)
    // if (res.status == 200 && res.data.flag)
    if (res.status == 200 && res.data.flag)
    //flag不对，向后端反映
     {
      yield put(actions.Login_Check_OK())
    }
    else {
      // console.log('clear localstorage')
      // yield put(actions.Login_Check_NO())
      // localStorage.clear()
      // //清除本地数据
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
      //不再登录后清除本地数据
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
