import React, { PropTypes } from 'react'
import styled from 'styled-components'

// import { Icon, Link, Heading, Badge } from 'components'

const Wrapper = styled.div`
  display: inline-block;
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
