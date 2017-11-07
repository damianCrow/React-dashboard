import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import TransitionGroup from 'react-transition-group/TransitionGroup'

// import { SlideshowLogic } from 'hoc'
import { FadingTransitionWrapper, MediaBluredBack } from 'components'

const TransitionWrapper = styled(TransitionGroup)`
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  flex: 1;
  width: 100%;
  height: 100%;
  contain: size layout style;
`

const InstagramBackground = ({ posts, slideshow, innerSlideshow }) => {
  const post = posts[slideshow.current]
  const { type } = post
  const id = `${post.id}_${innerSlideshow.current}`

  let currentItem = {}
  if (slideshow.status === 'ready') {
    const bluredBack = () => {
      switch (type) {
        case 'carousel':
          currentItem = post.carousel_media[innerSlideshow.current]
          return (<MediaBluredBack media={currentItem[`${currentItem.type}s`].standard_resolution.url} type={currentItem.type} />)
        case 'video':
          return (<MediaBluredBack media={post.videos.standard_resolution.url} type="video" />)
        default:
        case 'image':
          return (<MediaBluredBack media={post.images.thumbnail.url} type="image" />)
      }
    }

    return (
      <TransitionWrapper>
        <FadingTransitionWrapper key={id}>
          {bluredBack()}
        </FadingTransitionWrapper>
      </TransitionWrapper>
    )
  }
  return null
}

// Listen and capture any changes made as a result of the the actions below.
const mapStateToProps = state => ({
  posts: state.instagram.data.posts,
  slideshow: state.instagram.slideshow,
  innerSlideshow: state.instagram.slideshow.carousel,
})

InstagramBackground.propTypes = {
  slideshow: PropTypes.object,
  innerSlideshow: PropTypes.object,
  posts: PropTypes.array,
}

InstagramBackground.defaultProps = {
  slideshow: {},
  innerSlideshow: {},
  posts: [],
}

export default connect(mapStateToProps)(InstagramBackground)
