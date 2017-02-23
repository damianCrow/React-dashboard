import React, { PropTypes } from 'react'
import styled, { css } from 'styled-components'

import { fonts } from 'components/globals'

const styles = ({ ...props, trackInfo }) => css`
  color: white;
  display: flex;
  flex-direction: column;
  font-family: ${fonts.primary};
  font-style: normal;
  font-weight: 300;
  height: 100%;
  width: 100%;

  &:before {
    background-image: url(${trackInfo.currentTrack.absoluteAlbumArtUri});
    background-size: cover;
    content: '';
    filter: blur(10px);
    height: 100%;
    left: 0;
    object-fit: cover;
    position: absolute;
    top: 0;
    width: 100%;
  }
`
// background-image: url(${playerState.state.currentTrack.absoluteAlbumArtUri});

const SonosCurrentTrackWrapper = styled.div`${styles}`

const SonosCurrentTrack = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 0 0 15rem;
  z-index: 1;
  align-items: center;
  flex: 1;
  justify-content: center;
  color: white;
`

const TrackInfo = styled.div`
  display: block;
  text-align: center;
`

const Artist = styled.span`
  display: block;
  font-size: 1.5rem;
  text-align: center;
`
const Track = styled.span`
  display: block;
  font-size: 1rem;
  font-style: bold;
  text-align: center;
`

const CurrentAlbumArt = styled.img`
  display: block;
  position: relative;
  max-width: 10rem;
`

// const PlaybackIcon = styled.Icon`
//   display: absolute;
// `

// const StyledIcon = styled(Icon)`${iconStyles}`

const SonosTrack = ({...props, trackInfo}) => {
  const playbackState = trackInfo.playbackState
  const currentTrack = trackInfo.currentTrack

  return (
    <SonosCurrentTrackWrapper {...props}>
      <SonosCurrentTrack>
        <CurrentAlbumArt src={trackInfo.currentTrack.absoluteAlbumArtUri} />
        <TrackInfo>
          <Track>
            {currentTrack.title}
          </Track>
          <Artist>
            {currentTrack.artist}
          </Artist>
          {playbackState === 'PAUSED_PLAYBACK' &&
            // <PlaybackIcon />
            <span>PAUSED</span>
          }
        </TrackInfo>
      </SonosCurrentTrack>
    </SonosCurrentTrackWrapper>
  )
}

SonosTrack.propTypes = {
  children: PropTypes.any,
  trackInfo: PropTypes.object
}

export default SonosTrack

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
