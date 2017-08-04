import PropTypes from 'prop-types'
import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { fetchCountdown, startSlideshowLogic } from 'store/actions'
import { Countdown, SplashScreen } from 'components'

class CountdownContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      countdownFigure: '0',
    }
  }

  componentWillMount() {
    this.props.fetchCountdown()
  }

  componentWillReceiveProps(nextProps) {
    const { events } = this.props

    if (nextProps.events.length > 0 && events.length === 0) {
      this.startLoop()
      nextProps.startSlideshowLogic(nextProps.events.length)
    } else if (nextProps.events.length === 0 && events.length !== 0) {
      this.stopLoop()
    }
  }

  componentWillUnmount() {
    this.stopLoop()
  }

  getRemainingTime(startDateTime) {
    const eventTime = moment(startDateTime, 'DD-MM-YYYY HH:mm:ss').unix()
    const currentTime = moment().unix()
    const diffTime = eventTime - currentTime
    const timeSpan = moment.duration(diffTime * 1000, 'milliseconds')
    const dura = moment.duration(timeSpan.asMilliseconds() - 1000, 'milliseconds')
    if (this.state.countdownFigure !== moment.duration(dura).humanize()) {
      this.setState({
        countdownFigure: moment.duration(dura).humanize(),
      })
    }
  }

  stopLoop() {
    window.cancelAnimationFrame(this.frameId)
    // Note: no need to worry if the loop has already been cancelled
    // cancelAnimationFrame() won't throw an error
  }

  loop() {
    // perform loop work here
    this.getRemainingTime(this.props.events[this.props.slideshow.current].startDateTime)
    // Set up next iteration of the loop
    this.frameId = window.requestAnimationFrame(this.loop.bind(this))
  }

  startLoop() {
    if (!this.frameId) {
      this.frameId = window.requestAnimationFrame(this.loop.bind(this))
    }
  }

  render() {
    if (this.props.events.length > 0 && this.props.slideshow.status === 'ready') {
      return <Countdown event={this.props.events[this.props.slideshow.current]} countdownFigure={this.state.countdownFigure} />
    }
    return <SplashScreen icon="arc" service="Countdown" />
  }
}

const mapStateToProps = state => ({
  events: state.countdown.data.events,
  message: state.countdown.data.message,
  slideshow: state.countdown.slideshow,
})

CountdownContainer.propTypes = {
  fetchCountdown: PropTypes.func,
  startSlideshowLogic: PropTypes.func,
  events: PropTypes.array,
  message: PropTypes.string,
  slideshow: PropTypes.object,
}

const mapDispatchToProps = dispatch => ({
  fetchCountdown: () => dispatch(fetchCountdown()),
  startSlideshowLogic: max => dispatch(startSlideshowLogic('COUNTDOWN', max)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CountdownContainer)
