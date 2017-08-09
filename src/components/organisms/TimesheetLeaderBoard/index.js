import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { fonts } from 'components/globals'
import { sortBy } from 'store/actions'
import Shuffle from 'react-shuffle'
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
const HarvestShuffle = styled(Shuffle)`
  max-width: 100%;
  height: 100%;
  position: absolute !important;
  left: 12.5%;
  & > * {
    display: flex;
    max-width: 100%;
  }
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
`
const ShadingWrapper = styled.div`
  width: 12.5%;
  height: 100%;
  display: flex;
  flex: 0 0 12.5%;
  position: relative;
  transition: all 0.25s ease-out;
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
    background-position: 64% 4%;
    z-index: 2;
  }

  &.hidden {
    opacity: 0;
  }

  &.showing {
    opacity: 1;
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
  transition: all 0.25s ease-out;
  transform: translateY(35px);

  &.hidden {
    opacity: 0;
  }

  &.showing {
    opacity: 1;
  }  
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
const TimePeriodText = styled(MonthText)`
  top: 65px;
  text-transform: uppercase;
  font-size: 0.8rem;
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

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     hideClass: 'showing',
  //   }
  // }

  componentDidMount() {
    const timePeriods = ['lastWorkDay', 'ThisWeek', 'LastWeek']
    const that = this
    let count = 1
    setInterval(() => {
      that.props.sortBy(timePeriods[count])
      if (count === 2) {
        count = 0
      } else {
        count += 1
      }

      that.toggleHidenClass()

      setTimeout(() => {
        that.toggleHidenClass()
      }, 1900)
    }, 30000)
  }

  toggleHidenClass() {
    const showHidElementsArray = document.querySelectorAll('.showHide')
    showHidElementsArray.forEach((item) => {
      if (item.classList.contains('hidden')) {
        item.classList.remove('hidden')
        item.classList.add('showing')
      } else {
        item.classList.remove('showing')
        item.classList.add('hidden')
      }
    })
  }

  render() {
    const { users } = this.props
    let startMonth
    let endMonth
    let sortByThis
    let timePeriodText

    switch (this.props.sortTimePeriod) {
      case 'lastWorkDay':
        timePeriodText = 'last Work Day'
        sortByThis = 'lastWorkDay'
        break
      case 'ThisWeek':
        sortByThis = 'thisWorkWeek'
        timePeriodText = 'this Week'
        break
      case 'LastWeek':
        sortByThis = 'lastWorkWeek'
        timePeriodText = 'last Week'
        break
      default: null
    }

    const startDay = moment(users[0].timeSpans[sortByThis].start).format('DD')
    let endDay = ` - ${moment(users[0].timeSpans[sortByThis].end).format('DD')}`

    if (moment.monthsShort()[moment(users[0].timeSpans[sortByThis].start).month()] === moment.monthsShort()[moment(users[0].timeSpans[sortByThis].end).month()]) {
      startMonth = moment.monthsShort()[moment(users[0].timeSpans[sortByThis].start).month()]
      endMonth = ''
    } else {
      startMonth = moment.monthsShort()[moment(users[0].timeSpans[sortByThis].start).month()]
      endMonth = ` - ${moment.monthsShort()[moment(users[0].timeSpans[sortByThis].end).month()]}`
    }

    if (sortByThis === 'lastWorkDay') {
      endMonth = ''
      endDay = ''
    }

    users.sort

    return (
      <HarvestWrapper>
        <HarvestPanel>
          { /* <HarvestPanelImage /> */}
          <TimePeriodText>
            {timePeriodText}
          </TimePeriodText>
          <MonthText>
            { `${startMonth}${endMonth}` }
          </MonthText>
          <DateText>
            { `${startDay}${endDay}` }
          </DateText>
        </HarvestPanel>
        <ShadingWrapper className={'showHide'} />
        <ShadingWrapper className={'showHide'} />
        <ShadingWrapper className={'showHide'} />
        <ShadingWrapper className={'showHide'} />
        <ShadingWrapper className={'showHide'} />
        <ShadingWrapper className={'showHide'} />
        <ShadingWrapper className={'showHide'} />
        <ShadingWrapper className={'showHide'} />
        <HarvestShuffle fade={true} scale={true} duration={2000}>
          {(users.sort((a, b) => b.totalHours[sortByThis] - a.totalHours[sortByThis])).map((user) => (
            <HarvestEntry key={user.id}>
              <UserCircle email={user.email} />
              <HarvestHours className={'showHide'}>
                {user.totalHours[sortByThis]}
                <HoursAbrv title="hours">hrs</HoursAbrv>
              </HarvestHours>
            </HarvestEntry>
          ))}
        </HarvestShuffle>
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
  sortBy: PropTypes.func,
  hideClass: PropTypes.string,
}

TimesheetLeaderBoard.defaultProps = {
  users: [],
  status: '',
  message: '',
}

export default connect(mapStateToProps, mapDispatchToProps)(TimesheetLeaderBoard)
