import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment-timezone'
import { ClockHand, ClockShadow } from 'components'

import { fonts } from 'components/globals'

const ClockFrame = styled.div`
  border-radius: 50%;
  width: 75px;
  height: 75px;
  z-index: 1;
  margin-bottom: .5rem;
  position: relative;
  box-sizing: border-box;
  background: linear-gradient(to right, rgba(255,255,255,1) 0%,rgba(230,230,230,1) 100%);
  contain: strict;
`

const Handles = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  contain: strict;
  z-index: 1;
`

const Wrapper = styled.figure`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 1rem;
`

const FrontShadow = styled.svg`
  position: absolute;
  top: 0px;
  left: 0px;
  contain: strict;
`

const LocationWrapper = styled.figcaption`
  display: inline-flex;
`

const Location = styled.abbr`
  border-bottom: 0;
  color: white;
  font-size: 1.5rem;
  margin: 0 .20rem;
  text-align: center;
  text-decoration: none;
  transition: color 250ms cubic-bezier(.4, 0, .2, 1);
  display: block;
  font-family: ${fonts.primary};
`

const LocationType = styled(Location)`
  font-weight: bold;
`

class Clock extends Component {
  constructor() {
    super()
    this.state = {
      timezoneOffset: new Date().getTimezoneOffset(),
      request: requestAnimationFrame(this.tick.bind(this)),
      h: 0,
      m: 0,
      s: 0,
      minutes: 0,
    }
  }

  componentWillMount() {
    this.tick()
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.tick())
  }

  tick() {
    const time = moment().tz(this.props.timezone)
    const now = time.clone().unix() - time.clone().startOf('day').unix()
    const decimalMinute = ((60000 * time.clone().minutes()) + (1000 * time.clone().seconds()) + time.clone().milliseconds()) / 3600000
    const decimalHour = ((3600000 * time.clone().hours()) + (60000 * time.clone().minutes()) + (1000 * time.clone().seconds()) + time.clone().milliseconds()) / 43200000

    this.setState({
      decimalMinute,
      decimalHour,
      request: requestAnimationFrame(this.tick.bind(this)),
      h: now / 720,
      m: now / 60,
      s: now,
    })
  }

  render() {
    return (
      <Wrapper>
        <ClockFrame>
          { /* <div className="nums">
            {Array(12).fill().map(() => <div className="num" />)}
          </div> */ }
          <Handles>
            <ClockHand name="hour" rotate={this.state.h} gradient={this.props.gradient} />
            <ClockHand name="min" rotate={this.state.m} />
            { /* <ClockHand name="second" rotate={this.state.s} /> */ }
          </Handles>
          <FrontShadow viewBox={'0 0 100 100'}>
            <ClockShadow
              decimalMinute={this.state.decimalMinute}
              decimalHour={this.state.decimalHour}
              locationAbbr={this.props.locationAbbr}
            />
          </FrontShadow>
        </ClockFrame>
        <LocationWrapper>
          <LocationType title={this.props.location} >{this.props.locationAbbr}</LocationType>
          <Location title={this.props.country} >{this.props.countryAbbr}</Location>
        </LocationWrapper>
      </Wrapper>
    )
  }
}

Clock.propTypes = {
  location: PropTypes.string,
  locationAbbr: PropTypes.string,
  country: PropTypes.string,
  countryAbbr: PropTypes.string,
  timezone: PropTypes.string,
  gradient: PropTypes.string,
}


export default Clock
