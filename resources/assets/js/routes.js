import React from 'react'
import { Route } from 'react-router'
import Wrapper from './components/Wrapper'
import Plan from './containers/Plan'

export default (
    <Route path="/" component={ Wrapper }>
        <Route path="plan/:planId" component={ Plan } />
        <Route path="plan/:planId/y/:year/m/:month" component={ Plan } />
    </Route>
)