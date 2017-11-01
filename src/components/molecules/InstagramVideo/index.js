import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { SlideshowLogic } from 'hoc'

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

// const InstagramVideo = ({ currentVideo, nextComponent }) => {
class InstagramVideo extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentVideo !== this.props.currentVideo) {
      console.log('new video src, forcing rerender')
      this.forceUpdate()
    }
  }

  render() {
    return (
      <ImageWrapper>
        { /* Temp fix for chrome or instagram server cahce error: https://github.com/igvteam/igv.js/issues/424 */ }
        <InstagramVideoSrc
          src={`${this.props.currentVideo}?chromeCacheBugBust=${Math.random().toString(36)}`}
          autoPlay="true"
          muted
          onEnded={() => this.props.nextComponent()}
        />
      </ImageWrapper>
    )
  }
}

InstagramVideo.propTypes = {
  currentVideo: PropTypes.string.isRequired,
  nextComponent: PropTypes.func.isRequired,
}

InstagramVideo.defaultProps = {
  currentVideo: '',
}

export default SlideshowLogic(InstagramVideo, 'instagram', false)
