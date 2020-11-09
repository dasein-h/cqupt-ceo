import React, { Component,Fragment } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import '../../static/style/style.sass'
import AllCompanies from './AllCompanies';
import Join from './Join';
import MyCompany from './MyCompany';
import {HashRouter as Router, Route,Redirect} from 'react-router-dom';
import store from '../../redux/store'
import {connect} from 'react-redux'
import { 
  Layout, 
  Menu,
  Button,
  Modal,
  Input,
  Radio,
  message,
  Popover,  } from 'antd';
import actions from '../../redux/actionCreators/creators'

import {
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  EditOutlined,
  OrderedListOutlined,

} from '@ant-design/icons';
import CEO from './CEO';


const { Header, Content, Footer, Sider } = Layout;
const options = [
  { label: '老师', value: '老师' },
  { label: '学生', value: '学生' },
  { label: '管理员', value: '管理员' },
];
const content = (
  <div>
    <p>请补全账号和密码</p>
  </div>
);
class Student extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          visible: false,
          userId:'',
          password:'',
          chooseType:'老师',
          checkVisible:false,
         }

        this.loginClick = this.loginClick.bind(this)
        this.userIdchange = this.userIdchange.bind(this)
        this.passwordchange = this.passwordchange.bind(this)
    }
    showModal = () => {
      this.setState({
        visible: true,
      });
    };
    handleOk = e => {

      this.setState({
        visible: false,
      });
    };
    handleCancel = e => {
      this.setState({
        visible: false,
      });
    };
    hide = () => {
      this.setState({
        loginVisible: false,
      });
    };
  
    handleVisibleChange = loginVisible=> {
      this.setState({ loginVisible });
    };
    
    loginClick = ()=>{
      if(this.state.userId!==""&&this.state.password!==""){
      this.props.login(this.state.userId,this.state.password)
      console.log(store.getState())
      // window.location="/index/CEO"
      }
      else{
        this.state.checkVisible=true
      }
    }
    onChange3 = e => {
      console.log('radio3 checked', e.target.value);
      this.setState({
        chooseType: e.target.value,
      });
    };

    userIdchange(e){
      const value= e.target.value
      this.setState({
        userId:value,
      })
    }
    passwordchange(e){
      const value = e.target.value
      this.setState({
        password:value,
      })
    }
    componentWillUpdate(newProps){
      if(newProps !== this.props){
        if(this.props.isLogin==true){
          if(this.props.message==="学生登录"){
            window.location="/index/Student"
          }
          if(this.props.message==="CEO登录"){
            window.location="/index/CEO"
          }
        }
      }
    }
    render() { 
      if(this.props.isLogin===false||this.props.isLogin===undefined){
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
    <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
      <Menu.Item key="1" icon={<UserOutlined />}>
      <Link to="/index/Student/AllCompanies/ChosenClasses" onClick={this.getAllCompanies}>申请公司</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<VideoCameraOutlined />}>
      <Link to="/index/Student/Join">提交日志</Link> 
      </Menu.Item>
      <Menu.Item key="3" icon={<EditOutlined />}>
      <Link to="/index/Student/MyCompany/WriteWant">评分</Link> 
      </Menu.Item>
      <Menu.Item key="4" icon={<OrderedListOutlined />}>
      <Link to="/index/Student/CEO/Campaign">CEO</Link> 
      </Menu.Item>

    </Menu>
  </Sider>
  <Layout className="site-layout" 
          style={{ 
              marginLeft: 300,
   }}>
    <Header className="site-layout-background" style={{ padding: 0 }}>
    <Button className="login" type="primary" onClick={this.showModal}>登录</Button>
    <Modal
        title="登录"
        visible={this.state.visible}
        onOk={this.handleOk}
        okText="登录"
        onCancel={this.handleCancel}
        footer={
          <Popover
          content={<a onClick={this.hide}>确定</a>}
          title="账号和密码不能为空"
          trigger="click"
          visible={this.state.loginVisible}
          onVisibleChange={this.handleVisibleChange}
          disabled={true}
        >
        <Button  
          type="primary" 
          onClick={this.loginClick}
          >登录</Button>
          </Popover>
          }
      >
        <div className="login_input">
          <div>
      用户名：
      <Input 
      placeholder="学生用户名为学号" 
      onChange={this.userIdchange}
      value={this.state.userId}
      />
      </div>            
      <div>
       密码：  
       <Input.Password 
       className="Input_password" 
       placeholder="初始密码为：123" 
       value={this.state.password}
       onChange={this.passwordchange}
       />
      </div>
      <Radio.Group
          options={options}
          onChange={this.onChange3}
          value={this.state.chooseType}
          optionType="button"
        />
        <br />
        <br />
      <Button>
        忘记密码
      </Button>
      </div>
      </Modal>
      </Header>
    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
    <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' ,borderRadius:10}}>
        <Route path="/index/Student/AllCompanies" component={AllCompanies}/>
        <Redirect to="/index/Student/AllCompanies/ChosenClasses" from='/index/Student/AllCompanies'/>
        <Route path="/index/Student/Join" component={Join}/>
        <Route path="/index/Student/MyCompany" component={MyCompany}/>
        <Route path="/index/Student/CEO" component={CEO}/>
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
</Layout>
       );
      }
      else{
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
    <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
      <Menu.Item key="1" icon={<UserOutlined />}>
       <Link to="/index/Student/AllCompanies/ChosenClasses" onClick={this.getAllCompanies}>申请公司</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<VideoCameraOutlined />}>
      <Link to="/index/Student/Join">提交日志</Link> 
      </Menu.Item>
      <Menu.Item key="3" icon={<EditOutlined />}>
      <Link to="/index/Student/MyCompany/WriteWant">评分</Link> 
      </Menu.Item>
      <Menu.Item key="4" icon={<OrderedListOutlined />}>
      <Link to="/index/Student/CEO/Campaign">CEO</Link> 
      </Menu.Item>

    </Menu>
  </Sider>
  <Layout className="site-layout" 
          style={{ 
              marginLeft: 300,
   }}>
    <Header className="site-layout-background" style={{ padding: 0 }}>
  <h4>{this.props.userNmae}</h4>
      </Header>
    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
      <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' ,borderRadius:10}}>
        <Route path="/index/Student/AllCompanies" component={AllCompanies}/>
        <Redirect to="/index/Student/AllCompanies/ChosenClasses" from='/index/Student/AllCompanies'/>
        <Route path="/index/Student/Join" component={Join}/>
        <Route path="/index/Student/MyCompany" component={MyCompany}/>
        <Route path="/index/Student/CEO" component={CEO}/>
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
</Layout>
       );
      }
    }
}
const mapDispatchToProps = (dispatch) => {
  return {
    login:(userId,password)=> {
      dispatch(actions.loginAction(userId,password))
    },
  }
}
const mapStateToProps = state =>{
  console.log("Student",state)
  return state
}

withRouter(Student);
export default connect(mapStateToProps,mapDispatchToProps)(Student)
