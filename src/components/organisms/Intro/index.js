import React from 'react'
import styled from 'styled-components'

import { colors } from 'components/globals'
import { Icon, Heading, DigitalClock, WeatherIcon } from 'components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
  width: 100%;
  justify-content: center;

  & > :not(:first-child) {
    margin-left: 1rem;
  }
`

const StyledHeading = styled(Heading)`
  color: white;
`

const ColourdIcon = styled(Icon)`
  color: white;
`

const Intro = (props) => {
  return (
    <Wrapper {...props}>
      <ColourdIcon height={150} icon="interwink" />
      <StyledHeading>Welcome and good afternoon 👍</StyledHeading>
    </Wrapper>
  )
}

export default Intro
