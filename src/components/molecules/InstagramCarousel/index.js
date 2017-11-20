import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import TransitionGroup from 'react-transition-group/TransitionGroup'

import { startSlideshowLogic, slideshowMeta } from 'store/actions'
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
    this.state = { last: false }
  }

  componentDidMount() {
    if (this.props.carousel.status === 'waiting') {
      this.props.startSlideshowLogic(this.props.posts.length)
    } else {
      this.props.slideshowMeta(this.props.posts.length)
    }
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.carousel.current === nextProps.carousel.max)) {
      this.setState({ last: true })
    }

    if (this.props.carouselPostId !== nextProps.carouselPostId) {
      this.props.slideshowMeta(this.props.posts.length)
    }
  }

  shouldComponentUpdate = () => !this.state.last

  render() {
    const post = this.props.posts[this.props.carousel.current]
    if (this.props.carousel.status === 'ready') {
      const currentPost = () => {
        let InstagramMedia = {}

        switch (post.type) {
          case 'video':
            InstagramMedia = SlideshowLogic({ connectedComp: InstagramVideo, service: 'instagram', subSlideshow: (this.state.last ? '' : 'carousel'), timeout: false, id: this.props.carouselPostId })
            return (<InstagramMedia currentVideo={post.videos.standard_resolution.url} />)
          case 'image':
          default:
            InstagramMedia = SlideshowLogic({ connectedComp: InstagramImage, service: 'instagram', subSlideshow: (this.state.last ? '' : 'carousel'), id: this.props.carouselPostId })
            return (<InstagramMedia currentImage={post.images.standard_resolution.url} />)
        }
      }

      return (
        <Carousel>
          <InstagramMedia>
            <TransitionWrapper>
              <FadeRightLeftOutInTransitionWrapper key={`${this.props.carouselPostId}-${this.props.carousel.current}`}>
                {currentPost()}
              </FadeRightLeftOutInTransitionWrapper>
            </TransitionWrapper>
          </InstagramMedia>
        </Carousel>
      )
    }
    return null
  }
}

const mapStateToProps = state => ({
  carousel: state.instagram.slideshow.carousel,
})

const mapDispatchToProps = dispatch => ({
  startSlideshowLogic: max => dispatch(startSlideshowLogic('INSTAGRAMCAROUSEL', max)),
  slideshowMeta: max => dispatch(slideshowMeta('INSTAGRAMCAROUSEL', max)),
})


InstagramCarousel.propTypes = {
  posts: PropTypes.array.isRequired,
  carousel: PropTypes.object,
  startSlideshowLogic: PropTypes.func,
  slideshowMeta: PropTypes.func,
  carouselPostId: PropTypes.string,
}


export default connect(mapStateToProps, mapDispatchToProps)(InstagramCarousel)
