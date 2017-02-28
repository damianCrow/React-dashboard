import React from 'react'
import styled from 'styled-components'

import { colors } from 'components/globals'
import { Icon, DigitalClock } from 'components'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1rem;
  margin-bottom: 1rem;
  width: 100%;
  justify-content: space-between;

  & > :not(:first-child) {
    margin-left: 1rem;
  }
`

const Header = (props) => {
  return (
    <Wrapper {...props}>
      <Icon size={75} icon="interwink" />
      <DigitalClock />
    </Wrapper>
  )
}

export default Header
