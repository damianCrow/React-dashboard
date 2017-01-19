import React, { PropTypes } from 'react'
import styled from 'styled-components'

// import { Icon, Link, Heading, Badge } from 'components'

const Wrapper = styled.div`
  position: relative;
  width: 33.33333%;

  &:before{
    display: block;
    content: " ";
    width: 100%;
    padding-top: 100%;
  }
`

const Feature = ({ children, ...props }) => {
  return (
    <Wrapper {...props}>
      {children}
    </Wrapper>
  )
}

Feature.propTypes = {
  full: PropTypes.bool,
  half: PropTypes.bool,
  third: PropTypes.bool,
  children: PropTypes.any
}

export default Feature
