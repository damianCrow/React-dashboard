import PropTypes from 'prop-types';
import React from 'react';
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

const InstagramAuth = ({ children, ...props, message }) => {
  return (
    <InstagramAuthContainer>
      <Icon {...props} icon="instagram" size={48} />
      <Paragraph>{message}</Paragraph>
      <Link href="/authorize_instagram">Authorise Instagram</Link>
    </InstagramAuthContainer>
  )
}

InstagramAuth.propTypes = {
  children: PropTypes.any,
  message: PropTypes.string
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
