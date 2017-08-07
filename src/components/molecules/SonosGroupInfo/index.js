import PropTypes from 'prop-types'
import React from 'react'
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

const SonosGroupInfo = ({ featuredSpeaker, playerCount }) => {

  if (featuredSpeaker.split('/').length > 1) {
    if (featuredSpeaker.split('/')[0].match('Studio') && featuredSpeaker.split('/')[1].match('Studio')) {
      featuredSpeaker = 'Studio'
    }
  }

  let groupClass
  switch (playerCount) {
    case 2:
      groupClass = 'two_groups'
      break
    case 3:
      groupClass = 'three_groups'
      break
    default: ''
  }
  return (
    <Wrapper>
      <SpeakerInfo className={groupClass}>
        {featuredSpeaker}
      </SpeakerInfo>
    </Wrapper>
  )
}

SonosGroupInfo.propTypes = {
  speakers: PropTypes.array.isRequired,
  children: PropTypes.any,
  featuredSpeaker: PropTypes.string,
  playerCount: PropTypes.number,
}

export default SonosGroupInfo
