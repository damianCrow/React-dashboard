import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import { Heading, Icon, FadeLeftRightTransitionWrapper, FadeUpDownTransition } from 'components'
import { SlideshowLogic } from 'hoc'


const Wrapper = styled.div`
  color: black;
  display: flex;
  justify-content: center;
  text-align: left;
  flex: 1;
  width: 100%;
  height: 100%;
  position: absolute;
  &:after {
    content: '';
    width: 100%;
    height: 100%;
    left: 0;
    bottom: 0;
    position: absolute;
    background-color: rgba(0,0,0,.08);
  }
`

const TransitionWrapper = styled(TransitionGroup)`
  color: black;
  display: flex;
  justify-content: center;
  text-align: left;
  flex: 1;
  width: 100%;
  height: 100%;
  position: absolute;
`

const TimeLeft = styled(Heading)`
  color: #ffffff;
  font-weight: 600;
  margin: 0 auto;
  line-height: 81px;
`

const TimeLeftContainer = styled.div`
  flex: 1;
  height: 100%;
  position: relative;
  background-color: #00928f;
  text-align: center;
`

const EventIcon = styled(Icon)`
  margin: 0 1rem;
  height: 100%;
  position: relative;
`
const EventDate = styled(Heading)`
  color: #ffffff;
  font-weight: 100;
  line-height: 81px;
  margin: 0;
`
const EventTitle = styled(Heading)`
  color: #ffffff;
  font-weight: 600;
  line-height: 81px;
  margin: 0;
  text-align: left;
  margin: 0 .15rem;
`

const EventDetails = styled.div`
  position: relative;
  flex: 3;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(to right, rgba(0,0,0,0) 0%,rgba(0,0,0,1) 5%,rgba(0,0,0,1) 95%,rgba(0,0,0,0) 100%);
  mask-image: linear-gradient(to right, rgba(0,0,0,0) 0%,rgba(0,0,0,1) 5%,rgba(0,0,0,1) 95%,rgba(0,0,0,0) 100%);
`

const CenterStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex: 1;
`

class Countdown extends Component {

  constructor(props) {
    super(props)
    this.idx = 0
  }

  rotateCountdown() {
    if (this.wrapper.classList.contains('flip')) {
      this.wrapper.classList.remove('flip')
    } else {
      this.wrapper.classList.add('flip')
    }
  }

  render() {
    const { event } = this.props
    return (
      <Wrapper>
        <TimeLeftContainer>
          <TransitionWrapper>
            <FadeUpDownTransition key={event.id}>
              <TimeLeft level={2}>{this.props.countdownFigure}</TimeLeft>
            </FadeUpDownTransition>
          </TransitionWrapper>
        </TimeLeftContainer>
        <EventDetails>
          <TransitionWrapper>
            <FadeLeftRightTransitionWrapper key={event.id}>
              <CenterStyles>
                <EventIcon icon={event.eventIconName} fillColor={'#ffffff'} height={60} />
                <EventDate level={2}>{`${moment(event.startDateTime, 'DD-MM-YYYY HH:mm:ss').format('Do MMMM')}: `}</EventDate>
                <EventTitle level={2}>{event.eventTitle}</EventTitle>
              </CenterStyles>
            </FadeLeftRightTransitionWrapper>
          </TransitionWrapper>
        </EventDetails>
      </Wrapper>
    )
  }
}

Countdown.propTypes = {
  countDownDisplay: PropTypes.string,
  event: PropTypes.object,
  countdownFigure: PropTypes.string,
}

export default SlideshowLogic(Countdown, 'countdown', true, true)
