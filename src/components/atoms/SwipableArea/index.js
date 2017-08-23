import styled from 'styled-components'
import Swipeable from 'react-swipeable'
import PropTypes from 'prop-types'
import React from 'react'
import { Heading } from 'components'

const Wrapper = styled(Swipeable)`
  width: calc(100% - 2px);
  background-image: ${props => props.image ? `url(../../../public/${props.image}` : 'url(../../../public/swipe-up-icon.png'});
  background-repeat: no-repeat;
  background-position: 50% 10%;
  background-size: 40%;
  position: relative;
  min-height: 33.33%;
  &.swipe_left {
    background-size: 35%;
    transform: rotate(-90deg) rotate3d(0, 1, 0, 180deg) translateY(-50%);
    height: 55%;
    width: 75%;
    background-position: 0 50%;
    bottom: 3.75rem;
    left: 65%;
  }
`
const Footer = styled(Heading)`
  position: absolute;
  bottom: 0;
  transform: translateX(-50%);
  left: 50%;
  &.swipe_left {
    left: -0.75rem;
    bottom: calc(50% - 15px);
    transform: translateY(-50%) translateX(8%) rotate(-90deg) rotate3d(0, 1, 0, 180deg);
`

const SwipableArea = (props) => {
  const { classes, swipedDown, swipedRight, swipedLeft, swipedUp, children } = props
  return (
    <Wrapper className={classes} onSwipedDown={swipedDown} onSwipedRight={swipedRight} onSwipedLeft={swipedLeft} onSwipedUp={swipedUp}>
      <Footer className={classes} level={6}>{children}</Footer>
    </Wrapper>
  )
}

SwipableArea.propTypes = {
  swipedUp: PropTypes.func,
  swipedDown: PropTypes.func,
  swipedRight: PropTypes.func,
  swipedLeft: PropTypes.func,
}
export default SwipableArea
