import React, { PropTypes, Component } from 'react'
// import ReactDOM from 'react-dom'
import styled from 'styled-components'

// import { TweenMax } from 'gsap'

const MediaWrapper = styled.div`
  height: 100%;
  left: 0;
  top: 0;
  width: 100%;
  position: absolute;
  background: black;
`

const Image = styled.img`
  filter: blur(8px);
  height: 100%;
  left: 0;
  object-fit: cover;
  position: absolute;
  top: 0;
  transform: scale(1.1);
  opacity: .5;
  width: 100%;
`

const Video = styled.video`
  filter: blur(8px);
  height: 100%;
  left: 0;
  object-fit: cover;
  position: absolute;
  top: 0;
  transform: scale(1.1)
  width: 100%;
`

class MediaBluredBack extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    media: PropTypes.string.isRequired
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

  render() {
    const { type, media } = this.props
    return (
      <MediaWrapper>
        {type === 'image' &&
          <Image src={media} />
        }
        {/* <Video src={media} autoPlay="true" muted />*/ }
      </MediaWrapper>
    )
  }
}

export default MediaBluredBack
