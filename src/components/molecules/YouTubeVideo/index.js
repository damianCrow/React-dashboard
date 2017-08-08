import PropTypes from 'prop-types'
import React, { Component } from 'react'
// import { connect } from 'react-redux'

import styled, { css } from 'styled-components'
import TransitionGroup from 'react-transition-group/TransitionGroup'

// import { resumeServiceSlideshow, pauseServiceSlideshow } from 'store/actions'
import { SlideshowLogic } from 'hoc'
import YouTube from 'react-youtube'

const styles = css`
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
    serviceId: PropTypes.string.isRequired,
    nextComponent: PropTypes.func,
    // pauseInstaSlideshow: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    // TODO: Is this needed?
    this.onVideoEnd = this.onVideoEnd.bind(this)
    this.state = {
      finishing: false,
    }
  }

  onVideoEnd() {
    console.log('youtube onVideoEnd, this.state.finishing: ', this.state.finishing)
    // Passed by HOC
    this.props.nextComponent()
    // if(!this.state.finishing) {
    //   this.setState({
    //     finishing: true,
    //   })
    //   this.props.resumeInstaSlideshow()
    // }
  }

  // componentWillUnmount() {
  //   console.log('youtube componentWillUnmount, this.state.finishing: ', this.state.finishing)
  //   if(!this.state.finishing) {
  //     this.setState({
  //       finishing: true,
  //     })
  //     this.props.resumeInstaSlideshow()
  //   }
  // }

  /**
   * Handles the event when the video is ready to play
   *
   * @returns {void}
   */
  handleVideoReady(event) {
    // event.target.mute()
    // this.props.pauseInstaSlideshow()
  }

  render() {
    const { serviceId } = this.props
    return (
      <YouTubeContainer>
        <YouTube
          videoId={serviceId}
          opts={youTubeOpts}
          onEnd={() => this.onVideoEnd()}
          onReady={(event) => { this.handleVideoReady(event) }}
        />
      </YouTubeContainer>
    )
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   resumeInstaSlideshow: () => dispatch(resumeServiceSlideshow('showcase')),
//   pauseInstaSlideshow: () => dispatch(pauseServiceSlideshow('showcase')),
// })


// export default connect(null, mapDispatchToProps)(YouTubeVideo)
export default SlideshowLogic(YouTubeVideo, 'showcase', false)
