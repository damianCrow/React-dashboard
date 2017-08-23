import React from 'react'
import { BrowserRouter, Route, Switch, browserHistory } from 'react-router-dom'
import { injectGlobal, ThemeProvider } from 'styled-components'

import { MainDashboardPage, AdminPortalHome, AdminPortalAddVideo, AdminPortalAddImage, AdminPortalPlaylistView } from 'components'

// https://github.com/diegohaz/arc/wiki/Styling
import theme from './themes/default'

injectGlobal`
  body {
    margin: 0;
  }
`

const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <BrowserRouter history={browserHistory}>
          <Switch>
            <Route path="/" component={() => <MainDashboardPage />} exact />
            <Route path="/admin-portal" component={() => <AdminPortalHome />} exact/>
            <Route path="/admin-portal/playlist/:playlistId" component={() => <AdminPortalPlaylistView />} exact />
            <Route path="/admin-portal/playlist/add-video/:playlistId" component={() => <AdminPortalAddVideo />} exact />
            <Route path="/admin-portal/playlist/add-image/:playlistId" component={() => <AdminPortalAddImage />} exact />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  )
}

export default App
