import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { serviceRequest, startSlideshow, pauseServiceSlideshow } from 'store/actions'
import { SocketConnector } from 'hoc'
import { Instagram, InstagramAuth, SplashScreen } from 'components'

class InstagramContainer extends Component {
  // static propTypes = {
  //   allPosts: PropTypes.array.isRequired,
  //   dispatch: PropTypes.func.isRequired,
  //   isFetching: PropTypes.bool.isRequired,
  //   message: PropTypes.string.isRequired,
  //   slideShow: PropTypes.object.isRequired,
  //   status: PropTypes.string.isRequired,
  // }

  componentDidMount() {
    this.props.socketConnected && this.props.serviceRequest()
  }

  componentWillReceiveProps(nextProps) {
    // Try and move this logic back to the HOC container
    const { socketConnected, serviceRequest, posts, startInstaSlideshow, slideshow, pauseInstaSlideshow } = nextProps

    const isEmpty = posts.length === 0

    if (socketConnected && !this.props.socketConnected) {
      serviceRequest()
    }

    // console.log('componentWillReceiveProps instagram')

    if (!isEmpty && slideshow.status === 'ready') {
      startInstaSlideshow(20)
    }

    if (!isEmpty) {
      if (posts[slideshow.current].type === 'video' && slideshow.status === 'playing') {
        pauseInstaSlideshow()
      }
    }
  }

  render() {
    const { status, message, posts, slideshow } = this.props
    console.log(posts)
    // console.log('instagram status', status)

    const isEmpty = posts.length === 0

    // console.log('slideshow', slideshow)
    // console.log('isEmpty', isEmpty)

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
  serviceRequest: () => dispatch(serviceRequest('INSTAGRAM')),
  startInstaSlideshow: (max) => dispatch(startSlideshow('instagram', max)),
  pauseInstaSlideshow: () => dispatch(pauseServiceSlideshow('instagram')),
})

InstagramContainer.propTypes = {
  socketConnected: PropTypes.bool,
  serviceRequest: PropTypes.func,
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

export default connect(mapStateToProps, mapDispatchToProps)(SocketConnector(InstagramContainer))
