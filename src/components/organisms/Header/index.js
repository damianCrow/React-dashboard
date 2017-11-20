import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ifProp } from 'styled-tools'

// import { colors } from 'components/globals'
import { Icon, DigitalClock, WeatherIcon, Temperature, Clock } from 'components'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: ${props => props.height ? props.height : '50px'};
  justify-content: flex-start;
  background: rgba(0, 0, 0, .1);
`

const ColourdIcon = styled(Icon)`
  color: white;
  height: 100%;
  padding: 2.5rem;
  margin: 0;
  width: 150px;
  > span {
    margin: 0;
  }
`

const Clocks = styled.div`
  margin-left: auto;
  display: flex;
`

const Header = (props) => {
  return (
    <Wrapper {...props}>
      <ColourdIcon height={50} icon="interwink" />
      <DigitalClock />
      <WeatherIcon />
      <Temperature />
      <Clocks>
        <Clock
          country="United Kingdom"
          countryAbbr="UK"
          gradient="#00928F, #50B848"
          location="London"
          locationAbbr="LDN"
          timezone="Europe/London"
        />
        <Clock
          country="Bahrain"
          countryAbbr="BAH"
          gradient="#FBB568, #FDEF42"
          location="Manama"
          locationAbbr="MAN"
          timezone="Etc/GMT+3"
        />
        <Clock
          country="United States of America"
          countryAbbr="USA"
          gradient="#FDEF42, #50B848"
          location="Los Angeles"
          locationAbbr="LA"
          timezone="America/Los_Angeles"
        />
      </Clocks>
    </Wrapper>
  )
}

Header.Header = {
  height: PropTypes.number,
}

export default Header
