import React from 'react'
import styled from 'styled-components'

import { Feature, Countdown } from 'components'
import { SonosInfo, Twitter, Instagram, Calendar, Harvest, Showcase } from 'containers'

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
          <Twitter />
        </Feature>
        <Feature square>
          <Instagram />
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
        <Feature />
      </GridRow>
      <GridRow>
        <Feature style={{ paddingTop: '52%' }}>
          <Calendar />
        </Feature>
      </GridRow>
      <GridRow>
        <Feature madWide>
          <Harvest />
        </Feature>
      </GridRow>
    </Grid>
  )
}

export default FeatureList
