import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { startComponentTimeout, clearComponentTimeout, nextComponentSlideshow } from 'store/actions'


function SlideshowLogic(ConnectedComp, service, timeoutOrNot = true, propBased = false) {
  class SlideshowLogicWrapper extends Component {
    componentDidMount() {
      this.startOrClear()
    }

    // If this slideshow component is not a refreshing...
    // ...component (unmounting and mounting), base the slideshow logic on the changing prop.
    componentWillReceiveProps(nextProps) {
      if (propBased && (nextProps.slideshowCurrent !== this.props.slideshowCurrent)) {
        this.startOrClear()
      }

      // If a single slideshow component has timed out and more get added...
      // ...to the playlist, restart the timer.
      if (this.props.slideshowMax === 0 && nextProps.slideshowMax > 0) {
        console.log(`starting timeout again for ${service}`)
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
    slideshowMax: state[service].slideshow.max,
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
    slideshowMax: PropTypes.number,
  }

  return connect(mapStateToProps, mapDispatchToProps)(SlideshowLogicWrapper)
}

export default SlideshowLogic
