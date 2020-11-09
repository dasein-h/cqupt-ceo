import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import actions from '../../redux/actionCreators/creators'
import {HashRouter as Router, Route,Link,Redirect} from 'react-router-dom';
import {  Menu } from 'antd';
import ChosenClasses from './ChosenClasses'
import UnChosenClasses from './UnChosenClasses'
import store from '../../redux/store'
class AllCompanies extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        // this.props.AllCompanies()
        return (    
            <div className="test_all">

            <div className="logo" />
  <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']}>
    <Menu.Item key="1"><Link to="/index/Student/AllCompanies/ChosenClasses">已选择的班级</Link></Menu.Item>
    <Menu.Item key="2"><Link to="/index/Student/AllCompanies/UnChosenClasses">未选择的班级</Link></Menu.Item>
  </Menu>

            <div>
            <Route path="/index/Student/AllCompanies/ChosenClasses" component={ChosenClasses}></Route>
    <Route path="/index/Student/AllCompanies/UnChosenClasses" component={UnChosenClasses}></Route>
            </div>
            </div>
             );
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        getAllCompanies:(userId,page,rows)=> {
          dispatch(actions.getAllCompanies(userId,page,rows))
        },
}
}
const mapStateToProps = state =>{
    console.log("AllCompanies",state)
    console.log(store.getState())
    return state
  }
withRouter(AllCompanies);
export default connect(mapStateToProps,mapDispatchToProps)(AllCompanies)