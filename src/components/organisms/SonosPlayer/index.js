import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { fonts } from 'components/globals'
import startsWith from 'lodash/startsWith'

import { WaveAnimation, TruncatedScroller, SonosGroupInfo } from 'components'

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
  position: relative;

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
  flex-direction: ${props => props.single ? 'column' : 'row'};
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
  flex: ${props => props.single ? '1' : '1'};
  ${props => props.single && 'width: 100%;'}
  box-sizing: border-box;
  position: relative;
  padding: 0 1rem;
  text-align: ${props => props.single ? 'center' : 'left'};
  overflow: hidden;
`

const Track = styled(TruncatedScroller)`
  display: block;
  font-size: 1.25rem;
`
const Artist = styled(TruncatedScroller)`
  display: block;
  font-size: 1rem;
  font-style: bold;
`

const AlbumArtContainer = styled.div`
  display: flex;
  position: relative;
  overflow: hidden;
  flex: ${props => props.single ? '2.5 0' : '0 0 40%'};
  box-sizing: border-box;
  ${props => props.single ? 'width: 100%' : 'height: 100%'};
  ${props => props.single && 'align-items: center'};
  padding: 1rem;
`

const AlbumArtWrapper = styled.div`
  position: relative;
  flex: ${props => props.side ? '1' : '1.4'} 1;
  ${props => props.shift ? `transform: translateX(${props.shift})` : 'z-index: 1'};
  &:before{
    display: block;
    content: " ";
    width: 100%;
    overflow: hidden;
    padding-top: 100%;
  }
`

const AlbumArt = styled.img`
  display: block;
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  object-fit: contain;
  filter: drop-shadow(0px 0px 2px rgba(0,0,0,0.5));
`

const PausedIndicator = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  margin-top: .25rem;
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

class SonosPlayer extends Component {

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.forceUpdate()
    }
  }

  render() {
    const { playerState, single } = this.props
    const playbackState = playerState.playbackState
    const currentTrack = playerState.currentTrack
    const speakerNameComp = <SonosGroupInfo speakers={this.props.speakers} />

    return (
      <SonosCurrentTrackWrapper>
        <SonosCurrentTrack single={single} >
          {single && speakerNameComp}
          <AlbumArtContainer single={single} >
            {single &&
              <AlbumArtWrapper side shift="1rem">
                {playerState.previousTrack &&
                  <AlbumArt
                    src={playerState.previousTrack && playerState.previousTrack.absoluteAlbumArtUri}
                    onError={(e) => { handleSrcError(e) }}
                  />
                }
              </AlbumArtWrapper>
            }
            <AlbumArtWrapper>
              <AlbumArt
                src={playerState.currentTrack.absoluteAlbumArtUri}
                onError={(e) => { handleSrcError(e) }}
              />
            </AlbumArtWrapper>
            {single && playerState.nextTrack &&
              <AlbumArtWrapper side shift="-1rem">
                <AlbumArt
                  src={playerState.nextTrack.absoluteAlbumArtUri}
                  onError={(e) => { handleSrcError(e) }}
                />
              </AlbumArtWrapper>
            }
          </AlbumArtContainer>
          <TrackInfo single={single} >
            {!single && speakerNameComp}
            <Track>
              {startsWith(playerState.currentTrack.title, 'x-sonosapi-stream') ? <i>Radio Stream</i> : playerState.currentTrack.title}
            </Track>
            <Artist>
              {currentTrack.artist}
            </Artist>
            {playbackState === 'PAUSED_PLAYBACK' &&
              <PausedIndicator>PAUSED</PausedIndicator>
            }
          </TrackInfo>
        </SonosCurrentTrack>
        <WaveAnimation single={single} />
      </SonosCurrentTrackWrapper>
    )
  }
}

SonosPlayer.propTypes = {
  children: PropTypes.any,
  speakers: PropTypes.array,
  playerState: PropTypes.object,
  previousTrack: PropTypes.object,
  playerCount: PropTypes.number,
  single: PropTypes.bool,
}

SonosPlayer.defaultProps = {
  playerState: {
    currentTrack: {
      absoluteAlbumArtUri: '/public/albumArtLoading.gif',
    },
    previousTrack: {
      absoluteAlbumArtUri: '/public/albumArtLoading.gif',
    },
  },
  single: false,
  speakers: ['Waiting...'],
}


export default SonosPlayer
