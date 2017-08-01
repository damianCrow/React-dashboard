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

    render() {
      return (
        <ConnectedComp {...this.props} />
      )
    }
  }

  const mapDispatchToProps = dispatch => ({
    startTimeoutUntilNextSlide: () => dispatch(startComponentTimeout(service)),
    clearTimeoutForNextSlide: () => dispatch(clearComponentTimeout(service)),
    nextComponent: () => dispatch(nextComponentSlideshow(service)),
  })

  SlideshowLogicWrapper.propTypes = {
    startTimeoutUntilNextSlide: PropTypes.func,
    clearTimeoutForNextSlide: PropTypes.func,
    nextSlide: PropTypes.func,
    compsInSlideshow: PropTypes.number,
  }

  return connect(null, mapDispatchToProps)(SlideshowLogicWrapper)
}

export default SlideshowLogic
