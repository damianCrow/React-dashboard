// THIS IS CURRENTLY DOING NOTHING

import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getGoogleUsers } from 'store/actions'


function GoogleUsers(ConnectedComp) {
  class GoogleUsersWrapper extends Component {

    componentDidMount() {
      const { socketConnected, getGoogleUsers } = this.props

      const dummyUsers = ['simon.b@interstateteam.com']

      console.log('GoogleUsers hoc socketConnected', socketConnected)

      if (socketConnected) {
        getGoogleUsers(dummyUsers)
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
    getGoogleUsers: (users) => dispatch(getGoogleUsers(users)),
  })

  GoogleUsersWrapper.propTypes = {
    getGoogleUsers: PropTypes.func,
    socketConnected: PropTypes.bool,
  }

  GoogleUsersWrapper.defaultProps = {
    socketConnected: false,
  }

  return connect(mapStateToProps, mapDispatchToProps)(GoogleUsersWrapper)
}

export default GoogleUsers
