import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import { SlideshowLogic } from 'hoc'

import { FadingTransitionWrapper, InstagramImage, InstagramVideo, InstagramCarousel } from 'components'

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

const InstagramFrame = ({ posts, current }) => {
  let InstagramSlideshow = {}
  const post = posts[current]

  const mediaType = () => {
    switch (post.type) {
      case 'carousel':
        InstagramSlideshow = SlideshowLogic({ connectedComp: InstagramCarousel, service: 'instagram', timeout: false })
        return (<InstagramSlideshow posts={post.carousel_media} carouselPostId={post.id} />)
      case 'video':
        InstagramSlideshow = SlideshowLogic({ connectedComp: InstagramVideo, service: 'instagram', timeout: false })
        return (<InstagramSlideshow currentVideo={post.videos.standard_resolution.url} />)
      default:
      case 'image':
        InstagramSlideshow = SlideshowLogic({ connectedComp: InstagramImage, service: 'instagram' })
        return (<InstagramSlideshow currentImage={post.images.standard_resolution.url} />)
    }
  }

  return (
    <InstagramMedia>
      <TransitionWrapper>
        <FadingTransitionWrapper key={post.id}>
          {mediaType()}
        </FadingTransitionWrapper>
      </TransitionWrapper>
    </InstagramMedia>
  )
}

const mapStateToProps = state => ({
  posts: state.instagram.data.posts,
  current: state.instagram.slideshow.current,
})


InstagramFrame.propTypes = {
  posts: PropTypes.array.isRequired,
  current: PropTypes.number,
}


export default connect(mapStateToProps)(InstagramFrame)

