import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import moment from 'moment'
import { socketDataRequest } from 'store/actions'
import { UserCircle, CalendarRow } from 'components'

const CalendarWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
`
class CalendarContainer extends Component {

  componentDidMount() {
    this.props.serviceRequest('calendar')
    this.props.serviceRequest('outOfOfficeCalendar')
    this.props.serviceRequest('inOfficeCalendar')
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.meetings[0] && this.props.meetings.length === 0) {
      this.startLoop(nextProps.meetings[0])
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
    const element = document.getElementById(`${meetingObj.id}`)

    if (moment().isBetween(meetingObj.start.dateTime, meetingObj.end.dateTime)) {
      element.classList.add('pulsate')
    }
    if (moment().isAfter(meetingObj.end.dateTime)) {
      element.style.left = '-1130px'
      setTimeout(() => {
        this.props.serviceRequest('calendar')
      }, 2000)
    }
  }

  stopLoop() {
    window.cancelAnimationFrame(this.hilightCurrentMeeting)
  }

  loop(meetingObj) {
    if (document.getElementById(`${meetingObj.id}`)) {
      this.isMeetingCurrent(meetingObj)
      this.hilightCurrentMeeting = window.requestAnimationFrame(this.loop.bind(this, meetingObj))
    }
  }

  startLoop(meetingObj) {
    if (!this.hilightCurrentMeeting) {
      this.hilightCurrentMeeting = window.requestAnimationFrame(this.loop.bind(this, meetingObj))
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

        { this.props.meetings.map((meeting, idx) => {
          let rowDate
          let colorCode
          let location
          let opa
          let numberOfMeetingRows = 5

          if (inAvatarArray.length < 1 && outAvatarArray.length < 1) {
            numberOfMeetingRows = 7
          }

          if (idx < numberOfMeetingRows) {
            if (!meeting.location) {
              location = 'At Interstate Creative Partners'
            } else {
              location = meeting.location
            }
            if (moment().format('DD MM YYYY') === moment(meeting.start.dateTime).format('DD MM YYYY')) {
              rowDate = 'Today'
              colorCode = '#ffd200'
              opa = 0.3
            } else if (moment().format('DD MM YYYY') === moment(meeting.start.dateTime).subtract(1, 'days').format('DD MM YYYY')) {
              rowDate = 'Tomorrow'
              colorCode = '#41adaa'
              opa = 0.2
            } else {
              rowDate = moment(meeting.start.dateTime).format('dddd')
              colorCode = '#41adaa'
              opa = 0.1
            }
            return (
              <CalendarRow
                id={meeting.id}
                key={idx}
                rowDay={rowDate}
                rowTitle={meeting.summary}
                rowSubTitle={location}
                colorCode={colorCode}
                opacity={opa}>
                {`${moment(meeting.start.dateTime).format('HH:mm')} to ${moment(meeting.end.dateTime).format('HH:mm')}`}
              </CalendarRow>
            )
          }
          return null
        })}
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
