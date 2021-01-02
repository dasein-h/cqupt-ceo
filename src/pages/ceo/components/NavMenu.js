import {Menu} from "antd";
import {Link} from "react-router-dom";
import React from "react";
import {withRouter} from 'react-router-dom'

const NavMenu = (props) => {
  const {routes} = props
  return (
    <Menu mode="inline" style={{width: '100%'}} selectedKeys={props.location.pathname}>
      {
        routes.map(({path, name}) => (
          <Menu.Item key={path}>
            <Link to={path}>
              {name}
            </Link>
          </Menu.Item>
        ))
      }
    </Menu>
  )
}
export default withRouter(NavMenu)
