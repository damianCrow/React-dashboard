import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { fetchShowcasePosts, startShowcaseSlideshow } from 'store/actions'

import { Showcase } from 'components'

class ShowcaseContainer extends Component {
  static propTypes = {
    livePlaylistItems: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    slideShow: PropTypes.object.isRequired,
    status: PropTypes.string.isRequired
  }

  componentDidMount () {
    const { dispatch } = this.props

    dispatch(fetchShowcasePosts())
  }

  componentDidUpdate () {
    const { slideShow, status, dispatch, livePlaylistItems } = this.props
    if (status === 'success' && Object.keys(slideShow.currentPost).length === 0) {
      console.log('fireing startShowcaseSlideshow')
      dispatch(startShowcaseSlideshow(livePlaylistItems))
    } else if (slideShow.mediaType === 'image' && status === 'success') {
      dispatch(startShowcaseSlideshow(livePlaylistItems))
    }
  }

  render () {
    const { slideShow, isFetching, status, message } = this.props
    const isEmpty = Object.keys(slideShow.currentPost).length === 0
    // const mediaPath = '/showcase-media/' + slideShow.currentPost.file_name

    console.log('showcase: slideShow.currentPost = ', slideShow.currentPost)

    if (status === 'failed' || status === '') {
      return (
        <span>{status}</span>
      )
    } else if (!isEmpty) {
      return (
        <Showcase
          mediaType={slideShow.mediaType}
          media={slideShow.currentPost}
          slideShowKey={slideShow.currentInt}
          isFetching={isFetching}
        />
      )
    } else {
      return (
        <span>Awaiting images...</span>
      )
    }
  }
}

const mapStateToProps = state => {
  const { showcase } = state
  const {
    livePlaylistItems,
    isFetching,
    message,
    slideShow,
    status
  } = showcase['showcaseProcess']['showcaseDetails'] || {
    livePlaylistItems: [],
    isFetching: true,
    message: '',
    slideShow: {currentPost: {}, currentInt: 0, mediaType: ''},
    status: ''
  }

  return {
    livePlaylistItems,
    isFetching,
    message,
    slideShow,
    status
  }
}

export default connect(mapStateToProps)(ShowcaseContainer)
