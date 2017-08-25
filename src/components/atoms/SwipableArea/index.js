import styled from 'styled-components'
import Swipeable from 'react-swipeable'
import PropTypes from 'prop-types'
import React from 'react'
import { Heading } from 'components'

const Wrapper = styled(Swipeable)`
  width: calc(100% - 2px);
  background-repeat: no-repeat;
  background-position: 50% 10%;
  background-size: 40%;
  position: relative;
  min-height: 33.33%;
    &:before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: -1;
      background: ${props => props.image ? `url(../../../public/${props.image}` : 'url(../../../public/swipe-up-icon.png'});
      background-repeat: no-repeat;
      background-position: 50% 0;
      background-size: 33%;
    }
  &.swipe_left {
    &:before {
      width: 62%;
      height: 162%;
      top: -20%;
      left: 19%;
      background-position: 0;
      background-size: 50%;
      transform: rotate(-90deg) rotate3d(0,1,0,180deg);
    }
  }
`

const Footer = styled(Heading)`
  position: absolute;
  bottom: 15%;
  transform: translateX(-50%);
  left: 50%;  
  width: 100%;
  &.swipe_left {
    bottom: 37.5%;
  }
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
