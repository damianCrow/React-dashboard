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

    if (speakers.length) {
      return (
        <SonosContainer>
          {speakers.map(speaker => {
            if (speaker.state.playbackState !== 'STOPPED') {
              let previousTrackObj = {}
              if (this.props.previousTracksObj[speaker.uuid].length > 1) {
                previousTrackObj = this.props.previousTracksObj[speaker.uuid][this.props.previousTracksObj[speaker.uuid].length - 2]
              }
              return (
                <SonosPlayer
                  key={speaker.uuid}
                  speakers={speaker.members}
                  playerState={speaker.state}
                  previousTrack={previousTrackObj}
                  featuredSpeaker={speaker.roomName}
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
  previousTracksObj: state.sonos.previousTracksObj,
})

const mapDispatchToProps = (dispatch) => ({
  serviceRequest: () => dispatch(serviceRequest('SONOS')),
})

SonosInfoContainer.propTypes = {
  socketConnected: PropTypes.bool,
  serviceRequest: PropTypes.func,
  speakers: PropTypes.array,
  previousTracksObj: PropTypes.object,
}

SonosInfoContainer.defaultProps = {
  socketConnected: false,
  sonosRequest: false,
}

export default connect(mapStateToProps, mapDispatchToProps)(SocketConnector(SonosInfoContainer))
