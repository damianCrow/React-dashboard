import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { injectGlobal, ThemeProvider } from 'styled-components'

import { MainDashboardPage, AdminPortalHome, AdminPortalAddVideo, AdminPortalAddImage } from 'components'

// https://github.com/diegohaz/arc/wiki/Styling
import theme from './themes/default'

injectGlobal`
  body {
    margin: 0;
    cursor: url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7), auto;
  }
`

const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/" component={MainDashboardPage} exact />
          <Route path="/admin-portal" component={AdminPortalHome} exact />
          <Route path="/admin-portal/add-video" component={AdminPortalAddVideo} />
          <Route path="/admin-portal/add-image" component={AdminPortalAddImage} />
          <Route component={MainDashboardPage} />
        </Switch>
      </ThemeProvider>
    </div>
  )
}

export default App
