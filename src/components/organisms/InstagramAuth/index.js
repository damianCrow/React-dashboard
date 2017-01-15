import React, { PropTypes } from 'react'
import styled, { css } from 'styled-components'

import { Icon } from 'components'

import { fonts } from 'components/globals'

const styles = ({ ...props }) => css`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  font-family: ${fonts.primary};
  color: black;
  font-weight: 300;
  font-style: normal;
  text-align: left;
  width: 100%;
  height: 100%;
  background-color: lightblue;
  background-size: cover;
`

// const InstagramImage = styled.img`
//   display: block;
//   width: 150px;
//   position: relative;
// `

const InstagramAuthContainer = styled.div`${styles}`

// const PlaybackIcon = styled.Icon`
//   display: absolute;
// `

// const StyledIcon = styled(Icon)`${iconStyles}`

const InstagramAuth = ({ children, ...props }) => {
  return (
    <InstagramAuthContainer>
      <Icon {...props} icon="instagram" />
      <p>Please authrorise Instagram here: </p>
    </InstagramAuthContainer>
  )
}

InstagramAuth.propTypes = {
  children: PropTypes.any
}

export default InstagramAuth

// import React, { PropTypes } from 'react'

// const SonosInfo = ({posts}) => (
//   <ul>
//     {posts.map((post, i) =>
//       <li key={i}>{post.title}</li>
//     )}
//   </ul>
// )

// SonosInfo.propTypes = {
//   posts: PropTypes.array.isRequired
// }

// export default SonosInfo
