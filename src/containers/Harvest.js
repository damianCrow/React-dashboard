import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { socketDataRequest } from 'store/actions'
import { TimesheetLeaderBoard, SplashScreen } from 'components'

class HarvestContainer extends Component {

  componentDidMount() {
    this.props.serviceRequest()
  }

  render() {
    const { posts, status, message } = this.props

    switch (status) {
      case 'success':
        return <TimesheetLeaderBoard posts={posts} />
      case 'failed':
        return <span>{status}</span>
      default:
        return <SplashScreen icon="harvest" service="Harvest" />
    }
  }
}

// Listen and capture any changes made as a result of the the actions below.
const mapStateToProps = state => ({
  status: state.harvest.status.status,
  message: state.harvest.status.message,
})

const mapDispatchToProps = dispatch => ({
  serviceRequest: () => dispatch(socketDataRequest({ service: 'HARVEST', serverAction: 'pull', request: 'getUsersAndTimes' })),
})

HarvestContainer.propTypes = {
  socketConnected: PropTypes.bool,
  serviceRequest: PropTypes.func,
  status: PropTypes.string,
  message: PropTypes.string,
}

HarvestContainer.defaultProps = {
  socketConnected: false,
  sonosRequest: false,
  status: '',
  message: '',
}

export default connect(mapStateToProps, mapDispatchToProps)(HarvestContainer)
