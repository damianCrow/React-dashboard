import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components'

// import { Icon, Link, Heading, Badge } from 'components'

const WrapperStyles = ({ fullWidth, wide, square, superWide, megaWide }) => css`
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
    ${megaWide && 'padding-top: 7.5%; perspective: 1000px;'}
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
  megaWide: PropTypes.bool,
  square: PropTypes.bool,
  third: PropTypes.bool,
  children: PropTypes.any,
}

export default Feature
