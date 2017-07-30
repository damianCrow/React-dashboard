import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { pullInitalPlaylist, startSlideshow, numberOfSlideshowPosts } from 'store/actions'
import { Showcase, SplashScreen } from 'components'

class ShowcaseContainer extends Component {
  componentWillMount() {
    this.props.fetchInitalPlaylist()
  }

  componentWillReceiveProps(nextProps) {
    const { playlist, slideshow } = nextProps

    if ((playlist.length !== this.props.playlist.length) && (slideshow.status !== 'waiting' && slideshow.status !== 'override')) {
      console.log('new playlist max number')
      nextProps.numberOfSlideshowPosts(playlist.length)
    }

    if (playlist.length > 0 && slideshow.status === 'waiting') {
      console.log('startShowcaseSlideshow')
      this.props.startShowcaseSlideshow(this.props.playlist.length)
    }
  }

  render() {
    const { status, playlist, slideshow } = this.props

    // console.log("slideshow.status !== 'ready'", slideshow.status !== 'ready')
    const readyToGo = (playlist.length > 0) && (slideshow.status !== 'waiting') 
    // console.log('readyToGo', readyToGo)

    if (status === 'failed') {
      return (
        <span>{status}</span>
      )
    } else if (readyToGo) {
      return (
        <Showcase
          url={playlist[slideshow.current].url}
          serviceId={playlist[slideshow.current].serviceId}
          serviceName={playlist[slideshow.current].serviceName}
          mediaType={playlist[slideshow.current].type}
          itemId={playlist[slideshow.current].id}
          slideshowState={slideshow.status}
        />
      )
    }
    return (
      <SplashScreen icon="arc" service="Showcase" />
    )
  }
}

// Listen and capture any changes made as a result of the the actions below.
const mapStateToProps = (state) => ({
  playlist: state.showcase.data.playlist,
  status: state.showcase.data.status,
  slideshow: state.showcase.slideshow,
})

const mapDispatchToProps = (dispatch) => ({
  fetchInitalPlaylist: () => dispatch(pullInitalPlaylist()),
  startShowcaseSlideshow: (max) => dispatch(startSlideshow('SHOWCASE', max)),
  numberOfSlideshowPosts: (max) => dispatch(numberOfSlideshowPosts('SHOWCASE', max)),
})

ShowcaseContainer.propTypes = {
  socketConnected: PropTypes.bool,
  fetchInitalPlaylist: PropTypes.func,
  numberOfSlideshowPosts: PropTypes.func,
  startShowcaseSlideshow: PropTypes.func,
  slideshow: PropTypes.object,
  playlist: PropTypes.array,
  status: PropTypes.string,
}

ShowcaseContainer.defaultProps = {
  socketConnected: false,
  sonosRequest: false,
  slideshow: {},
  playlist: [],
  status: '',
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowcaseContainer)
