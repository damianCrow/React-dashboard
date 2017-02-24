import React, { PropTypes, Component } from 'react'
import styled from 'styled-components'
import ReactDOM from 'react-dom'

import { TweenMax } from 'gsap'

class InstagramTransitionWrapper extends Component {
  static propTypes = {
    children: PropTypes.any
  }

  componentWillEnter (callback) {
    const el = ReactDOM.findDOMNode(this)
    console.log('InstagramTransitionWrapper componentWillEnter')
    TweenMax.fromTo(el, 1, {opacity: 0}, {opacity: 1, onComplete: callback})
  }

  componentWillLeave (callback) {
    const el = ReactDOM.findDOMNode(this)
    console.log('InstagramTransitionWrapper componentWillLeave')
    TweenMax.fromTo(el, 1, {opacity: 1}, {opacity: 0, onComplete: callback})
  }

  render () {
    const { children } = this.props

    const InstagramWrapper = styled.div`
      display: flex;
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
    `

    return (<InstagramWrapper>{ children }</InstagramWrapper>)
  }
}

export default InstagramTransitionWrapper

