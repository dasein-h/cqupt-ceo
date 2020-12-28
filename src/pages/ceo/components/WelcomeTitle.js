import React from 'react'
import {withRouter} from 'react-router-dom'
import {message, Button} from 'antd'
import LoginApi from '../../../until/api/LoginApi'

const WelcomeTitle = props => {
  let {userName, userId} = props
  if (!userName) {
    userName = localStorage.getItem('userName')
    if (!userName) {
      props.history.replace('/')
    }
  }

  const exit = async () => {
    const res = await LoginApi.Exit(userId)
    message.info(res.data.message)
    if (res.data.flag) {
      localStorage.clear()
      window.location.replace('/')
    }
  }

  return (
      <div
        style={{
          color: '#1890ff',
          padding: '15px',
        }}
      >
        <div style={{fontSize: '17px'}}>CEO  {userName}</div>
        <Button onClick={exit} type="primary" style={{
          fontSize: '12px',
          margin: '10px 0'
        }}>退出登陆</Button>
      </div>
  )
}
export default (withRouter(WelcomeTitle))
