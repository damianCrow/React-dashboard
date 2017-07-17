import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { TweenMax, TimelineMax } from 'gsap'


// .climacon_componentWrap-sun
const IconWrapper = styled.g`
`

const IconStroke = styled.path`
  fill-opacity: 1;
  fill: ${props => props.color ? props.color : '#000'};
  stroke-width: 0;
  stroke-color: ${props => props.color ? props.color : '#000'};
  transition: color 250ms cubic-bezier(.4, 0, .2, 1), fill 250ms cubic-bezier(.4, 0, .2, 1);
`

const SunBody = styled.circle`
  fill: transparent;
  stroke-width: 4px;
  fill: ${props => props.color ? props.color : '#000'};
  transition: stroke 250ms cubic-bezier(.4, 0, .2, 1);
  ${props => props.dashArray ? `stroke-dasharray:${props.dashArray}` : ''};
  ${props => props.strokeLength ? `stroke-dashoffset:${props.strokeLength}` : ''};
  transition: ${props => props.transition ? 'stroke-dashoffset 2s ease-out, stroke 250ms cubic-bezier(.4, 0, .2, 1)' : 'stroke 250ms cubic-bezier(.4, 0, .2, 1)'};
`

class SunIcon extends Component {
  constructor() {
    super()

    this.state = {
      strokeLength: false,
      dashArray: false,
      transition: false,
    }

    this.eachRay = []

    this.tl = new TimelineMax()
  }

  componentDidMount() {
    this.animateSun()
  }

  animateSun() {
    // https://greensock.com/forums/topic/15313-how-to-explode-svg-in-particles-from-center/
    // console.log('this.sunBody.getTotalLength()', this.sunBody)
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

    TweenMax.to(this.entireIcon, 12, {
      rotation: 360,
      transformOrigin: '50% 50%',
      repeat: -1,
      ease: Power0.easeNone,
    })

    this.tl
      .fromTo(this.eachRay, 3, {
        scale: 0,
        opacity: 0,
        transformOrigin: '50% 50%',
        ease: Back.easeOut,
      }, {
        scale: 1,
        opacity: 1,
      }, 1)


    this.tl
      .addLabel('rays')

    const isEven = x => !(x & 1)

    this.eachRay.forEach((ray, i) => {
      let delay = ''

      if (isEven(i)) {
        delay = '+=3'
      }

      this.tl
        .to(ray, 3, {
          scale: '.5',
          yoyo: true,
          transformOrigin: '50% 50%',
          repeat: -1,
          ease: Power0.easeNone,
        }, `rays${delay}`)
    })
  }

  render() {
    const { color } = this.props
    return (
      <g>
        <clipPath id="sunFillClip">
          <path
            d="M0 0v100h100V0H0zm50.001 57.999c-4.417 0-8-3.582-8-7.999 0-4.418 3.582-7.999 8-7.999s7.998 3.581 7.998 7.999c0 4.417-3.581 7.999-7.998 7.999z"
          />
        </clipPath>
        <g>
          <IconWrapper
            innerRef={e => (this.entireIcon = e)}
          >
            <IconStroke
              color={color}
              d="M72.03 51.999h-3.998c-1.105 0-2-.896-2-1.999s.895-2 2-2h3.998c1.104 0 2 .896 2 2s-.894 1.999-2 1.999z"
              innerRef={e => this.eachRay.push(e)}
            />
            <IconStroke
              color={color}
              d="M64.175 38.688c-.781.781-2.049.781-2.828 0-.781-.781-.781-2.047 0-2.828l2.828-2.828c.779-.781 2.047-.781 2.828 0 .779.781.779 2.047 0 2.828l-2.828 2.828z"
              innerRef={e => this.eachRay.push(e)}
            />
            <IconStroke
              color={color}
              d="M50.034 34.002c-1.105 0-2-.896-2-2v-3.999c0-1.104.895-2 2-2 1.104 0 2 .896 2 2v3.999c0 1.104-.898 2-2 2z"
              innerRef={e => this.eachRay.push(e)}
            />
            <IconStroke
              color={color}
              d="M35.893 38.688l-2.827-2.828c-.781-.781-.781-2.047 0-2.828.78-.781 2.047-.781 2.827 0l2.827 2.828c.781.781.781 2.047 0 2.828-.78.781-2.046.781-2.827 0z"
              innerRef={e => this.eachRay.push(e)}
            />
            <IconStroke
              color={color}
              d="M34.034 50c0 1.104-.896 1.999-2 1.999h-4c-1.104 0-1.998-.896-1.998-1.999s.896-2 1.998-2h4c1.106 0 2 .896 2 2z"
              innerRef={e => this.eachRay.push(e)}
            />
            <IconStroke
              color={color}
              d="M35.893 61.312c.781-.78 2.048-.78 2.827 0 .781.78.781 2.047 0 2.828l-2.827 2.827c-.78.781-2.047.781-2.827 0-.781-.78-.781-2.047 0-2.827l2.827-2.828z"
              innerRef={e => this.eachRay.push(e)}
            />
            <IconStroke
              color={color}
              d="M50.034 65.998c1.104 0 2 .895 2 1.999v4c0 1.104-.896 2-2 2-1.105 0-2-.896-2-2v-4c0-1.104.895-1.999 2-1.999z"
              innerRef={e => this.eachRay.push(e)}
            />
            <IconStroke
              color={color}
              d="M64.175 61.312l2.828 2.828c.779.78.779 2.047 0 2.827-.781.781-2.049.781-2.828 0l-2.828-2.827c-.781-.781-.781-2.048 0-2.828.779-.781 2.045-.781 2.828 0z"
              innerRef={e => this.eachRay.push(e)}
            />
          </IconWrapper>

          <g clipPath="url(#sunFillClip)">
            <SunBody
              innerRef={e => (this.sunBody = e)}
              color={color}
              strokeLength={this.state.strokeLength}
              dashArray={this.state.dashArray}
              transition={this.state.transition}
              hover={this.props.hovering}
              cx="50"
              cy="50"
              r="10"
            />
          </g>
        </g>
      </g>
    )
  }
}

SunIcon.propTypes = {
  hovering: PropTypes.bool,
  color: PropTypes.string,
}

export default SunIcon
