import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { socketDataRequest, serviceRequest, sonosStateMatch, featuredSpeaker } from 'store/actions'

import { SonosContainer, SonosGroupQueue, SonosPlayer, SplashScreen } from 'components'

class SonosInfoContainer extends Component {

  constructor() {
    super()

    this.state = {
      players: [],
    }
  }

  componentDidMount() {
    this.props.serviceRequest()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.forceUpdate()
    }
  }

  render() {
    const { speakers } = this.props

    if (speakers.length) {
      speakers.map((speaker, idx) => {
        if (speaker.state.playbackState === 'STOPPED') {
          speakers.splice(idx, 1)
        }
      })
      return (
        <SonosContainer>
          {speakers.map(speaker => {
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
                playerCount={speakers.length}
              />
            )
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
  serviceRequest: () => dispatch(socketDataRequest({ service: 'SONOS', serverAction: 'pull', request: 'zones' })),
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

export default connect(mapStateToProps, mapDispatchToProps)(SonosInfoContainer)
