


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
import {  Menu } from 'antd';
import { UserOutlined, VideoCameraOutlined, EditOutlined, OrderedListOutlined } from '@ant-design/icons';

class Manager extends Component { 
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
                                <Link to="/Manager/choseclass">选择班级</Link>
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
                            <Route exact path="/Manager/choseclass">
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