import React, { PropTypes } from 'react'
import styled, { css } from 'styled-components'
import Transition from 'react-inline-transition-group'

// import { Icon } from 'components'

import { fonts } from 'components/globals'

const styles = ({ ...props, posts }) => css`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  font-family: ${fonts.primary};
  color: black;
  font-weight: 300;
  font-style: normal;
  text-align: left;
  width: 100%;
  height: 100%;
  background-color: lightblue;
  background-size: cover;
`

const leaveStyles = css`
  transition: all 250ms;
`

const InstagramImage = styled.img`
  display: block;
  width: 150px;
  position: relative;
`

const InstagramWrapper = Transition

const transitionStyles = {
  base: styles,
  appear: leaveStyles,
  enter: leaveStyles,
  leave: leaveStyles
}

// const PlaybackIcon = styled.Icon`
//   display: absolute;
// `

// const StyledIcon = styled(Icon)`${iconStyles}`

const Instagram = ({ children, ...props, posts, isFetching }) => {
  console.log('Instagram comp posts: ', posts)
  return (
    <InstagramWrapper {...props} style={{ opacity: isFetching ? 0.5 : 1 }} childrenStyles={transitionStyles}>
      <InstagramImage src={posts.images.standard_resolution.url} />
    </InstagramWrapper>
  )
}

Instagram.propTypes = {
  children: PropTypes.any,
  posts: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired
}

export default Instagram
