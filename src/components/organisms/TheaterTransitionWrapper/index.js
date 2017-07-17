import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components'
import ReactDOM from 'react-dom'

import { TweenMax } from 'gsap'

class FadingTransitionWrapper extends Component {
  static propTypes = {
    children: PropTypes.any
  }

  componentWillEnter (callback) {
    const el = ReactDOM.findDOMNode(this)
    TweenMax.fromTo(el, 1, {opacity: 0}, {opacity: 1, onComplete: callback})
  }

  componentWillLeave (callback) {
    const el = ReactDOM.findDOMNode(this)
    TweenMax.fromTo(el, 1, {opacity: 1}, {opacity: 0, onComplete: callback})
  }

  render () {
    const { children } = this.props

    const Wrapper = styled.div`
      display: flex;
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
    `

    return (<Wrapper>{ children }</Wrapper>)
  }
}

export default FadingTransitionWrapper

