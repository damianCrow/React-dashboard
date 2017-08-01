import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { socketDataRequest, startSlideshowLogic } from 'store/actions'

import { Twitter, Auth, SplashScreen } from 'components'

class TwitterContainer extends Component {

  componentDidMount() {
    this.props.serviceRequest()
  }

  componentWillReceiveProps(nextProps) {
    const { posts, slideshow } = nextProps

    if ((this.props.status !== nextProps.status) && nextProps.status === 'success') {
      nextProps.startSlideshowLogic(nextProps.posts.length)
    }

    // TODO: This is a mess? Some needs to be in the reducer?
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
    }
  }

  render() {
    const { posts, slideshow } = this.props

    const isEmpty = posts.length === 0

    if (!isEmpty && slideshow.status === 'ready') {
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
  startSlideshowLogic: (max) => dispatch(startSlideshowLogic('TWITTER', max)),
})

TwitterContainer.propTypes = {
  serviceRequest: PropTypes.func,
  startSlideshowLogic: PropTypes.func,
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
