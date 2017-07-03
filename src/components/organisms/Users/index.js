import React, { Component } from 'react'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'
import styled from 'styled-components'

import { serviceRequest } from 'store/actions'

import { GoogleUsers } from 'hoc'
import { ProfileImage, RadarChart } from 'components'
import { fonts } from 'components/globals'

// import styled, { css } from 'styled-components'
// import ReactTransitionGroup from 'react-addons-transition-group'
// import * as d3 from 'd3'
// import { RadarChart } from '../../RadarChart'


const UserWrapper = styled.div`
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

const UserList = styled.ul`
  flex: 1 1 50%;
  font-family: ${fonts.primary};
  color: white;
  font-size: 1.5rem;
  list-style: none;
`

const User = styled.li`
  display: flex;
  align-items: center;
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

// const Users = ({ children, ...props, posts }) => {
class Users extends Component {

  componentDidMount() {
    // this.props.fetchGoogleUsers()
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
    const { orginalUsers, googleUsers } = this.props
    console.log('googleUsers', googleUsers)
    return null
    // return (
    //   <UserWrapper>
    //     <UserList>
    //       {users.map((user) => {
    //         // console.log('user', user)
    //         return (
    //           <User key={user.id}>
    //             <ProfileImage>
    //               {user.firstName.charAt(0)}{user.lastName.charAt(0)}
    //             </ProfileImage>
    //             {user.totalHours.thisWorkWeek} hours
    //           </User>
    //         )
    //       })}
    //     </UserList>
    //   </UserWrapper>
    // )
  }

}

// Listen and capture any changes made as a result of the the actions below.
const mapStateToProps = (state) => ({
  orginalUsers: state.harvest.data.users,
  googleUsers: state.harvest.status.status,
})

// const mapDispatchToProps = (dispatch) => ({
//   fetchGoogleUsers: () => dispatch(serviceRequest('GOOGLE')),
// })

Users.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  status: PropTypes.string,
  message: PropTypes.string,
}

Users.defaultProps = {
  users: [],
  status: '',
  message: '',
}

export default connect(mapStateToProps)(GoogleUsers(Users))
