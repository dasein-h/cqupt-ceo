import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import { Tabs, Menu } from "antd"
import NewsName from '../components/NewsName'
import NewsType from '../components/NewsType'
class News extends React.Component{
  constructor(props){
    super(props)
    let newsKey;
    if(localStorage.getItem("newsKey")===null){
       localStorage.setItem("newsKey",JSON.stringify({key:1,route:'/Teacher/News/Name'}))
    }
    newsKey = JSON.parse(localStorage.getItem("newsKey"))
    this.state = {
        route:newsKey.route,
        num:JSON.stringify(newsKey.key)
    }
  }
  render() {
    return (
        <div>
            <div>
                <Menu theme="light" className="signMenu" mode="horizontal"  defaultSelectedKeys={this.state.num} style={{marginTop:-10}}>
                    <Menu.Item key="1" style={{margin:'0'}} ><Link to="/Teacher/News/Name" >申请修改公司名</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/Teacher/News/Type">申请修改公司类别</Link></Menu.Item>
                </Menu>
                <Switch>
                    <Route path="/Teacher/News/Name" exact>
                        <NewsName></NewsName>
                    </Route>
                    <Route path="/Teacher/News/Type" exact>
                        <NewsType></NewsType>
                    </Route>
                </Switch>
                 <Redirect from="/Teacher/News" to={this.state.route}></Redirect>
            </div>
        </div>
    )
}
}
export default News;