import React, { Component } from 'react'
import styled from 'styled-components'

import SineWaves from 'sine-waves/sine-waves.js'

import { fonts } from 'components/globals'

class WaveAnimation extends Component {

  constructor (props) {
    super(props)

    this.waveConfig = {
      speed: 5,
      ease: 'SineInOut',
      wavesWidth: '100%',
      waves: [
        {
          timeModifier: 4,
          lineWidth: 1,
          amplitude: -25,
          wavelength: 25,
        },
        {
          timeModifier: 2,
          lineWidth: 1,
          amplitude: -10,
          wavelength: 30,
        },
        {
          timeModifier: 1,
          lineWidth: 1,
          amplitude: -30,
          wavelength: 30,
        },
        {
          timeModifier: 3,
          lineWidth: 1,
          amplitude: 40,
          wavelength: 40,
        },
        {
          timeModifier: 0.5,
          lineWidth: 1,
          amplitude: -60,
          wavelength: 60,
        },
        {
          timeModifier: 1.3,
          lineWidth: 1,
          amplitude: -40,
          wavelength: 40,
        },
      ],
    }
  }

  componentDidMount() {
    this.startWaves()
  }

  startWaves() {
    this.waveConfig.el = this._canvas
    console.log('this.waveConfig', this.waveConfig)
    this.currentWave = new SineWaves(this.waveConfig)
  }

  render () {
    return (
      <canvas style={{ position: 'absolute', top: '0', width: '100%', height: '100%', left: '0' }} ref={(el) => { this._canvas = el }} />
    )
  }
}

export default WaveAnimation
