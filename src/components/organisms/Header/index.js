import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ifProp } from 'styled-tools'

// import { colors } from 'components/globals'
import { Icon, DigitalClock, WeatherIcon } from 'components'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1rem;
  margin-bottom: 1rem;
  width: 100%;
  height: ${props => props.height ? props.height : '50px'};
  justify-content: flex-end;
  background: rgba(0, 0, 0, .5);

  & > :not(:first-child) {
    margin-left: 1rem;
  }
`

const Header = (props) => {
  console.log('props', props)
  return (
    <Wrapper {...props}>
      <DigitalClock />
    </Wrapper>
  )
}

Header.Header = {
  height: PropTypes.number,
}

export default Header
