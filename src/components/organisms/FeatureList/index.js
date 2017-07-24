import React from 'react'
import styled from 'styled-components'

import { Feature, Countdown } from 'components'
import { SonosInfo, Twitter, Instagram, GoogleCalendar, Harvest, Showcase } from 'containers'

const Grid = styled.div`
  display: block;
  width: 100%;
`

const GridRow = styled.div`
  display: flex;
  width: 100%;
`

const GridColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 33.3333333333%
`

const FeatureList = ({ ...props }) => {
  return (
    <Grid {...props}>
      <GridRow>
        <Feature square>
          <SonosInfo />
        </Feature>
        <Feature square>
          <Instagram />
        </Feature>
        <Feature square>
          <Twitter />
        </Feature>
      </GridRow>
      <GridRow>
        <Feature megaWide>
          <Countdown />
        </Feature>
      </GridRow>
      <GridRow>
        <Feature wide>
          <Showcase />
        </Feature>
      </GridRow>
      <GridRow>
        <Feature superWide>
          {/* <Harvest /> */}
        </Feature>
      </GridRow>
    </Grid>
  )
}

export default FeatureList
