import React, { Component } from 'react'
import SineWaves from 'sine-waves/sine-waves'

class WaveAnimation extends Component {

  constructor(props) {
    super(props)

    this.waveConfig = {
      speed: 3,
      ease: 'SineInOut',
      wavesWidth: '100%',
      waves: [
        {
          timeModifier: 4,
          lineWidth: 1,
          amplitude: -15,
          wavelength: 25,
        },
        {
          timeModifier: 2,
          lineWidth: 1,
          amplitude: -2,
          wavelength: 30,
        },
        {
          timeModifier: 1,
          lineWidth: 1,
          amplitude: -20,
          wavelength: 30,
        },
        {
          timeModifier: 3,
          lineWidth: 1,
          amplitude: 20,
          wavelength: 40,
        },
        {
          timeModifier: 0.5,
          lineWidth: 1,
          amplitude: -40,
          wavelength: 60,
        },
        {
          timeModifier: 1.3,
          lineWidth: 1,
          amplitude: -30,
          wavelength: 40,
        },
      ],
    }
  }

  componentDidMount() {
    this.startWaves()
  }

  startWaves() {
    this.waveConfig.el = this.waveCanvas
    this.currentWave = new SineWaves(this.waveConfig)
  }

  render() {
    return (
      <canvas
        ref={(el) => { this.waveCanvas = el }}
        style={{ position: 'absolute', top: '0', width: '100%', height: '100%', left: '0' }}
      />
    )
  }
}

export default WaveAnimation
