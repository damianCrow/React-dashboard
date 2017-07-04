import React, { Component } from 'react'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'
import styled from 'styled-components'

import { ProfileImage, RadarChart, Users, UserCircle } from 'components'
import { fonts } from 'components/globals'

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
  font-family: Helvetica Neue, Helvetica, Roboto, sans-serif;
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
  // console.log('Instagram comp posts: ', posts)
  // console.log('INSTAGRAM COMP mediaType', mediaType)
  // console.log('MEETINGS COMP posts', posts)
  // console.log('INSTAGRAM COMP THUMBNAIL: ', posts.images.thumbnail.url)
  render() {
    const { users } = this.props

    const userCircles = users.map((user) =>
      <UserCircle key={user.id} email={user.email} />
    )

    return (
      <HarvestWrapper>
        {/* userCircles */}
        <UserCircle key={this.props.users[0].id} email={this.props.users[0].email} />
        <UserCircle key={this.props.users[1].id} email={this.props.users[1].email} />
        <UserCircle key={this.props.users[2].id} email={this.props.users[2].email} />
      </HarvestWrapper>

    )
  }

}

// Listen and capture any changes made as a result of the the actions below.
const mapStateToProps = (state) => ({
  users: state.harvest.data.users,
  status: state.harvest.status.status,
  message: state.harvest.status.message,
})

TimesheetLeaderBoard.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  status: PropTypes.string,
  message: PropTypes.string,
}

TimesheetLeaderBoard.defaultProps = {
  users: [],
  status: '',
  message: '',
}

export default connect(mapStateToProps)(TimesheetLeaderBoard)
