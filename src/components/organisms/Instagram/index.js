import PropTypes from 'prop-types'
import React from 'react'
import styled, { css } from 'styled-components'
import TransitionGroup from 'react-transition-group/TransitionGroup'

import { fonts } from 'components/globals'

import { FadingTransitionWrapper, InstagramFrame, MediaBluredBack } from 'components'

const TransitionWrapper = styled(TransitionGroup)`
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  flex: 1;
  width: 100%;
  height: 100%;
`

const InstagramWrapper = styled.section`
  color: white;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  left: 0;
  overflow: hidden;
  position: absolute;
  text-align: left;
  top: 0;
  font-family: ${fonts.primary};
  width: 100%;
`

const Instagram = ({ children, ...props, posts, mediaType, slideShowKey }) => {
  let currentPost
  if (mediaType === 'image' || mediaType === 'carousel') {
    currentPost = (
      <MediaBluredBack
        media={posts.images.thumbnail.url}
        type="image"
      />
    )
  } else if (mediaType === 'video') {
    currentPost = (
      <MediaBluredBack
        media={posts.videos.low_bandwidth.url}
        type="video"
      />
    )
  }

  return (
    <InstagramWrapper>
      <TransitionWrapper>
        <FadingTransitionWrapper key={slideShowKey}>
          {currentPost}
        </FadingTransitionWrapper>
      </TransitionWrapper>
      <InstagramFrame {...props} />
    </InstagramWrapper>
  )
}

Instagram.propTypes = {
  children: PropTypes.any,
  // isFetching: PropTypes.bool.isRequired,
  posts: PropTypes.object.isRequired,
  slideShowKey: PropTypes.string.isRequired,
  mediaType: PropTypes.string,
}

export default Instagram
