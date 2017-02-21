import React, { PropTypes } from 'react'
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

const Timesheets = ({ children, ...props, posts }) => {
  // console.log('Instagram comp posts: ', posts)
  // console.log('INSTAGRAM COMP mediaType', mediaType)
  console.log('MEETINGS COMP posts', posts)
  // console.log('INSTAGRAM COMP THUMBNAIL: ', posts.images.thumbnail.url)

  return (
    <ul>
      {posts.map(function (object, i) {
        return <li key={i}> {object.user.first_name} {object.user.last_name}: {object.user.total_hours} hours </li>
      })}
    </ul>
  )
}

Timesheets.propTypes = {
  children: PropTypes.any,
  posts: PropTypes.array.isRequired
}

export default Timesheets
