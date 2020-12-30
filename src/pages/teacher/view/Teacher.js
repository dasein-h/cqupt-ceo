import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
import ComInfo from './ComInfo';
import StuInfo from './StuInfo';
import VotSit from './VotSit';
import NewsCom from './news';
import SignCom from './Sign'
import SetCom from './Set'
import StuClass from './StuClass';
import Download from './Download';
import '../../teacher/style/contentNav.css';
import '../../../static/style/style.scss';
import {  Menu,Button,message,Modal,notification,Layout } from 'antd';
import LoginApi from '../../../until/api/LoginApi'
import {
    UserOutlined, VideoCameraOutlined,
    EditOutlined, OrderedListOutlined, CarryOutOutlined,
    FolderOpenOutlined,SettingOutlined,BarsOutlined 
} from '@ant-design/icons';
import changeNav from "../../../until/changeNav";

const { Header, Content, Footer, Sider } = Layout;


class Teacher extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            userid:" ",
            username:"",
            isModalVisible:false,
            isMask:false,
            btntext:"退出登录"
          }
        this.handleDisTeach = this.handleDisTeach.bind(this);
        this.handleExit = this.handleExit.bind(this);
        // this.isLogin = this.isLogin.bind(this);
        this.changeClass = this.changeClass.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    render() {
        return (
            <div>
                <Router>
                    <div id="All">
                        <div className="nav-div">
                            <Menu theme="light" mode="inline" defaultSelectedKeys={[sessionStorage.getItem("count1")||"1"]}>
                                <Menu.Item key="1" icon={<UserOutlined />}>
                                    <Link to="/Teacher/StuInfo"  onClick={changeNav.bind(this,1,1)}>学生信息</Link>
                                </Menu.Item>
                                <Menu.Item key="2" icon={<BarsOutlined />}>
                                    <Link to="/Teacher/ComInfo"  onClick={changeNav.bind(this,1,2)}>公司情况</Link> 
                                </Menu.Item>
                                <Menu.Item key="3" icon={<EditOutlined />}>
                                    <Link to="/Teacher/VotSit"  onClick={changeNav.bind(this,1,3)}>投票情况</Link> 
                                </Menu.Item>
                                <Menu.Item key="4" icon={<OrderedListOutlined />}>
                                    <Link to="/Teacher/News"  onClick={changeNav.bind(this,1,4)}>消息</Link> 
                                </Menu.Item>
                                <Menu.Item key="5" icon={<CarryOutOutlined />}>
                                    <Link to="/Teacher/Sign"  onClick={changeNav.bind(this,1,5)}>签到</Link> 
                                </Menu.Item>
                                <Menu.Item key="6" icon={<SettingOutlined />}>
                                    <Link to="/Teacher/Set"  onClick={changeNav.bind(this,1,6)}>修改配置</Link> 
                                </Menu.Item>
                                <Menu.Item key="7" icon={<FolderOpenOutlined />}>
                                    <Link to="/Teacher/Download"  onClick={changeNav.bind(this,1,7)}>查看宣讲文件</Link> 
                                </Menu.Item>
                            </Menu>
                        
                        </div>

                                <div className="teachcontent">
                                    <Layout>
                                        <Header className="site-layout-background" style={{ padding: 0 }}>
                                            <span style={{marginLeft:"10px"}}>仿真辅助系统</span>
                                            <span style={{float:"right"}}>
                                            <span >欢迎你，{localStorage.getItem("userName")}</span>
                                            <Button type="primary"  onClick={this.changeClass} style={{marginLeft:"10px",marginRight:"10px"}}
                                            >更改班级</Button>
                                            <Button className="exit" type="primary" onClick = {this.handleExit}>
                                                退出登陆</Button>
                                            </span>
                                            
                                        </Header>
                                        <Content  style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                                            <div className="site-layout-background" style={{ padding: 24, textAlign: 'center', borderRadius: 10 }}>

                                            <Switch>
                                                <Route exact path="/Teacher/StuInfo">
                                                    <StuInfo/>
                                                </Route>
                                                <Route path="/Teacher/ComInfo">
                                                    <ComInfo/>
                                                </Route>
                                                <Route path="/Teacher/VotSit">
                                                    <VotSit/>
                                                </Route>
                                                <Route path="/Teacher/News">
                                                    <NewsCom/>  
                                                </Route> 
                                                <Route path="/Teacher/Sign">
                                                    <SignCom />  
                                                </Route>
                                                <Route path="/Teacher/Set">
                                                    <SetCom />
                                                </Route>
                                                <Route path="/Teacher/Download">
                                                    <Download />  
                                                </Route>
                                                <Redirect from="/Teacher" to="/Teacher/StuInfo"></Redirect>
                                            </Switch>
                                            </div>
                                        </Content>
                                        <Footer style={{ textAlign: 'center' }}>版权所有 极客工作室</Footer>
                                    </Layout>
                                
                                </div> 
                    </div>
                </Router>
                        <Modal 
                            visible={this.state.isModalVisible}
                            width={800}
                            centered
                            footer={[
                                <Button
                                type="primary" 
                                ghost size="middle"
                                onClick = {this.handleClick}
                                >{this.state.btntext}</Button>
                            ]}
                            closable={false}
                            okType={null}
                            mask={this.state.isMask}
                            maskClosable={false}>
                            <StuClass 
                                handleDisTeach = {()=>{this.handleDisTeach()}}
                                handleExit = {()=>{this.handleExit()}}
                            />
                        </Modal>
                
            </div>
        )
    }
    
    componentDidMount(){
        let userId = localStorage.getItem("userId");
        let userName = localStorage.getItem('userName')
        this.setState({
            userid: userId,
            username:userName
        })
        //判断弹框
        if(localStorage.hasOwnProperty("teachclass")){
            this.handleDisTeach();
        }else{
            this.setState({
                isModalVisible:true,
                isMask:true
            })
        }
        //简单的拦截
        if(localStorage.hasOwnProperty("userId") && localStorage.getItem("type")==="admin") {
            this.props.history.push('/Manager');
        }
        else if(!localStorage.hasOwnProperty("userId")){
            message.info("请先登录",1);
            this.props.history.push('/Student/AllCompanies/ChosenClasses');
        }
    }
    //modal隐藏
    handleDisTeach = () => {
        this.setState({
            isModalVisible:false,
            isMask:false
        })
    }
    //退出登录
    handleExit = () => {
        LoginApi.Exit().then(
            (res) => {
                if(res.data.flag){
                    message.success("退出成功",1);
                    //退出后将localstorage清空
                    localStorage.clear();
                    this.props.history.push('/Student/AllCompanies/ChosenClasses');
                } else if (!res.data.flag && res.data.message === "没有登录，请先登录") {
                    message.open("登录已过期",1);
                    localStorage.clear();
                    this.props.history.push('/Student/AllCompanies/ChosenClasses');
                } else {
                    message.open("请先登录",1);
                }
            },
            (err) => {
                 notification.open({
                    message: '警告',
                    placement: "bottomRight",
                    description:
                    '请求超时或服务器异常,请检查网络或联系管理员!',
                });
            }
        )
    }   
    //更加班级按钮点击后调用 修改按钮内容
    changeClass = () => {
        this.setState({
            isModalVisible:true,
            isMask:true,
            btntext:"取消选择"
        })
    }
    //不同按钮内容调用不同的方法
    handleClick = () => {
      if(this.state.btntext === "退出登录"){
        this.handleExit();
      }else if(this.state.btntext === "取消选择"){
        this.handleDisTeach();
      }
    }
}

export default Teacher