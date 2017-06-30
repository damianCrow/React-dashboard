import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from 'components/App'
import { MainDashboardPage, AdminPortalHome } from 'components'

const routes = (
  <div>
    <Route path="/" component={App}>
      <IndexRoute component={MainDashboardPage} />
    </Route>
    <Route path="/admin-portal" component={App}>
      <IndexRoute component={AdminPortalHome} />
    </Route>
  </div>
)

export default routes
