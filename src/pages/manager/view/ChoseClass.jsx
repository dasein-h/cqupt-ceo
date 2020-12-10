import React, { Component, Fragment } from 'react'
import { Table, Button, Menu} from 'antd'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
import AddClass from '../components/AddClass'
import  DeleteClass  from '../components/DeleteClass'
import  ChoseTeacher  from '../components/ChoseTeacher'
import MenuClass from '../components/MenuClass'
import '../style/choseclass.scss'


class ChoseClass extends Component {
    constructor(props){
        super(props);
        this.state = {
            teacherId:"",
            teacherName:"",
            btucontent:"添加班级"
        }
        // this.getTeacherId = this.getTeacherId.bind(this);
        // this.changeComponent = this.changeComponent.bind(this);
        // this.changeBtnContent = this.changeBtnContent.bind(this);
    }
    render() { 
        return (
            <Fragment>
                {/* <span className="Nav-top">选择老师</span>
                <div className="choseteacher">
                    <ChoseTeacher 
                        // changeComponent={this.changeComponent}
                        getTeacherId = {this.getTeacherId}
                    />
                </div> */}
                {/* <div className="choseclass">
                        <Router >
                        <div>
                        <div>
                            <span className="chose-top">选择班级</span>
                            <span className="chose-name">{this.state.teacherName}</span>
                            <Button type="primary" onClick={this.changeComponent(false)}>更改班级</Button>
                            <Button type="primary">{this.state.btucontent}</Button>
                        </div>
                        <Menu theme="light"  mode="horizontal"  defaultSelectedKeys="1">
                            <Menu.Item key = "1" onClick={(item) => {this.changeBtnContent(item)}}><Link to="/Manager/ChoseClass/addClass">选择班级</Link></Menu.Item>
                            <Menu.Item key = "2" onClick={(item) => {this.changeBtnContent(item)}}><Link to="/Manager/ChoseClass/deleteClass">删除班级</Link></Menu.Item>
                        </Menu>
                    </div>
                    <div>
                        <Switch>
                            <Route exact path="/Manager/ChoseClass/addClass" component={AddClass} teacherId={this.state.teacherId}/>
                            <Route exact path="/Manager/ChoseClass/deleteClass" component={DeleteClass} teacherId={this.state.teacherId}/>
                        </Switch>
                    </div>                    
                    </Router>
                </div> */}
                {/* <Router> */}
                        <Switch>
                            <Route path="/Manager/ChoseClass/addClass" component={AddClass} teacherId={this.state.teacherId}/>
                            <Route path="/Manager/ChoseClass/deleteClass" component={DeleteClass} teacherId={this.state.teacherId}/>
                            <Route path="/Manager/ChoseClass/MenuClass" component={MenuClass} teacherId={this.state.teacherId}/>
                            <Route path="/Manager/ChoseClass/ChoseTeacher" component={ChoseTeacher} />
                        <Redirect from="/Manager/ChoseClass" to="/Manager/ChoseClass/ChoseTeacher" />
                            
                        </Switch>
                {/* </Router> */}
                 
            </Fragment>
        )
    }

    componentDidMount() {
        
    }
    // changeComponent = (flag) => {
    //     if(flag){
    //         document.querySelector(".choseclass").style.display = "block";
    //         document.querySelector(".choseteacher").style.display = "none";
    //         document.querySelector(".Nav-top").style.display = "none";
    //     }
    //     else{
    //         // document.querySelector(".choseclass").style.display = "none";
    //         // document.querySelector(".choseteacher").style.display = "block";
    //         // document.querySelector(".Nav-top").style.display = "block";
    //     }
        
    // }
    
    // getTeacherId = (teacherId,teacherName) => {
    //     this.setState({
    //         teacherId,
    //         teacherName
    //     })
    // }

    // changeBtnContent = (item) => {
    //     if(item.key==1){
    //         this.setState({
    //             btucontent:"添加班级"
    //         })
    //     }
    //     else if(item.key==2){
    //         this.setState({
    //             btucontent:"删除班级"
    //         })
    //     }
    // }
                                                                                                                                                                                                                                                             
}
export default ChoseClass


/* <Button 
                    type="primary" 
                    size="middle"
                    style={{marginLeft:"20px"}}
                    // onClick={this.handleChange}
                  >选择班级</Button> */
                /* <Table 
                    dataSource={this.state.dataSource} 
                    columns={columns}  
                    rowSelection={{type:"checkbox"}}
                /> */


//  componentWillMount(){
    //     unSelectedClassTeacher("1","79")
    // }
   
 