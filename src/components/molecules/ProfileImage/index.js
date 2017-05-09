import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { fonts } from 'components/globals'

// import ReactDOM from 'react-dom'
import styled from 'styled-components'

// import { TweenMax } from 'gsap'

const Circle = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background: #f36c00;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: .25rem .5rem;
`

const TextFallback = styled.span`
  font-size: 1.5rem;
  color: white;
  font-family: ${fonts.primary};
  text-transform: uppercase;
  line-height: 1;
`

class ProfileImage extends Component {
  render() {
    return (
      <Circle>
        <TextFallback>{this.props.children}</TextFallback>
      </Circle>
    )
  }
}

ProfileImage.propTypes = {
  currentImage: PropTypes.string,
  thumbnail: PropTypes.string,
  children: PropTypes.node,
}

export default ProfileImage
