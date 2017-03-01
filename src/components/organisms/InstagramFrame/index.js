import React, { PropTypes } from 'react'
import styled, { css } from 'styled-components'
import ReactTransitionGroup from 'react-addons-transition-group'

import { fonts, compHeader } from 'components/globals'

import { FadingTransitionWrapper, ImageFeature, InstagramVideo, Icon, MetaTags } from 'components'

const TransitionWrapper = styled(ReactTransitionGroup)`
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  flex: 1;
  width: 100%;
  height: 100%;
`

const IconStyles = css`
  z-index: 59;
  padding: .25rem;
  flex: 0 0 auto;
`

const InstagramMedia = styled.div`
  position: relative;
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

const footerStyles = ({ ...props }) => css`
  background-color: rgba(0,0,0,.5);
  display: flex;
  width: 100%;
  overflow: hidden;
  flex: 0 0 3rem;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  flex-direction: row;
`
const Frame = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  left: 0;
  overflow: hidden;
  position: absolute;
  text-align: left;
  top: 0;
  width: 100%;
`

const StyledIcon = styled(Icon)`${IconStyles}`
const Header = styled.header`${compHeader}`

// const PlaybackIcon = styled.Icon`
//   display: absolute;
// `

// const StyledIcon = styled(Icon)`${iconStyles}`

const InstagramFrame = ({ children, ...props, posts, mediaType, isFetching, slideShowKey }) => {
  console.log('Instagram comp posts: ', posts)
  // console.log('INSTAGRAM COMP mediaType', mediaType)
  // console.log('INSTAGRAM COMP posts', posts)
  // console.log('INSTAGRAM COMP THUMBNAIL: ', posts.images.thumbnail.url)

  const metaTags = [
    {icon: 'heart', metaInfo: posts.likes.count},
    {icon: 'comment', metaInfo: posts.comments.count}
  ]

  return (
    <Frame>
      <Header>
        <StyledIcon icon="instagram" size={35} />
        <InstagramCaption>{posts.caption.text}</InstagramCaption>
        <MetaTags tags={metaTags} />
      </Header>
      <InstagramMedia>
        <TransitionWrapper style={{ opacity: isFetching ? 0.5 : 1 }} >
          <FadingTransitionWrapper key={slideShowKey}>
            {mediaType === 'image' ? (
              <ImageFeature
                currentImage={posts.images.standard_resolution.url}
              />
            ) : (
              <InstagramVideo
                currentVideo={posts.videos.standard_resolution.url}
              />
            )}
          </FadingTransitionWrapper>
        </TransitionWrapper>
      </InstagramMedia>
    </Frame>
  )
}

InstagramFrame.propTypes = {
  children: PropTypes.any,
  isFetching: PropTypes.bool.isRequired,
  posts: PropTypes.object.isRequired,
  slideShowKey: PropTypes.number.isRequired,
  mediaType: PropTypes.string
}

export default InstagramFrame
