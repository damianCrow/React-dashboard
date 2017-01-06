import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { fetchSonosDataIfNeeded, invalidateSonosData } from 'store/actions'

import { SonosInfo } from 'components'

class SonosInfoContainer extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount () {
    const { dispatch } = this.props
    dispatch(fetchSonosDataIfNeeded())
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

  handleRefreshClick = e => {
    e.preventDefault()

    const { dispatch } = this.props
    // Clear out old data, to load in the new (refresh).
    dispatch(invalidateSonosData())
    dispatch(fetchSonosDataIfNeeded())
  }

  render () {
    const { posts, isFetching } = this.props
    console.log(posts)
    const isEmpty = posts.length === 0

    if (!isEmpty) {
      return (
        <SonosInfo posts={posts} isFetching={isFetching} />
      )
    } else {
      return (
        <span>nuffin</span>
      )
    }
  }
}

const mapStateToProps = state => {
  const { sonos } = state
  const {
    isFetching,
    items: posts
  } = sonos['musicInfoFromSonos']['sonosData'] || {
    isFetching: true,
    items: []
  }

  return {
    posts,
    isFetching
  }
}

export default connect(mapStateToProps)(SonosInfoContainer)
