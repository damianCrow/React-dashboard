import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { sonosReadRequest, serviceRequest, sonosStateMatch, featuredSpeaker } from 'store/actions'
import { SocketConnector } from 'hoc'

import { SonosContainer, SonosGroupQueue, SonosPlayer, SplashScreen } from 'components'

class SonosInfoContainer extends Component {

  constructor() {
    super()

    this.state = {
      players: [],
    }
  }

  componentDidMount() {
    this.props.socketConnected && this.props.serviceRequest()
  }

  componentWillReceiveProps(nextProps) {
    // Try and move this logic back to the HOC container
    const { socketConnected, serviceRequest } = nextProps

    if (socketConnected && !this.props.socketConnected) {
      serviceRequest()
    }
  }

  // speakerNames(members) {
  //   let speakerNames = []
  //   for (let i = 0; i < members.length; i++) {
  //     speakerNames[i] = ` ${members[i].roomName}`
  //   }
  //   return speakerNames
  // }

  render() {
    const { speakers } = this.props

    // const isGroupsEmpty = groups.length === 0
    // const isStateEmpty = sonosStates.length === 0

    // console.log('isGroupsEmpty ', isGroupsEmpty)
    // console.log('isStateEmpty ', isStateEmpty)

    if (speakers.length) {
      return (
        <SonosContainer>
          {speakers.map(speaker => {
            // console.log('speaker.state', speaker.state)
            if (speaker.state.playbackState !== 'STOPPED') {
              return (
                <SonosPlayer
                  key={speaker.uuid}
                  speakers={speaker.members}
                  playerState={speaker.state}
                />
              )
            }
            return null
          })}
        </SonosContainer>
      )
    }
    return (
      <SplashScreen icon="sonos" service="Sonos" />
    )
  }
}

// Listen and capture any changes made as a result of the the actions below.
const mapStateToProps = (state) => ({
  speakers: state.sonos.speakers,
})

const mapDispatchToProps = (dispatch) => ({
  serviceRequest: () => dispatch(serviceRequest('SONOS')),
})

SonosInfoContainer.propTypes = {
  socketConnected: PropTypes.bool,
  serviceRequest: PropTypes.func,
  speakers: PropTypes.array,
}

SonosInfoContainer.defaultProps = {
  socketConnected: false,
  sonosRequest: false,
}

export default connect(mapStateToProps, mapDispatchToProps)(SocketConnector(SonosInfoContainer))
