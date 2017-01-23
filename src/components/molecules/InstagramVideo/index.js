import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
// import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { loadNextInstagramMedia } from 'store/actions'

// import { TweenMax } from 'gsap'

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: black;
  top: 0;
  left: 0;
`

const InstagramVideoSrc = styled.video`
  height: 100%;
  left: 0;
  object-fit: contain;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;
`

const ThumbnailVideoBackground = styled.video`
  filter: blur(3px);
  height: 100%;
  left: 0;
  object-fit: cover;
  position: absolute;
  top: 0;
  transform: scale(1.2)
  width: 100%;
`

class InstagramVideo extends Component {
  static propTypes = {
    currentVideo: PropTypes.string.isRequired,
    lowBandwidthVideo: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    allPosts: PropTypes.array.isRequired
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
    const { dispatch, allPosts } = this.props
    console.log('instagramvideo allPosts', allPosts)
    dispatch(loadNextInstagramMedia(allPosts))
  }

  render () {
    const { currentVideo, lowBandwidthVideo } = this.props
    return (
      <ImageWrapper>
        <InstagramVideoSrc src={currentVideo} autoPlay="true" muted onEnded={this.onVideoEnd} />
        <ThumbnailVideoBackground src={lowBandwidthVideo} autoPlay="true" muted />
      </ImageWrapper>
    )
  }
}

const mapStateToProps = state => {
  const { instagram } = state
  const {
    allPosts
  } = instagram['instagramProcess']['instagramDetails'] || {
    allPosts: []
  }
  return {
    allPosts
  }
}

export default connect(mapStateToProps)(InstagramVideo)

