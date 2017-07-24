import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { socketDataRequest, startSlideshow } from 'store/actions'

import { Twitter, Auth, SplashScreen } from 'components'

class TwitterContainer extends Component {

  componentDidMount() {
    this.props.serviceRequest()
    this.props.startInstaSlideshow(20)
  }

  componentWillReceiveProps(nextProps) {
    // Try and move this logic back to the HOC container
    const { posts, startInstaSlideshow, slideshow } = nextProps

    if (posts.length > 0) {
      if (['retweeted_status'].every(prop => prop in posts[slideshow.current])) {
        this.setState({
          post: posts[slideshow.current].retweeted_status,
        })
      } else {
        this.setState({
          post: posts[slideshow.current],
        })
      }

      if (slideshow.status === 'ready') {
        startInstaSlideshow(20)
      }
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
          post={this.state.post}
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
  serviceRequest: () => dispatch(socketDataRequest({ service: 'TWITTER', serverAction: 'pull', request: 'tweets' })),
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

export default connect(mapStateToProps, mapDispatchToProps)(TwitterContainer)
