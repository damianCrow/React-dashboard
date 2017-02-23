import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { fetchSonosDataIfNeeded, sonosStateMatch } from 'store/actions'

import { SonosContainer, SonosGroupQueue, SonosPlayer } from 'components'

class SonosInfoContainer extends Component {
  static propTypes = {
    groups: PropTypes.array.isRequired,
    newSonosState: PropTypes.object.isRequired,
    sonosStates: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount () {
    const { dispatch } = this.props
    dispatch(fetchSonosDataIfNeeded())
  }

  shouldComponentUpdate (nextProps, nextState) {
    const { newSonosState, dispatch } = this.props

    // Need to save the new Sonos state, before it gets replaced
    if (newSonosState !== nextProps.newSonosState) {
      dispatch(sonosStateMatch())
      return true
    }

    return true
  }

  listenForChanges () {

  }

  speakerNames (members) {
    let speakerNames = []
    for (let i = 0; i < members.length; i++) {
      speakerNames[i] = ` 🔈 ${members[i].roomName}`
    }
    return speakerNames
  }

  matchGroupWithState (group, sonosStates) {
    for (let i = 0; i < sonosStates.length; i++) {
      if (sonosStates[i].uuid === group.uuid) {
        return sonosStates[i]
      }
    }

    return {}
  }

  render () {
    const { groups, isFetching, sonosStates } = this.props

    const isGroupsEmpty = groups.length === 0
    const isStateEmpty = sonosStates.length === 0

    console.log('isGroupsEmpty ', isGroupsEmpty)
    console.log('isStateEmpty ', isStateEmpty)

    if (!isGroupsEmpty && !isStateEmpty) {
      let players = groups.map(group => {
        return <SonosPlayer
          key={group.uuid}
          speakers={this.speakerNames(group.members)}
          playerState={this.matchGroupWithState(group, sonosStates)}
        />
      })

      // if (newSonosState.uuid === groups[i].uuid) {
      //   players = groups.map(item => {
      //     return <SonosPlayer
      //       key={item.uuid}
      //       speakers={this.speakerNames(item.members)}
      //       playerState={newSonosState}
      //     />
      //   })
      // }

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
    newSonosState,
    sonosStates,
    isFetching,
    message,
    status
  } = sonos['sonosProcess']['sonosDetails'] || {
    groups: [],
    newSonosState: {},
    sonosStates: [],
    isFetching: true,
    message: '',
    status: ''
  }

  return {
    groups,
    newSonosState,
    sonosStates,
    isFetching,
    message,
    status
  }
}

export default connect(mapStateToProps)(SonosInfoContainer)
