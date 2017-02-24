import React from 'react'
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

const DigitalClock = (props) => {
  return (
    <Wrapper >
      <span>{moment().format('LT')}</span>
    </Wrapper>
  )
}

export default DigitalClock
