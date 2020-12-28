import React from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import Application from "./views/application";
import Company from "./views/company";
import Router from "./components/Router";
import WelcomeTitle from "./components/WelcomeTitle";
import NavMenu from './components/NavMenu'

import {Layout} from "antd";
import {setUserId} from "./store";

const {Sider, Content} = Layout

const routes = [
  {
    path: '/CEO/application',
    name: '申请/文件',
    component: Application
  }, {
    path: '/CEO/company',
    name: '公司',
    component: Company
  }
]

function CEO(props) {
  const {dispatch} = props

  let userId = localStorage.getItem('userId')
  let userName = localStorage.getItem('userName')
  let ceo = localStorage.getItem('ceo')
  if (!ceo && ceo !== '1') {
    // props.history.replace('/')
  }
  dispatch(setUserId(userId))

  return (
    <Layout
      style={{
        height: '100vh'
      }}
    >
      <Sider
        theme="light"
        style={{
          height: '100vh',
          position: 'sticky',
          top: 0,
          left: 0
        }}
        width={300}
      >
        <WelcomeTitle userName={userName} userId={userId}/>
        <NavMenu routes={routes}/>
      </Sider>
      <Content>
        <Router routes={routes} userId={userId}/>
      </Content>
    </Layout>
  )
}

export default connect(null, dispatch => ({
  dispatch
}))(withRouter(CEO));
