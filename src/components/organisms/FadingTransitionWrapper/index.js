import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components'
import Transition from 'react-transition-group/Transition'
// import ReactDOM from 'react-dom'

import { TweenMax } from 'gsap'

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const ChildContainer = styled.div`
  animation: 2s ${fadeIn} ease-in-out;
  display: flex;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 1;
  transition: opacity 2s ease-in-out;
`

// https://github.com/reactjs/react-transition-group/blob/master/migration.md
const FadingTransitionWrapper = ({ children: child, ...props }) => (
  // NOTICE THE SPREAD! THIS IS REQUIRED!
  <Transition
    {...props}
    timeout={2500}
    onExit={(node) => {
      node.style.opacity = 0
    }}
    addEndListener={(node, done) => {
      // use the css transitionend event to mark the finish of a transition
      node.addEventListener('transitionend', done, false)
    }}
  >
    <ChildContainer>
      {child}
    </ChildContainer>
  </Transition>
)

FadingTransitionWrapper.propTypes = {
  children: PropTypes.node,
}

export default FadingTransitionWrapper

