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
  }

  componentWillReceiveProps(nextProps) {
    // console.log('google calendar nextProps', nextProps)
  }


  render() {
    // const { posts, status, message } = this.props

    // <Auth message={message} icon="harvest" service="Harvest" authLink="/authorize_harvest" />
    // <Meetings posts={allPosts} />
    const avatarArray = []
    return (
      <CalendarWrapper>

        { this.props.outOfOffice.map((oOo, ix) => {
          const startDate = moment(oOo.start.date)
          const endDate = moment(oOo.end.date)

          if (moment().isBetween(startDate, endDate)) {
            if (oOo.attendees && oOo.attendees[0].email) {
              avatarArray.push(<UserCircle className={'small'} key={ix} email={oOo.attendees[0].email} />)
            } else {
              // avatarArray.push(<UserCircle className={'small'} key={ix} email={} />)
            }
          }
          return null
        })
        }
        <CalendarRow
          rowDay={'Today'}
          rowTitle={'Out Of Office'}
          rowSubTitle={'Holidays, Sickness & Meetings'}
          colorCode={'#ffd200'}
          opacity={0.25}>
          {avatarArray}
        </CalendarRow>
        <CalendarRow
          rowDay={'Today'}
          rowTitle={'In The Office'}
          rowSubTitle={'Freelancers & Interns'}
          colorCode={'#ffd200'}
          opacity={0.25}>
        </CalendarRow>

        { this.props.meetings.map((meeting, idx) => {
          let rowDate
          let colorCode
          let location
          let opa

          if (idx < 5) {
            if (!meeting.location) {
              location = 'At Interstate Creative Partners'
            } else {
              location = meeting.location
            }
            if (moment().format('DD MM YYYY') === moment(meeting.start.dateTime).format('DD MM YYYY')) {
              rowDate = 'Today'
              colorCode = '#ffd200'
              opa = 0.15
            } else if (moment().format('DD MM YYYY') === moment(meeting.start.dateTime).subtract(1, 'days').format('DD MM YYYY')) {
              rowDate = 'Tomorrow'
              colorCode = '#41adaa'
              opa = 0.075
            } else {
              rowDate = moment(meeting.start.dateTime).format('dddd')
              colorCode = '#41adaa'
              opa = 0.02
            }
            return (
              <CalendarRow
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
}

CalendarContainer.defaultProps = {
  status: '',
  message: '',
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarContainer)