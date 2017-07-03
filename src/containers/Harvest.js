import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { serviceRequest } from 'store/actions'
import { SocketConnector } from 'hoc'
import { Auth, Timesheets } from 'components'

class HarvestContainer extends Component {

  componentDidMount() {
    this.props.socketConnected && this.props.serviceRequest()
  }

  componentWillReceiveProps(nextProps) {
    // Try and move this logic back to the HOC container
    const { socketConnected, serviceRequest, posts } = nextProps

    if (socketConnected && !this.props.socketConnected) {
      serviceRequest()
    }
  }

  render() {
    const { posts, status, message } = this.props

    if (status === 'failed') {
      return (
        <span>{status}</span>
      )
    } else if (status === 'auth-failed') {
      return (
        <Auth message={message} icon="harvest" service="Harvest" authLink="/authorize_harvest" />
      )
    } else if (status === 'success') {
      return (
        <Timesheets posts={posts} />
      )
    }

    return (
      <span>Pulled nuffin m8 🤷</span>
    )
  }
}

// Listen and capture any changes made as a result of the the actions below.
const mapStateToProps = (state) => ({
  status: state.harvest.status.status,
  message: state.harvest.status.message,
})

const mapDispatchToProps = (dispatch) => ({
  serviceRequest: () => dispatch(serviceRequest('HARVEST')),
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

export default connect(mapStateToProps, mapDispatchToProps)(SocketConnector(HarvestContainer))
