import React, { PropTypes, Component } from 'react'
import styled from 'styled-components'
// import ReactDOM from 'react-dom'

import { TweenMax } from 'gsap'

class FadingTransitionWrapper extends Component {

  componentWillEnter(callback) {
    TweenMax.fromTo(this.container, 2, { opacity: 0 }, { opacity: 1, onComplete: callback })
  }

  componentWillLeave(callback) {
    TweenMax.fromTo(this.container, 2, { opacity: 1 }, { opacity: 0, onComplete: callback })
  }

  render() {
    const { children } = this.props

    const Wrapper = styled.div`
      display: flex;
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
    `

    return (
      <Wrapper innerRef={(el) => { this.container = el }}>
        { children }
      </Wrapper>)
  }
}

FadingTransitionWrapper.propTypes = {
  children: PropTypes.node,
}

export default FadingTransitionWrapper

