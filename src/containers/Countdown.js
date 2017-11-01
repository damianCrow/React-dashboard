import PropTypes from 'prop-types'
import React, { Component } from 'react'
import humanizeDuration from 'humanize-duration'
import { connect } from 'react-redux'
import { fetchCountdown, startSlideshowLogic } from 'store/actions'
import { Countdown, SplashScreen } from 'components'

class CountdownContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countdownFigure: '0',
      events: [],
      humanCountdown: '...',
    }
  }

  componentWillMount() {
    this.props.fetchCountdown()
  }

  componentWillReceiveProps(nextProps) {
    const { events } = this.props

    this.getLatestEventInEachCategory(nextProps)

    // We only want to start this loop once (hence 'events.length === 0')
    if (nextProps.events.length > 0 && events.length === 0) {
      this.startLoop()
    } else if (nextProps.events.length === 0 && events.length !== 0) {
      this.stopLoop()
    }
  }

  componentWillUnmount() {
    this.stopLoop()
  }

  getLatestEventInEachCategory(nextProps) {
    const currentTime = Math.floor(Date.now() / 1000)
    const categorys = []
    let updateOrNot = false
    const allEvents = nextProps.events

    console.log('getLatestEventInEachCategory, nextProps = ', nextProps)

    const events = allEvents.filter((event, index) => {
      if (event.unixStart > currentTime) {
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

  getRemainingTime(currentTime, currentEvent) {
    const eventTime = currentEvent.unixStart
    const timeDiffSeconds = Math.round((1000 * ((eventTime - currentTime) / 1000))) * 1000
    if (this.state.countdownFigure !== timeDiffSeconds) {
      if (this.props.slideshow.status !== 'waiting') {
        // Avoid hammering setState for this to save CPU power
        const humanCountdown = humanizeDuration(timeDiffSeconds, { largest: 2 })
        if (humanCountdown !== this.state.humanCountdown) {
          this.setState({ humanCountdown })
        }
      }
    }

    if (currentTime > eventTime) {
      // This should remove the event and get the next (if there is one).
      this.getLatestEventInEachCategory(this.state.events)
    }
  }

  stopLoop() {
    window.cancelAnimationFrame(this.frameId)
    // Note: no need to worry if the loop has already been cancelled
    // cancelAnimationFrame() won't throw an error
  }

  loop() {
    const currentTime = Math.floor(Date.now() / 1000)

    // perform loop work here
    this.getRemainingTime(currentTime, this.state.events[this.props.slideshow.current])

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
      return <Countdown event={this.state.events[this.props.slideshow.current]} countdownFigure={this.state.humanCountdown} />
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
