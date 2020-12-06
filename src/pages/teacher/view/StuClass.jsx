import React, { Component } from 'react';
import { Menu } from 'antd';
import { withRouter, Switch, Link} from 'react-router-dom';
import { Router, Route, Redirect } from 'react-router';
import ChosenStuClass from '../components/ChosenStuClass';
import UnChosenStuClass from '../components/UnChosenStuClass';

class StuClass extends React.Component { 
    constructor(props) { 
        super(props);
        this.state = {
            currentkeys:["unchoose","onchoosed"]
        };
        this.handleClick = this.handleClick.bind(this);
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

    handleClick = () => {
        
    }
}
export default StuClass;