import React, { PropTypes } from 'react'
import styled, { css } from 'styled-components'

// import { Icon } from 'components'

import { fonts } from 'components/globals'

const styles = ({ ...props, posts }) => css`
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

const InstagramContainer = styled.div`
  display: flex;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`

const InstagramImage = styled.img`
  display: block;
  width: 150px;
  position: relative;
`

const InstagramWrapper = styled.div`${styles}`

// const PlaybackIcon = styled.Icon`
//   display: absolute;
// `

// const StyledIcon = styled(Icon)`${iconStyles}`

const Instagram = ({ children, ...props, posts, isFetching }) => {
  console.log('twitter posts: ', posts)
  const isEmpty = posts.length === 0
  return (
    <InstagramContainer>
      {isEmpty
        ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
        : <InstagramWrapper {...props} style={{ opacity: isFetching ? 0.5 : 1 }}>
          {posts.map((element, index) => {
            return <InstagramImage src={element.images.standard_resolution.url} key={'mykey' + index} />
          })}
        </InstagramWrapper>
      }
    </InstagramContainer>
  )
}

Instagram.propTypes = {
  children: PropTypes.any,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired
}

export default Instagram

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
