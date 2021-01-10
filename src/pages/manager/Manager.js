import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
import ChoseClass from './view/ChoseClass'
import ImData from './view/ImData'
import './style/Nav.css';
import {  Menu,Button,message,notification,Layout,Modal } from 'antd';
import LoginApi from '../../until/api/LoginApi'
import { UserOutlined, VideoCameraOutlined, EditOutlined, OrderedListOutlined,ExclamationCircleOutlined } from '@ant-design/icons';
import changeNav from '../../until/changeNav' ;
import '../../static/style/style.scss';

const { Header, Content, Footer, Sider } = Layout;


class Manager extends Component { 
    constructor(props) {
        super(props);
        
        this.state = {
            username: '',
            userid:''
          }
          this.handleExit = this.handleExit.bind(this);
          this.handleClick = this.handleClick.bind(this);
          this.confirm = this.confirm.bind(this);
    }
    render() {
        return (
            <Router>
                <div id="All">
                    <div className="nav-div">
                        <Menu theme="light" mode="inline" defaultSelectedKeys={[sessionStorage.getItem("count1")||"1"]}>
                            <Menu.Item key="1" icon={<UserOutlined />}>
                                <Link to="/Manager/ChoseClass" onClick={changeNav.bind(this,1,1)}>选择班级</Link>
                            </Menu.Item>
                            <Menu.Item key="2" icon={<EditOutlined />}>
                                <Link to="/Manager/data" onClick={this.handleClick}>导入数据</Link> 
                            </Menu.Item>
                        
                        </Menu>
                        
                    </div>

                    <div className="teachcontent">
                        <Layout>
                            <Header className="site-layout-background" style={{ padding: 0 }}>
                                <span style={{marginLeft:"10px"}}>仿真辅助系统</span>
                                <a href="http://172.22.4.2" rel="noopener noreferrer" target="_blank" style={{marginLeft:20}}>实验室</a>
                                <span style={{float:"right"}}>
                                    <span style={{marginRight:"10px"}}>欢迎你，{sessionStorage.getItem("userName")}</span>
                                    <Button className="exit" type="primary" onClick ={this.confirm.bind(this,this)}>退出登陆</Button>
                                    </span>
                                                
                            </Header>
                            <Content  style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                                <div className="site-layout-background" style={{ padding: 24, borderRadius: 10 }}>

                                <Switch>
                                    <Route path="/Manager/ChoseClass">
                                        <ChoseClass/>
                                    </Route>
                                                    
                                    <Route path="/Manager/data">
                                        <ImData/>                
                                    </Route>
                                        <Redirect from="/Manager" to="/Manager/ChoseClass" />
                                </Switch>                                            
                                </div>                
                            </Content>
                        <Footer style={{ textAlign: 'center' }}>版权所有 极客工作室</Footer>
                        </Layout>                                                                                                                              
                    </div>
                </div>
            </Router>

        )
    }
    componentDidMount(){
        let userId = sessionStorage.getItem("userId");
        let userName = sessionStorage.getItem('userName')
        this.setState({
            userid: userId,
            username:userName
        })
        // if(sessionStorage.hasOwnProperty("userId") && sessionStorage.getItem("type")==="teacher") {
        //     this.props.history.push('/teacher');
        // }
        // else if(!sessionStorage.hasOwnProperty("userId")){
        //     message.info("请先登录",1);
        //     this.props.history.push('/Student/AllCompanies/ChosenClasses');
        // }
    }
    handleExit = () => {
                    message.success("退出成功",1);
                    sessionStorage.clear();
                    this.props.history.push('/Student/AllCompanies/ChosenClasses');
    }
    confirm = (that) => {
    Modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '确定要退出？',
      onOk: () => {
        that.handleExit(this)
      },
      okText: '确认',
      cancelText: '取消',
    })
  }
    handleClick = () => {
        changeNav.bind(this,1,2)
        sessionStorage.removeItem("count");
    }
}

export default Manager