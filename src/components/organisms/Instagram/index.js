import React, { PropTypes } from 'react'
import styled, { css } from 'styled-components'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

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

const InstagramImage = styled.img`
  display: block;
  width: 150px;
  position: relative;
`

const InstagramWrapper = styled(ReactCSSTransitionGroup)`${styles}`

// const PlaybackIcon = styled.Icon`
//   display: absolute;
// `

// const StyledIcon = styled(Icon)`${iconStyles}`

const Instagram = ({ children, ...props, posts, isFetching }) => {
  console.log('Instagram comp posts: ', posts)
  return (
    <InstagramWrapper {...props} style={{ opacity: isFetching ? 0.5 : 1 }} transitionEnterTimeout={700} transitionLeaveTimeout={700}>

      {posts.map((element, index) => {
        return <InstagramImage src={element.images.standard_resolution.url} key={'mykey' + index} />
      })}
    </InstagramWrapper>
  )
}

Instagram.propTypes = {
  children: PropTypes.any,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired
}

export default Instagram
