import React, { Component } from 'react';
import {HashRouter as Router, Switch, Route, Redirect,BrowserRouter} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import Campaign from './Campaign'
import changeNav from '../../until/changeNav'
import Vote from './Vote'
import {
    UserOutlined,
    UploadOutlined,
    VideoCameraOutlined,
    LockOutlined
  } from '@ant-design/icons';
import { 
    Layout, 
    Menu,
    Button,
    Modal,
    Input,  } from 'antd';
class CEO extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="test_all">
 
            <div className="logo" />
  <Menu theme="light" mode="horizontal" defaultSelectedKeys={[sessionStorage.getItem("count3")||'1']}>
    <Menu.Item key="1"><Link to="/Student/CEO/Campaign" onClick={changeNav.bind(this,3,1)}>参与竞选</Link></Menu.Item>
    <Menu.Item key="2"><Link to="/Student/CEO/Vote" onClick={changeNav.bind(this,3,2)}>提交志愿</Link></Menu.Item>
  </Menu>

            <div>
            <Route path="/Student/CEO/Campaign" component={Campaign}></Route>
    <Route path="/Student/CEO/Vote" component={Vote}></Route>
            </div>
            </div>
         );
    }
}
withRouter(CEO);
export default CEO;