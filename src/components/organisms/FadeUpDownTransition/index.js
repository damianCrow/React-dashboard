import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import Transition from 'react-transition-group/Transition'
import { TweenLite } from 'gsap'

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
const FadeUpDownTransition = ({ children: child, ...props }) => (
  // NOTICE THE SPREAD! THIS IS REQUIRED!
  <Transition
    {...props}
    timeout={2500}
    onEnter={(node, isAppearing) => {
      TweenLite.fromTo(node, 2, { opacity: 0, y: '100%' }, { opacity: 1, y: '0%', ease: Expo.easeInOut })
    }}
    onExit={node => {
      TweenLite.to(node, 2, { opacity: 0, y: '-100%', ease: Expo.easeInOut })
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

FadeUpDownTransition.propTypes = {
  children: PropTypes.node,
}

export default FadeUpDownTransition

