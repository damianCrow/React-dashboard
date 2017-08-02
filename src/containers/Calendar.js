import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { socketDataRequest } from 'store/actions'
import { Auth, Meetings } from 'components'

class CalendarContainer extends Component {

  componentDidMount() {
    this.props.serviceRequest()
  }

  componentWillReceiveProps(nextProps) {
    console.log('google calendar nextProps', nextProps)
  }


  render() {
    // const { posts, status, message } = this.props

    // <Auth message={message} icon="harvest" service="Harvest" authLink="/authorize_harvest" />
    // <Meetings posts={allPosts} />
    return null
  }
}

// Listen and capture any changes made as a result of the the actions below.
const mapStateToProps = state => ({
  status: state.calendar.status,
  message: state.calendar.message,
})

const mapDispatchToProps = dispatch => ({
  serviceRequest: () => dispatch(socketDataRequest({ service: 'GOOGLE', serverAction: 'pull', request: 'calendar' })),
})

CalendarContainer.propTypes = {
  serviceRequest: PropTypes.func,
  status: PropTypes.string,
  message: PropTypes.string,
}

CalendarContainer.defaultProps = {
  status: '',
  message: '',
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarContainer)
