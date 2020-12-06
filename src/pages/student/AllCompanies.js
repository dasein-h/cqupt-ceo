import React, { Component } from 'react';
import { withRouter, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import actions from '../../redux/actionCreators/creators'
import { HashRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { Menu } from 'antd';
import ChosenClasses from './ChosenClasses'
import UnChosenClasses from './UnChosenClasses'
import store from '../../redux/store'
import changeNav from '../../until/changeNav'
class AllCompanies extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    // this.props.AllCompanies()
    return (
      <div>


            <Route path="/Student/AllCompanies/ChosenClasses" component={ChosenClasses}></Route>

      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getAllCompanies: (userId, page, rows) => {
      dispatch(actions.getAllCompanies(userId, page, rows))
    },
  }
}
const mapStateToProps = state => {

  return state
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AllCompanies))
