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
    const zones = this.props.zones.filter(member => member.coordinator.state.playbackState !== 'STOPPED')

    if (zones.length) {
      return (
        <SonosContainer>
          {zones.map(zone => {
            console.log('zone', zone)
            return (
              <SonosPlayer
                key={zone.coordinator.coordinator}
                speakers={[].concat(zone.members.map(member => member.roomName))}
                playerState={zone.coordinator.state}
                // previousTrack={previousTrackObj}
                // featuredSpeaker={zoneDisplayName}
                playerCount={zones.length}
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
  // speakers: state.sonos.speakers,
  previousTracksObj: state.sonos.previousTracksObj,
  zones: state.sonos.speakerZones,
})

const mapDispatchToProps = (dispatch) => ({
  serviceRequest: () => dispatch(socketDataRequest({ service: 'SONOS', serverAction: 'pull', request: 'zones' })),
})

SonosInfoContainer.propTypes = {
  socketConnected: PropTypes.bool,
  serviceRequest: PropTypes.func,
  speakers: PropTypes.array,
  previousTracksObj: PropTypes.object,
  zones: PropTypes.array,
}

SonosInfoContainer.defaultProps = {
  socketConnected: false,
  sonosRequest: false,
}

export default connect(mapStateToProps, mapDispatchToProps)(SonosInfoContainer)
