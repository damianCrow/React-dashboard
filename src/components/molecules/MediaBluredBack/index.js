import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const MediaWrapper = styled.div`
  height: 100%;
  left: 0;
  mix-blend-mode: darken;
  opacity: .75;
  position: absolute;
  top: 0;
  width: 100%;
`

const Image = styled.img`
  filter: blur(8px);
  height: 100%;
  left: 0;
  object-fit: cover;
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

const MediaBluredBack = ({ type, media }) => (
  <MediaWrapper>
    {(type === 'image' || type === 'carousel') ? <Image src={media} /> : <Video src={media} autoPlay="true" muted /> }
  </MediaWrapper>
)


MediaBluredBack.propTypes = {
  type: PropTypes.string.isRequired,
  media: PropTypes.string.isRequired,
}

MediaBluredBack.defaultProps = {
  type: '',
  media: '',
}

export default MediaBluredBack
