import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { fetchInstagramIfNeeded } from 'store/actions'

import { Instagram, InstagramAuth } from 'components'

class InstagramContainer extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    status: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired
  }

  componentDidMount () {
    const { dispatch } = this.props
    dispatch(fetchInstagramIfNeeded())
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
    const { posts, isFetching, status, message } = this.props
    // console.log(posts)
    console.log('instagram status', status)
    const isEmpty = posts.length === 0

    if (status === 'failed' && status !== '') {
      return (
        <span>{status}</span>
      )
    } else if (status === 'auth-failed') {
      <InstagramAuth message={message} />
    } else {
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
}

const mapStateToProps = state => {
  const { instagram } = state
  const {
    isFetching,
    items: posts,
    status,
    message
  } = instagram['instagramProcess']['instagramDetails'] || {
    isFetching: true,
    items: [],
    status: '',
    message: ''
  }

  return {
    posts,
    isFetching,
    status,
    message
  }
}

export default connect(mapStateToProps)(InstagramContainer)
