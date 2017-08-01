import React, { Component } from 'react'
import PropTypes from 'prop-types'

// import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { SlideshowLogic } from 'hoc'

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


const InstagramVideo = ({ currentVideo, nextComponent }) => {
  return (
    <ImageWrapper>
      <InstagramVideoSrc
        src={currentVideo}
        autoPlay="true"
        muted
        onEnded={() => {
          console.log('ended')
          nextComponent()
        }}
      />
    </ImageWrapper>
  )
}

InstagramVideo.propTypes = {
  currentVideo: PropTypes.string.isRequired,
  nextComponent: PropTypes.func.isRequired,
}

InstagramVideo.defaultProps = {
  currentVideo: '',
}

export default SlideshowLogic(InstagramVideo, 'instagram', false)

