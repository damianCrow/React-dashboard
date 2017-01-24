import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts } from 'store/actions'

import { CalendarAuth } from 'components'

class GoogleCalendarContainer extends Component {
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
    console.log('GoogleCalendarContainer mount')
    // dispatch(fetchSonosDataIfNeeded())
    dispatch(fetchPosts())
  }

  listenForChanges () {

  }

  render () {
    const { slideShow, isFetching, status, message } = this.props
    // console.log(posts)
    // console.log('instagram status', status)

    const isEmpty = Object.keys(slideShow.currentPost).length === 0

    if (status === 'failed' || status === '') {
      return (
        <span>{status}</span>
      )
    } else if (status === 'auth-failed') {
      return (
        <CalendarAuth message={message} />
      )
    } else if (!isEmpty) {
      return (
        <p>Here goes the calendar component</p>
      )
    } else {
      return (
        <span>Awaiting images...</span>
      )
    }
  }
}

const mapStateToProps = state => {
  const { calendar } = state
  const {
    allPosts,
    isFetching,
    message,
    slideShow,
    status
  } = calendar['calendarProcess']['calendarDetails'] || {
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

export default connect(mapStateToProps)(GoogleCalendarContainer)
