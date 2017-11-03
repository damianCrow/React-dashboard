import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { startComponentTimeout, clearComponentTimeout, nextComponentSlideshow } from 'store/actions'


function SlideshowLogic(initalConfig) {
  const config = {
    timeout: true,
    propBased: false,
    subSlideshow: '',
    ...initalConfig,
  }

  class SlideshowLogicWrapper extends Component {
    componentDidMount() {
      this.startOrClear()
    }

    // If this slideshow component is not a refreshing...
    // ...component (unmounting and mounting), base the slideshow logic on the changing prop.
    componentWillReceiveProps(nextProps) {
      if (config.propBased && (nextProps.slideshowCurrent !== this.props.slideshowCurrent)) {
        this.startOrClear()
      }

      // If a single slideshow component has timed out and more get added...
      // ...to the playlist, restart the timer.
      if (this.props.slideshowMax === 0 && nextProps.slideshowMax > 0) {
        this.startOrClear()
      }
    }

    startOrClear() {
      if (config.timeout) {
        // This will clear the last timeout as well as set a new timeout.
        this.props.startTimeoutUntilNextSlide()
      } else {
        // This will clear the last timeout.
        this.props.clearTimeoutForNextSlide()
      }
    }

    render() {
      const ConnectedComp = config.connectedComp
      return (
        <ConnectedComp {...this.props} />
      )
    }
  }

  const mapStateToProps = (state) => {
    const slideType = config.subSlideshow ? 'innerSlideshow' : 'slideshow'
    return {
      slideshowStatus: state[config.service][slideType].status,
      slideshowCurrent: state[config.service][slideType].current,
      slideshowMax: state[config.service][slideType].max,
    }
  }

  const mapDispatchToProps = (dispatch) => {
    const slideType = config.subSlideshow ? config.subSlideshow : config.service
    // console.log('hoc slideType dispatch: ', slideType)
    return {
      startTimeoutUntilNextSlide: () => dispatch(startComponentTimeout(slideType)),
      clearTimeoutForNextSlide: () => dispatch(clearComponentTimeout(slideType)),
      nextComponent: () => dispatch(nextComponentSlideshow(slideType)),
    }
  }

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
