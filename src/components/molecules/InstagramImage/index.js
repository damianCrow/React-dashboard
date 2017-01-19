import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import { TweenMax } from 'gsap'

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: black;
  top: 0;
  left: 0;
`

const InstagramImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

class InstagramImage extends Component {
  static propTypes = {
    currentImage: PropTypes.string.isRequired
  }

  componentWillEnter (callback) {
    const el = ReactDOM.findDOMNode(this)
    console.log('componentWillEnter')
    // callback()
    TweenMax.fromTo(el, 1, {opacity: 0}, {opacity: 1, onComplete: callback})
  }

  componentWillLeave (callback) {
    const el = ReactDOM.findDOMNode(this)
    console.log('componentWillLeave')
    // callback()
    TweenMax.fromTo(el, 1, {opacity: 1}, {opacity: 0, onComplete: callback})
  }

  render () {
    const { currentImage } = this.props
    return (
      <ImageWrapper>
        <InstagramImg src={currentImage} />
      </ImageWrapper>
    )
  }
}

export default InstagramImage
