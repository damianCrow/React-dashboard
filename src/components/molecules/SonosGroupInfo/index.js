import React, { PropTypes } from 'react'
import styled from 'styled-components'

// import { Icon, Link, Heading, Badge } from 'components'

const Wrapper = styled.div`
  display: inline-block;
  z-index: 1;
  background: rgba(0, 0, 0, .5);
  color: white;
  align-self: center;
  padding: .25rem 1rem;
`

const SonosGroupInfo = ({ children, ...props, speakers }) => {
  return (
    <Wrapper>
      {speakers}
    </Wrapper>
  )
}

SonosGroupInfo.propTypes = {
  speakers: PropTypes.array.isRequired,
  children: PropTypes.any
}

export default SonosGroupInfo
