import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { storeServerPlaylist, startSlideshow, pauseServiceSlideshow } from 'store/actions'
import { SocketConnector } from 'hoc'
import { Showcase, SplashScreen } from 'components'

class ShowcaseContainer extends Component {
  componentDidMount() {
    this.props.socketConnected && this.props.serviceRequest()
  }

  componentWillReceiveProps(nextProps) {
    // Try and move this logic back to the HOC container
    const { socketConnected, serviceRequest, playlist, startInstaSlideshow, slideshow, pauseInstaSlideshow } = nextProps

    const isEmpty = playlist.length === 0

    if (socketConnected && !this.props.socketConnected) {
      fetch('/public/user-data/showcase-media.json', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => { return response.json() })
        .then((data) => {
          console.log('BOOOOOOOM BABY 💥 data: ', data)
          this.props.thisShouldActuallyBeASagaButWhatever(data.playlist)
        })
    }

    // console.log('componentWillReceiveProps showcase')

    if (!isEmpty && slideshow.status === 'ready') {
      startInstaSlideshow(nextProps.playlist.length)
    }

    // if (!isEmpty) {
    //   if (playlist[slideshow.current].type === 'video' && slideshow.status === 'playing') {
    //     pauseInstaSlideshow()
    //   }
    // }
  }

  render() {
    const { status, /*message,*/ playlist, slideshow } = this.props
    // console.log('showcase status', status)

    const isEmpty = playlist.length === 0
    // console.log('render playlist', playlist)
    // console.log('render playlist isEmpty', isEmpty)

    // console.log('slideshow', slideshow)
    // console.log('isEmpty', isEmpty)

    if (status === 'failed') {
      return (
        <span>{status}</span>
      )
    } else if (!isEmpty) {
      console.log('playlist[slideshow.current]', playlist[slideshow.current])
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
})

ShowcaseContainer.propTypes = {
  socketConnected: PropTypes.bool,
  thisShouldActuallyBeASagaButWhatever: PropTypes.func,
  serviceRequest: PropTypes.func,
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

export default connect(mapStateToProps, mapDispatchToProps)(SocketConnector(ShowcaseContainer))
