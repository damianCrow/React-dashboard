import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from 'components/App'
import { MainDashboardPage, AdminPortalHome, AdminPortalAddVideo, AdminPortalAddImage } from 'components'

const routes = (
  <div>
    <Route path="/" component={App}>
      <IndexRoute component={MainDashboardPage} />
    </Route>
    <Route path="/admin-portal" component={App}>
      <IndexRoute component={AdminPortalHome} />
    </Route>
    <Route path="/admin-portal/add-video" component={App}>
      <IndexRoute component={AdminPortalAddVideo} />
    </Route>
    <Route path="/admin-portal/add-image" component={App}>
      <IndexRoute component={AdminPortalAddImage} />
    </Route>
  </div>
)

export default routes
