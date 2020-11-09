import React, { Component } from 'react';
import Student from './student/Student'
import {Provider} from 'react-redux'
import store from '../redux/store'
import CEO from './ceo/CEO'
import {HashRouter as Router, Switch, Route, Redirect,BrowserRouter} from 'react-router-dom';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
            <Route path="/index/Student" component={Student}/>
            
            <Route path="/index/CEO" component={CEO}/>
            </div>
         );
    }
}
 
export default App;