import React, { Component } from 'react'
import styled from 'styled-components'
import moment from 'moment-timezone'
import { fonts } from 'components/globals'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  color: white;
  font-family: ${fonts.primary};
  font-weight: bold;
  font-size: 3rem;

  & > :not(:first-child) {
    margin-left: 1rem;
  }
`
class DigitalClock extends Component {

  constructor(props) {
    super(props)

    this.state = {
      theDateUK: new Date(),
    }
    this.updateTimeUK = this.updateTimeUK.bind(this)
  }

  componentDidMount() {
    requestAnimationFrame(this.updateTimeUK)
  }

  updateTimeUK() {
    this.setState({ theDateUK: new Date() })
    requestAnimationFrame(this.updateTimeUK)
  }

  render() {
    return (
      <Wrapper>
        <span>{moment(this.state.theDateUK).format('HH:mm')}</span>
        {/* <span>🇭🇰 {moment(this.state.time).tz('Asia/Hong_Kong').format('LT')}</span>
        <span>🇩🇪 {moment(this.state.time).tz('Europe/Berlin').format('LT')}</span> */}
      </Wrapper>
    )
  }
}

export default DigitalClock
