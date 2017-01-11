import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { fetchPostsIfNeeded } from 'store/actions'

import { Instagram } from 'components'

class InstagramContainer extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount () {
    const { dispatch } = this.props
    dispatch(fetchPostsIfNeeded())
  }

  // componentDidMount () {
  //   // url (required), options (optional)
  //   fetch('http://localhost:5005/zones', {
  //     method: 'get'
  //   })
  //   .then((response) => response.json())
  //   .then(responseJSON => {
  //     console.log('response', responseJSON)
  //   }).catch(err => {
  //     console.log('err', err)
  //   })
  // }

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
    const { posts, isFetching } = this.props
    console.log(posts)
    const isEmpty = posts.length === 0

    if (!isEmpty) {
      return (
        <Instagram posts={posts} isFetching={isFetching} />
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
    isFetching,
    items: posts
  } = instagram['instagramProcess']['instagramDetails'] || {
    isFetching: true,
    items: []
  }

  return {
    posts,
    isFetching
  }
}

export default connect(mapStateToProps)(InstagramContainer)
