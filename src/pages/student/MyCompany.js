import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import WriteWant from './WriteWant';
import Detail from './Detail';
import Participants from './Participants';
import {HashRouter as Router, Route,Link,Redirect} from 'react-router-dom';
import {  Menu } from 'antd';
import changeNav from '../../until/changeNav'
class MyCompany extends Component {
    constructor(props) {
        super(props)
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="table_div">
                <Route path="/Student/MyCompany/WriteWant" component={WriteWant}></Route>
                </div>
         );
    }
}

export default withRouter(MyCompany)