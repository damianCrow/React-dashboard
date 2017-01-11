import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from 'components/App'
import { MainDashboardPage, SamplePage, NotFoundPage } from 'components'

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={MainDashboardPage} />
    <Route path="/handleauth" component={SamplePage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
)

export default routes
