import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

import styled, { css } from 'styled-components'
import ReactTransitionGroup from 'react-addons-transition-group'

import { loadNextShowcaseMedia } from 'store/actions'

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
const YouTubeContainer = styled(ReactTransitionGroup)`${styles}`

const youTubeOpts = {
  height: '100%',
  width: '100%',
  playerVars: { // https://developers.google.com/youtube/player_parameters#Parameters
    autoplay: 1,
    controls: 1,
    modestbranding: 1,
    showinfo: 0,
    rel: 0
  }
}

class YouTubeVideo extends Component {
  static propTypes = {
    youtubeId: PropTypes.string.isRequired,
    livePlaylistItems: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  constructor () {
    super()
    this.onVideoEnd = this.onVideoEnd.bind(this)
  }

  // componentWillEnter (callback) {
  //   const el = ReactDOM.findDOMNode(this)
  //   console.log('InstagramVideo componentWillEnter')
  //   TweenMax.fromTo(el, 1, {opacity: 0}, {opacity: 1, onComplete: callback})
  // }

  // componentWillLeave (callback) {
  //   const el = ReactDOM.findDOMNode(this)
  //   console.log('InstagramVideo componentWillLeave')
  //   TweenMax.fromTo(el, 1, {opacity: 1}, {opacity: 0, onComplete: callback})
  // }

  onVideoEnd () {
    console.log('YouTubeVideo onVideoEnd fired')
    const { dispatch, livePlaylistItems } = this.props
    dispatch(loadNextShowcaseMedia(livePlaylistItems))
  }

  render () {
    const { youtubeId } = this.props
    return (
      <YouTubeContainer>
        <YouTube
          videoId={youtubeId}
          opts={youTubeOpts}
          onEnd={this.onVideoEnd}
        />
      </YouTubeContainer>
    )
  }
}

const mapStateToProps = state => {
  const { showcase } = state
  const {
    livePlaylistItems
  } = showcase['showcaseProcess']['showcaseDetails'] || {
    livePlaylistItems: []
  }
  return {
    livePlaylistItems
  }
}

export default connect(mapStateToProps)(YouTubeVideo)
