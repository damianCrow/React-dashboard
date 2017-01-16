import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { fetchInstagramIfNeeded, startInstagramSlideshow } from 'store/actions'

import { Instagram, InstagramAuth } from 'components'

class InstagramContainer extends Component {
  static propTypes = {
    allPosts: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    slideShow: PropTypes.object.isRequired,
    status: PropTypes.string.isRequired
  }

  componentDidMount () {
    const { dispatch, allPosts } = this.props

    dispatch(fetchInstagramIfNeeded())
    .then(function (fulfilled) {
      if (allPosts.length !== 0) {
        dispatch(startInstagramSlideshow(allPosts))
      }
    })
  }

  handleRefreshClick = e => {
    e.preventDefault()

    // const { dispatch } = this.props
    // Clear out old data, to load in the new (refresh).
    // dispatch(invalidateSonosData())
    // dispatch(fetchSonosDataIfNeeded())
  }

  render () {
    const { slideShow, isFetching, status, message } = this.props
    // console.log(posts)
    console.log('instagram status', status)
    const isEmpty = Object.keys(slideShow.currentPost).length === 0

    if (status === 'failed' || status === '') {
      return (
        <span>{status}</span>
      )
    } else if (status === 'auth-failed') {
      return (
        <InstagramAuth message={message} />
      )
    } else if (!isEmpty) {
      return (
        <Instagram posts={slideShow.currentPost} isFetching={isFetching} />
      )
    } else {
      return (
        <span>Awaiting images...</span>
      )
    }
  }
}

const mapStateToProps = state => {
  const { instagram } = state
  const {
    allPosts,
    isFetching,
    message,
    slideShow,
    status
  } = instagram['instagramProcess']['instagramDetails'] || {
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

export default connect(mapStateToProps)(InstagramContainer)
