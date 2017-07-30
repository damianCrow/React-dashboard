import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import styled, { css } from 'styled-components'
import TransitionGroup from 'react-transition-group/TransitionGroup'

import { pauseServiceSlideshow, resumeServiceSlideshow } from 'store/actions'
import { FadingTransitionWrapper, ImageFeature, YouTubeVideo, VimeoVideo } from 'components'

const styles = ({ ...props }) => css`
  color: black;
  display: block;
  height: 100%;
  justify-content: center;
  left: 0;
  overflow: hidden;
  position: absolute;
  text-align: left;
  top: 0;
  width: 100%;
`

// const InstagramWrapperStyled = styled(InstagramTransitionWrapper)`${wrapperStyles}`
const TransitionWrapper = styled(TransitionGroup)`${styles}`

// const PlaybackIcon = styled.Icon`
//   display: absolute;
// `

// const StyledIcon = styled(Icon)`${iconStyles}`

const Showcase = ({ children, ...props, slideshowState, mediaType, itemId, url, serviceId, serviceName }) => {
  // console.log('Instagram comp posts: ', posts)
  // console.log('INSTAGRAM COMP mediaType', mediaType)
  // console.log('INSTAGRAM COMP posts', posts)
  // console.log('INSTAGRAM COMP THUMBNAIL: ', posts.images.thumbnail.url)
  let showcaseItem = null
  if (mediaType === 'Image') {
    if(slideshowState === 'paused') {
      props.resumeServiceSlideshow()
    }
    showcaseItem = <ImageFeature currentImage={url} thumbnail={url} />
  } else if (mediaType === 'Video' && serviceName === 'youtube') {
    console.log('pauseShowcaseSlideshow')
    // props.pauseShowcaseSlideshow()
    showcaseItem = <YouTubeVideo serviceId={serviceId} />
  } else if (mediaType === 'Video' && serviceName === 'vimeo') {
    props.pauseShowcaseSlideshow()
    showcaseItem = <VimeoVideo url={url} serviceId={serviceId} />
  }

  if (showcaseItem) {
    return (
      <TransitionWrapper>
        <FadingTransitionWrapper
          key={itemId}
        >
          {showcaseItem}
        </FadingTransitionWrapper>
      </TransitionWrapper>
    )
  }

  return null
}

Showcase.propTypes = {
  children: PropTypes.any,
  url: PropTypes.string,
  serviceId: PropTypes.string,
  itemId: PropTypes.string.isRequired,
  mediaType: PropTypes.string,
  pauseShowcaseSlideshow: PropTypes.func.isRequired,
  serviceName: PropTypes.string,
  slideshowState: PropTypes.string,
}


const mapDispatchToProps = (dispatch) => ({
  pauseShowcaseSlideshow: () => dispatch(pauseServiceSlideshow('SHOWCASE')),
  resumeServiceSlideshow: () => dispatch(resumeServiceSlideshow('SHOWCASE', 15000)), 
})


export default connect(null, mapDispatchToProps)(Showcase)
