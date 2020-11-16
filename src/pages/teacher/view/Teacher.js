import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
import ComInfo from './ComInfo';
import StuInfo from './StuInfo';
import VotSit from './VotSit';
import NewsCom from './news'
import '../../teacher/style/contentNav.css';

class Teacher extends Component { 
    constructor(props) {
        super(props);
        this.handleNavStyChanStu = this.handleNavStyChanStu.bind(this);
        this.handleNavStyChanCom = this.handleNavStyChanCom.bind(this);
        this.handleNavStyChanVot = this.handleNavStyChanVot.bind(this);
        this.state = {
            displayStu:true,
            displayCom:true,
           displayVot:true,
           displayNews:true
          }
    }
    render() {
        return (
            <Router>
                <div id="All">
                    <div className="nav-div">
                        <Link to="/"> 
                            <div className={this.state.displayStu ? 'nav' : 'nav-point'}
                                onClick={this.handleNavStyChanStu}>
                            学生信息
                            </div>
                        </Link>
                        
                        <Link to="/ComInfo">
                            <div className={this.state.displayCom ? 'nav' : 'nav-point'}
                            onClick={this.handleNavStyChanCom}>
                            公司情况
                            </div>
                        </Link>
                        
                        <Link to="/VotSit">
                            <div className={this.state.displayVot ? 'nav' : 'nav-point'}
                            onClick={this.handleNavStyChanVot}>
                            投票情况
                            </div>
                            
                        </Link>
                        <Link to="/Teacher/news">
                        <div className={this.state.displayNews ? 'nav' : 'nav-point'}
                            onClick={this.handleNavStyChanNews}>
                            消息
                            </div>
                        </Link>
                        
                    </div>


                    <div className="content">
                        <Switch>
                            {/* <Redirect component={NewsCom}></Redirect> */}
                            <Route exact path="/">
                                <StuInfo/>
                            </Route>
                            <Route path="/ComInfo">
                                <ComInfo/>
                            </Route>
                            <Route path="/VotSit">
                                <VotSit/>
                            </Route>
                            <Route path="/Teacher/news" component={NewsCom}></Route>
                        </Switch>
                    </div>
                    
                </div>
            </Router>
        )
    }

    handleNavStyChanStu() { 
            this.setState({
                displayStu:false,
                displayCom:true,
                displayVot:true,
                displayNews:true
            })
    }
    handleNavStyChanCom() { 
        this.setState({
            displayStu:true,
            displayCom:false,
            displayVot:true,
            displayNews:true
        })
    }
    handleNavStyChanVot() { 
        this.setState({
            displayStu:true,
            displayCom:true,
            displayVot:false,
            displayNews:true
        })
    }
    handleNavStyChanNews = () =>{ 
        this.setState({
            displayStu:true,
            displayCom:true,
            displayVot:true,
            displayNews:false
        })
    }

}

export default Teacher