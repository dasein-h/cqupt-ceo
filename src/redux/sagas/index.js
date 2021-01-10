import {takeEvery, select, throttle, call, put, takeLatest} from 'redux-saga/effects'
import actions from '../actionCreators/creators'
import LoginApi from '../../until/api/LoginApi.js'
import StudentApi from '../../until/api/StudentApi'
import {getMember, setPosition} from "../../until/api/ceo"
import baseurl from '../../until/BaseUrl'
import { message } from 'antd'


export default function* defSaga() {
  yield throttle(2000, 'login', function* () {
    const action = yield select();
    const res = yield call(LoginApi.Login, action.payload)
    if (res.status === 200 && res.data.flag)
    {        
      if(action.payload.studentId!==undefined){
          sessionStorage.setItem("userId",action.payload.studentId)
          sessionStorage.setItem("type",res.data.data.type)
      }
      else{
        sessionStorage.setItem("userId",action.payload.teacherId)
        sessionStorage.setItem("type",res.data.data.type)
      }
      sessionStorage.setItem("userName",res.data.data.userName)
      sessionStorage.setItem("ceo",res.data.error)
      sessionStorage.setItem("class", res.data.teachclass)
      sessionStorage.setItem("tk", res.data.token)
      if(sessionStorage.getItem("type")==="student" && sessionStorage.getItem("ceo") !== '1'){
        window.location.reload()
      }
      yield put(actions.Login_Success(res.data.message, res.data))
    } 
    else {
      yield put(actions.Login_Fail())
      if(res.data.message)
      message.error(res.data.message)
    }
  })
  yield takeEvery('Login_Check', function* () {
    if (sessionStorage.getItem("userId"))
     {
      yield put(actions.Login_Check_OK())
    }
    else {
      yield put(actions.Login_Check_NO())
      sessionStorage.clear()
    }
  })
  yield takeEvery('Exit', function* () {
    // const res = yield call(LoginApi.Exit, sessionStorage.getItem("userId"))
    // if (res.status === 200)
    // {
      yield put(actions.Exit_OK())
      sessionStorage.clear()
      window.location.reload()
    // } else {
    //   message.error('退出失败')
    //   yield put(actions.Exit_NO())
    // }
  })

  yield takeEvery('getAllCompanies', function* () {
    const action = yield select()
    const res = yield call(StudentApi.ShowAllCompany, action.payload)
    if (res.status === 200 && res.data.flag) {
      yield put(actions.getAllCompanies_OK(res.data))
    }
    else if (!res.data.flag && res.data.message === "没有登录，请先登录"){
      yield put(actions.Exit(sessionStorage.getItem("userId")))
    }
    else{
      yield put(actions.getAllCompanies_NO())
    }
  })
  yield takeEvery('VoteForCompany', function* () {
    const action = yield select()
    const res = yield call(StudentApi.VoteCompany, action.payload)
    if (res.status === 200 && res.data.flag) {
      yield put(actions.VoteForCompany_OK(res.data.message))
    }
    else if (!res.data.flag && res.data.message === "没有登录，请先登录"){
      yield put(actions.Exit(sessionStorage.getItem("userId")))
    }
    else{
      yield put(actions.VoteForCompany_NO(res.data.message))
    }
  })
  yield takeEvery('ShowCeo', function* () {
    const action = yield select()
    const res = yield call(StudentApi.ShowCeo, action.payload)
    if (res.status === 200 && res.data.flag) {
      yield put(actions.ShowCeo_OK(res.data))
    }
    else if (!res.data.flag && res.data.message === "没有登录，请先登录"){
      yield put(actions.Exit(sessionStorage.getItem("userId")))
    }
    else{
      yield put(actions.ShowCeo_NO())
    }
  })
  yield takeEvery('VoteForCeo', function* () {
    const action = yield select()
    const res = yield call(StudentApi.VoteCeo, action.payload)
    if (res.status === 200 && res.data.flag) {
      yield put(actions.VoteForCeo_OK(res.data.message))
    }
    else if (!res.data.flag && res.data.message === "没有登录，请先登录"){
      yield put(actions.Exit(sessionStorage.getItem("userId")))
    }
    else{
      yield put(actions.VoteForCeo_NO(res.data.message))
    }
  })
  yield takeEvery('RunCeo', function* () {
    const action = yield select()
    const res = yield call(StudentApi.RunCeo, action.payload)
    if (res.status === 200 && res.data.flag) {
      yield put(actions.RunCeo_OK(res.data.message))
    }
    else if (!res.data.flag && res.data.message === "没有登录，请先登录"){
      yield put(actions.Exit(sessionStorage.getItem("userId")))
    }
    else{
      yield put(actions.RunCeo_NO(res.data.message))
    }
  })
  yield takeEvery('ShowApplication', function* () {
    const action = yield select()
    const res = yield call(StudentApi.ShowApplication, action.payload)
    if (res.status === 200 && res.data.flag) {
      yield put(actions.ShowApplication_OK(res.data))
    }
    else if (!res.data.flag && res.data.message === "没有登录，请先登录"){
      yield put(actions.Exit(sessionStorage.getItem("userId")))
    }
    else{
      yield put(actions.ShowApplication_NO())
    }
  })
  yield takeEvery('AddApplication', function* () {
    const action = yield select()
    const res = yield call(StudentApi.AddApplication, action.payload)
    if (res.status === 200 && res.data.flag) {
      yield put(actions.AddApplication_OK(res.data.message))
      yield put(actions.ShowApplication(parseInt(sessionStorage.getItem("Page3"))||1,sessionStorage.getItem("userId")))
    }
    else if (!res.data.flag && res.data.message === "没有登录，请先登录"){
      yield put(actions.Exit(sessionStorage.getItem("userId")))
    }
    else{
      yield put(actions.AddApplication_NO(res.data.message))
    }
  })
  yield takeEvery('ShowFlie', function* () {
    const action = yield select()
    const res = yield call(StudentApi.ShowFile, action.payload)
    if (res.status === 200 ) {
      yield put(actions.ShowFile_OK(JSON.parse(res.data)))
    }
    else if (!res.data.flag && res.data.message === "没有登录，请先登录"){
      yield put(actions.Exit(sessionStorage.getItem("userId")))
    }
    else{
      yield put(actions.ShowFile_NO())
    }
  })
  yield takeEvery('DownloadFile', function* () {
    const action = yield select()
    const res = yield call(StudentApi.DownloadFile,action.payload)
    if (res.status === 200 ) {
      yield put(actions.DownloadFile_OK(res.data.message))
      let download = document.createElement('a')
      download.href = baseurl+"/upload/download?id="+action.payload.id
      download.click()
    }
    else if (!res.data.flag && res.data.message === "没有登录，请先登录"){
      yield put(actions.Exit(sessionStorage.getItem("userId")))
    }
    else{
      yield put(actions.DownloadFile_NO(res.data.message))
    }
  })
  yield takeEvery('DeleteFile', function* () {
    const action = yield select()
    const res = yield call(StudentApi.DeleteFile,action.payload)
    if (res.status === 200 && res.data.flag) {
      yield put(actions.DeleteFile_OK(res.data.message))
      // yield put(actions.ShowFile(sessionStorage.getItem("class"),parseInt(sessionStorage.getItem("Page4"))||1))
    }
    else if (!res.data.flag && res.data.message === "没有登录，请先登录"){
      yield put(actions.Exit(sessionStorage.getItem("userId")))
    }
    else{
      yield put(actions.DeleteFile_NO(res.data.message))
    }
  })
  yield takeEvery('ShowCompanyMember', function* () {
    const action = yield select()
    const res = yield call(StudentApi.ShowCompanyMember,action.payload)
    if (res.status === 200 && res.data.flag) {
      yield put(actions.ShowCompanyMember_OK(res.data))
    }
    else if (!res.data.flag && res.data.message === "没有登录，请先登录"){
      yield put(actions.Exit(sessionStorage.getItem("userId")))
    }
    else{
      yield put(actions.ShowCompanyMember_NO())
    }
  })
  yield takeEvery('RunScore', function* () {
    const action = yield select()
    const res = yield call(StudentApi.RunScore,action.payload)
    if (res.status === 200 && res.data.flag) {
      yield put(actions.RunScore_OK(res.data.message))
    }
    else if (!res.data.flag && res.data.message === "没有登录，请先登录"){
      yield put(actions.Exit(sessionStorage.getItem("userId")))
    }
    else{
      yield put(actions.RunScore_NO(res.data.message))
    }
  })
  yield takeEvery('ShowNumber', function* () {
    const action = yield select()
    const res = yield call(StudentApi.ShowNumber,action.payload)
    if (res.status === 200 && res.data.flag) {
      yield put(actions.ShowNumber_OK(res.data))
    }
    else if (!res.data.flag && res.data.message === "没有登录，请先登录"){
      yield put(actions.Exit(sessionStorage.getItem("userId")))
    }
    else{
      yield put(actions.ShowNumber_NO())
    }
  })
  yield takeEvery('ShowScore', function* () {
    const action = yield select()
    const res = yield call(StudentApi.ShowScore,action.payload)
    // if (res.status === 200 && res.data.flag) {
    if (res.status === 200 ) {
      yield put(actions.ShowScore_OK(res.data))
    }
    else if (!res.data.flag && res.data.message === "没有登录，请先登录"){
      yield put(actions.Exit(sessionStorage.getItem("userId")))
    }
    else{
      yield put(actions.ShowScore_NO())
    }
  })
  yield takeEvery('ShowCompany', function* () {
    const action = yield select()
    const res = yield call(StudentApi.ShowCompany,action.payload)
    if (res.status === 200 && res.data.flag) {
      yield put(actions.ShowCompany_OK(res.data))
    }
    else if (!res.data.flag && res.data.message === "没有登录，请先登录"){
      yield put(actions.Exit(sessionStorage.getItem("userId")))
    }
    else{
      yield put(actions.ShowCompany_NO())
    }
  })
  yield takeEvery('CancelVoteCeo', function* () {
    const action = yield select()
    const res = yield call(StudentApi.CancelVoteCeo,action.payload)
    if (res.status === 200 && res.data.flag) {
      yield put(actions.CancelVoteCeo_OK(res.data.message))
    }
    else if (!res.data.flag && res.data.message === "没有登录，请先登录"){
      yield put(actions.Exit(sessionStorage.getItem("userId")))
    }
    else{
      yield put(actions.CancelVoteCeo_NO(res.data.message))
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
