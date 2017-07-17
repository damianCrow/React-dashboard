import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import { incrementServiceSlideshow } from 'store/actions'


import { fonts, compHeader } from 'components/globals'

import { FadingTransitionWrapper, ImageFeature, InstagramVideo, Icon, MetaTags, Ticker } from 'components'

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

const InstagramMedia = styled.div`
  overflow: hidden;
  flex: 1 0 auto;
  margin: 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`

const InstagramCaption = styled.span`
  display: inline-block;
  flex: 1 1 auto;
  margin: 1rem .5rem;
`

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  left: 0;
  overflow: hidden;
  position: relative;
  text-align: left;
  top: 0;
  width: 100%;
`

const HeaderLevel = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex: 0 0 100%;
  justify-content: space-between;
  z-index: 1;
`

const InstagramFrame = ({ children, ...props, posts, mediaType, slideShowKey, resumeAutoSlides }) => {
  const metaTags = [
    { icon: 'heart', metaInfo: posts.likes.count },
    { icon: 'comment', metaInfo: posts.comments.count },
  ]

  let currentPost
  if (mediaType === 'image' || mediaType === 'carousel') {
    currentPost = (
      <ImageFeature
        currentImage={posts.images.standard_resolution.url}
      />
    )
  } else if (mediaType === 'video') {
    currentPost = (
      <InstagramVideo
        // resumeAutoSlides={resumeAutoSlides}
        currentVideo={posts.videos.standard_resolution.url}
      />
    )
  }

  return (
    <Frame>
      { /* <Header>
        <StyledIcon icon="instagram" size={35} />
        <InstagramCaption>{posts.caption.text}</InstagramCaption>
        <MetaTags tags={metaTags} />
      </Header>*/ }
      <Ticker icon="instagram" slideShowKey={slideShowKey}>
        <HeaderLevel>
          {posts.location &&
          <InstagramCaption>{posts.location.name}</InstagramCaption>}
        </HeaderLevel>
        <HeaderLevel>
          <MetaTags tags={metaTags} />
        </HeaderLevel>
      </Ticker>
      <InstagramMedia>
        <TransitionWrapper>
          <FadingTransitionWrapper key={slideShowKey}>
            {currentPost}
          </FadingTransitionWrapper>
        </TransitionWrapper>
      </InstagramMedia>
    </Frame>
  )
}

InstagramFrame.propTypes = {
  children: PropTypes.any,
  posts: PropTypes.object.isRequired,
  slideShowKey: PropTypes.string.isRequired,
  mediaType: PropTypes.string,
  resumeAutoSlides: PropTypes.object,
}

export default InstagramFrame

