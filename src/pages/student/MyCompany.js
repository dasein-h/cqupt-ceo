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
            <div className="test_all">

                <div className="logo" />
      <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1"><Link to="/index/Student/MyCompany/WriteWant">成员互评</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/index/Student/MyCompany/Detail">宣讲投票</Link></Menu.Item>
      </Menu>

                <div>
                <Route path="/index/Student/MyCompany/WriteWant" component={WriteWant}></Route>
                <Redirect to="/index/Student/MyCompany/WriteWant" from='/index/MyCompany' />
        <Route path="/index/Student/MyCompany/Detail" component={Detail}></Route>
        <Route path="/index/Student/MyCompany/Participants" component={Participants}></Route>
                </div>
                </div>
         );
    }
}

export default withRouter(MyCompany);