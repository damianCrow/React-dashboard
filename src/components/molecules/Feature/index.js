import React, { PropTypes } from 'react'
import styled from 'styled-components'

// import { Icon, Link, Heading, Badge } from 'components'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  padding: 1rem;
  padding-bottom: 30%;
  box-sizing: border-box;
  border: 1px solid black;
  flex: 1;
  text-align: center;
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
