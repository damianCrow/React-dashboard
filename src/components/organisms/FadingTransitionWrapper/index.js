import React, { PropTypes, Component } from 'react'
import styled from 'styled-components'
import Transition from 'react-transition-group/Transition'
// import ReactDOM from 'react-dom'

import { TweenMax } from 'gsap'

const Wrapper = styled(Transition)`
  display: flex;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 1;
  transition: opacity 2s ease-in-out;
`

// class FadingTransitionWrapper extends Component {

//   // componentWillEnter(callback) {


//   //   // TweenMax.fromTo(this.container, 2, { opacity: 0 }, { opacity: 1, onComplete: callback })
//   // }

//   // componentWillLeave(callback) {
//   //   this.container.addEventListener('transitionend', () => {
//   //     callback
//   //     // this.container.removeEventListener('transitionend', callback)
//   //   }, false)
//   //   this.container.style.opacity = 0

//   //   // TweenMax.fromTo(this.container, 2, { opacity: 1 }, { opacity: 0, onComplete: callback })
//   // }

//   // handleEnter() {
//   //   console.log('handleEnter')
//   //   console.log(this.container)
//   //   this.container.addEventListener('transitionend', () => {
//   //     console.log('transition finished')
//   //     // this.container.removeEventListener('transitionend', callback)
//   //   }, false)
//   //   this.container.style.opacity = 1
//   // }

//   // handleExit() {
//   //   console.log('handleExit')
//   //   this.container.addEventListener('transitionend', () => {
//   //     console.log('transition finished')
//   //     // this.container.removeEventListener('transitionend', callback)
//   //   }, false)
//   //   this.container.style.opacity = 0
//   // }

//   render() {
//     const { children } = this.props
//     // console.log('FadingTransitionWrapper props', this.props)
//     return null
//     return (
//       <Wrapper
//         // innerRef={(comp) => {
//         //   this.container = comp
//         // }}
//         // addEndListener={(node, done) => {
//         //   console.log('addEventListener fired')
//         //   node.addEventListener('transitionend', done, false)
//         // }}
//         timeout={2000}
//         onEnter={(node) => {
//           console.log('onEnter')
//           // node.style.opacity = 1
//         }}
//         // onExit={(node) => { node.style.opacity = 1 }}
//       >
//         {children}
//       </Wrapper>)
//   }
// }
// https://github.com/reactjs/react-transition-group/blob/master/migration.md
const FadingTransitionWrapper = ({ children: child, ...props }) => (
  // NOTICE THE SPREAD! THIS IS REQUIRED!
  <Transition {...props}>
    {(transitionState) => React.cloneElement(child, {
      style: getStyleBasedOnTransitionState(transitionState)
    })}
  </Transition>
)

FadingTransitionWrapper.propTypes = {
  children: PropTypes.node,
}

export default FadingTransitionWrapper

