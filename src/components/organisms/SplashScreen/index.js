import PropTypes from 'prop-types'
import React from 'react'
import styled, { css } from 'styled-components'

import { Icon, Link, Paragraph } from 'components'

import { fonts } from 'components/globals'

const styles = ({ ...props }) => css`
  align-items: center;
  background-size: cover;
  color: black;
  display: flex;
  flex-direction: column;
  font-family: ${fonts.primary};
  font-style: normal;
  font-weight: 300;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  text-align: left;
  top: 0;
  width: 100%;
`

const LoadingMessage = styled.span`
  font-family: ${fonts.primary};
  color: white;
  margin: 1rem;
`

const SplashScreenContainer = styled.div`${styles}`

// const PlaybackIcon = styled.Icon`
//   display: absolute;
// `

// const StyledIcon = styled(Icon)`${iconStyles}`

const SplashScreen = ({ children, ...props, icon, service }) => {
  return (
    <SplashScreenContainer>
      <Icon {...props} icon={icon} fillColor="#fff" height={100} />
      <LoadingMessage>Loading {service}</LoadingMessage>
    </SplashScreenContainer>
  )
}

SplashScreen.propTypes = {
  children: PropTypes.any,
  icon: PropTypes.string,
  service: PropTypes.string,
}

export default SplashScreen

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
