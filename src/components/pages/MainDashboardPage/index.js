import React from 'react'

import { DashboardTemplate, FeatureList, Header, Intro } from 'components'

const MainDashboardPage = () => {
  return (
    <DashboardTemplate header={<Header height="9.375rem" />} >
      <FeatureList />
    </DashboardTemplate>
  )
}

export default MainDashboardPage
