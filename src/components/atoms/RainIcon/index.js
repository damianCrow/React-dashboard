import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { TweenMax, TimelineMax } from 'gsap'


// .climacon_componentWrap-sun
const IconWrapper = styled.g`
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  transform-origin: 50% 50%;
  animation-duration: 12s;
  animation-direction: normal;
`

// const Cloud = styled.path`
//   fill-opacity: 1;
//   stroke-width: 0;
//   stroke-color: ${props => props.color ? props.color : '#000'};
// `

const EntireIcon = styled.path`
  fill-opacity: 1;
  fill: ${props => props.color ? props.color : '#000'};
  stroke-width: 0;
  stroke-color: ${props => props.color ? props.color : '#000'};
`

class RainIcon extends Component {
  constructor() {
    super()

    this.state = {
      strokeLength: false,
      dashArray: false,
      transition: false,
    }

    this.eachDrop = []
    this.dropsTls = []
    // this.tl = new TimelineMax({ onComplete: () => (this.dropsTl.play()) })
  }

  componentDidMount() {
    this.makeItRain()
  }

  makeItRain() {
    // https://greensock.com/forums/topic/15313-how-to-explode-svg-in-particles-from-center/
    // this.setState({
    //   dashArray: Math.ceil(this.sunBody.getTotalLength()),
    //   strokeLength: Math.ceil(this.sunBody.getTotalLength()),
    // })

    // // TODO: Change to request animaiton frame
    // setTimeout(() =>
    //   this.setState({
    //     strokeLength: '0',
    //     transition: true,
    //   })
    // , 1000)

    this.eachDrop.forEach((drop, i) => {
      this.dropsTls.push(new TimelineMax({ repeat: -1, delay: 0.6 * i }))

      this.dropsTls[i]
        .fromTo(drop, 1, {
          y: '0',
          ease: Power0.easeNone,
        }, {
          y: '21px',
          ease: Power0.easeNone,
        })
        .fromTo(drop, 0.15, {
          opacity: 0,
        }, {
          opacity: 1,
        }, '-=1')
        .to(drop, 0.15, {
          opacity: 0,
        }, '0.85')
    })
  }

  render() {
    return (
      <IconWrapper>
        <g>
          <g>
            <EntireIcon {...this.props} innerRef={e => this.eachDrop.push(e)} d="M57 57.7l-2.2 2c-1 1.3-1 3.2 0 4.3 1.2 1.2 3 1.2 4.3 0 1.3-1 1.3-3 0-4.2l-2-2z" />
            <EntireIcon {...this.props} innerRef={e => this.eachDrop.push(e)} d="M50 57.7l-2 2C46.8 61 46.8 63 48 64c1 1.2 3 1.2 4.2 0s1.2-3 0-4.2l-2-2z" />
            <EntireIcon {...this.props} innerRef={e => this.eachDrop.push(e)} d="M43 57.7l-2 2C39.6 61 39.6 63 41 64s3 1.2 4.2 0c1-1 1-3 0-4.2l-2.2-2z" />
          </g>
          <EntireIcon {...this.props} d="M60 41.6c-.8 0-1.4 0-2 .2-2.8-4.8-8-8.2-14-8.2-9 0-16 7.2-16 16 0 6 3.2 11.2 8 14 .4-1.3 1-2.5 2-3.5-3.6-2-6-6-6-10.4 0-6.6 5.3-12 12-12 5.6 0 10.4 4 11.6 9.3 1.3-1 2.7-1.4 4.3-1.4 4.4 0 8 3.6 8 8 0 3.5-2.2 6.4-5.3 7.5.8 1.3 1.2 2.6 1.2 4 4.6-1.7 8-6 8-11.4 0-6.6-5.4-12-12-12z" />
        </g>
      </IconWrapper>
    )
  }
}

RainIcon.propTypes = {
  hovering: PropTypes.bool,
}

export default RainIcon
