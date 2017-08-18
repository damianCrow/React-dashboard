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

class CloudSun extends Component {
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

    this.eachRay.forEach((ray, i) => {
      const delay = !(i & 1) ? '+=3' : ''

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
        <clipPath id="cloudFillClip">
          <path d="M15,15v70h70V15H15z M59.943,61.639c-3.02,0-12.381,0-15.999,0c-6.626,0-11.998-5.371-11.998-11.998c0-6.627,5.372-11.999,11.998-11.999c5.691,0,10.434,3.974,11.665,9.29c1.252-0.81,2.733-1.291,4.334-1.291c4.418,0,8,3.582,8,8C67.943,58.057,64.361,61.639,59.943,61.639z" />
        </clipPath>
        <clipPath id="sunCloudFillClip">
          <path d="M15,15v70h70V15H15z M57.945,49.641c-4.417,0-8-3.582-8-7.999c0-4.418,3.582-7.999,8-7.999s7.998,3.581,7.998,7.999C65.943,46.059,62.362,49.641,57.945,49.641z" />
        </clipPath>
        <g clipPath="url(#cloudFillClip)">
          <g>
            <g ref={e => { this.entireIcon = e }}>
              <IconStroke
                color={color}
                d="M80.029,43.611h-3.998c-1.105,0-2-0.896-2-1.999s0.895-2,2-2h3.998c1.104,0,2,0.896,2,2S81.135,43.611,80.029,43.611z"
                innerRef={e => this.eachRay.push(e)}
              />
              <IconStroke
                color={color}
                d="M72.174,30.3c-0.781,0.781-2.049,0.781-2.828,0c-0.781-0.781-0.781-2.047,0-2.828l2.828-2.828c0.779-0.781,2.047-0.781,2.828,0c0.779,0.781,0.779,2.047,0,2.828L72.174,30.3z"
                innerRef={e => this.eachRay.push(e)}
              />
              <IconStroke
                color={color}
                d="M58.033,25.614c-1.105,0-2-0.896-2-2v-3.999c0-1.104,0.895-2,2-2c1.104,0,2,0.896,2,2v3.999C60.033,24.718,59.135,25.614,58.033,25.614z"
                innerRef={e => this.eachRay.push(e)}
              />
              <IconStroke
                color={color}
                d="M43.892,30.3l-2.827-2.828c-0.781-0.781-0.781-2.047,0-2.828c0.78-0.781,2.047-0.781,2.827,0l2.827,2.828c0.781,0.781,0.781,2.047,0,2.828C45.939,31.081,44.673,31.081,43.892,30.3z"
                innerRef={e => this.eachRay.push(e)}
              />
              <IconStroke
                color={color}
                d="M42.033,41.612c0,1.104-0.896,1.999-2,1.999h-4c-1.104,0-1.998-0.896-1.998-1.999s0.896-2,1.998-2h4C41.139,39.612,42.033,40.509,42.033,41.612z"
                innerRef={e => this.eachRay.push(e)}
              />
              <IconStroke
                color={color}
                d="M43.892,52.925c0.781-0.78,2.048-0.78,2.827,0c0.781,0.78,0.781,2.047,0,2.828l-2.827,2.827c-0.78,0.781-2.047,0.781-2.827,0c-0.781-0.78-0.781-2.047,0-2.827L43.892,52.925z"
                innerRef={e => this.eachRay.push(e)}
              />
              <IconStroke
                color={color}
                d="M58.033,57.61c1.104,0,2,0.895,2,1.999v4c0,1.104-0.896,2-2,2c-1.105,0-2-0.896-2-2v-4C56.033,58.505,56.928,57.61,58.033,57.61z"
                innerRef={e => this.eachRay.push(e)}
              />
              <IconStroke
                color={color}
                d="M72.174,52.925l2.828,2.828c0.779,0.78,0.779,2.047,0,2.827c-0.781,0.781-2.049,0.781-2.828,0l-2.828-2.827c-0.781-0.781-0.781-2.048,0-2.828C70.125,52.144,71.391,52.144,72.174,52.925z"
                innerRef={e => this.eachRay.push(e)}
              />
            </g>
            <g clipPath="url(#sunCloudFillClip)">
              <SunBody
                innerRef={e => { this.sunBody = e }}
                color={color}
                strokeLength={this.state.strokeLength}
                dashArray={this.state.dashArray}
                transition={this.state.transition}
                hover={this.props.hovering}
                cx="58.033"
                cy="41.612"
                r="11.999"
              />
            </g>
          </g>
        </g>
        <g clipPath="url(#cloudFillClip)">
          <path fill={'white'} d="M44.033,65.641c-8.836,0-15.999-7.162-15.999-15.998c0-8.835,7.163-15.998,15.999-15.998c6.006,0,11.233,3.312,13.969,8.203c0.664-0.113,1.338-0.205,2.033-0.205c6.627,0,11.998,5.373,11.998,12c0,6.625-5.371,11.998-11.998,11.998C57.26,65.641,47.23,65.641,44.033,65.641z" />
        </g>
      </g>

    )
  }
}

CloudSun.propTypes = {
  hovering: PropTypes.bool,
  color: PropTypes.string,
}

export default CloudSun
