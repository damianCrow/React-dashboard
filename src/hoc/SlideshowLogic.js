import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { startTimeoutSlideshow, clearTimeoutSlideshow, nextSlide } from 'store/actions'


function SlideshowLogic(ConnectedComp) {
  class SlideshowLogicWrapper extends Component {

    componentDidMount() {
      if (this.prop.timeout) {
        this.props.startTimeoutUntilNextSlide()
      }
    }

    // This will typically fire when the current slide has been replaced.
    componentWillUnMount() {
      if (this.prop.timeout) {
        this.props.clearTimeoutForNextSlide()
      }
    }

    // This will typically fire on video end.
    requestNextSlide() {
      this.props.nextSlide()
    }

    render() {
      return (
        <ConnectedComp {...this.props} />
      )
    }

  }

  // Listen and capture any changes made as a result of the the actions below.
  const mapStateToProps = (state) => ({
    socketConnected: state.socket.connected,
  })

  const mapDispatchToProps = (dispatch) => ({
    startTimeoutUntilNextSlide: () => dispatch(startTimeoutSlideshow(service)),
    clearTimeoutForNextSlide: () => dispatch(clearTimeoutSlideshow(service)),
    nextSlide: () => dispatch(nextSlide(service)),
  })

  SlideshowLogicWrapper.propTypes = {
    startTimeout: PropTypes.func,
    clearTimeout: PropTypes.func,
    nextSlide: PropTypes.func,
  }

  SlideshowLogicWrapper.defaultProps = {
    timeout: false,
  }

  return connect(mapStateToProps, mapDispatchToProps)(SlideshowLogicWrapper)
}

export default SlideshowLogic
