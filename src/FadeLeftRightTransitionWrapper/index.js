import PropTypes from 'prop-types'
import React from 'react'
import styled, { keyframes } from 'styled-components'
import Transition from 'react-transition-group/Transition'
// import ReactDOM from 'react-dom'

import { TweenLite } from 'gsap'

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const ChildContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 1;
`

// https://github.com/reactjs/react-transition-group/blob/master/migration.md
const FadeLeftRightTransitionWrapper = ({ children: child, ...props }) => (
  // NOTICE THE SPREAD! THIS IS REQUIRED!
  <Transition
    {...props}
    timeout={2500}
    onEnter={(node, isAppearing) => {
      TweenLite.fromTo(node, 2, { opacity: 0, x: '100%' }, { opacity: 1, x: '0%' })
    }}
    onExit={node => {
      TweenLite.to(node, 2, { opacity: 0, x: '-100%' })
    }}
    // addEndListener={(node, done) => {
    //   // use the css transitionend event to mark the finish of a transition
    //   node.addEventListener('transitionend', done, false)
    // }}
  >
    <ChildContainer>
      {child}
    </ChildContainer>
  </Transition>
)

FadeLeftRightTransitionWrapper.propTypes = {
  children: PropTypes.node,
}

export default FadeLeftRightTransitionWrapper

