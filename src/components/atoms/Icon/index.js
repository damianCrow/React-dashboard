import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { palette } from 'styled-theme'
import { ifProp } from 'styled-tools'

export const fontSize = ({ height }) => height ? `${height / 16}rem` : '1.25em'

const Wrapper = styled.span`
  display: inline-flex;
  font-size: ${fontSize};
  color: ${ifProp('palette', palette({ grayscale: 0 }, 1), 'currentcolor')};
  width: 1em;
  height: 1em;
  margin: 0.1em;
  box-sizing: border-box;

  & > svg {
    width: 100%;
    height: 100%;
    fill: currentcolor;
    stroke: transparent;
  }
`

const Icon = ({ icon, ...props }) => {
  const svg = require(`raw-loader!./icons/${icon}.svg`)
  return <Wrapper {...props} dangerouslySetInnerHTML={{ __html: svg }} />
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  height: PropTypes.number,
  palette: PropTypes.string,
  reverse: PropTypes.bool,
}

export default Icon
