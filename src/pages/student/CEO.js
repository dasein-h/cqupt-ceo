import React, { Component } from 'react';
import {HashRouter as Router, Switch, Route, Redirect,BrowserRouter} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import Campaign from './Campaign'
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
  <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']}>
    <Menu.Item key="1"><Link to="/index/Student/CEO/Campaign">参与竞选</Link></Menu.Item>
    <Menu.Item key="2"><Link to="/index/Student/CEO/Vote">提交志愿</Link></Menu.Item>
  </Menu>

            <div>
            <Route path="/index/Student/CEO/Campaign" component={Campaign}></Route>
            <Redirect to="/index/Student/CEO/Campaign" from='/Student/CEO' />
    <Route path="/index/Student/CEO/Vote" component={Vote}></Route>
            </div>
            </div>
         );
    }
}
withRouter(CEO);
export default CEO;