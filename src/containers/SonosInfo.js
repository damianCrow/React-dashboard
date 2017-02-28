import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { fetchSonosDataIfNeeded, sonosStateMatch, featuredSpeaker } from 'store/actions'

import { SonosContainer, SonosGroupQueue, SonosPlayer, SplashScreen } from 'components'

class SonosInfoContainer extends Component {
  static propTypes = {
    groups: PropTypes.array.isRequired,
    newSonosState: PropTypes.object.isRequired,
    sonosStates: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  constructor () {
    super()

    this.state = {
      players: []
    }
  }

  componentDidMount () {
    const { dispatch } = this.props
    dispatch(fetchSonosDataIfNeeded())
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (this.props.newSonosState !== nextProps.newSonosState) {
      return true
    } else {
      return false
    }
  }

  componentWillReceiveProps (nextProps) {
    const { groups, newSonosState, dispatch } = this.props
    console.log('componentWillReceiveProps')

    // dispatch(featuredSpeaker())
    // Need to save the new Sonos state, before it gets replaced
    if (newSonosState !== nextProps.newSonosState) {
      dispatch(sonosStateMatch())
    }

    this.buildPlayers(nextProps)
  }

  buildPlayers (props) {
    const { newSonosState, sonosStates, groups } = props

    // console.log('componentWillReceiveProps newPlayers', newPlayers)

    console.log('newSonosState', newSonosState)
    console.log('groups', groups)

    const isGroupsEmpty = groups.length === 0
    const isStateEmpty = newSonosState.length === 0

    // for (let i = 0; i < sonosStates.length; i++) {
    //   if (sonosStates[i].uuid === newSonosState.uuid) {
    //     this.props.sonosStates[i] = newSonosState
    //   } else if (i === sonosStates.length) {
    //     this.props.sonosStates[i] = newSonosState
    //   }
    // }

    if (!isGroupsEmpty && !isStateEmpty) {
      this.state.players = groups.map(group => {
        // if (matachedGroupAndState !== false) {
        return <SonosPlayer
          key={group.uuid}
          speakers={this.speakerNames(group.members)}
          playerState={this.matchGroupWithState(group, sonosStates)}
        />
        // }
      })
    }

    // if (newPlayers.length > 0) {
    //   this.state.players = newPlayers
    //   this.forceUpdate()
    // }
  }

  speakerNames (members) {
    let speakerNames = []
    for (let i = 0; i < members.length; i++) {
      speakerNames[i] = ` ${members[i].roomName}`
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

    // const isGroupsEmpty = groups.length === 0
    // const isStateEmpty = sonosStates.length === 0

    // console.log('isGroupsEmpty ', isGroupsEmpty)
    // console.log('isStateEmpty ', isStateEmpty)

    console.log('SONOSINFO RENDER this.state.players.length', this.state.players.length)

    if (this.state.players.length !== 0) {
      // let players = groups.map(group => {
      //   return <SonosPlayer
      //     key={group.uuid}
      //     speakers={this.speakerNames(group.members)}
      //     speakerFeature={this.state.featuredSpeaker}
      //     playerState={this.state.playerState}
      //   />
      // })

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
          {this.state.players}
        </SonosContainer>
      )
    } else {
      return (
        <SplashScreen icon="sonos" service="Sonos" />
      )
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
