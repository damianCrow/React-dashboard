import React, { Component } from 'react'
import styled from 'styled-components'

import moment from 'moment'

import { fonts } from 'components/globals'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  color: white;
  font-family: ${fonts.primary};
  font-size: 3rem;

  & > :not(:first-child) {
    margin-left: 1rem;
  }
`

class DigitalClock extends Component {

  constructor (props) {
    super(props)

    this.state = {
      time: new Date()
    }
  }

  componentDidMount () {
    setInterval(this.update, 1000)
  }

  update = () => {
    this.setState({
      time: new Date()
    })
  }

  render () {
    return (
      <Wrapper>
        <span>{moment(this.state.time).format('LT')}</span>
      </Wrapper>
    )
  }
}

export default DigitalClock
