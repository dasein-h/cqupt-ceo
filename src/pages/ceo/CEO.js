import React from 'react';
import {Route, Link, withRouter} from 'react-router-dom'
import Application from "./application/Application";
import Position from "./position/Position";
import {Layout, Menu} from "antd";

const {Sider, Content} = Layout

const routes = [
  {
    path: '/CEO/application',
    name: '申请',
    component: Application
  }, {
    path: '/CEO/position',
    name: '职位',
    component: Position
  },
]

function CEO(props) {
  return (
    <Layout
      style={{
        height: '100vh'
      }}
    >
      <Sider
        theme="dark"
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'sticky',
          top: 0,
          left: 0,
        }}>
        <Menu theme="dark" selectedKeys={props.location.pathname}>
          {
            routes.map(({path, component, name}) => (
              <Menu.Item key={path}>
                <Link to={path}>
                  {name}
                </Link>
              </Menu.Item>
            ))
          }
        </Menu>
      </Sider>
      <Content>
        {
          routes.map(({path, component}) => (
            <Route path={path} key={path} component={component}/>
          ))
        }
      </Content>
    </Layout>
  )
}

export default withRouter(CEO);
