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
  width: 100%;
  height: 100%;
  background-image: url(${posts[0].currentTrack.absoluteAlbumArtUri});
  background-size: cover;
`

const SonosContainer = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
`

const SonosCurrentTrackWrapper = styled.div`${styles}`

const SonosCurrentTrack = styled.div`
  display: block;
  width: 100%;
  background: rgba(255, 255, 255, .5);
`

const Artist = styled.span`
  display: block;
  color: #4a4a4a;
  text-align: left;
  font-size: 1.5rem;
`
const Track = styled.span`
  display: block;
  text-align: left;
  font-size: 3rem;
  font-style: bold;
`

// const PlaybackIcon = styled.Icon`
//   display: absolute;
// `

// const StyledIcon = styled(Icon)`${iconStyles}`

const SonosInfo = ({ children, ...props, posts, isFetching }) => {
  console.log('component posts: ', posts)
  const playbackState = posts[0].playbackState
  const currentTrack = posts[0].currentTrack
  const isEmpty = posts.length === 0
  return (
    <SonosContainer>
      {isEmpty
        ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
        : <SonosCurrentTrackWrapper {...props} style={{ opacity: isFetching ? 0.5 : 1 }}>
          <SonosCurrentTrack>
            <Artist>
              {currentTrack.artist}
            </Artist>
            <Track>
              {currentTrack.title}
            </Track>
            {playbackState === 'PAUSED_PLAYBACK' &&
              // <PlaybackIcon />
              <span>PAUSED</span>
            }
          </SonosCurrentTrack>
        </SonosCurrentTrackWrapper>
      }
    </SonosContainer>
  )
}

SonosInfo.propTypes = {
  children: PropTypes.any,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired
}

export default SonosInfo

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
