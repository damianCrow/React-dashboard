import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { startSlideshow, pauseServiceSlideshow, socketDataRequest, numberOfSlideshowPosts } from 'store/actions'
import { Instagram, InstagramAuth, SplashScreen } from 'components'

class InstagramContainer extends Component {
  componentDidMount() {
    this.props.serviceRequest()
  }

  componentWillReceiveProps(nextProps) {
    // Try and move this logic back to the HOC container
    const { numberOfSlideshowPosts, posts, startInstaSlideshow, slideshow, pauseInstaSlideshow } = nextProps

    const isEmpty = posts.length === 0

    if (posts.length !== this.props.posts.length && slideshow.status !== 'ready') {
      numberOfSlideshowPosts(this.props.posts.length)
    }
    if (!isEmpty && slideshow.status === 'ready') {
      startInstaSlideshow(posts.length)
    }

    if (this.props.slideshow.current !== slideshow.current) {
      if (!isEmpty) {
        if (posts[slideshow.current].type === 'video' && slideshow.status === 'playing') {
          pauseInstaSlideshow()
        }
      }
    }
  }

  render() {
    const { status, message, posts, slideshow } = this.props

    const isEmpty = posts.length === 0

    if (status === 'failed') {
      return (
        <span>{status}</span>
      )
    // } else if (status === 'auth-failed') {
    //   return (
    //     <InstagramAuth message={message} />
    //   )
    } else if (!isEmpty) {
      return (
        <Instagram
          mediaType={posts[slideshow.current].type}
          posts={posts[slideshow.current]}
          slideShowKey={posts[slideshow.current].id}
          // isFetching={isFetching}
        />
      )
    }
    return (
      <SplashScreen icon="instagram" service="Instagram" />
    )
  }
}

// Listen and capture any changes made as a result of the the actions below.
const mapStateToProps = (state) => ({
  posts: state.instagram.data.posts,
  status: state.instagram.data.status,
  slideshow: state.instagram.slideshow,
})

const mapDispatchToProps = (dispatch) => ({
  serviceRequest: () => dispatch(socketDataRequest({ service: 'INSTAGRAM', serverAction: 'pull', request: 'posts' })),
  startInstaSlideshow: (max) => dispatch(startSlideshow('instagram', max)),
  numberOfSlideshowPosts: (max) => dispatch(numberOfSlideshowPosts('instagram', max)),
  pauseInstaSlideshow: () => dispatch(pauseServiceSlideshow('instagram')),
})

InstagramContainer.propTypes = {
  serviceRequest: PropTypes.func,
  numberOfSlideshowPosts: PropTypes.func,
  startInstaSlideshow: PropTypes.func,
  pauseInstaSlideshow: PropTypes.func,
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
