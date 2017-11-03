import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import TransitionGroup from 'react-transition-group/TransitionGroup'

import { startSlideshowLogic, cleanSlideshow } from 'store/actions'
import { SlideshowLogic } from 'hoc'
import { FadeRightLeftOutInTransitionWrapper, InstagramImage, InstagramVideo } from 'components'

const TransitionWrapper = styled(TransitionGroup)`
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  flex: 1;
  width: 100%;
  height: 100%;
`

const InstagramMedia = styled.div`
  overflow: hidden;
  flex: 1 0 auto;
  margin: 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`

const Carousel = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  left: 0;
  overflow: hidden;
  position: relative;
  text-align: left;
  top: 0;
  width: 100%;
`


class InstagramCarousel extends Component {
  constructor() {
    super()
    console.log('InstagramCarousel constructor')

    this.state = { last: false, ready: false }
  }

  componentWillMount() {
    if ((this.props.posts.length !== this.props.slideshow.max) && (this.props.slideshow.current !== 0)) {
      console.log('new carousel, cleaning')
      this.props.cleanSlideshow()
    } else {
      this.setState({ ready: true })
    }
  }

  componentDidMount() {
    if (this.props.slideshow.status === 'waiting') {
      this.props.startSlideshowLogic(this.props.posts.length)
    }
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.slideshow.current === nextProps.slideshow.max) && (nextProps.slideshow.status === 'ready')) {
      console.log('this is the last photo in the carousel after it, we will going back to main slideshow')
      this.setState({ last: true })
    }

    if (nextProps.slideshow.status === 'waiting' && !this.state.ready) {
      console.log('carousel now cleaned and ready')
      this.setState({ ready: true })
      nextProps.startSlideshowLogic(nextProps.posts.length)
    }
  }

  shouldComponentUpdate = () => !this.state.last

  componentWillUnmount() {
    console.log('carousel unmounting')
  }

  render() {
    const post = this.props.posts[this.props.slideshow.current]
    if ((this.props.slideshow.status === 'ready') && this.state.ready) {
      const currentPost = () => {
        let InstagramMedia = {}

        switch (post.type) {
          case 'video':
            InstagramMedia = SlideshowLogic({ connectedComp: InstagramVideo, service: 'instagram', subSlideshow: (this.state.last ? '' : 'instagramCarousel'), timeout: false })
            return (<InstagramMedia currentVideo={post.videos.standard_resolution.url} />)
          case 'image':
          default:
            InstagramMedia = SlideshowLogic({ connectedComp: InstagramImage, service: 'instagram', subSlideshow: (this.state.last ? '' : 'instagramCarousel') })
            return (<InstagramMedia currentImage={post.images.standard_resolution.url} />)
        }
      }

      return (
        <Carousel>
          <InstagramMedia>
            <TransitionWrapper>
              <FadeRightLeftOutInTransitionWrapper key={`${this.props.carouselPostId}-${this.props.slideshow.current}`}>
                {currentPost()}
              </FadeRightLeftOutInTransitionWrapper>
            </TransitionWrapper>
          </InstagramMedia>
        </Carousel>
      )
    }
    return (<span>I should be dead</span>)
  }
}

const mapStateToProps = state => ({
  slideshow: state.instagram.innerSlideshow,
})

const mapDispatchToProps = dispatch => ({
  startSlideshowLogic: max => dispatch(startSlideshowLogic('INSTAGRAMCAROUSEL', max)),
  cleanSlideshow: () => dispatch(cleanSlideshow('INSTAGRAMCAROUSEL')),
})


InstagramCarousel.propTypes = {
  posts: PropTypes.array.isRequired,
  slideshow: PropTypes.object,
  startSlideshowLogic: PropTypes.func,
  cleanSlideshow: PropTypes.func,
  carouselPostId: PropTypes.string,
}


export default connect(mapStateToProps, mapDispatchToProps)(InstagramCarousel)
