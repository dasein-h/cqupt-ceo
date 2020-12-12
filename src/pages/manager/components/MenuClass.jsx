import React, { Component, Fragment } from 'react';
import { Table, Button, Menu, message} from 'antd'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
import AddClass from './AddClass'
import  DeleteClass  from './/DeleteClass'
import ChoseClass from './ChoseTeacher'
import ManagerApi from '../../../until/api/ManagerApi';

class MenuClass extends Component{
    constructor(props){
        super(props);
        this.state = {
            teacherId:"",
            teacherName:"",
            btucontent:"添加班级",
            list:[]
        }
        this.changeBtnContent = this.changeBtnContent.bind(this);
        this.getTeachClassList = this.getTeachClassList.bind(this);
        this.addClass = this.addClass.bind(this)
        this.deleteClass = this.deleteClass.bind(this);
        this.handlebtnChange = this.handlebtnChange.bind(this);
        this.toChoseClass = this.toChoseClass.bind(this);
    }
    render(){
        return(
            <Fragment>
                <Router >
                        <div>
                        <div>
                            <span className="chose-top">选择班级</span>
                            <span className="chose-name">{this.state.teacherName}</span>
                            <Button type="primary" onClick={this.toChoseClass}>更改班级</Button>
                            <Button type="primary" onClick={this.handlebtnChange}>{this.state.btucontent}</Button>
                        </div>
                        <Menu theme="light"  mode="horizontal"  defaultSelectedKeys="1">
                            <Menu.Item key = "1" onClick={(item) => {this.changeBtnContent(item)}}>
                                <Link to="/Manager/ChoseClass/addClass">选择班级</Link>
                            </Menu.Item>
                            <Menu.Item key = "2" onClick={(item) => {this.changeBtnContent(item)}}>
                                <Link to="/Manager/ChoseClass/deleteClass">删除班级</Link>
                            </Menu.Item>
                        </Menu>
                    </div>
                    <div>
                        <Switch>
                            <Route path="/Manager/ChoseClass/addClass">
                                <AddClass  getTeachClassList = {this.getTeachClassList} teacherId={this.state.teacherId}/>
                                </Route>
                            <Route path="/Manager/ChoseClass/deleteClass">
                                <DeleteClass getTeachClassList = {this.getTeachClassList} teacherId={this.state.teacherId} />
                            </Route>
                           
                            {/* <Redirect from="/Manager/ChoseClass" to="/Manager/ChoseClass/addClass"></Redirect> */}
                        </Switch>
                    </div>                    
                    </Router>
            </Fragment>
        )
    }
    componentDidMount(){
        let teacherid = this.props.location.state.teacherId;
        let teachername = this.props.location.state.teacherName;
        this.setState({
            teacherId:teacherid,
            teacherName:teachername
        },() => {
            console.log(this.state.teacherId);
        })
    }
    //改变按钮
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


    getTeachClassList = (list,ref) => {
        this.setState({
            List:list
        },() => {
            console.log(this.state.List);
        })
        this.child = ref;
    }

    addClass = (list) => {
        ManagerApi.addClass(list).then(
            (res) => {
                console.log(res);
                message.success("添加成功",1);
                this.child.afterClickChange(this.state.List);
            },
            (err) => {
                console.log(err);
            })
    }
    deleteClass = (list) => {
        ManagerApi.deleteClass(list).then(
            (res) => {
                console.log(res);
                message.success("删除成功",1);
            },
            (err) => {
                console.log(err);
            })
    }
    handlebtnChange = () => {
        if(this.state.btucontent == "添加班级"){
            console.log("add");
            this.addClass(this.state.List)
        }
        else if(this.state.btucontent == "删除班级")
        {
            console.log("delete");
            this.deleteClass(this.state.List)
        }
    }

    toChoseClass = () => {
        this.props.history.push('/Manager/ChoseClass/ChoseTeacher')
    }
}

export default MenuClass;