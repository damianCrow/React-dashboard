import React, { PropTypes } from 'react'
import styled, { css } from 'styled-components'

// import { Icon } from 'components'

import { fonts } from 'components/globals'

const styles = ({ ...props, posts }) => css`
  display: flex;
  align-items: flex-end;
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

const TwitterContainer = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
`

const TwitterWrapper = styled.div`${styles}`

// const PlaybackIcon = styled.Icon`
//   display: absolute;
// `

// const StyledIcon = styled(Icon)`${iconStyles}`

const Twitter = ({ children, ...props, posts, isFetching }) => {
  console.log('twitter posts: ', posts)
  const isEmpty = posts.length === 0
  return (
    <TwitterContainer>
      {isEmpty
        ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
        : <TwitterWrapper {...props} style={{ opacity: isFetching ? 0.5 : 1 }}>
          <ul>
            {posts.map((element, index) => {
              return <li key={'mykey' + index}>{element.text}</li>
            })}
          </ul>
        </TwitterWrapper>
      }
    </TwitterContainer>
  )
}

Twitter.propTypes = {
  children: PropTypes.any,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired
}

export default Twitter

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
