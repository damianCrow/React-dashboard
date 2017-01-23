import React, { PropTypes, Component } from 'react'
// import ReactDOM from 'react-dom'
import styled from 'styled-components'

// import { TweenMax } from 'gsap'

const ImageWrapper = styled.div`
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`

const InstagramImg = styled.img`
  height: 100%;
  left: 0;
  object-fit: contain;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;
`

const ThumbnailBackground = styled.img`
  filter: blur(3px);
  height: 100%;
  left: 0;
  object-fit: cover;
  position: absolute;
  top: 0;
  transform: scale(1.1)
  width: 100%;
`

class InstagramImage extends Component {
  static propTypes = {
    currentImage: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired
  }

  // componentWillEnter (callback) {
  //   const el = ReactDOM.findDOMNode(this)
  //   console.log('InstagramImage, componentWillEnter')
  //   // callback()
  //   TweenMax.fromTo(el, 1, {opacity: 0}, {opacity: 1, onComplete: callback})
  // }

  // componentWillLeave (callback) {
  //   const el = ReactDOM.findDOMNode(this)
  //   console.log('InstagramImage, componentWillLeave')
  //   // callback()
  //   TweenMax.fromTo(el, 1, {opacity: 1}, {opacity: 0, onComplete: callback})
  // }

  render () {
    const { currentImage, thumbnail } = this.props
    return (
      <ImageWrapper>
        <InstagramImg src={currentImage} />
        <ThumbnailBackground src={thumbnail} />
      </ImageWrapper>
    )
  }
}

export default InstagramImage
