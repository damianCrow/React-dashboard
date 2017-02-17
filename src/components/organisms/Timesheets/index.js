import React, { PropTypes } from 'react'
import moment from 'moment'
// import styled, { css } from 'styled-components'
// import ReactTransitionGroup from 'react-addons-transition-group'

// import { InstagramTransitionWrapper, InstagramImage, InstagramVideo } from 'components'

// const styles = ({ ...props }) => css`
//   color: black;
//   display: block;
//   height: 100%;
//   justify-content: center;
//   left: 0;
//   overflow: hidden;
//   position: absolute;
//   text-align: left;
//   top: 0;
//   width: 100%;
// `

// // const InstagramWrapperStyled = styled(InstagramTransitionWrapper)`${wrapperStyles}`
// const TransitionWrapper = styled(ReactTransitionGroup)`${styles}`

// const PlaybackIcon = styled.Icon`
//   display: absolute;
// `

// const StyledIcon = styled(Icon)`${iconStyles}`

const Meetings = ({ children, ...props, posts, isFetching }) => {
  // console.log('Instagram comp posts: ', posts)
  // console.log('INSTAGRAM COMP mediaType', mediaType)
  console.log('MEETINGS COMP posts', posts)
  // console.log('INSTAGRAM COMP THUMBNAIL: ', posts.images.thumbnail.url)

  return (
    <ol>
      {posts.map(function (object, i) {
        return <li key={i}> {moment(object.start.dateTime).format('dddd MMM Do')} {object.summary} </li>
      })}
    </ol>
  )
}

Meetings.propTypes = {
  children: PropTypes.any,
  isFetching: PropTypes.bool.isRequired,
  posts: PropTypes.object.isRequired
}

export default Meetings
