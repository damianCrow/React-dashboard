import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
// import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { loadNextInstagramMedia } from 'store/actions'

// import { TweenMax } from 'gsap'

const ImageWrapper = styled.div`
  height: 100%;
  left: 0;
  top: 0;
  width: 100%;
`

const InstagramVideoSrc = styled.video`
  height: 100%;
  object-fit: contain;
  position: relative;
  width: 100%;
  z-index: 1;
`

class InstagramVideo extends Component {
  static propTypes = {
    currentVideo: PropTypes.string.isRequired,
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
    const { currentVideo } = this.props
    return (
      <ImageWrapper>
        <InstagramVideoSrc src={currentVideo} autoPlay="true" muted onEnded={this.onVideoEnd} />
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

