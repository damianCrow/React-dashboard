import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { serviceRequest, startSlideshow } from 'store/actions'
import { SocketConnector } from 'hoc'

import { Twitter, Auth, SplashScreen } from 'components'

class TwitterContainer extends Component {

  componentDidMount() {
    this.props.socketConnected && this.props.serviceRequest()
  }

  componentWillReceiveProps(nextProps) {
    // Try and move this logic back to the HOC container
    const { socketConnected, serviceRequest, posts, startInstaSlideshow, slideshow } = nextProps

    if (socketConnected && !this.props.socketConnected) {
      serviceRequest()
    }

    if (posts.length > 0 && slideshow.status === 'ready') {
      startInstaSlideshow(20)
    }
  }

  render() {
    const { status, message, posts, slideshow } = this.props
    // console.log('twitter status', status)

    const isEmpty = posts.length === 0

    if (status === 'failed') {
      return (
        <span>{status}</span>
      )
    // } else if (status === 'auth-failed') {
    //   return (
    //     <Auth
    //       icon="twitter"
    //       service="Twitter"
    //     />
    //   )
    } else if (!isEmpty) {
      return (
        <Twitter
          post={posts[slideshow.current]}
          slideShowKey={slideshow.current}
        />
      )
    }
    return (
      <SplashScreen icon="twitter" service="Twitter" />
    )
  }
}

// Listen and capture any changes made as a result of the the actions below.
const mapStateToProps = (state) => ({
  posts: state.twitter.data.posts,
  status: state.twitter.data.status,
  slideshow: state.twitter.slideshow,
})

const mapDispatchToProps = (dispatch) => ({
  serviceRequest: () => dispatch(serviceRequest('TWITTER')),
  startInstaSlideshow: (max) => dispatch(startSlideshow('twitter', max)),
})

TwitterContainer.propTypes = {
  socketConnected: PropTypes.bool,
  serviceRequest: PropTypes.func,
  startInstaSlideshow: PropTypes.func,
  slideshow: PropTypes.object,
  posts: PropTypes.array,
  status: PropTypes.string,
}

TwitterContainer.defaultProps = {
  socketConnected: false,
  sonosRequest: false,
  slideshow: {},
  posts: [],
  status: '',
}

export default connect(mapStateToProps, mapDispatchToProps)(SocketConnector(TwitterContainer))
