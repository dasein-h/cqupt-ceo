import React from 'react';
import Student from './pages/student/Student';

import {HashRouter as Router, Switch, Route, Redirect,BrowserRouter} from 'react-router-dom';

class RouteMap extends React.Component {

    render() {
        return (
            <div>
        <BrowserRouter >

     <Route path="/" component={Student}/>
      {/* <Route path="/AllCompanies" component={AllCompanies}/>
      <Route path="/Join" component={Join}/>
      <Route path="/MyCompany" component={MyCompany}/> */}
        {/* <Route path="/MyCompany/WriteWant" component={WriteWant}></Route>
        <Route path="/MyCompany/Detail" component={Detail}></Route>
        <Route path="/MyCompany/Participants" component={Participants}></Route> */}
        <Redirect to="/AllCompanies" from='/' />

  </BrowserRouter> 
  </div>
        )
    }
}
 

export default RouteMap

