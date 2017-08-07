import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { startComponentTimeout, clearComponentTimeout, nextComponentSlideshow } from 'store/actions'


function SlideshowLogic(ConnectedComp, service, timeoutOrNot = true, propBased = false) {
  class SlideshowLogicWrapper extends Component {
    componentDidMount() {
      this.startOrClear()
    }

    // If this slideshow element is not a refreshing component, base the logic on the changing prop.
    componentWillReceiveProps(nextProps) {
      if (propBased && (nextProps.slideshowCurrent !== this.props.slideshowCurrent)) {
        this.startOrClear()
      }
    }

    startOrClear() {
      if (timeoutOrNot) {
        // This will clear the last timeout as well as set a new timeout.
        this.props.startTimeoutUntilNextSlide()
      } else {
        // This will clear the last timeout.
        this.props.clearTimeoutForNextSlide()
      }
    }

    render() {
      return (
        <ConnectedComp {...this.props} />
      )
    }
  }

  const mapStateToProps = state => ({
    slideshowStatus: state[service].slideshow.status,
    slideshowCurrent: state[service].slideshow.current,
  })

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
    slideshowStatus: PropTypes.string,
    slideshowCurrent: PropTypes.number,
  }

  return connect(mapStateToProps, mapDispatchToProps)(SlideshowLogicWrapper)
}

export default SlideshowLogic
