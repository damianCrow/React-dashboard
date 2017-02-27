import React, { PropTypes } from 'react'
import styled, { css } from 'styled-components'
import ReactTransitionGroup from 'react-addons-transition-group'

import { fonts } from 'components/globals'

import { InstagramTransitionWrapper, ImageFeature, InstagramVideo, Icon, MediaBluredBack } from 'components'

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

const InstagramWrapper = styled.section`
  color: white;
  display: flex;
  flex-direction: column;
  height: 50%;
  justify-content: center;
  left: 0;
  overflow: hidden;
  position: absolute;
  text-align: left;
  top: 0;
  font-family: ${fonts.primary};
  width: 100%;
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
const InstagramFrame = styled.div`
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

const MetaContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0 .5rem;
`
const Meta = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0 .25rem;
`

const StyledIcon = styled(Icon)`${IconStyles}`
const Footer = styled.footer`${footerStyles}`
const Header = styled.header`${footerStyles}`

// const PlaybackIcon = styled.Icon`
//   display: absolute;
// `

// const StyledIcon = styled(Icon)`${iconStyles}`

const Instagram = ({ children, ...props, posts, mediaType, isFetching, slideShowKey }) => {
  console.log('Instagram comp posts: ', posts)
  // console.log('INSTAGRAM COMP mediaType', mediaType)
  // console.log('INSTAGRAM COMP posts', posts)
  // console.log('INSTAGRAM COMP THUMBNAIL: ', posts.images.thumbnail.url)

  return (
    <InstagramWrapper>
      <TransitionWrapper style={{ opacity: isFetching ? 0.5 : 1 }} >
        <InstagramTransitionWrapper key={slideShowKey}>
          {mediaType === 'image' ? (
            <MediaBluredBack
              media={posts.images.thumbnail.url}
              type="image"
            />
          ) : (
            <MediaBluredBack
              media={posts.videos.low_bandwidth.url}
              type="video"
            />
          )}
        </InstagramTransitionWrapper>
      </TransitionWrapper>
      <InstagramFrame>
        <Header>
          <StyledIcon icon="instagram" size={35} />
          <MetaContainer>
            <Meta>
              <StyledIcon icon="heart" size={25} />
              <span>{posts.likes.count}</span>
            </Meta>
            <Meta>
              <StyledIcon icon="comment" size={25} />
              <span>{posts.comments.count}</span>
            </Meta>
          </MetaContainer>
        </Header>
        <InstagramMedia>
          <TransitionWrapper style={{ opacity: isFetching ? 0.5 : 1 }} >
            <InstagramTransitionWrapper key={slideShowKey}>
              {mediaType === 'image' ? (
                <ImageFeature
                  currentImage={posts.images.standard_resolution.url}
                />
              ) : (
                <InstagramVideo
                  currentVideo={posts.videos.standard_resolution.url}
                />
              )}
            </InstagramTransitionWrapper>
          </TransitionWrapper>
        </InstagramMedia>
        <Footer>
          <InstagramCaption>{posts.caption.text}</InstagramCaption>
        </Footer>
      </InstagramFrame>

    </InstagramWrapper>
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
