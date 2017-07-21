import PropTypes from 'prop-types'
import React from 'react'
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
    background-color: #0b8977;
    transform: scale(1.2);
    opacity: 1;
    content: '';
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

const AlbumArtNext = styled.img`
  display: block;
  position: absolute;
  object-fit: contain;
  top: 50%;
  right: 0;
  height: auto;
  width: 40%;
  transform: translateY(-50%);
`
const AlbumArtCurrent = styled(AlbumArtNext)`
  height: auto;
  width: 50%;
  left: 25%;
  z-index: 2;
  box-shadow: 5px 5px 25px 3px #333;
`

const AlbumArtPrevious = styled(AlbumArtNext)`
  left: 0;
`

// const PlaybackIcon = styled.Icon`
//   display: absolute;
// `


const handleSrcError = (image) => {
  if (image !== undefined || null) {
    const ogSrc = image.src
    setTimeout(() => {
      image.src = ogSrc
    }, 15000)
  }
  image.src = '/public/albumArtLoading.gif'
}

const SonosTrack = ({ ...props, trackInfo, previousTrack }) => {
  const playbackState = trackInfo.playbackState
  const currentTrack = trackInfo.currentTrack
  return (
    <SonosCurrentTrackWrapper {...props}>
      <SonosCurrentTrack>
        <AlbumArtContainer>
          <AlbumArtPrevious
            innerRef={(previousTrack) => { this.previousTrack = previousTrack }}
            src={previousTrack.absoluteAlbumArtUri}
            onError={handleSrcError.bind(this, this.previousTrack)}
          />
          <AlbumArtCurrent
            innerRef={(currentTrack) => { this.currentTrack = currentTrack }}
            src={trackInfo.currentTrack.absoluteAlbumArtUri}
            onError={handleSrcError.bind(this, this.currentTrack)}
          />
          <AlbumArtNext
            innerRef={(nextTrack) => { this.nextTrack = nextTrack }}
            src={trackInfo.nextTrack.absoluteAlbumArtUri} 
            onError={handleSrcError.bind(this, this.nextTrack)}
          />
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
  previousTrack: PropTypes.object,
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
