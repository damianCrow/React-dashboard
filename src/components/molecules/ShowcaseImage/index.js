import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { MediaBluredBack } from 'components'
import { SlideshowLogic } from 'hoc'


const ImageWrapper = styled.div`
  height: 100%;
  left: 0;
  top: 0;
  width: 100%;
`

const InstagramImg = styled.img`
  height: 100%;
  object-fit: contain;
  position: relative;
  width: 100%;
  z-index: 1;
`

const ShowcaseImage = ({ currentImage, thumbnail }) => (
  <ImageWrapper>
    <InstagramImg src={currentImage} />
    {thumbnail && <MediaBluredBack media={thumbnail} type="image" />}
  </ImageWrapper>
)

ShowcaseImage.propTypes = {
  currentImage: PropTypes.string.isRequired,
  thumbnail: PropTypes.string,
}

export default SlideshowLogic(ShowcaseImage, 'showcase')
