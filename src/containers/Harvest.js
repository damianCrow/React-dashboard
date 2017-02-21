import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { fetchHarvestPosts } from 'store/actions'

import { Auth, Timesheets } from 'components'

class HarvestContainer extends Component {
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
    console.log('HarvestContainer mount')
    // dispatch(fetchSonosDataIfNeeded())
    dispatch(fetchHarvestPosts())
  }

  listenForChanges () {

  }

  render () {
    const { allPosts, isFetching, status, message } = this.props
    // console.log(posts)
    console.log('Harvest status', status)
    console.log('Harvest message', message)

    const isEmpty = allPosts.length === 0

    if (status === 'failed') {
      return (
        <span>{status}</span>
      )
    } else if (status === 'auth-failed') {
      return (
        <Auth message={message} icon="harvest" service="Harvest" authLink="/authorize_harvest" />
      )
    } else if (!isEmpty) {
      return (
        <Timesheets posts={allPosts} />
      )
    } else {
      return (
        <span>Pulled nuffin m8 🤷</span>
      )
    }
  }
}

const mapStateToProps = state => {
  const { harvest } = state
  const {
    allPosts,
    isFetching,
    message,
    slideShow,
    status
  } = harvest['harvestProcess']['harvestDetails'] || {
    allPosts: [],
    isFetching: true,
    message: '',
    slideShow: {currentPost: {}, currentInt: 0, mediaType: ''},
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

export default connect(mapStateToProps)(HarvestContainer)
