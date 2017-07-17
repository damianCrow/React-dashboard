import styled from 'styled-components'
import Swipeable from 'react-swipeable'
import PropTypes from 'prop-types';
import React from 'react';
import { Heading } from 'components'

const Wrapper = styled(Swipeable)`
  width: calc(100% - 2px);
  background-image: url('../../public/swipe-up-icon.png');
  background-repeat: no-repeat;
  background-position: 50% 10%;
  background-size: 40%;
  position: relative;
  min-height: 35%;
`

const Footer = styled(Heading)`
position: absolute;
bottom: 0;
`

const SwipableArea = (props) => {
  const { swipedUp } = props
  return (
    <Wrapper onSwipedUp={swipedUp}>
      <Footer level={6}> Swipe up to overide queue </Footer>
    </Wrapper>
  )
}

SwipableArea.propTypes = {
  swipedUp: PropTypes.func,
}
export default SwipableArea
