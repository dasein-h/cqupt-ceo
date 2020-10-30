import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import WriteWant from './WriteWant';
import Detail from './Detail';
import Participants from './Participants';
import {HashRouter as Router, Route,Link,Redirect} from 'react-router-dom';
import {  Menu } from 'antd';

class MyCompany extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>

                <div className="logo" />
      <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1"><Link to="/MyCompany/WriteWant">填写志愿</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/MyCompany/Detail">公司信息</Link></Menu.Item>
        <Menu.Item key="3"><Link to="/MyCompany/Participants">申请成员</Link></Menu.Item>
      </Menu>

                <div>
                <Route path="/MyCompany/WriteWant" component={WriteWant}></Route>
                <Redirect to="/MyCompany/WriteWant" from='/MyCompany' />
        <Route path="/MyCompany/Detail" component={Detail}></Route>
        <Route path="/MyCompany/Participants" component={Participants}></Route>
                </div>
                </div>
         );
    }
}

export default withRouter(MyCompany);