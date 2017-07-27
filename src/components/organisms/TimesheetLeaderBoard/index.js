import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { fonts } from 'components/globals'
import { sortBy } from 'store/actions'

import { ProfileImage, RadarChart, Users, UserCircle } from 'components'


// import styled, { css } from 'styled-components'
// import ReactTransitionGroup from 'react-addons-transition-group'
// import * as d3 from 'd3'
// import { RadarChart } from '../../RadarChart'


const HarvestWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  justify-content: flex-start;
  font-family: Helvetica Neue, Helvetica, Roboto, sans-serif;
`

const HarvestEntry = styled.figure`
  display: flex;
  flex-direction: column;
  flex: 0 0 12.5%;
  align-items: center;
  margin: 0;
  text-align: center;
  height: 100%;
  position: relative;

  &:nth-child(3n+0) {
    background-color: rgba(0, 0, 0, 0.07);
  }

  &:nth-child(2n+0) {
    background-color: rgba(0, 0, 0, 0.125);
  }

  &:nth-child(2):after {
    content: '';
    width: 100%;
    height: 100%;
    background-image: url(/public/crown.png);
    position: absolute;
    background-repeat: no-repeat;
    background-position: 64% 5%;
    z-index: 2;
  }
`
const HarvestPanel = styled(HarvestEntry)`
  background-color: #f66822;
  position: relative;
  background-image: url(/public/harvest.png);
  background-size: 80%;
  background-position: 40% 10%;
  background-repeat: no-repeat;
`
const HarvestPanelImage = styled.div`
  background-color: #f66822;
  background-image: url(/public/calendar-icon.svg);
  background-size: 75%;
  width: 100%;
  height: 100%;
  background-position: 50% 90%;
  background-repeat: no-repeat;
  position: absolute;
  opacity: 0.25;
`
const HarvestHours = styled.figcaption`
  font-family: ${fonts.primary};
  font-weight: bold;
  color: white;
  margin: .5rem auto;
  font-size: 1.5rem;
  transform: translateY(35px);
`

const HoursAbrv = styled.abbr`
  font-family: ${fonts.primary};
  font-weight: lighter;
  color: white;
  margin: 0 .1rem;
  text-decoration: none;
`
const MonthText = styled(HoursAbrv)`
  font-weight: 800;
  position: absolute;
  top: 90px;
`
const DateText = styled(HarvestHours)`
  top: 75px;
  position: absolute;
`

// const Spider = styled.div`
//   flex: 1 1 50%;
// `

// // const InstagramWrapperStyled = styled(InstagramTransitionWrapper)`${wrapperStyles}`
// const TransitionWrapper = styled(ReactTransitionGroup)`${styles}`

// const PlaybackIcon = styled.Icon`
//   display: absolute;
// `

// const StyledIcon = styled(Icon)`${iconStyles}`

// const Timesheets = ({ children, ...props, posts }) => {
class TimesheetLeaderBoard extends Component {

  componentWillMount() {
    // const data = [this.props.posts.map((user) => {
    //   return { area: user.user.first_name, value: user.user.total_hours }
    // })]

    // console.log('data', data)

    // const width = 300
    // const height = 300

    // // Config for the Radar chart
    // const config = {
    //   w: width,
    //   h: height,
    //   maxValue: 45,
    //   levels: 5,
    //   ExtraWidthX: 200,
    //   ExtraWidthY: 100,
    // }

    // // Call function to draw the Radar chart
    // RadarChart.draw('#harvest-spider', data, config)

    // this.spider = d3.select('body')
    //   .selectAll('svg')
    //   .append('svg')
    //   .attr('width', width)
    //   .attr('height', height)
  }

  componentDidMount() {
    const timePeriods = ['Today', 'ThisWeek', 'LastWeek']
    const updateTimePeriod = this.props.sortBy
    let count = 1
    setInterval(() => {
      updateTimePeriod(timePeriods[count])
      if (count === 2) {
        count = 0
      } else {
        count += 1
      }
    }, 30000)
  }

  // console.log('Instagram comp posts: ', posts)
  // console.log('INSTAGRAM COMP mediaType', mediaType)
  // console.log('MEETINGS COMP posts', posts)
  // console.log('INSTAGRAM COMP THUMBNAIL: ', posts.images.thumbnail.url)
  render() {
    const { users } = this.props
    let startMonth
    let endMonth
    let sortByThis
    let displayTimePeriod
    let startDay
    let endDay

    switch (this.props.sortTimePeriod) {
      case 'Today':
        sortByThis = 'lastWorkDay'
        displayTimePeriod = 'Today'
        break
      case 'ThisWeek':
        sortByThis = 'thisWorkWeek'
        displayTimePeriod = 'thisWeek'
        break
      case 'LastWeek':
        sortByThis = 'lastWorkWeek'
        displayTimePeriod = 'lastWeek'
        break
      default: null
    }

    if (displayTimePeriod !== 'Today') {
      startDay = moment(users[0].timeSpans[displayTimePeriod].start).format('DD')
      endDay = `-${moment(users[0].timeSpans[displayTimePeriod].end).format('DD')}`

      if (moment.monthsShort()[moment(users[0].timeSpans[displayTimePeriod].start).month()] === moment.monthsShort()[moment(users[0].timeSpans[displayTimePeriod].end).month()]) {
        startMonth = moment.monthsShort()[moment(users[0].timeSpans[displayTimePeriod].start).month()]
        endMonth = ''
      } else {
        startMonth = moment.monthsShort()[moment(users[0].timeSpans[displayTimePeriod].start).month()]
        endMonth = ` - ${moment.monthsShort()[moment(users[0].timeSpans[displayTimePeriod].end).month()]}`
      }
    } else {
      startDay = '-'
      endDay = '-'
      endMonth = ''
      startMonth = 'Today'
    }

    users.sort

    return (
      <HarvestWrapper>
        <HarvestPanel>
          <HarvestPanelImage />
          <MonthText>
            { `${startMonth}${endMonth}` }
          </MonthText>
          <DateText>
            { `${startDay}${endDay}` }
          </DateText>
        </HarvestPanel>
        {(users.sort((a, b) => b.totalHours[sortByThis] - a.totalHours[sortByThis])).map((user) => (
          <HarvestEntry key={user.id}>
            <UserCircle email={user.email} />
            <HarvestHours>
              {user.totalHours[sortByThis]}
              <HoursAbrv title="hours">hrs</HoursAbrv>
            </HarvestHours>
          </HarvestEntry>
        ))}
      </HarvestWrapper>

    )
  }

}

// Listen and capture any changes made as a result of the the actions below.
const mapStateToProps = (state) => ({
  users: state.harvest.data.users,
  status: state.harvest.status.status,
  message: state.harvest.status.message,
  sortTimePeriod: state.harvest.status.sortBy,
})

const mapDispatchToProps = (dispatch) => ({
  sortBy: (timePeriod) => dispatch(sortBy(timePeriod)),
})

TimesheetLeaderBoard.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  status: PropTypes.string,
  message: PropTypes.string,
  sortTimePeriod: PropTypes.string,
}

TimesheetLeaderBoard.defaultProps = {
  users: [],
  status: '',
  message: '',
}

export default connect(mapStateToProps, mapDispatchToProps)(TimesheetLeaderBoard)
