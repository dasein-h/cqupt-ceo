import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
import ChoseClass from './view/ChoseClass'
import Set from './view/Set'
import ImData from './view/ImData'
import './style/Nav.css';
import {  Menu,Button } from 'antd';
import { UserOutlined, VideoCameraOutlined, EditOutlined, OrderedListOutlined } from '@ant-design/icons';

class Manager extends Component { 
    constructor(props) {
        super(props);
        
        this.state = {
            username: ''
          }
    }
    render() {
        return (
            <Router>
                <div id="All">
                    <div className="nav-div">
                        <div className="login">
                                <span >欢迎您,{this.state.username}</span>
                                <Button 
                                    type="primary" 
                                    ghost size="small" 
                                    style={{marginLeft:'15px'}}
                                    onClick = {this.handleExit}
                                >退出登录</Button>
                        </div>
                        <Menu theme="light" mode="inline">
                            <Menu.Item key="1" icon={<UserOutlined />}>
                                <Link to="/Manager/ChoseClass">选择班级</Link>
                            </Menu.Item>
                            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                                <Link to="/Manager/Set">配置比例</Link> 
                            </Menu.Item>
                            <Menu.Item key="3" icon={<EditOutlined />}>
                                <Link to="/Manager/data">导入数据</Link> 
                            </Menu.Item>
                            

                        </Menu>
                        
                    </div>


                    <div className="content">
                        <Switch>
                            <Route exact path="/Manager/ChoseClass">
                                <ChoseClass/>
                            </Route>
                            <Route path="/Manager/Set">
                                <Set/>
                            </Route>
                            <Route path="/Manager/data">
                                <ImData/>
                            </Route>
                            
                        </Switch>
                    </div>
                    
                </div>
            </Router>

        )
    }

}

export default Manager