import React, { Component, Fragment } from 'react';
import { Table, Button, Menu} from 'antd'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
import AddClass from '../components/AddClass'
import  DeleteClass  from '../components/DeleteClass'

class MenuClass extends Component{
    constructor(props){
        super(props);
        this.state = {
            teacherId:"",
            teacherName:"",
            btucontent:"添加班级"
        }
        this.getTeacherId = this.getTeacherId.bind(this);
        this.changeBtnContent = this.changeBtnContent.bind(this);
    }
    render(){
        return(
            <Fragment>
                <Router >
                        <div>
                        <div>
                            <span className="chose-top">选择班级</span>
                            <span className="chose-name">{this.state.teacherName}</span>
                            <Button type="primary">更改班级</Button>
                            <Button type="primary">{this.state.btucontent}</Button>
                        </div>
                        <Menu theme="light"  mode="horizontal"  defaultSelectedKeys="1">
                            <Menu.Item key = "1" onClick={(item) => {this.changeBtnContent(item)}}><Link to="/Manager/ChoseClass/addClass">选择班级</Link></Menu.Item>
                            <Menu.Item key = "2" onClick={(item) => {this.changeBtnContent(item)}}><Link to="/Manager/ChoseClass/deleteClass">删除班级</Link></Menu.Item>
                        </Menu>
                    </div>
                    <div>
                        <Switch>
                            <Route exact path="/Manager/ChoseClass/addClass" component={AddClass} teacherId={this.state.teacherId}/>
                            <Route exact path="/Manager/ChoseClass/deleteClass" component={DeleteClass} teacherId={this.state.teacherId}/>
                        </Switch>
                    </div>                    
                    </Router>
            </Fragment>
        )
    }

    changeBtnContent = (item) => {
        if(item.key==1){
            this.setState({
                btucontent:"添加班级"
            })
        }
        else if(item.key==2){
            this.setState({
                btucontent:"删除班级"
            })
        }
    }
}

export default MenuClass;