import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

import styled, { css } from 'styled-components'
import TransitionGroup from 'react-transition-group/TransitionGroup'

import { resumeServiceSlideshow, pauseServiceSlideshow } from 'store/actions'

import Vimeo from 'react-vimeo'

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
const VimeoContainer = styled(TransitionGroup)`${styles}`

class VimeoVideo extends Component {
  static propTypes = {
    url: PropTypes.string,
    serviceId: PropTypes.string,
    resumeInstaSlideshow: PropTypes.func.isRequired,
    pauseInstaSlideshow: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.onVideoEnd = this.onVideoEnd.bind(this)
    console.log('vimeo video constructor')
  }

  onVideoEnd() {
    console.log('VimeoVideo onVideoEnd fired')
    this.props.resumeInstaSlideshow()
  }

  handleVideoReady(event) {
    console.log('vimeo video ready event', event)
    console.log(this.props)
    event.target.mute()
  }

  render() {
    const { url, serviceId } = this.props
    return (
      <VimeoContainer>
        <Vimeo
          videoId={serviceId}
          url={url}
          onEnded={this.onVideoEnd}
          onReady={(event) => { this.handleVideoReady(event) }}
          autoplay
        />
      </VimeoContainer>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  resumeInstaSlideshow: () => dispatch(resumeServiceSlideshow('showcase')),
  pauseInstaSlideshow: () => dispatch(pauseServiceSlideshow('showcase')),
})


export default connect(null, mapDispatchToProps)(VimeoVideo)
