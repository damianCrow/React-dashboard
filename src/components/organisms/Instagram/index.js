import PropTypes from 'prop-types';
import React from 'react';
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

const IconStyles = css`
  z-index: 59;
  padding: .25rem;
  flex: 0 0 auto;
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

// const PlaybackIcon = styled.Icon`
//   display: absolute;
// `

// const StyledIcon = styled(Icon)`${iconStyles}`

const Instagram = ({ children, ...props, posts, mediaType, slideShowKey }) => {
  // console.log('Instagram comp posts: ', posts)
  // console.log('INSTAGRAM COMP mediaType', mediaType)
  // console.log('INSTAGRAM COMP posts', posts)
  // console.log('INSTAGRAM COMP THUMBNAIL: ', posts.images.thumbnail.url)

  return (
    <InstagramWrapper>
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
