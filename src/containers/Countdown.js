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
      events: [],
    }
  }

  componentWillMount() {
    this.props.fetchCountdown()
  }

  componentWillReceiveProps(nextProps) {
    const { events } = this.props

    if (nextProps.events.length > 0 && events.length === 0) {
      this.startLoop()
    } else if (nextProps.events.length === 0 && events.length !== 0) {
      this.stopLoop()
    }
  }

  componentWillUnmount() {
    this.stopLoop()
  }

  getLatestEvents(currentTime) {
    const categorys = []
    let updateOrNot = false
    const allEvents = (this.state.events.length === 0) ? this.props.events : this.state.events

    const events = allEvents.filter((event, index) => {
      if (moment(event.startDateTime, 'DD-MM-YYYY HH:mm:ss').unix() > currentTime) {
        if (categorys.includes(event.eventType) === false) {
          categorys.push(event.eventType)
          if (!updateOrNot && (event.id === allEvents[index].id)) {
            updateOrNot = true
          }
          return true
        }
      }
      return false
    })

    if (updateOrNot) {
      this.setState({ events })
      if (this.props.slideshow.status === 'waiting') {
        this.props.startSlideshowLogic(this.state.events.length)
      }
    }
  }

  getRemainingTime(currentTime, startDateTime) {
    const eventTime = moment(startDateTime, 'DD-MM-YYYY HH:mm:ss').unix()
    const diffTime = eventTime - currentTime
    const timeSpan = moment.duration(diffTime * 1000, 'milliseconds')
    const dura = moment.duration(timeSpan.asMilliseconds() - 1000, 'milliseconds')

    if (this.props.slideshow.status !== 'waiting') {
      if (this.state.countdownFigure !== moment.duration(dura).humanize()) {
        this.setState({
          countdownFigure: moment.duration(dura).humanize(),
        })
      }
    }
  }

  stopLoop() {
    window.cancelAnimationFrame(this.frameId)
    // Note: no need to worry if the loop has already been cancelled
    // cancelAnimationFrame() won't throw an error
  }

  loop() {
    const currentTime = moment().unix()

    this.getLatestEvents(currentTime)
    // perform loop work here
    this.getRemainingTime(currentTime, this.state.events[this.props.slideshow.current].startDateTime)

    // Set up next iteration of the loop
    this.frameId = window.requestAnimationFrame(this.loop.bind(this))
  }

  startLoop() {
    if (!this.frameId) {
      this.frameId = window.requestAnimationFrame(this.loop.bind(this))
    }
  }

  render() {
    if (this.state.events.length > 0 && this.props.slideshow.status !== 'waiting') {
      return <Countdown event={this.state.events[this.props.slideshow.current]} countdownFigure={this.state.countdownFigure} />
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
