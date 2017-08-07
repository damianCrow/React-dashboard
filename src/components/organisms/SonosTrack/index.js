import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { fonts } from 'components/globals'
import startsWith from 'lodash/startsWith'

import { WaveAnimation, TruncatedScroller } from 'components'

const styles = () => css`
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

const Track = styled(TruncatedScroller)`
  display: block;
  font-size: 1.25rem;
  text-align: center;
  width: 95%;
  &.two_groups {
    font-size: 1rem;
    position: absolute;
    top: 30px;
    left: 47%;
    width: 49%;
    text-align: left;
  }
  &.three_groups {
    font-size: 1rem;
    position: absolute;
    top: 75px;
    left: 40%;
    text-align: left;
    width: 55%;
  }
`
const Artist = styled(TruncatedScroller)`
  display: block;
  font-size: 1rem;
  font-style: bold;
  text-align: center;
  &.two_groups {
    position: absolute;
    top: 50px;
    left: 47%;
    text-align: left;
    font-size: 0.85rem;
  }
  &.three_groups {
    position: absolute;
    top: 95px;
    left: 40%;
    text-align: left;
    font-size: 0.75rem;
    width: 55%;
  }
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
  transform: translateY(-15%);
  filter: drop-shadow(0px 0px 2px rgba(0,0,0,0.5));
`
const AlbumArtCurrent = styled(AlbumArtNext)`
  height: auto;
  width: 50%;
  left: 25%;
  z-index: 2;
  transform: translateY(-22%);
  &.two_groups {
    width: 40%;
    left: 1%;
    top: 25px;
    transform: translateY(0);
  }
  &.three_groups {
    width: 30%;
    left: 2%;
    top: 25px;
    transform: translateY(0);
  }
`

const AlbumArtPrevious = styled(AlbumArtNext)`
  left: 0;
`
const PausedIndicator = styled.span`
  position: absolute;
  bottom: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  &.two_groups {
    left: 47%;
  }
  &.three_groups {
    left: 40%;
  }
`
const handleSrcError = (e) => {
  const image = e.target
  if (image !== undefined || null) {
    const ogSrc = image.src
    image.src = '/public/albumArtLoading.gif'
    const srcReset = setTimeout(() => {
      image.src = ogSrc
      return clearTimeout(srcReset)
    }, 10000)
  }
}

class SonosTrack extends Component {

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.forceUpdate()
    }
  }

  render() {
    const { trackInfo, previousTrack, playerCount } = this.props
    const playbackState = trackInfo.playbackState
    const currentTrack = trackInfo.currentTrack
    if (playerCount === 1) {
      return (
        <SonosCurrentTrackWrapper>
          <SonosCurrentTrack>
            <AlbumArtContainer>
              <AlbumArtPrevious
                src={previousTrack.absoluteAlbumArtUri}
                onError={(e) => { handleSrcError(e) }}
              />
              <AlbumArtCurrent
                src={trackInfo.currentTrack.absoluteAlbumArtUri}
                onError={(e) => { handleSrcError(e) }}
              />
              <AlbumArtNext
                src={trackInfo.nextTrack.absoluteAlbumArtUri}
                onError={(e) => { handleSrcError(e) }}
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
                <PausedIndicator className={(playerCount === 2 ? 'two_groups' : 'three_groups')}>PAUSED</PausedIndicator>
              }
              <WaveAnimation />
            </TrackInfo>
          </SonosCurrentTrack>
        </SonosCurrentTrackWrapper>
      )
    }
    return (
      <SonosCurrentTrackWrapper>
        <SonosCurrentTrack>
          <AlbumArtContainer>
            <AlbumArtCurrent
              src={trackInfo.currentTrack.absoluteAlbumArtUri}
              onError={(e) => { handleSrcError(e) }}
              className={(playerCount === 2 ? 'two_groups' : 'three_groups')}
            />
          </AlbumArtContainer>
          <TrackInfo>
            <Track className={(playerCount === 2 ? 'two_groups' : 'three_groups')}>
              {startsWith(trackInfo.currentTrack.title, 'x-sonosapi-stream') ? <i>Radio Stream</i> : trackInfo.currentTrack.title}
            </Track>
            <Artist className={(playerCount === 2 ? 'two_groups' : 'three_groups')}>
              {currentTrack.artist}
            </Artist>
            {playbackState === 'PAUSED_PLAYBACK' &&
              <PausedIndicator className={(playerCount === 2 ? 'two_groups' : 'three_groups')}>PAUSED</PausedIndicator>
            }
            <WaveAnimation />
          </TrackInfo>
        </SonosCurrentTrack>
      </SonosCurrentTrackWrapper>
    )
  }
}

SonosTrack.propTypes = {
  children: PropTypes.any,
  trackInfo: PropTypes.object,
  previousTrack: PropTypes.object,
  playerCount: PropTypes.number,
}

export default SonosTrack
