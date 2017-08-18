import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import moment from 'moment'
import { socketDataRequest } from 'store/actions'
import { UserCircle, CalendarRow } from 'components'
import { TransitionMotion, spring, presets } from 'react-motion'

const CalendarWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
`
class CalendarContainer extends Component {

  constructor(props) {
    super(props)
    this.state = { meetings: [] }
    this.props.serviceRequest('calendar')
    this.props.serviceRequest('outOfOfficeCalendar')
    this.props.serviceRequest('inOfficeCalendar')
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ meetings: nextProps.meetings })
    if (nextProps.meetings.length) {
      nextProps.meetings.map(meeting => {
        this[`hilightCurrentMeeting${meeting.id}`] = setInterval(() => { this.isMeetingCurrent(meeting) }, 1000)
      })
    }
  }

  getAvatars(arrayToPopulate, arrayToMap) {
    arrayToMap.map((item, idx) => {
      const startDate = moment(item.start.date)
      const endDate = moment(item.end.date)

      if (moment().isBetween(startDate, endDate)) {
        if (item.attendees && item.attendees[0].email) {
          arrayToPopulate.push(<UserCircle className={'small'} key={idx} email={item.attendees[0].email} />)
        }
      }
      return null
    })
  }

  isMeetingCurrent(meetingObj) {
    if (this[meetingObj.id]) {
      const element = this[meetingObj.id].wrapper
      if (moment().isBetween(meetingObj.start.dateTime, meetingObj.end.dateTime)) {
        if (element && !element.classList.contains('pulsate')) {
          setTimeout(() => {}, 10000)
          element.classList.add('pulsate')
        }
      }
      if (moment().isAfter(meetingObj.end.dateTime)) {
        element.classList.remove('pulsate')
        clearInterval(this[`hilightCurrentMeeting${meetingObj.id}`])
        this.setState({ meetings: this.state.meetings.filter(meeting => meeting.id !== meetingObj.id) })
        this.props.serviceRequest('calendar')
        this.forceUpdate()
      }
    }
  }

  getDefaultStyles() {
    return this.state.meetings.map((meeting, idx) => ({ data: meeting, style: { height: 0, opacity: 1 }, key: meeting.id }))
  }

  getStyles() {
    const meetings = this.state.meetings

    return meetings.map((meeting, idx) => {
      return {
        data: meeting,
        key: meeting.id,
        style: {
          height: spring(80, presets.gentle),
          opacity: spring(1, presets.gentle),
        },
      }
    })
  }

  willEnter() {
    return {
      height: 0,
      opacity: 1,
    }
  }

  willLeave() {
    return {
      height: spring(0, { stiffness: 90, damping: 50 }),
    }
  }

  render() {
    const outAvatarArray = []
    const inAvatarArray = []
    this.getAvatars(outAvatarArray, this.props.outOfOffice)
    this.getAvatars(inAvatarArray, this.props.inOffice)

    return (
      <CalendarWrapper>
        {inAvatarArray.length > 0 && outAvatarArray.length > 0 ? (
          <div>
            <CalendarRow
              rowDay={'Today'}
              rowTitle={'Out Of Office'}
              rowSubTitle={'Holidays, Sickness & Meetings'}
              colorCode={'#ffd200'}
              opacity={0.4}>
              {outAvatarArray}
            </CalendarRow>
            <CalendarRow
              rowDay={'Today'}
              rowTitle={'Creative Resources'}
              rowSubTitle={'Freelancers & Interns'}
              colorCode={'#ffd200'}
              opacity={0.4}>
              {inAvatarArray}
            </CalendarRow>
          </div>
        ) : (null)}

        {this.state.meetings.length > 0 ? (
          <TransitionMotion
            defaultStyles={this.getDefaultStyles()}
            styles={this.getStyles()}
            willLeave={this.willLeave}
            willEnter={this.willEnter}>
            {styles => {
              return (<div> {styles.map((meeting, idx) => {
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
                      opacity={opa}>
                      {`${moment(meeting.data.start.dateTime).format('HH:mm')} to ${moment(meeting.data.end.dateTime).format('HH:mm')}`}
                    </CalendarRow>
                  )
                }
                return null
              })}</div>)}
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
  status: PropTypes.string,
  message: PropTypes.string,
  meetings: PropTypes.array,
  outOfOffice: PropTypes.array,
  inOffice: PropTypes.array,
}

CalendarContainer.defaultProps = {
  status: '',
  message: '',
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarContainer)
