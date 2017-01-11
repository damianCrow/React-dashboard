import React from 'react'
import styled from 'styled-components'

import { Feature } from 'components'
import { SonosInfo, Twitter, Instagram } from 'containers'

const Grid = styled.div`
  display: block;
`

const GridRow = styled.div`
  display: flex;
`

const StyledFeature = styled(Feature)`
  margin: 0rem;
`

const FeatureList = ({ ...props }) => {
  return (
    <div {...props}>
      <Grid>
        <GridRow>
          <StyledFeature>
            {/* Time / Date */}
          </StyledFeature>
          <StyledFeature>
            <SonosInfo />
          </StyledFeature>
          <StyledFeature>
            <Instagram />
          </StyledFeature>
        </GridRow>
        <GridRow>
          <StyledFeature>
            {/* Calendar - Out of office and Meetings */}
          </StyledFeature>
        </GridRow>
        <GridRow>
          <StyledFeature>
            {/* Site Statistics */}
          </StyledFeature>
        </GridRow>
        <GridRow>
          <StyledFeature>
            {/* Emjoii / message of the day */}
          </StyledFeature>
          <StyledFeature>
            {/* Harvest */}
          </StyledFeature>
        </GridRow>
        <GridRow>
          <StyledFeature>
            <Twitter />
          </StyledFeature>
        </GridRow>
      </Grid>
    </div>
  )
}

export default FeatureList
