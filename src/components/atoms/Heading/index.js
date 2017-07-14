import React, { PropTypes } from 'react'
import styled, { css } from 'styled-components'
import { font, palette } from 'styled-theme'

export const fontSize = ({ level }) => `${1 + (1 * (1 / level))}rem`

const styles = css`
  font-family: ${font('primary')};
  font-weight: 500;
  font-size: ${fontSize};
  margin: 15px 0 0 0;
  transform: translateX(-50%);
  left: 50%;
  position: relative;
  text-align: center;
  color: ${palette({ grayscale: 0 }, 1)};
`

const Heading = styled(({ level, children, reverse, palette, theme, ...props }) =>
  React.createElement(`h${level}`, props, children)
)`${styles}`

Heading.propTypes = {
  level: PropTypes.number,
  children: PropTypes.node,
  palette: PropTypes.string,
  reverse: PropTypes.bool,
}

Heading.defaultProps = {
  level: 1,
  palette: 'grayscale',
}

export default Heading
