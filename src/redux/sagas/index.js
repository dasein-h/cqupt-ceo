import { takeEvery, select, throttle, call, put } from 'redux-saga/effects'
import actions from '../actionCreators/creators'
import LoginApi from '../../until/api/LoginApi.js'
function setLocalStorage(config) {
  Reflect.ownKeys(config).forEach(key => {
    localStorage.setItem(key, config[key])
  })
}

export default function* defSaga() {
  yield throttle(2000, 'login', function* () {
    const action = yield select();
    const res = yield call(LoginApi.Login, action)
    if (res.status === 200 && res.data.flag) {//还要再添加判断条件，已向后端反映问题
      yield put(actions.Login_Success(res.message, res.data))
      setLocalStorage({
        name: res.data.userName,
        userId: res.data.userId,
        type: action.chooseType
      })
    }
    else {
      yield put(actions.Login_Fail());
    }

  })
  yield takeEvery('Login_Check', function* () {
    const action = yield select()
    const res = yield call(LoginApi.KeepLogin, action.payload)
    if (res.status == 200 && res.data.flag) {
      yield put(actions.Login_Check_OK())
    }
    else {
      yield put(actions.Login_Check_NO())
      localStorage.clear()
      //清除本地数据
    }
  })
  yield takeEvery('Exit', function* () {
    const action = yield select()
    const res = yield call(LoginApi.Exit, action.payload)
    if (res.status === 200 && res.data.flag) {
      alert('退出成功')
      yield put(actions.Exit_OK())
      localStorage.clear()
      //不再登录后清除本地数据
    }
    else {
      alert('退出失败')
      yield put(actions.Exit_NO())
    }
  })
}