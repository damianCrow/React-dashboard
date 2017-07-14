import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

import styled, { css } from 'styled-components'
import TransitionGroup from 'react-transition-group/TransitionGroup'

import { resumeServiceSlideshow, pauseServiceSlideshow } from 'store/actions'


import YouTube from 'react-youtube'

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
`

// const InstagramWrapperStyled = styled(InstagramTransitionWrapper)`${wrapperStyles}`
const YouTubeContainer = styled(TransitionGroup)`${styles}`

const youTubeOpts = {
  height: '100%',
  width: '100%',
  playerVars: { // https://developers.google.com/youtube/player_parameters#Parameters
    autoplay: 1,
    controls: 1,
    modestbranding: 1,
    showinfo: 0,
    rel: 0,
    disablekb: 1,
  },
}

class YouTubeVideo extends Component {
  static propTypes = {
    serviceId: PropTypes.string,
    resumeInstaSlideshow: PropTypes.func.isRequired,
    pauseInstaSlideshow: PropTypes.func.isRequired,
    // slideShowKey: PropTypes.number.isRequired,
  }

  constructor() {
    super()
    this.onVideoEnd = this.onVideoEnd.bind(this)
    console.log('youtube video constructor')
  }

  componentDidMount() {
    // this.props.pauseInstaSlideshow()
  }

  onVideoEnd() {
    console.log('YouTubeVideo onVideoEnd fired')
    this.props.resumeInstaSlideshow()
  }

  /**
   * Handles the event when the video is ready to play
   *
   * @returns {void}
   */
  handleVideoReady(event) {
    console.log('youtube video ready event', event)
    console.log(this.props)
    event.target.mute()
    // this.props.pauseInstaSlideshow()
  }

  render() {
    const { serviceId } = this.props
    return (
      <YouTubeContainer>
        <YouTube
          videoId={serviceId}
          opts={youTubeOpts}
          onEnd={this.onVideoEnd}
          onReady={(event) => { this.handleVideoReady(event) }}
        />
      </YouTubeContainer>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  resumeInstaSlideshow: () => dispatch(resumeServiceSlideshow('showcase')),
  pauseInstaSlideshow: () => dispatch(pauseServiceSlideshow('showcase')),
})


export default connect(null, mapDispatchToProps)(YouTubeVideo)
