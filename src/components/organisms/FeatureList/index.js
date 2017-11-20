import React from 'react'
import styled from 'styled-components'

import { Feature } from 'components'
import { SonosInfo, Twitter, Instagram, Countdown, Harvest, Showcase, Calendar } from 'containers'

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const GridRow = styled.div`
  display: flex;
  width: 100%;
  flex: ${props => props.size ? props.size : '1 1 auto'};
`

const SquareGridRow = styled(GridRow)`
  min-height: 360px;
`

const WideGridRow = styled(GridRow)`
  min-height: 608px;
`

const FeatureList = ({ ...props }) => {
  return (
    <Grid {...props}>
      <SquareGridRow size="1">
        <Feature square>
          <SonosInfo />
        </Feature>
        <Feature square>
          <Twitter />
        </Feature>
        <Feature square>
          <Instagram />
        </Feature>
      </SquareGridRow>
      <GridRow size="1">
        <Feature>
          <Countdown />
        </Feature>
      </GridRow>
      <WideGridRow size="1">
        <Feature>
          <Showcase />
        </Feature>
      </WideGridRow>
      <GridRow size="7">
        <Feature>
          <Calendar />
        </Feature>
      </GridRow>
      <GridRow size="2">
        <Feature>
          <Harvest />
        </Feature>
      </GridRow>
    </Grid>
  )
}

export default FeatureList
