import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components'

import { fonts } from 'components/globals'

import { WaveAnimation } from 'components'

const styles = ({ ...props, trackInfo }) => css`
  color: white;
  display: flex;
  flex-direction: column;
  font-family: ${fonts.primary};
  font-style: normal;
  font-weight: 300;
  height: 100%;
  overflow: hidden;
  width: 100%;

  &:before {
    background:
      linear-gradient(
        rgba(0, 0, 0, .5),
        rgba(0, 0, 0, .5)
      ),
      url(${trackInfo.currentTrack.absoluteAlbumArtUri})
    background-size: cover;
    background-position: center;
    transform: scale(1.2);
    opacity: 1;
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
  height: 100%;
  width: 100%;
  flex: 0 0 100%;
  z-index: 1;
  align-items: center;
  flex: 1;
  justify-content: space-around;
  color: white;
`

const TrackInfo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  flex: 1 0 5rem;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  padding: 2rem 0;
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

const AlbumArtContainer = styled.div`
  display: block;
  position: relative;
  width: calc(100% - 2rem);
  flex: 0 1 100%;
`

const AlbumArt = styled.img`
  display: block;
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: contain;
`

const StyledWave = styled.div`
  position: absolute;
  top: 0;
  left: 0;
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
        <AlbumArtContainer>
          <AlbumArt src={trackInfo.currentTrack.absoluteAlbumArtUri} />
        </AlbumArtContainer>
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
          <WaveAnimation />
        </TrackInfo>
      </SonosCurrentTrack>
    </SonosCurrentTrackWrapper>
  )
}

SonosTrack.propTypes = {
  children: PropTypes.any,
  trackInfo: PropTypes.object,
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
