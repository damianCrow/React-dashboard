import React, { PropTypes } from 'react'
import styled, { css } from 'styled-components'
import ReactTransitionGroup from 'react-addons-transition-group'

import { InstagramImage } from 'components'

import { fonts } from 'components/globals'

const styles = ({ ...props }) => css`
  color: black;
  display: block;
  font-family: ${fonts.primary};
  font-style: normal;
  font-weight: 300;
  height: 100%;
  justify-content: center;
  left: 0;
  overflow: hidden;
  position: absolute;
  text-align: left;
  top: 0;
  width: 100%;
`

// const InstagramImageStyled = styled(InstagramImage)`${InstagramImageStyles}`
const InstagramWrapper = styled(ReactTransitionGroup)`${styles}`

// const PlaybackIcon = styled.Icon`
//   display: absolute;
// `

// const StyledIcon = styled(Icon)`${iconStyles}`

const Instagram = ({ children, ...props, posts, isFetching, slideShowKey }) => {
  console.log('Instagram comp posts: ', posts)
  return (
    <InstagramWrapper style={{ opacity: isFetching ? 0.5 : 1 }} >
      <InstagramImage key={slideShowKey} currentImage={posts.images.standard_resolution.url} />
    </InstagramWrapper>
  )
}

Instagram.propTypes = {
  children: PropTypes.any,
  isFetching: PropTypes.bool.isRequired,
  posts: PropTypes.object.isRequired,
  slideShowKey: PropTypes.number.isRequired
}

export default Instagram
