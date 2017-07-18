import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux'

import styled, { css } from 'styled-components'
import TransitionGroup from 'react-transition-group/TransitionGroup'

import { resumeServiceSlideshow, pauseServiceSlideshow } from 'store/actions'

// import Vimeo from '@vimeo/player'

const styles = ({ ...props }) => css`
  color: black;
  display: block;
  height: 100%;
  justify-content: center;
  left: 0;
  overflow: hidden;
  position: absolute;
  text-align: left;
  top: 0;
  width: 100%;
  iframe, .vimeo {
    width: 100%;
    height: 100%;
  }
`

const VimeoContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const VimeoWrapper = styled(TransitionGroup)`${styles}`

class VimeoVideo extends Component {
  static propTypes = {
    url: PropTypes.string,
    serviceId: PropTypes.string,
    resumeInstaSlideshow: PropTypes.func.isRequired,
    pauseInstaSlideshow: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    // this.onVideoEnd = this.onVideoEnd.bind(this)
    // console.log('vimeo video constructor')
  }

  componentDidMount() {
    // https://github.com/vimeo/player.js/issues/3
    const VimeoPlayer = require('@vimeo/player')
    const player = new VimeoPlayer(this.vimeoIframe, {
      byline: false,
    })
    player.setVolume(0)

    player.on('ended', () => {
      this.props.resumeInstaSlideshow()
    })
  }

  // onVideoEnd() {
  //   console.log('VimeoVideo onVideoEnd fired')
  //   this.props.resumeInstaSlideshow()
  // }

  // handleVideoReady(event) {
  //   console.log('vimeo video ready event', event)
  // }

  render() {
    const { serviceId } = this.props
    return (
      <VimeoWrapper>
        <VimeoContainer>
          <iframe
            ref={(c) => { this.vimeoIframe = c }}
            src={`https://player.vimeo.com/video/${serviceId}?autoplay=1`}
            frameBorder="0"
          />
        </VimeoContainer>
      </VimeoWrapper>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  resumeInstaSlideshow: () => dispatch(resumeServiceSlideshow('showcase')),
  pauseInstaSlideshow: () => dispatch(pauseServiceSlideshow('showcase')),
})


export default connect(null, mapDispatchToProps)(VimeoVideo)
