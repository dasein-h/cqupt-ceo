import React, { Component } from 'react';
import { Menu } from 'antd';
import { withRouter, Switch, Link} from 'react-router-dom';
import { Router, Route, Redirect } from 'react-router';
import {selectedClassTeacher} from '../../../until/api/teacherApi'
import ChosenStuClass from '../components/ChosenStuClass';
import UnChosenStuClass from '../components/UnChosenStuClass';

class StuClass extends React.Component { 
    constructor(props) { 
        super(props);
        this.state = {
            currentkeys:["unchoose","onchoosed"]
        };
      
    }
    render() { 
        return (
            <div>
                <div className="topnav">
                    <Menu theme="light"  mode="horizontal" onClick={this.handleClick} defaultSelectedKeys="1">
                        <Menu.Item key = "1"><Link to="/Teacher/StuClass/ChosenStuClass">已选择的班级</Link></Menu.Item>
                        <Menu.Item key = "2"><Link to="/Teacher/StuClass/UnChosenStuClass">未选择的班级</Link></Menu.Item>
                    </Menu>
                </div>
                <div className="table">
                    <Switch>
                        <Route path="/Teacher/StuClass/ChosenStuClass" component={ChosenStuClass} />
                        <Route path="/Teacher/StuClass/UnChosenStuClass" component={UnChosenStuClass} />
                        <Redirect to="/Teacher/StuClass/ChosenStuClass" />
                    </Switch>
                </div>
            </div>
        );

    }
    componentDidMount(){
      let repro = selectedClassTeacher(localStorage.getItem("userId"),"1","5");
      repro.then((res) => {
        this.setState(
          this.state.contentList = res.data.data
        )
        console.log(res.data.data);
      },(err) => {
        console.log(err);
      })
      
    }
    handleIntoClass = (text,record) => {
      console.log(record.teachclass);
      localStorage.setItem('teachclass',record.teachclass);
      this.props.handleDisTeach();
    }
}
export default StuClass;