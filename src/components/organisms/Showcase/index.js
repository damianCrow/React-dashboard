import React, { PropTypes } from 'react'
import styled, { css } from 'styled-components'
import ReactTransitionGroup from 'react-addons-transition-group'

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
const TransitionWrapper = styled(ReactTransitionGroup)`${styles}`

// const PlaybackIcon = styled.Icon`
//   display: absolute;
// `

// const StyledIcon = styled(Icon)`${iconStyles}`

const Showcase = ({ children, ...props, media, mediaType, isFetching, slideShowKey }) => {
  // console.log('Instagram comp posts: ', posts)
  // console.log('INSTAGRAM COMP mediaType', mediaType)
  // console.log('INSTAGRAM COMP posts', posts)
  // console.log('INSTAGRAM COMP THUMBNAIL: ', posts.images.thumbnail.url)

  return (
    <TransitionWrapper style={{ opacity: isFetching ? 0.5 : 1 }} >
      <FadingTransitionWrapper key={slideShowKey}>
        {mediaType === 'image' ? (
          <ImageFeature
            currentImage={media.file_name}
            thumbnail={media.file_name}
          />
        ) : (
          <YouTubeVideo
            youtubeId={media.youtube_id}
          />
        )}
      </FadingTransitionWrapper>
    </TransitionWrapper>
  )
}

Showcase.propTypes = {
  children: PropTypes.any,
  isFetching: PropTypes.bool.isRequired,
  media: PropTypes.object.isRequired,
  slideShowKey: PropTypes.number.isRequired,
  mediaType: PropTypes.string
}

export default Showcase
