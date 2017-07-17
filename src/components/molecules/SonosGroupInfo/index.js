import PropTypes from 'prop-types';
import React from 'react';
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
  background: rgba(0, 0, 0, .5);
  color: white;
  align-self: center;
  font-size: .75rem;
  padding: .25rem 1rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
`

const SonosGroupInfo = ({ children, ...props, speakers, featuredSpeaker }) => {
  console.log('featuredSpeaker: ', featuredSpeaker)

  return (
    <Wrapper>
      <SpeakerInfo>
        {/* speakers.map((speaker, i) => <span key={i}>
          {!!i && ', '}
          {speaker}
        </span>) */}
        {speakers.map((member) => member)}
      </SpeakerInfo>
    </Wrapper>
  )
}

SonosGroupInfo.propTypes = {
  speakers: PropTypes.array.isRequired,
  children: PropTypes.any,
  featuredSpeaker: PropTypes.string,
}

export default SonosGroupInfo
