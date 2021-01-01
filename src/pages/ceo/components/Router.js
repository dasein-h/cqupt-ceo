import React from 'react'
import {Redirect, Route, Switch} from "react-router-dom";

export default props => {
  const {routes} = props
  return (
    <Switch>
      {
        routes.map(({path, component: Comp}) => (
          <Route path={path} key={path}>
            <Comp {...props}/>
          </Route>
        ))
      }
      <Redirect to="/CEO/application"/>
    </Switch>
  )
}
