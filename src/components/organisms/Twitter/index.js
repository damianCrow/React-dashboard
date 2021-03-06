import PropTypes from 'prop-types'
import React from 'react'
import styled, { css } from 'styled-components'
import TransitionGroup from 'react-transition-group/TransitionGroup'

import moment from 'moment-timezone'

import { fonts, compHeader } from 'components/globals'

import { FadingTransitionWrapper, Icon, Tweet, MediaBluredBack, Ticker, MetaTags } from 'components'


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
  contain: strict;
`

const TwitterMedia = styled.div`
  position: relative;
  overflow: hidden;
  flex: 1 1 auto;
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
  align-items: center;
  display: flex;
  flex: 1;
  height: 100%;
  justify-content: space-between;
  width: 100%;
`

const Footer = styled.footer`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 65px;
  padding: 1rem;
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  justify-content: space-between;
  box-sizing: border-box;
`

const StyledIcon = styled(Icon)`
  z-index: 59;
  padding: .25rem;
  flex: 0 0 auto;
  opacity: .5;
`

const UserName = styled.span`
  display: inline-block;
  font-family: ${fonts.primary};
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  opacity: .5;
  &:after {
    content: '|';
    margin: 0 .25rem;
    font-weight: normal;
  }
`


const Header = styled.header`${compHeader}`

// const PlaybackIcon = styled.Icon`
//   display: absolute;
// `

// const StyledIcon = styled(Icon)`${iconStyles}`

const Twitter = ({ children, ...props, post, slideShowKey }) => {
  const metaTags = [
    { icon: 'heart', metaInfo: post.favorite_count },
    { icon: 'retweet', metaInfo: post.retweet_count },
  ]

  return (
    <TwitterWrapper>
      <TwitterFrame>
        {/* <TwitterBackground>
          <TransitionWrapper>
            <FadingTransitionWrapper key={post.user.id_str}>
              <MediaBluredBack type="image" media={post.user.profile_banner_url} />
            </FadingTransitionWrapper>
          </TransitionWrapper>
        </TwitterBackground> */}
        <Header>
          <UserName>@{post.user.screen_name}</UserName>
          <Ticker slideShowKey={slideShowKey}>
            <HeaderLevel>
              <TwitterCaption>
                {`${moment.duration(moment().diff(moment(post.created_at, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en'))).humanize()} ago`}
              </TwitterCaption>
            </HeaderLevel>
            <HeaderLevel>
              <MetaTags tags={metaTags} />
            </HeaderLevel>
          </Ticker>
        </Header>
        <TwitterMedia>
          <FadingTransitionWrapper key={slideShowKey}>
            <Tweet allTweetDetails={post} key={slideShowKey} />
          </FadingTransitionWrapper>
        </TwitterMedia>
        <Footer>
          <StyledIcon icon={'twitter'} height={35} />
        </Footer>
      </TwitterFrame>
    </TwitterWrapper>
  )
}

Twitter.propTypes = {
  children: PropTypes.any,
  post: PropTypes.object.isRequired,
  slideShowKey: PropTypes.number.isRequired,
}

export default Twitter
