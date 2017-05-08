import React from 'react'

import { DashboardTemplate, FeatureList, Header, Intro } from 'components'

const MainDashboardPage = () => {
  return (
    <DashboardTemplate header={<Header height="2rem" />} intro={<Intro />} >
      <FeatureList />
    </DashboardTemplate>
  )
}

export default MainDashboardPage
