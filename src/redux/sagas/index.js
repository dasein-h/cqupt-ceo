import { takeEvery, select, throttle, call, put } from 'redux-saga/effects'
import actions from '../actionCreators/creators'
import LoginApi from '../../until/api/LoginApi.js'
import StudentApi from '../../until/api/StudentApi'
function setLocalStorage(config) {
  Reflect.ownKeys(config).forEach(key => {
    localStorage.setItem(key, config[key])
  })
}

export default function* defSaga() {
  yield throttle(2000, 'login', function* () {

    const action = yield select();
    const res = yield call(LoginApi.Login, action)
    if (res.status === 200 && res.data.flag) {
      yield put(actions.Login_Success(res.message, res.data))
      
      setLocalStorage({
        name: res.data.data.userName,
        userId: res.data.data.userId,
        type: action.chooseType
      })
      
    }
    else {
      yield put(actions.Login_Fail());
    }

  })
  yield takeEvery('Login_Check', function* () {
    const action = yield select()

    const res = yield call(LoginApi.KeepLogin, action)
    if (res.status == 200 && res.data.flag) {
      yield put(actions.Login_Check_OK())
    }
    else {
      console.log('clear localstorage')
      yield put(actions.Login_Check_NO())
      localStorage.clear()
      //清除本地数据
    }
  })
  
  yield takeEvery('Exit', function* () {
    const action = yield select()
    const res = yield call(LoginApi.Exit, action.payload)
    if (res.status === 200 && res.data.flag) {
      console.log('clear localstorage')
      yield put(actions.Exit_OK())
      localStorage.clear()
      //不再登录后清除本地数据
    }
    else {
      alert('退出失败')
      yield put(actions.Exit_NO())
    }
  })

  yield takeEvery('getAllCompanies', function* () {
    const action = yield select()
    const res = yield call(StudentApi.ShowAllCompany, action.payload)
    if (res.status === 200 && res.data.flag) {
      yield put(actions.getAllCompanies_OK(res.data))
      //把获取到的数据发送到state，展示在页面上
    }

  })
}