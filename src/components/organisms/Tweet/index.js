import React, { PropTypes } from 'react'
import styled, { css } from 'styled-components'

import { fonts } from 'components/globals'

import { MediaBluredBack } from 'components'

const TweetAndBack = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  left: 0;
`

const TweetWrapper = styled.div`
  position: absolute;
  padding: 1rem;
  top: 0;
  width: calc(100% - 2rem);
  height: calc(100% - 2rem);
  font-family: ${fonts.primary};
  color: white;
  font-size: 1.5rem;
  left: 0;
`

// const PlaybackIcon = styled.Icon`
//   display: absolute;
// `

// const StyledIcon = styled(Icon)`${iconStyles}`

const Tweet = ({...props, allTweetDetails}) => {
  console.log('Twitter comp posts: ', allTweetDetails)
  return (
    <TweetAndBack>
      <TweetWrapper>
        <span>{allTweetDetails.text}</span>
      </TweetWrapper>
    </TweetAndBack>
  )
}

Tweet.propTypes = {
  allTweetDetails: PropTypes.object
}

export default Tweet
