import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import { TweenMax } from 'gsap'

const imageWrapper = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`

const actualImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`

class InstagramImage extends Component {
  static propTypes = {
    currentImage: PropTypes.string.isRequired
  }

  componentWillEnter (callback) {
    const el = ReactDOM.findDOMNode(this)
    console.log('componentWillEnter')
    // callback()
    TweenMax.fromTo(el, 1, {x: 100, opacity: 0}, {x: 0, opacity: 1, onComplete: callback})
  }

  componentWillLeave (callback) {
    const el = ReactDOM.findDOMNode(this)
    console.log('componentWillLeave')
    // callback()
    TweenMax.fromTo(el, 1, {x: 0, opacity: 1}, {x: -100, opacity: 0, onComplete: callback})
  }

  render () {
    const { currentImage } = this.props
    return (
      <imageWrapper>
        <actualImage src={currentImage} />
      </imageWrapper>
    )
  }
}

export default InstagramImage
