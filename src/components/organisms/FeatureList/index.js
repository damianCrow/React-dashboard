import React from 'react'
import styled from 'styled-components'

import { Feature, Header } from 'components'
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
        <Feature>
          {/* Time / Date */}
        </Feature>
        <Feature double>
          {/* <SonosInfo />*/}
          <SonosInfo />
        </Feature>
        <GridColumn>
          <Feature fullWidth>
            {/* <Instagram />*/}
            {<Instagram />}
          </Feature>
          <Feature fullWidth>
            {/* <Twitter />*/}
          </Feature>
        </GridColumn>
      </GridRow>
      <GridRow>
        <Feature fullWidth>
          {/* <Showcase />*/}
        </Feature>
      </GridRow>
      <GridRow>
        <Feature>
          {/* <GoogleCalendar />*/}
        </Feature>
        <Feature>
          {/* <Harvest />*/}
        </Feature>
      </GridRow>
      <GridRow>
        <Feature>
          {/* Something */}
        </Feature>
      </GridRow>
    </Grid>
  )
}

export default FeatureList
