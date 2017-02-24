import React, { PropTypes } from 'react'
import styled, { css } from 'styled-components'

// import { Icon, Link, Heading, Badge } from 'components'

const WrapperStyles = ({ double }) => css`
  position: relative;
  width: 33.33333%;
  margin: 0;

  &:before{
    display: block;
    content: " ";
    width: 100%;
    padding-top: ${double ? '200%' : '100%'};
  }
`

const Wrapper = styled.article`${WrapperStyles}`

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
