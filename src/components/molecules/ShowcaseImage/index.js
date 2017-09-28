import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import { MediaBluredBack } from 'components'
import { SlideshowLogic } from 'hoc'
import 'lazysizes/plugins/attrchange/ls.attrchange'
import 'lazysizes/plugins/respimg/ls.respimg'
import 'lazysizes/plugins/parent-fit/ls.parent-fit'
import 'lazysizes'


const ImageWrapper = styled.div`
  height: 100%;
  left: 0;
  top: 0;
  width: 100%;
`
const Animate = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.15);
  } 
`
const FeaturedImage = styled.img`
  height: 100%;
  object-fit: cover;
  object-position: cover;
  position: relative;
  width: 100%;
  z-index: 1;
  animation: ${Animate} 14s linear forwards;
  -webkit-filter: blur(5px);
  filter: blur(5px);
  transition: filter 400ms;
  &.lazyloaded {
    -webkit-filter: blur(0);
    filter: blur(0);
  }
`

const ShowcaseImage = ({ currentImage, preview }) => (
  <ImageWrapper>
    <FeaturedImage
      src={currentImage}
      srcSet={preview}
      data-srcset={`${currentImage} 1080w 607h`}
      data-sizes="auto"
      className="lazyload"
    />
    {preview && <MediaBluredBack media={preview} type="image" />}
  </ImageWrapper>
)

ShowcaseImage.propTypes = {
  currentImage: PropTypes.string.isRequired,
  preview: PropTypes.string,
}

export default SlideshowLogic(ShowcaseImage, 'showcase')
