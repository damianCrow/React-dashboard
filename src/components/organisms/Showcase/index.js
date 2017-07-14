import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import styled, { css } from 'styled-components'
import TransitionGroup from 'react-transition-group/TransitionGroup'

import { pauseServiceSlideshow } from 'store/actions'
import { FadingTransitionWrapper, ImageFeature, YouTubeVideo } from 'components'

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

const Showcase = ({ children, ...props, media, mediaType, itemId, url, serviceId }) => {
  // console.log('Instagram comp posts: ', posts)
  // console.log('INSTAGRAM COMP mediaType', mediaType)
  // console.log('INSTAGRAM COMP posts', posts)
  // console.log('INSTAGRAM COMP THUMBNAIL: ', posts.images.thumbnail.url)
  let showcaseItem = null
  if (mediaType === 'Image') {
    showcaseItem = (<ImageFeature
      currentImage={url}
      thumbnail={url}
    />)
  } else if (mediaType === 'Video') {
    props.pauseInstaSlideshow()
    showcaseItem = (<YouTubeVideo
      serviceId={serviceId}
    />)
  }


  return (
    <TransitionWrapper>
      <FadingTransitionWrapper>
        {showcaseItem}
      </FadingTransitionWrapper>
    </TransitionWrapper>
  )
}

Showcase.propTypes = {
  children: PropTypes.any,
  url: PropTypes.string,
  serviceId: PropTypes.string,
  itemId: PropTypes.string.isRequired,
  mediaType: PropTypes.string,
  pauseInstaSlideshow: PropTypes.func.isRequired,
}


const mapDispatchToProps = (dispatch) => ({
  pauseInstaSlideshow: () => dispatch(pauseServiceSlideshow('showcase')),
})


export default connect(null, mapDispatchToProps)(Showcase)
