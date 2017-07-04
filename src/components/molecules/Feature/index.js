import React, { PropTypes } from 'react'
import styled, { css } from 'styled-components'

// import { Icon, Link, Heading, Badge } from 'components'

const WrapperStyles = ({ fullWidth, wide, square, superWide }) => css`
  position: relative;
  flex: 1 1 ${fullWidth ? '100%' : '33.33333%'};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  will-change: transform;

  &:before{
    display: block;
    content: " ";
    width: 100%;
    ${superWide && 'padding-top: 20%;'}
    ${wide && 'padding-top: 56.25%;'}
    ${square && 'padding-top: 100%;'}
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
  fullWidth: PropTypes.bool,
  wide: PropTypes.bool,
  square: PropTypes.bool,
  third: PropTypes.bool,
  children: PropTypes.any,
}

export default Feature
