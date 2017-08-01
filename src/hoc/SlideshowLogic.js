import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { startComponentTimeout, clearComponentTimeout, nextComponentSlideshow } from 'store/actions'


function SlideshowLogic(ConnectedComp, service, timeoutOrNot = true) {
  class SlideshowLogicWrapper extends Component {

    componentDidMount() {
      if (timeoutOrNot) {
        this.props.startTimeoutUntilNextSlide()
      }
    }

    // This will typically fire when the current slide has been replaced.
    // componentWillUnmount() {
    //   if (timeoutOrNot) {
    //     this.props.clearTimeoutForNextSlide()
    //   }
    // }

    // This will typically fire on video end.
    // requestNextSlide() {
    //   this.props.nextSlide()
    // }

    render() {
      return (
        <ConnectedComp {...this.props} />
      )
    }

  }

  // Listen and capture any changes made as a result of the the actions below.
  // const mapStateToProps = state => ({
  //   max: state[service].slideshow.max,
  // })

  const mapDispatchToProps = dispatch => ({
    // startNewSlideshow: () => dispatch(startSlideshow(service)),
    startTimeoutUntilNextSlide: () => dispatch(startComponentTimeout(service)),
    clearTimeoutForNextSlide: () => dispatch(clearComponentTimeout(service)),
    nextComponent: () => dispatch(nextComponentSlideshow(service)),
  })

  SlideshowLogicWrapper.propTypes = {
    startTimeoutUntilNextSlide: PropTypes.func,
    clearTimeoutForNextSlide: PropTypes.func,
    nextSlide: PropTypes.func,
    compsInSlideshow: PropTypes.number,
    // max: PropTypes.number.isRequired,
  }

  // SlideshowLogicWrapper.defaultProps = {
  //   timeout: false,
  // }

  return connect(null, mapDispatchToProps)(SlideshowLogicWrapper)
}

export default SlideshowLogic
