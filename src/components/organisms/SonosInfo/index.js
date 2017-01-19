import React, { PropTypes } from 'react'
import styled, { css } from 'styled-components'

// import { Icon } from 'components'

import { fonts } from 'components/globals'

const styles = ({ ...props, posts }) => css`
  align-items: flex-end;
  background-image: url(${posts[0].currentTrack.absoluteAlbumArtUri});
  background-size: cover;
  color: black;
  display: flex;
  font-family: ${fonts.primary};
  font-style: normal;
  font-weight: 300;
  height: 100%;
  width: 100%;
`

const SonosContainer = styled.div`
  display: block;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`

const SonosCurrentTrackWrapper = styled.div`${styles}`

const SonosCurrentTrack = styled.div`
  background: rgba(255, 255, 255, .5);
  display: block;
  width: 100%;
`

const Artist = styled.span`
  color: #4a4a4a;
  display: block;
  font-size: 1.5rem;
  text-align: left;
`
const Track = styled.span`
  display: block;
  font-size: 3rem;
  font-style: bold;
  text-align: left;
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
