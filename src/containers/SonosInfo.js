import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { fetchSonosDataIfNeeded } from 'store/actions'

import { SonosContainer, SonosGroupQueue, SonosPlayer } from 'components'

class SonosInfoContainer extends Component {
  static propTypes = {
    groups: PropTypes.array.isRequired,
    sonosState: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount () {
    const { dispatch } = this.props
    dispatch(fetchSonosDataIfNeeded())
  }

  listenForChanges () {

  }

  speakerNames (members) {
    let speakerNames = []
    for (let i = 0; i < members.length; i++) {
      speakerNames[i] = members[i].roomName
    }
    return speakerNames
  }

  render () {
    const { groups, isFetching, sonosState } = this.props

    const isGroupsEmpty = groups.length === 0
    const isStateEmpty = Object.keys(sonosState).length === 0 && sonosState.constructor === Object

    if (!isGroupsEmpty && !isStateEmpty) {
      let players = []
      for (let i = 0; i < groups.length; i++) {
        let playerState = {}

        if (sonosState.uuid === groups[i].uuid) {
          playerState = sonosState
        }

        console.log('groups[i]', groups[i])

        players.push(
          <SonosPlayer
            key={groups[i].uuid}
            speakers={this.speakerNames(groups[i].members)}
            playerState={playerState}
          />
        )
      }

      return (
        <SonosContainer isFetching={isFetching} >
          {players}
          {groups.length === 1 &&
            <span>Sonos Queue</span>
            // <SonosGroupQueue />
          }
        </SonosContainer>
      )
    } else {
      return null
    }
  }
}

const mapStateToProps = state => {
  const { sonos } = state
  const {
    groups,
    sonosState,
    isFetching,
    message,
    status
  } = sonos['sonosProcess']['sonosDetails'] || {
    groups: [],
    sonosState: {},
    isFetching: true,
    message: '',
    status: ''
  }

  return {
    groups,
    sonosState,
    isFetching,
    message,
    status
  }
}

export default connect(mapStateToProps)(SonosInfoContainer)
