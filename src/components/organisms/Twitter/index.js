import React, { PropTypes } from 'react'
import styled, { css } from 'styled-components'
import ReactTransitionGroup from 'react-addons-transition-group'

import moment from 'moment-timezone'

import { fonts, compHeader } from 'components/globals'

import { FadingTransitionWrapper, Icon, Tweet, MediaBluredBack, InfoBlockHeader, MetaTags } from 'components'

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

const TwitterWrapper = styled.section`
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

const TwitterMedia = styled.div`
  position: relative;
  overflow: hidden;
  flex: 1 0 auto;
  margin: 0rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`

const TwitterCaption = styled.span`
  display: inline-block;
  flex: 1 1 auto;
  margin: 1rem .5rem;
`

// const footerStyles = ({ ...props }) => css`
//   background-color: rgba(0,0,0,.5);
//   display: flex;
//   width: 100%;
//   overflow: hidden;
//   flex: 0 0 3rem;
//   align-items: center;
//   margin-top: auto;
//   flex-direction: row;
// `
const TwitterFrame = styled.div`
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

const TwitterBackground = styled.div`
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
`
const HeaderLevel = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  flex: 0 0 100%;
`

const StyledIcon = styled(Icon)`${IconStyles}`
const Header = styled(InfoBlockHeader)`${compHeader}`

// const PlaybackIcon = styled.Icon`
//   display: absolute;
// `

// const StyledIcon = styled(Icon)`${iconStyles}`

const Twitter = ({ children, ...props, posts, isFetching, slideShowKey }) => {
  console.log('Twitter comp posts: ', posts.user.profile_banner_url)
  // console.log('TWITTER COMP mediaType', mediaType)
  // console.log('TWITTER COMP posts', posts)
  // console.log('TWITTER COMP THUMBNAIL: ', posts.images.thumbnail.url)

  const metaTags = [
    {icon: 'heart', metaInfo: posts.favorite_count},
    {icon: 'retweet', metaInfo: posts.retweet_count}
  ]

  return (
    <TwitterWrapper>
      <TwitterFrame>
        <TwitterBackground>
          <TransitionWrapper style={{ opacity: isFetching ? 0.5 : 1 }} >
            <FadingTransitionWrapper key={posts.user.id}>
              <MediaBluredBack type="image" media={posts.user.profile_banner_url} />
            </FadingTransitionWrapper>
          </TransitionWrapper>
        </TwitterBackground>
        <Header icon="twitter">
          <HeaderLevel>
            <span>@{posts.user.screen_name}</span>
            <TwitterCaption>{moment(posts.created_at).calendar()}</TwitterCaption>
          </HeaderLevel>
          <HeaderLevel>
            <MetaTags tags={metaTags} />
          </HeaderLevel>
        </Header>
        <TwitterMedia>
          <TransitionWrapper style={{ opacity: isFetching ? 0.5 : 1 }} >
            <Tweet allTweetDetails={posts} key={slideShowKey} />
          </TransitionWrapper>
        </TwitterMedia>
      </TwitterFrame>

    </TwitterWrapper>
  )
}

Twitter.propTypes = {
  children: PropTypes.any,
  isFetching: PropTypes.bool.isRequired,
  posts: PropTypes.object.isRequired,
  slideShowKey: PropTypes.number.isRequired
}

export default Twitter
