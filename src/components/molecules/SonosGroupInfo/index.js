import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// import { Icon, Link, Heading, Badge } from 'components'

const Wrapper = styled.div`
  display: inline-flex;
  z-index: 1;
  flex: 1;
  color: white;
  text-transform: uppercase;
  align-items: center;
  margin: .5rem 0;
`

const SpeakerInfo = styled.div`
  display: inline-flex;
  z-index: 1;
  background: rgba(0, 0, 0, .2);
  border-radius: 5px;
  color: white;
  align-self: center;
  font-size: .67rem;
  padding: .5rem 1rem;
  text-transform: uppercase;
`
class SonosGroupInfo extends Component {
  constructor() {
    super()

    this.state = { speakerNames: '' }
  }

  componentDidMount() {
    this.speakerName(this.props.speakers)
  }

  componentWillReceiveProps(nextProps) {
    this.speakerName(nextProps.speakers)
  }

  speakerName(speakers) {
    let spakerNameDisplay = speakers
    if (speakers.filter(speaker => speaker.match('Studio')).length > 1) {
      spakerNameDisplay = speakers.map(speaker => speaker.match('Studio') ? 'Studio' : speaker)
    }

    let newSpeakerList = Array.from(new Set(spakerNameDisplay))

    if (newSpeakerList.length > 2) {
      newSpeakerList = [newSpeakerList[0], newSpeakerList[1], `+${newSpeakerList.length - 2}`]
    }

    this.setState({
      speakerNames: newSpeakerList.join(', '),
    })
  }

  render() {
    return (
      <Wrapper>
        <SpeakerInfo>{this.state.speakerNames}</SpeakerInfo>
      </Wrapper>
    )
  }
}

SonosGroupInfo.propTypes = {
  speakers: PropTypes.array.isRequired,
  children: PropTypes.any,
}

export default SonosGroupInfo
