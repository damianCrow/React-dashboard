import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import moment from 'moment'
import shortid from 'shortid'
import { socketDataRequest } from 'store/actions'
import { UserCircle, CalendarRow } from 'components'
import { TransitionMotion, spring, presets } from 'react-motion'

const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const CalendarBrief = styled.div`
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  width: 100%;
`

const EventsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  flex: 1;
`

class CalendarContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { meetings: [], key: shortid.generate() }
    this.props.serviceRequest('calendar')
    this.props.serviceRequest('outOfOfficeCalendar')
    this.props.serviceRequest('inOfficeCalendar')
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ meetings: nextProps.meetings })
    if (nextProps.meetings.length) {
      this.startLoop(nextProps.meetings)
    }
  }

  getEmails = users => (
    users
      .filter(user => moment().isBetween(user.start.date, user.end.date) && user.attendees)
      .map(user => user.attendees
        .filter(attendee => (attendee.email && !(attendee.email.indexOf('group.calendar.google.com') !== -1)))
      )
      .reduce((pre, cur) => pre.concat(cur), [])
  )

  getDefaultStyles() {
    return this.state.meetings.map(meeting => ({ data: meeting, style: { height: 80, opacity: 1 }, key: meeting.id }))
  }

  getStyles() {
    const meetings = this.state.meetings

    return meetings.map((meeting) => {
      return {
        data: meeting,
        key: meeting.id,
        style: {
          height: spring(70, presets.gentle),
          opacity: spring(1, presets.gentle),
        },
      }
    })
  }

  isMeetingCurrent(meetingObj) {
    if (this[meetingObj.id]) {
      const element = this[meetingObj.id].wrapper
      if (moment().isBetween(meetingObj.start.dateTime, meetingObj.end.dateTime)) {
        if (!element.classList.contains('pulsate')) {
          element.classList.add('pulsate')
        }
      }
      if (moment().isSameOrAfter(meetingObj.end.dateTime)) {
        element.classList.remove('pulsate')
        clearInterval(this[`hilightCurrentMeeting${meetingObj.id}`])
        this.setState({ meetings: this.state.meetings.filter(meeting => meeting.id !== meetingObj.id) })
        setTimeout(() => {
          this.forceUpdateDom()
        }, 1750)
      }
    }
  }

  startLoop(arrayToLoop) {
    arrayToLoop.map((meeting) => {
      this[`hilightCurrentMeeting${meeting.id}`] = setInterval(() => this.isMeetingCurrent(meeting), 1000)
    })
  }

  forceUpdateDom() {
    this.setState({ key: shortid.generate() })
    this.forceUpdate()
  }

  willEnter() {
    return {
      height: 70,
      opacity: 1,
    }
  }

  willLeave() {
    return {
      height: spring(0, { stiffness: 90, damping: 50 }),
    }
  }

  render() {
    const { inOffice, outOfOffice } = this.props

    const outAvatarArray = this.getEmails(outOfOffice)
    const inAvatarArray = this.getEmails(inOffice)

    return (
      <CalendarWrapper key={this.state.key}>
        <CalendarBrief>
          { outAvatarArray.length > 0 &&
            <CalendarRow
              rowDay={'Today'}
              rowTitle={'Out Of Office'}
              rowSubTitle={'Holidays, Sickness & Meetings'}
              colorCode={'#ffd200'}
              opacity={0.4}
            >
              {outAvatarArray.map(user => <UserCircle className={'small'} key={user.email} email={user.email} />)}
            </CalendarRow>
          }
          { inAvatarArray.length > 0 &&
            <CalendarRow
              rowDay={'Today'}
              rowTitle={'Creative Resources'}
              rowSubTitle={'Freelancers & Interns'}
              colorCode={'#ffd200'}
              opacity={0.4}
            >
              {inAvatarArray.map(user => <UserCircle className={'small'} key={user.email} email={user.email} />)}
            </CalendarRow>
          }
        </CalendarBrief>
        {this.state.meetings.length > 0 ? (
          <TransitionMotion
            defaultStyles={this.getDefaultStyles()}
            styles={this.getStyles()}
            willLeave={this.willLeave}
            willEnter={this.willEnter}
          >
            {(styles) => {
              return (<EventsContainer> {styles.map((meeting, idx) => {
                let rowDate
                let colorCode
                let location
                let opa
                let numberOfMeetingRows = 8

                if (inAvatarArray.length < 1 && outAvatarArray.length < 1) {
                  numberOfMeetingRows = 10
                }
                if (idx < numberOfMeetingRows) {
                  if (!meeting.data.location) {
                    location = 'At Interstate Creative Partners'
                  } else {
                    location = meeting.data.location
                  }
                  if (moment().format('DD MM YYYY') === moment(meeting.data.start.dateTime).format('DD MM YYYY')) {
                    rowDate = 'Today'
                    colorCode = '#ffd200'
                    opa = 0.3
                  } else if (moment().format('DD MM YYYY') === moment(meeting.data.start.dateTime).subtract(1, 'days').format('DD MM YYYY')) {
                    rowDate = 'Tomorrow'
                    colorCode = '#41adaa'
                    opa = 0.2
                  } else {
                    rowDate = moment(meeting.data.start.dateTime).format('dddd')
                    colorCode = '#41adaa'
                    opa = 0.1
                  }
                  return (
                    <CalendarRow
                      ref={(ele) => { this[meeting.data.id] = ele }}
                      key={idx}
                      styles={meeting.style}
                      rowDay={rowDate}
                      rowTitle={meeting.data.summary}
                      rowSubTitle={location}
                      colorCode={colorCode}
                      opacity={opa}
                    >
                      {`${moment(meeting.data.start.dateTime).format('HH:mm')} to ${moment(meeting.data.end.dateTime).format('HH:mm')}`}
                    </CalendarRow>
                  )
                }
                return null
              })}</EventsContainer>)
            }
            }
          </TransitionMotion>
        ) : (null)}
      </CalendarWrapper>
    )
  }
}

// Listen and capture any changes made as a result of the the actions below.
const mapStateToProps = state => ({
  status: state.calendar.status,
  message: state.calendar.message,
  outOfOffice: state.calendar.outOfOffice.data,
  inOffice: state.calendar.inOffice.data,
  meetings: state.calendar.meetings.data,
})

const mapDispatchToProps = dispatch => ({
  serviceRequest: calendarType => dispatch(socketDataRequest({ service: 'GOOGLE', serverAction: 'pull', request: calendarType })),
})

CalendarContainer.propTypes = {
  serviceRequest: PropTypes.func,
  meetings: PropTypes.array,
  outOfOffice: PropTypes.array,
  inOffice: PropTypes.array,
}

CalendarContainer.defaultProps = {
  status: '',
  message: '',
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarContainer)
