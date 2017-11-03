import React, { Component } from 'react'
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
`

const InstagramMedia = styled.div`
  overflow: hidden;
  flex: 1 0 auto;
  margin: 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`

// const InstagramCaption = styled.span`
//   display: inline-block;
//   flex: 1 1 auto;
//   margin: 1rem .5rem;
// `

const Carousel = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  left: 0;
  overflow: hidden;
  position: relative;
  text-align: left;
  top: 0;
  width: 100%;
`


class InstagramBackground extends Component {
  render() {
    const post = this.props.posts[this.props.slideshow.current]
    const { id, type } = post
    console.log('InstagramBackground, ID: ', id)

    // console.log('InstagramCarousel .posts', this.props.posts)
    // console.log('InstagramCarousel .slideshow', this.props.slideshow)

    let currentItem = {}
    if (this.props.slideshow.status === 'ready') {
      const bluredBack = () => {
        switch (type) {
          case 'carousel':
            currentItem = post.carousel_media[this.props.innerSlideshow.current]
            return (<MediaBluredBack media={currentItem[`${currentItem.type}s`].standard_resolution.url} type={currentItem.type} />)
          case 'video':
            return (<MediaBluredBack media={post.videos.standard_resolution.url} type="video" />)
          default:
          case 'image':
            return (<MediaBluredBack media={post.images.thumbnail.url} type="image" />)
        }
      }

      // console.log("`${id}${(type === 'carousel' && `-${this.props.innerSlideshow.current}`)}`", `${id}${(type === 'carousel' && `-${this.props.innerSlideshow.current}`)}`)
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
}

// Listen and capture any changes made as a result of the the actions below.
const mapStateToProps = state => ({
  posts: state.instagram.data.posts,
  slideshow: state.instagram.slideshow,
  innerSlideshow: state.instagram.innerSlideshow,
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
