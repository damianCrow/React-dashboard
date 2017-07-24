import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { storeServerPlaylist, startSlideshow, numberOfSlideshowPosts } from 'store/actions'
import { Showcase, SplashScreen } from 'components'

class ShowcaseContainer extends Component {
  componentDidMount() {
    fetch('/public/user-data/showcase-media.json', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => { return response.json() })
      .catch(err => console.log('showcase fetch err: ', err))
      .then((data) => {
        this.props.thisShouldActuallyBeASagaButWhatever(data.playlist)
        this.props.startInstaSlideshow(this.props.playlist.length)
      })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.playlist.length !== this.props.playlist.length && nextProps.slideshow.status !== 'ready') {
      nextProps.numberOfSlideshowPosts(nextProps.playlist.length)
    }
  }

  render() {
    const { status, playlist, slideshow } = this.props

    const isEmpty = playlist.length === 0

    if (status === 'failed') {
      return (
        <span>{status}</span>
      )
    } else if (!isEmpty) {
      return (
        <Showcase
          url={playlist[slideshow.current].url}
          serviceId={playlist[slideshow.current].serviceId}
          serviceName={playlist[slideshow.current].serviceName}
          mediaType={playlist[slideshow.current].type}
          itemId={playlist[slideshow.current].id}
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
  thisShouldActuallyBeASagaButWhatever: (playlist) => dispatch(storeServerPlaylist(playlist)),
  startInstaSlideshow: (max) => dispatch(startSlideshow('showcase', max)),
  numberOfSlideshowPosts: (max) => dispatch(numberOfSlideshowPosts('showcase', max)),
})

ShowcaseContainer.propTypes = {
  socketConnected: PropTypes.bool,
  thisShouldActuallyBeASagaButWhatever: PropTypes.func,
  numberOfSlideshowPosts: PropTypes.func,
  startInstaSlideshow: PropTypes.func,
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
