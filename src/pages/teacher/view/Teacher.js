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
import StuClass from './StuClass';
import '../../teacher/style/contentNav.css';
import {  Menu } from 'antd';
import { UserOutlined, VideoCameraOutlined, EditOutlined, OrderedListOutlined } from '@ant-design/icons';

class Teacher extends Component { 
    constructor(props) {
        super(props);
        
        this.state = {
            
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
                                <Link to="/Teacher/news">消息</Link> 
                            </Menu.Item>
                            <Menu.Item key="5" icon={<OrderedListOutlined />}>
                                <Link to="/Teacher/StuClass">班级信息</Link> 
                            </Menu.Item>

                        </Menu>
                        
                    </div>


                    <div className="content">
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
                            <Route path="/Teacher/news">
                                  <NewsCom/>  
                            </Route>
                            <Route path="/Teacher/StuClass">
                                  <StuClass/>  
                            </Route>
                        </Switch>
                    </div>
                    
                </div>
            </Router>

        )
    }

}

export default Teacher