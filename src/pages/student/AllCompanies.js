import React, { Component } from 'react';
import { withRouter,Switch } from 'react-router-dom'
import {connect} from 'react-redux'
import actions from '../../redux/actionCreators/creators'
import {HashRouter as Router, Route,Link,Redirect} from 'react-router-dom';
import {  Menu } from 'antd';
import ChosenClasses from './ChosenClasses'
import UnChosenClasses from './UnChosenClasses'
import store from '../../redux/store'
import changeNav from '../../until/changeNav'
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
  <Menu theme="light" mode="horizontal" defaultSelectedKeys={[sessionStorage.getItem("count1")||'1']}>
    <Menu.Item key="1"><Link to="/Student/AllCompanies/ChosenClasses" onClick={changeNav.bind(this,1,1)}>已选择的班级</Link></Menu.Item>
    <Menu.Item key="2"><Link to="/Student/AllCompanies/UnChosenClasses" onClick={changeNav.bind(this,1,2)}>未选择的班级</Link></Menu.Item>
  </Menu>

            <div>
              <Switch>
            <Route path="/Student/AllCompanies/ChosenClasses" component={ChosenClasses}></Route>
            <Route path="/Student/AllCompanies/UnChosenClasses" component={UnChosenClasses}></Route>
            <Redirect to="/Student/AllCompanies/ChosenClasses"/>
            </Switch>
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
