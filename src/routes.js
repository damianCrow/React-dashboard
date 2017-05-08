import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from 'components/App'
import { MainDashboardPage } from 'components'

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={MainDashboardPage} />
  </Route>
)

export default routes
