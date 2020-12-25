import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../static/style/style.sass'
import { withRouter } from 'react-router-dom'
import AllCompanies from './AllCompanies';
import Join from './Join';
import MyCompany from './MyCompany';
import {HashRouter as Router, Route,} from 'react-router-dom';
import store from '../../redux/store'
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;


class Student extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        console.log(store.getState())
    }
    render() { 
        return ( 
            <Layout>
    <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}
      theme="light"
      width="300"
    >
      <div className="logo" />
      <Menu theme="light" mode="inline" defaultSelectedKeys={['4']}>
        <Menu.Item key="1" icon={<UserOutlined />}>
         <Link to="/AllCompanies">所有公司信息</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
        <Link to="/Join">加入公司</Link> 
        </Menu.Item>
        <Menu.Item key="3" icon={<UploadOutlined />}>
        <Link to="/MyCompany/WriteWant">我的公司</Link> 
        </Menu.Item>

      </Menu>
    </Sider>
    <Layout className="site-layout" 
            style={{ 
                marginLeft: 300,
     }}>
      <Header className="site-layout-background" style={{ padding: 0 }} />
      <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
        <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' ,borderRadius:10}}>
          <Route path="/AllCompanies" component={AllCompanies}/>
          <Route path="/Join" component={Join}/>
          <Route path="/MyCompany" component={MyCompany}/>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  </Layout>
         );
    }
}
 
export default withRouter(Student);
