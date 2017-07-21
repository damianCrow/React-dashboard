import PropTypes from 'prop-types'
import React from 'react'
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

const SonosPlayer = ({ previousTrack, playerState, speakers, featuredSpeaker, children, ...props }) => {
  return (
    <PlayerContainer>
      <SonosGroupInfo speakers={speakers} featuredSpeaker={featuredSpeaker} />
      <SonosTrack trackInfo={playerState} previousTrack={previousTrack} />
    </PlayerContainer>
  )
}

SonosPlayer.propTypes = {
  children: PropTypes.any,
  speakers: PropTypes.array.isRequired,
  playerState: PropTypes.object,
  featuredSpeaker: PropTypes.string,
  previousTrack: PropTypes.object,
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
