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
import NewsCom from './news'
import SignCom from './Sign'
import '../../teacher/style/contentNav.css';
import {  Menu } from 'antd';
import { UserOutlined, VideoCameraOutlined, EditOutlined, OrderedListOutlined,CarryOutOutlined } from '@ant-design/icons';

class Teacher extends Component { 
    constructor(props) {
        super(props);
        this.handleNavStyChanStu = this.handleNavStyChanStu.bind(this);
        this.handleNavStyChanCom = this.handleNavStyChanCom.bind(this);
        this.handleNavStyChanVot = this.handleNavStyChanVot.bind(this);
        this.state = {
            displayStu:true,
            displayCom:true,
           displayVot:true,
           displayNews:true
          }
    }
    render() {
        return (
            <Router>
                <div id="All">
                    <div className="nav-div">
                        <Menu theme="light" mode="inline">
                            <Menu.Item key="1" icon={<UserOutlined />}>
                                <Link to="/Teacher/StuInfo">学生信息</Link>
                            </Menu.Item>
                            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                                <Link to="/Teacher/ComInfo">公司情况</Link> 
                            </Menu.Item>
                            <Menu.Item key="3" icon={<EditOutlined />}>
                                <Link to="/Teacher/VotSit">投票情况</Link> 
                            </Menu.Item>
                            <Menu.Item key="4" icon={<OrderedListOutlined />}>
                                <Link to="/Teacher/News">消息</Link> 
                            </Menu.Item>
                            <Menu.Item key="5" icon={<CarryOutOutlined/>}>
                                <Link to="/Teacher/Sign">签到</Link> 
                            </Menu.Item>
                        </Menu>
                        
                    </div>


                    <div className="content">
                        <Switch>
                            {/* <Redirect component={NewsCom}></Redirect> */}
                            <Route exact path="/">
                                <StuInfo/>
                            </Route>
                            <Route path="/ComInfo">
                                <ComInfo/>
                            </Route>
                            <Route path="/VotSit">
                                <VotSit/>
                            </Route>
                            <Route path="/Teacher/News">
                                <NewsCom/>  
                            </Route>
                            <Route path="/Teacher/Sign">
                                <SignCom/>  
                            </Route>
                            <Route path="/Teacher/StuInfo">
                                <StuInfo/>  
                            </Route>
                        </Switch>
                    </div>
                    
                </div>
            </Router>
        )
    }

    handleNavStyChanStu() { 
            this.setState({
                displayStu:false,
                displayCom:true,
                displayVot:true,
                displayNews:true
            })
    }
    handleNavStyChanCom() { 
        this.setState({
            displayStu:true,
            displayCom:false,
            displayVot:true,
            displayNews:true
        })
    }
    handleNavStyChanVot() { 
        this.setState({
            displayStu:true,
            displayCom:true,
            displayVot:false,
            displayNews:true
        })
    }
    handleNavStyChanNews = () =>{ 
        this.setState({
            displayStu:true,
            displayCom:true,
            displayVot:true,
            displayNews:false
        })
    }

}

export default Teacher