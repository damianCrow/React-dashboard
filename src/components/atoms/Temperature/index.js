import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchWeather } from 'store/actions'
import { fonts } from 'components/globals'

import styled from 'styled-components'

const Temp = styled.span`
  text-align: center;
  color: white;
  font-family: ${fonts.primary};
  font-weight: bold;
  font-size: 3rem;
  padding: 1rem;
  > span {
    font-weight: lighter;
    font-size: 2rem;
    vertical-align: top;
  }
`

class Temperature extends Component {
  componentWillMount() {
    this.props.fetchWeather()
  }

  render() {
    return (
      <Temp>
        {Math.round(this.props.temperatureFigure)}
        <span>°</span>C
      </Temp>
    )
  }
}

// Listen and capture any changes made as a result of the the actions below.
const mapStateToProps = (state) => ({
  temperatureFigure: state.weather.data.main.temp,
})

const mapDispatchToProps = (dispatch) => ({
  fetchWeather: () => dispatch(fetchWeather()),
})

Temperature.propTypes = {
  temperatureFigure: PropTypes.number,
  fetchWeather: PropTypes.func,
}

Temperature.defaultProps = {
  temperatureFigure: 0,
}

export default connect(mapStateToProps, mapDispatchToProps)(Temperature)
