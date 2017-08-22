import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchWeather } from 'store/actions'
import { SunIcon, RainIcon, CloudIcon, MoonIcon, CloudSun } from 'components'

import styled from 'styled-components'

const IconContainer = styled.svg`
  height: 100px;
  vertical-align: middle;
`

function whichIcon(iconCode) {
  // https://openweathermap.org/weather-conditions
  // https://codepen.io/juan/pen/eDwKo
  switch (iconCode) {
    case '01d':
      return <SunIcon color="white" />
    case '01n':
      return <MoonIcon color="white" />
    case '02d':
      return <CloudSun color="white" />
    case '02n':
    case '03d':
    case '03n':
    case '04d':
    case '04n':
    case '50d':
    case '50n':
      return <CloudIcon color="white" />
    case '09d':
    case '09n':
    case '10d':
    case '10n':
    case '11d':
    case '11n':
    case '13d':
    case '13n':
      return <RainIcon color="white" />
    default:
      return null
  }
}

class WeatherIcon extends Component {
  componentWillMount() {
    this.props.fetchWeather()
  }

  render() {
    return (
      <IconContainer viewBox="15 15 70 70">
        {whichIcon(this.props.iconCode)}
      </IconContainer>
    )
  }
}

// Listen and capture any changes made as a result of the the actions below.
const mapStateToProps = state => ({
  iconCode: state.weather.data.weather[0].icon,
})

const mapDispatchToProps = dispatch => ({
  fetchWeather: () => dispatch(fetchWeather()),
})

WeatherIcon.propTypes = {
  iconCode: PropTypes.string,
  fetchWeather: PropTypes.func,
  weather: PropTypes.object,
}

WeatherIcon.defaultProps = {
  iconCode: '',
  weather: {},
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherIcon)
