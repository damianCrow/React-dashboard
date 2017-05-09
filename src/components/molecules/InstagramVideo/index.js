import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { resumeServiceSlideshow } from 'store/actions'

// import { TweenMax } from 'gsap'

const ImageWrapper = styled.div`
  height: 100%;
  left: 0;
  top: 0;
  width: 100%;
`

const InstagramVideoSrc = styled.video`
  height: 100%;
  object-fit: contain;
  position: relative;
  width: 100%;
  z-index: 1;
`

class InstagramVideo extends Component {

  // constructor() {
  //   super()
  //   // this.onVideoEnd = this.onVideoEnd.bind(this)
  // }

  // componentWillEnter (callback) {
  //   const el = ReactDOM.findDOMNode(this)
  //   console.log('InstagramVideo componentWillEnter')
  //   TweenMax.fromTo(el, 1, {opacity: 0}, {opacity: 1, onComplete: callback})
  // }

  // componentWillLeave (callback) {
  //   const el = ReactDOM.findDOMNode(this)
  //   console.log('InstagramVideo componentWillLeave')
  //   TweenMax.fromTo(el, 1, {opacity: 1}, {opacity: 0, onComplete: callback})
  // }

  // onVideoEnd() {
  //   this.props.resumeAutoSlides
  // }

  render() {
    const { currentVideo, resumeInstaSlideshow } = this.props
    return (
      <ImageWrapper>
        <InstagramVideoSrc
          src={currentVideo}
          autoPlay="true"
          muted
          onEnded={() => resumeInstaSlideshow()}
        />
      </ImageWrapper>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  resumeInstaSlideshow: () => dispatch(resumeServiceSlideshow('instagram')),
})

InstagramVideo.propTypes = {
  currentVideo: PropTypes.string.isRequired,
  resumeInstaSlideshow: PropTypes.func,
}

InstagramVideo.defaultProps = {
  currentVideo: '',
}

export default connect(null, mapDispatchToProps)(InstagramVideo)
