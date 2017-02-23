import React, { PropTypes } from 'react'
import styled from 'styled-components'

import { SonosGroupInfo, SonosTrack } from 'components'

// background-image: url(${playerState.state.currentTrack.absoluteAlbumArtUri});

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1 1 50%;
  overflow: hidden;
  position: relative;
`

// const PlaybackIcon = styled.Icon`
//   display: absolute;
// `

// const StyledIcon = styled(Icon)`${iconStyles}`

const SonosPlayer = ({playerState, speakers, children, ...props}) => {

  let isEmpty = true

  if (Object.keys(playerState).length !== 0 && playerState.constructor === Object) {
    isEmpty = false
  }

  // console.log('playerState', playerState)
  console.log('SonosPlayer playerState: ', playerState)
  // console.log('SonosPlayer isEmpty: ', isEmpty)

  // const isEmpty = posts.length === 0
  return (
    <PlayerContainer>
      <SonosGroupInfo speakers={speakers} />
      {!isEmpty ? (<SonosTrack trackInfo={playerState.state} />) : null}
    </PlayerContainer>
  )
}

SonosPlayer.propTypes = {
  children: PropTypes.any,
  speakers: PropTypes.array.isRequired,
  playerState: PropTypes.object
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
