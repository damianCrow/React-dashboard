import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { socketConnectRequest } from 'store/actions'


function SocketConnector(ConnectedComp) {
  class SocketConnectorWrapper extends Component {

    componentDidMount() {
      const { socketConnected, socketRequest } = this.props
      if (!socketConnected) {
        socketRequest()
      }
    }

    render() {
      return (
        <ConnectedComp {...this.props} />
      )
    }

  }

  // Listen and capture any changes made as a result of the the actions below.
  const mapStateToProps = (state) => ({
    socketConnected: state.socket.connected,
  })

  const mapDispatchToProps = (dispatch) => ({
    socketRequest: () => dispatch(socketConnectRequest()),
  })

  SocketConnectorWrapper.propTypes = {
    socketRequest: PropTypes.func,
    socketConnected: PropTypes.bool,
  }

  SocketConnectorWrapper.defaultProps = {
    socketConnected: false,
  }

  return connect(mapStateToProps, mapDispatchToProps)(SocketConnectorWrapper)
}

export default SocketConnector
