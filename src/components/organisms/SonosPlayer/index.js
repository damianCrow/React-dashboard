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

const SonosPlayer = ({playerState, speakers, featuredSpeaker, children, ...props}) => {

  // console.log('playerState', playerState)
  console.log('SonosPlayer featuredSpeaker: ', featuredSpeaker)
  // console.log('SonosPlayer isEmpty: ', isEmpty)

  // const isEmpty = posts.length === 0
  return (
    <PlayerContainer>
      <SonosGroupInfo speakers={speakers} featuredSpeaker={featuredSpeaker} />
      <SonosTrack trackInfo={playerState} />
    </PlayerContainer>
  )
}

SonosPlayer.propTypes = {
  children: PropTypes.any,
  speakers: PropTypes.array.isRequired,
  playerState: PropTypes.object,
  featuredSpeaker: PropTypes.string,
}

SonosPlayer.defaultProps = {
  speakers: [''],
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
