import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
import PropTypes from 'prop-types'

const IconWrapper = styled.g`
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  transform-origin: 50% 50%;
  animation-duration: 12s;
  animation-direction: normal;
`

const CloudPath = styled.path`
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  transform-origin: 50% 50%;
  animation-duration: 12s;
  animation-direction: normal;
`
const CloudG = styled.g`
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  transform-origin: 50% 50%;
  animation-duration: 12s;
  animation-direction: normal;
`
const partialRotate = keyframes`
  0% {
    transform: rotate(0);
  }
  25% {
    transform: rotate(-15deg);
  }
  50% {
    transform: rotate(0);
  }
  75% {
    transform: rotate(15deg);
  }
  100% {
    transform: rotate(0deg);
  }
`
const CloudGChild = styled(CloudG)`
  animation-name: ${partialRotate};
  animation-duration: 12s;
  animation-direction: alternate;
`
const CloudPathChild = styled(CloudPath)`
  fill: ${props => props.color ? props.color : '#000'};
  stroke-width: 2px;
  stroke: ${props => props.color ? props.color : '#000'};  
`

class MoonIcon extends Component {
  render() {
    const { color } = this.props
    return (
      <IconWrapper>
        <clipPath id="moonFillClip">
          <CloudPath d="M15,15v70h70V15H15z M50,57.999c-4.418,0-7.999-3.582-7.999-7.999c0-3.803,2.655-6.979,6.211-7.792c0.903,4.854,4.726,8.676,9.579,9.58C56.979,55.344,53.802,57.999,50,57.999z" />
        </clipPath>
        <CloudG>
          <CloudGChild clipPath="url(#moonFillClip)">
            <CloudPathChild color={color} d="M50,61.998c-6.627,0-11.999-5.372-11.999-11.998c0-6.627,5.372-11.999,11.999-11.999c0.755,0,1.491,0.078,2.207,0.212c-0.132,0.576-0.208,1.173-0.208,1.788c0,4.418,3.582,7.999,8,7.999c0.614,0,1.212-0.076,1.788-0.208c0.133,0.717,0.211,1.452,0.211,2.208C61.998,56.626,56.626,61.998,50,61.998z" />
          </CloudGChild>
        </CloudG>
      </IconWrapper>
    )
  }
}

MoonIcon.propTypes = {
  color: PropTypes.string,
}

export default MoonIcon
