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
              let zoneDisplayName = ''
              this.props.speakerZones.map((zone) => {
                if (zone.coordinator.uuid === speaker.uuid || zone.coordinator === speaker.uuid) {
                  if (this.props.previousTracksObj[speaker.uuid].length > 1) {
                    previousTrackObj = this.props.previousTracksObj[speaker.uuid][this.props.previousTracksObj[speaker.uuid].length - 2]
                  }
                  if (zone.members.length === 1) {
                    if (zone.roomName !== undefined) {
                      zoneDisplayName = zone.roomName
                    } else {
                      zoneDisplayName = zone.coordinator.roomName
                    }
                  } else if (zone.members.length === 2) {
                    if (typeof zone.members[0] === 'string') {
                      zoneDisplayName = `${zone.members[0]}/${zone.members[1]}`
                    } else if (typeof zone.members[0] === 'object') {
                      zoneDisplayName = `${zone.members[0].roomName}/${zone.members[1].roomName}`
                    } else if (zone.members[0] === null || undefined) {
                      zoneDisplayName = `${zone.roomName} + ${zone.members.length - 1}`
                    }
                  } else if (zone.members.length > 2) {
                    if (typeof zone.members[0] === 'string') {
                      zoneDisplayName = `${zone.members[0]}/${zone.members[1]} + ${zone.members.length - 2}`
                    } else if (typeof zone.members[0] === 'object') {
                      zoneDisplayName = `${zone.members[0].roomName}/${zone.members[1].roomName} + ${zone.members.length - 2}`
                    } else if (zone.members[0] === null || undefined) {
                      zoneDisplayName = `${zone.roomName} + ${zone.members.length - 1}`
                    }
                  }
                }
                return null
              })

              return (
                <SonosPlayer
                  key={speaker.uuid}
                  speakers={speaker.members}
                  playerState={speaker.state}
                  previousTrack={previousTrackObj}
                  featuredSpeaker={zoneDisplayName}
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
  speakerZones: state.sonos.speakerZones,
})

const mapDispatchToProps = (dispatch) => ({
  serviceRequest: () => dispatch(serviceRequest('SONOS')),
})

SonosInfoContainer.propTypes = {
  socketConnected: PropTypes.bool,
  serviceRequest: PropTypes.func,
  speakers: PropTypes.array,
  previousTracksObj: PropTypes.object,
  speakerZones: PropTypes.array,
}

SonosInfoContainer.defaultProps = {
  socketConnected: false,
  sonosRequest: false,
}

export default connect(mapStateToProps, mapDispatchToProps)(SocketConnector(SonosInfoContainer))
