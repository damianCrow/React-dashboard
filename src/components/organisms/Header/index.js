import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ifProp } from 'styled-tools'

// import { colors } from 'components/globals'
import { Icon, DigitalClock } from 'components'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: ${props => props.height ? props.height : '50px'};
  justify-content: flex-start;
  background: rgba(0, 0, 0, .1);

  & > :not(:first-child) {
    margin-left: 1rem;
  }
`

const ColourdIcon = styled(Icon)`
  color: white;
  background: rgba(0, 0, 0, .1);
  height: 100%;
  padding: 2.5rem;
  margin: 0;
  width: 150px;
`

const Header = (props) => {
  return (
    <Wrapper {...props}>
      <ColourdIcon height={50} icon="interwink" />
      <DigitalClock />
    </Wrapper>
  )
}

Header.Header = {
  height: PropTypes.number,
}

export default Header
