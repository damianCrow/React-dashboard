import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// import { Icon, Link, Heading, Badge } from 'components'

const Wrapper = styled.div`
  display: inline-flex;
  z-index: 1;
  color: white;
  align-self: center;
  text-transform: uppercase;
  width: 100%;
  align-items: center;
  justify-content: center;
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
  margin-bottom: 1rem;
  text-transform: uppercase;
  position: absolute;
  top: 25px;
  &.two_groups {
    left: 47%;
  }
  &.three_groups {
    left: 40%;
  }
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

    this.setState({
      speakerNames: Array.from(new Set(spakerNameDisplay)).join(', '),
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
