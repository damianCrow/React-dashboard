import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import ReactDOM from 'react-dom'
import styled from 'styled-components'

// import { TweenMax } from 'gsap'

const MediaWrapper = styled.div`
  height: 100%;
  left: 0;
  mix-blend-mode: lighten;
  opacity: .5;
  position: absolute;
  top: 0;
  width: 100%;
`

const Image = styled.img`
  filter: blur(8px);
  height: 100%;
  left: 0;
  object-fit: cover;
  opacity: .5;
  position: absolute;
  top: 0;
  transform: scale(1.1);
  width: 100%;
`

const Video = styled.video`
  filter: blur(8px);
  height: 100%;
  left: 0;
  object-fit: cover;
  position: absolute;
  top: 0;
  transform: scale(1.1);
  width: 100%;
`

class MediaBluredBack extends Component {
  render() {
    const { type, media } = this.props
    return (
      <MediaWrapper>
        {(type === 'image' || type === 'carousel') ? <Image src={media} /> : <Video src={media} autoPlay="true" muted /> }
      </MediaWrapper>
    )
  }
}

MediaBluredBack.propTypes = {
  type: PropTypes.string.isRequired,
  media: PropTypes.string.isRequired,
}

MediaBluredBack.defaultProps = {
  type: '',
  media: '',
}


export default MediaBluredBack
