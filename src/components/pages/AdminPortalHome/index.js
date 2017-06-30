import React from 'react'

import { AdminPortalTemplate, ButtonWrapper, SortableComponent /* , FeatureList, Header, Intro*/ } from 'components'

const adminPortalHome = () => {
  return (
    <AdminPortalTemplate>
      <SortableComponent />
      <ButtonWrapper />
    </AdminPortalTemplate>
  )
}

export default adminPortalHome
