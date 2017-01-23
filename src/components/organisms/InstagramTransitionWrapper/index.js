import React, { PropTypes, Component } from 'react'
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

    return (<div>{ children }</div>)
  }
}

export default InstagramTransitionWrapper

