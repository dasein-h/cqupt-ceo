import React from 'react';
import App from './pages/App';
import {Provider} from 'react-redux'
import store from './redux/store'
import {HashRouter as Router, Switch, Route, Redirect,BrowserRouter} from 'react-router-dom';

class RouteMap extends React.Component {

    render() {
        return (
            <div>
                            <Provider store={store}>
        <BrowserRouter >

     <Route path="/index" component={App}/>
      {/* <Route path="/AllCompanies" component={AllCompanies}/>
      <Route path="/Join" component={Join}/>
      <Route path="/MyCompany" component={MyCompany}/> */}
        {/* <Route path="/MyCompany/WriteWant" component={WriteWant}></Route>
        <Route path="/MyCompany/Detail" component={Detail}></Route>
        <Route path="/MyCompany/Participants" component={Participants}></Route> */}
                <Redirect to="/index/Student/AllCompanies/ChosenClasses"/>
  </BrowserRouter> 
  </Provider>
  </div>
        )
    }
}
 

export default RouteMap

