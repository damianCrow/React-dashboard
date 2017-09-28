import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { connect } from 'react-redux'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import { SplashScreen, FadingTransitionWrapper, ShowcaseImage, YouTubeVideo, VimeoVideo } from 'components'

import { pullInitalPlaylist } from 'store/actions'

const styles = css`
  color: black;
  display: block;
  height: 100%;
  justify-content: center;
  left: 0;
  overflow: hidden;
  position: absolute;
  text-align: left;
  top: 0;
  width: 100%;
`
const TransitionWrapper = styled(TransitionGroup)`${styles}`

class ShowcaseContainer extends Component {
  componentWillMount() {
    this.props.fetchInitalPlaylist()
  }

  // TODO: Tidy this up, use a switch statement?
  render() {
    if (this.props.playlist.length > 0) {
      const { id, serviceId, serviceName, type, url, preview } = this.props.playlist[this.props.slideshow.current]
      let showcaseItem = null
      if (type === 'Image') {
        showcaseItem = <ShowcaseImage currentImage={url} thumbnail={preview} />
      } else if (type === 'Video' && serviceName === 'youtube') {
        showcaseItem = <YouTubeVideo serviceId={serviceId} />
      } else if (type === 'Video' && serviceName === 'vimeo') {
        showcaseItem = <VimeoVideo url={url} serviceId={serviceId} />
      }

      return (
        <TransitionWrapper>
          <FadingTransitionWrapper key={id}>
            {showcaseItem}
          </FadingTransitionWrapper>
        </TransitionWrapper>
      )
    }
    return (
      <SplashScreen icon="arc" service="Showcase" />
    )
  }
}

// Listen and capture any changes made as a result of the the actions below.
const mapStateToProps = state => ({
  playlist: state.showcase.data.playlist,
  status: state.showcase.data.status,
  slideshow: state.showcase.slideshow,
})

const mapDispatchToProps = dispatch => ({
  fetchInitalPlaylist: () => dispatch(pullInitalPlaylist()),
})

ShowcaseContainer.propTypes = {
  fetchInitalPlaylist: PropTypes.func,
  slideshow: PropTypes.object,
  playlist: PropTypes.array,
}

ShowcaseContainer.defaultProps = {
  socketConnected: false,
  sonosRequest: false,
  slideshow: {},
  playlist: [],
  status: '',
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowcaseContainer)
