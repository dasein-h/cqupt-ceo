
import React from 'react'
import { render } from 'react-dom'
import { Router,Route,Link,HashHistory,Switch} from 'react-router-dom'
import RouteMap from './router.js'
 
render(
    <RouteMap/>,
    document.getElementById('root')
)