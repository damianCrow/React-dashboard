import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { startInstagramSlideshow } from 'store/actions'

import { TweenMax } from 'gsap'

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: black;
  top: 0;
  left: 0;
`

const InstagramVideoSrc = styled.video`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

class InstagramVideo extends Component {
  static propTypes = {
    currentVideo: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentWillEnter (callback) {
    const el = ReactDOM.findDOMNode(this)
    console.log('INSTAGRAM VIDEO ENTERING')
    // callback()
    TweenMax.fromTo(el, 1, {opacity: 0}, {opacity: 1, onComplete: callback})
  }

  componentWillLeave (callback) {
    const el = ReactDOM.findDOMNode(this)
    console.log('componentWillLeave')
    // callback()
    TweenMax.fromTo(el, 1, {opacity: 1}, {opacity: 0, onComplete: callback})
  }

  onVideoEnd () {
    const { dispatch } = this.props
    dispatch(startInstagramSlideshow())
  }

  render () {
    const { currentVideo } = this.props
    return (
      <ImageWrapper>
        <InstagramVideoSrc src={currentVideo} autoPlay="true" muted onEnded={this.onVideoEnd} />
      </ImageWrapper>
    )
  }
}

export default InstagramVideo
