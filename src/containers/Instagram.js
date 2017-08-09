import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { connect } from 'react-redux'
import { fonts } from 'components/globals'
// import { startSlideshow, pauseServiceSlideshow, socketDataRequest, numberOfSlideshowPosts } from 'store/actions'
// import { Instagram, SplashScreen } from 'components'
import { startSlideshowLogic, socketDataRequest } from 'store/actions'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import { FadingTransitionWrapper, InstagramFrame, MediaBluredBack, SplashScreen, Icon } from 'components'


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

const StyledIcon = styled(Icon)`
  z-index: 59;
  padding: .25rem;
  flex: 0 0 auto;
  opacity: .5;
  position: absolute;
  left: 0.25rem;
  bottom: 0.5rem;
`

class InstagramContainer extends Component {

  componentDidMount() {
    this.props.serviceRequest()
  }

  componentWillReceiveProps(nextProps) {
    if ((this.props.status !== nextProps.status) && nextProps.status === 'success') {
      nextProps.startSlideshowLogic(nextProps.posts.length)
    }
  }

  render() {
    // const { status, message, posts, slideshow } = this.props

    const isEmpty = this.props.posts.length === 0

    if (!isEmpty && this.props.slideshow.status === 'ready') {
      const post = this.props.posts[this.props.slideshow.current]
      const { id, type } = post

      let backgroundMedia
      if (type === 'image' || type === 'carousel') {
        backgroundMedia = <MediaBluredBack media={post.images.thumbnail.url} type="image" />
      } else if (type === 'video') {
        backgroundMedia = <MediaBluredBack media={post.videos.low_bandwidth.url} type="video" />
      }

      return (
        <InstagramWrapper>
          <StyledIcon icon={'instagram'} height={35} />
          <TransitionWrapper>
            <FadingTransitionWrapper key={id}>
              {backgroundMedia}
            </FadingTransitionWrapper>
          </TransitionWrapper>
          <InstagramFrame post={post} slideShowKey={id} mediaType={type} />
        </InstagramWrapper>
      )
    }
    return (
      <SplashScreen icon="instagram" service="Instagram" />
    )
  }
}

// Listen and capture any changes made as a result of the the actions below.
const mapStateToProps = state => ({
  posts: state.instagram.data.posts,
  status: state.instagram.data.status,
  slideshow: state.instagram.slideshow,
})

const mapDispatchToProps = dispatch => ({
  serviceRequest: () => dispatch(socketDataRequest({ service: 'INSTAGRAM', serverAction: 'pull', request: 'posts' })),
  startSlideshowLogic: max => dispatch(startSlideshowLogic('INSTAGRAM', max)),
})

InstagramContainer.propTypes = {
  serviceRequest: PropTypes.func,
  startSlideshowLogic: PropTypes.func,
  slideshow: PropTypes.object,
  posts: PropTypes.array,
  status: PropTypes.string,
}

InstagramContainer.defaultProps = {
  socketConnected: false,
  sonosRequest: false,
  slideshow: {},
  posts: [],
  status: '',
}

export default connect(mapStateToProps, mapDispatchToProps)(InstagramContainer)
