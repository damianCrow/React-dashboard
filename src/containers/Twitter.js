import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { fetchTwitterIfNeeded, startTwitterSlideshow } from 'store/actions'

import { Twitter, Auth, SplashScreen } from 'components'

class TwitterContainer extends Component {
  static propTypes = {
    allPosts: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    slideShow: PropTypes.object.isRequired,
    status: PropTypes.string.isRequired
  }

  componentDidMount () {
    const { dispatch } = this.props
    dispatch(fetchTwitterIfNeeded())
  }

  componentDidUpdate () {
    const { slideShow, status, dispatch, allPosts } = this.props
    // console.log('InstagramContainer - componentDidUpdate fired')
    // console.log('slideShow - slideShow: ', slideShow)
    // console.log('status', status)
    // console.log('Object.keys(slideShow.currentPost).length', Object.keys(slideShow.currentPost).length)

    if (status === 'success') {
      console.log('fireing startTwitterSlideshow')
      dispatch(startTwitterSlideshow(allPosts))
    }
  }

  listenForChanges () {

  }

  handleRefreshClick = e => {
    e.preventDefault()

    // const { dispatch } = this.props
    // Clear out old data, to load in the new (refresh).
    // dispatch(invalidateSonosData())
    // dispatch(fetchSonosDataIfNeeded())
  }

  render () {
    const { slideShow, isFetching, status, allPosts } = this.props
    console.log('twitter container allposts: ', allPosts)
    // console.log('instagram status', status)

    const isEmpty = Object.keys(slideShow.currentPost).length === 0
    console.log('isEmptytwitter', isEmpty)

    if (status === 'failed' || status === '') {
      return (
        <span>{status}</span>
      )
    } else if (status === 'auth-failed') {
      return (
        <Auth
          icon="twitter"
          service="Twitter"
        />
      )
    } else if (!isEmpty) {
      console.log('twitter slideShow.currentPost.user', slideShow.currentPost.user)
      return (
        <Twitter
          posts={slideShow.currentPost}
          slideShowKey={slideShow.currentInt}
          isFetching={isFetching}
        />
      )
    } else {
      return (
        <SplashScreen icon="twitter" service="Twitter" />
      )
    }
  }
}

const mapStateToProps = state => {
  const { twitter } = state
  const {
    allPosts,
    isFetching,
    message,
    slideShow,
    status
  } = twitter['twitterProcess']['twitterDetails'] || {
    allPosts: [],
    isFetching: true,
    message: '',
    slideShow: {currentPost: {}, currentInt: 0},
    status: ''
  }

  return {
    allPosts,
    isFetching,
    message,
    slideShow,
    status
  }
}

export default connect(mapStateToProps)(TwitterContainer)
