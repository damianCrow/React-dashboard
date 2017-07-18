import React, { Component, PropTypes } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { connect } from 'react-redux'
import { updateCountdown } from 'store/actions'
import { Heading, Icon } from 'components'

const Wrapper = styled.div`
  position: absolute
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: 1s cubic-bezier(0, 0.26, 0.92, 0.32);

  &.flip {
    transform: rotateX(90deg);
  }
`
const WrapperFront = styled.div`
  position: absolute
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #00928f 0%, #50b848 100%);
  backface-visibility: hidden;
  border-radius: 5px;
  box-shadow: 0 5px 20px rgba(0, 146, 143, .5), 0 0 8px 5px rgba(80, 184, 72, .5) inset;
  transform: translateZ(40.5px);
`
const WrapperBack = styled(WrapperFront)`
  transform: rotateX(-90deg) translateZ(40.5px);
`
const TimeLeft = styled(Heading)`
  color: #ffffff;
  font-weight: 600;
  transform: translate(0, 0);
  left: 0;
  margin: 0;
  width: 25%;
  float: left;
  line-height: 80px;
  background-color: #00928f;
`
const EventIcon = styled(Icon)`
  margin: 0 0 0 10%;
  height: 100%;
  float: left;
`
const EventDate = styled(Heading)`
  float: left;
  color: #ffffff;
  font-weight: 100;
  line-height: 80px;
  margin: 0;
  transform: translate(0, 0);
  left: 15px;
`
const EventTitle = styled(Heading)`
  float: left;
  color: #ffffff;
  font-weight: 600;
  line-height: 80px;
  margin: 0;
  width: 47%;
  left: 30px;
  transform: translate(0, 0);
  text-align: left;
`

class Countdown extends Component {

  constructor(props) {
    super(props)
    // localStorage.clear()
    if (!localStorage.getItem('countdownArray')) {
      fetch('/public/user-data/countdown.json').then((response) => {
        return response.json()
      }).then((j) => {
        this.eventsArray = j.events
        localStorage.setItem('countdownArray', JSON.stringify(j.events))
      })
    } else {
      this.eventsArray = JSON.parse(localStorage.getItem('countdownArray'))
    }

    this.idx = 0
    this.getRemainingTime(this.eventsArray[this.idx].startDateTime)

    setInterval(() => {
      this.rotateCountdown()
      this.incrementIdx()
    }, 15000)
  }

  getRemainingTime(startDateTime) {
    const eventTime = moment(startDateTime, 'DD-MM-YYYY HH:mm:ss').unix()
    const currentTime = moment().unix()
    const diffTime = eventTime - currentTime
    const timeSpan = moment.duration(diffTime * 1000, 'milliseconds')
    const getDisplayTime = () => {
      if (diffTime > 0) {
        const dura = moment.duration(timeSpan.asMilliseconds() - 1000, 'milliseconds')
        // let y = moment.duration(dura).years()
        // let mo = moment.duration(dura).months()
        // let w = moment.duration(dura).weeks()
        // let d = moment.duration(dura).days()
        // let h = moment.duration(dura).hours()
        // let m = moment.duration(dura).minutes()
        // let s = moment.duration(dura).seconds() 
        this.props.updateCountdown(moment.duration(dura).humanize())
        clearInterval(countDownInterval)
      }
    }
    const countDownInterval = setInterval(getDisplayTime.bind(this), 1000)
  }

  incrementIdx() {
    if (this.idx < this.eventsArray.length - 1) {
      this.idx += 1
    } else {
      this.idx = 0
    }
    this.getRemainingTime(this.eventsArray[this.idx].startDateTime)
  }

  rotateCountdown() {
    if (this.wrapper.classList.contains('flip')) {
      this.wrapper.classList.remove('flip')
    } else {
      this.wrapper.classList.add('flip')
    }
  }

  render() {
    return (
      <Wrapper innerRef={(wrapper) => { this.wrapper = wrapper }} >
        <WrapperFront innerRef={(countdownWrapper) => { this.countdownWrapper = countdownWrapper }} onClick={this.rotateCountdown.bind(this)}>
          <TimeLeft level={1}>{this.props.countDownDisplay}</TimeLeft>
          <EventIcon icon={this.eventsArray[this.idx].eventIconName} fillColor={'#ffffff'} height={60} />
          <EventDate level={5}>{`${moment(this.eventsArray[this.idx].startDateTime, 'DD-MM-YYYY HH:mm:ss').format('Do MMMM')} :`}</EventDate>
          <EventTitle level={5}>{this.eventsArray[this.idx].eventTitle}</EventTitle>
        </WrapperFront>
        <WrapperBack innerRef={(countdownWrapper2) => { this.countdownWrapper2 = countdownWrapper2 }} onClick={this.rotateCountdown.bind(this)}>
          <TimeLeft level={1}>{this.props.countDownDisplay}</TimeLeft>
          <EventIcon icon={this.eventsArray[this.idx].eventIconName} fillColor={'#ffffff'} height={60} />
          <EventDate level={5}>{`${moment(this.eventsArray[this.idx].startDateTime, 'DD-MM-YYYY HH:mm:ss').format('Do MMMM')} :`}</EventDate>
          <EventTitle level={5}>{this.eventsArray[this.idx].eventTitle}</EventTitle>
        </WrapperBack>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  countDownDisplay: state.showcase.data.countDown,
})

Countdown.propTypes = {
  updateCountdown: PropTypes.func,
  countDownDisplay: PropTypes.string,
}

const mapDispatchToProps = (dispatch) => ({
  updateCountdown: (newTime) => dispatch(updateCountdown(newTime)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Countdown)
