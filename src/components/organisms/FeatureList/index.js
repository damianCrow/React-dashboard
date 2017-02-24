import React from 'react'
import styled from 'styled-components'

import { Feature } from 'components'
import { SonosInfo, Twitter, Instagram, GoogleCalendar, Harvest, Showcase, Header } from 'containers'

const Grid = styled.div`
  display: block;
`

const GridRow = styled.div`
  display: flex;
`

const GridColumn = styled.div`
  display: flex;
  flex-direction: column;
`

const FeatureList = ({ ...props }) => {
  return (
    <div {...props}>
      <Grid>
        <GridRow>
          <Header />
        </GridRow>
        <GridRow>
          <Feature>
            {/* Time / Date */}
          </Feature>
          <Feature double>
            <SonosInfo />
          </Feature>
          <Feature>
            <GridColumn>
              <Instagram />
            </GridColumn>
          </Feature>
        </GridRow>
        <GridRow>
          <Feature>
            <Showcase />
          </Feature>
        </GridRow>
        <GridRow>
          <Feature>
            <GoogleCalendar />
          </Feature>
          <Feature>
            <Harvest />
          </Feature>
        </GridRow>
        <GridRow>
          <Feature>
            <Twitter />
          </Feature>
        </GridRow>
      </Grid>
    </div>
  )
}

export default FeatureList
