import React, { PropTypes } from 'react'
import styled, { css } from 'styled-components'
import ReactTransitionGroup from 'react-addons-transition-group'

import { InstagramTransitionWrapper, InstagramImage, InstagramVideo } from 'components'

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

const Instagram = ({ children, ...props, posts, mediaType, isFetching, slideShowKey }) => {
  // console.log('Instagram comp posts: ', posts)
  // console.log('INSTAGRAM COMP mediaType', mediaType)
  // console.log('INSTAGRAM COMP posts', posts)
  // console.log('INSTAGRAM COMP THUMBNAIL: ', posts.images.thumbnail.url)

  return (
    <TransitionWrapper style={{ opacity: isFetching ? 0.5 : 1 }} >
      <InstagramTransitionWrapper key={slideShowKey}>
        {mediaType === 'image' ? (
          <InstagramImage
            currentImage={posts.images.standard_resolution.url}
            thumbnail={posts.images.thumbnail.url}
          />
        ) : (
          <InstagramVideo
            currentVideo={posts.videos.standard_resolution.url}
            lowBandwidthVideo={posts.videos.low_bandwidth.url}
          />
        )}
      </InstagramTransitionWrapper>
    </TransitionWrapper>
  )
}

Instagram.propTypes = {
  children: PropTypes.any,
  isFetching: PropTypes.bool.isRequired,
  posts: PropTypes.object.isRequired,
  slideShowKey: PropTypes.number.isRequired,
  mediaType: PropTypes.string
}

export default Instagram
