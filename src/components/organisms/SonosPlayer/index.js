import React, { PropTypes } from 'react'
import styled, { css } from 'styled-components'

import { SonosGroupInfo } from 'components'

import { fonts } from 'components/globals'

const styles = ({ ...props, posts }) => css`
  align-items: flex-end;
  background-size: cover;
  color: black;
  display: flex;
  font-family: ${fonts.primary};
  font-style: normal;
  font-weight: 300;
  height: 100%;
  width: 100%;
`

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
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

const SonosPlayer = ({ children, ...props, playerState, speakers }) => {
  console.log('SonosPlayer, playerState: ', playerState)
  // console.log('component posts: ', playerState)
  const playbackState = playerState.state.playbackState
  const currentTrack = playerState.state.currentTrack
  // const isEmpty = posts.length === 0
  return (
    <PlayerContainer>
      <SonosGroupInfo speakers={speakers} />
      <SonosCurrentTrackWrapper {...props}>
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
    </PlayerContainer>
  )
}

SonosPlayer.propTypes = {
  children: PropTypes.any,
  speakers: PropTypes.array.isRequired,
  playerState: PropTypes.object.isRequired
}

export default SonosPlayer

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
