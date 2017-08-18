export const initialState = {
  connected: false,
  requested: false,
  speakerZones: [],
}

export const trackState = {
  artist: '',
  title: '',
  album: '',
  albumArtUri: '',
  duration: 0,
  uri: '',
}

export const initialCoordinatorState = {
  uuid: '',
  coordinator: '',
  roomName: '',
  state: {
    volume: 0,
    mute: false,
    equalizer: {
      bass: 0,
      treble: 0,
      loudness: false,
    },
    previousTrack: trackState,
    currentTrack: {
      ...trackState,
      type: '',
      stationName: '',
      absoluteAlbumArtUri: '',
    },
    nextTrack: trackState,
    trackNo: 0,
    elapsedTime: 0,
    elapsedTimeFormatted: '',
    playbackState: 'STOPPED',
    playMode: {
      repeat: 'none',
      shuffle: false,
      crossfade: false,
    },
    groupState: {
      volume: 0,
      mute: false,
    },
  },
  groupState: {
    volume: 0,
    mute: false,
  },
  avTransportUri: '',
  avTransportUriMetadata: '',
}

export const getList = (state = initialState) => state.list || initialState.list
export const getDetail = (state = initialState) => state.detail || initialState.detail
