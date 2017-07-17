import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'


// .climacon_componentWrap-sun
const IconWrapper = styled.g`
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  transform-origin: 50% 50%;
  animation-duration: 12s;
  animation-direction: normal;
`

const Cloud = styled.path`
  fill-opacity: 1;
  fill: ${props => props.color ? props.color : '#000'};
  stroke-width: 0;
  stroke-color: ${props => props.color ? props.color : '#000'};
`

class CloudIcon extends Component {
  constructor() {
    super()

    this.state = {
      strokeLength: false,
      dashArray: false,
      transition: false,
    }
    // this.tl = new TimelineMax({ onComplete: () => (this.dropsTl.play()) })
  }

  render() {
    return (
      <IconWrapper>
        <clipPath id="a">
          <path d="M15 15v70h70V15H15zm45 46.6H44c-6.7 0-12-5.3-12-12 0-6.6 5.3-12 12-12 5.6 0 10.4 4 11.6 9.3 1.3-1 2.7-1.4 4.3-1.4 4.4 0 8 3.6 8 8 0 4.5-3.6 8-8 8z" />
        </clipPath>
        <g clipPath="url(#a)">
          <Cloud {...this.props} d="M44 65.6c-9 0-16-7-16-16 0-8.8 7-16 16-16 6 0 11.2 3.4 14 8.2l2-.2c6.6 0 12 5.4 12 12 0 6.7-5.4 12-12 12H44z" />
        </g>
      </IconWrapper>
    )
  }
}

CloudIcon.propTypes = {
  hovering: PropTypes.bool,
  color: PropTypes.string,
}

export default CloudIcon
