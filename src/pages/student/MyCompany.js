import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import WriteWant from './WriteWant';
import Detail from './Detail';
import Participants from './Participants';
import {HashRouter as Router, Route,Link,Redirect} from 'react-router-dom';
import {  Menu } from 'antd';
import changeNav from '../../until/changeNav'
class MyCompany extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="test_all">

                <div className="logo" />
      <Menu theme="light" mode="horizontal" defaultSelectedKeys={[sessionStorage.getItem("count2")||'1']}>
        <Menu.Item key="1"><Link to="/Student/MyCompany/WriteWant" onClick={changeNav.bind(this,2,1)} >成员互评</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/Student/MyCompany/Detail" onClick={changeNav.bind(this,2,2)}>宣讲投票</Link></Menu.Item>
      </Menu>

                <div>
                <Route path="/Student/MyCompany/WriteWant" component={WriteWant}></Route>
        <Route path="/Student/MyCompany/Detail" component={Detail}></Route>
        <Route path="/Student/MyCompany/Participants" component={Participants}></Route>
                </div>
                </div>
         );
    }
}

export default withRouter(MyCompany);