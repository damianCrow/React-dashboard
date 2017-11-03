import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import { SlideshowLogic } from 'hoc'

import { fonts } from 'components/globals'
import { startSlideshowLogic, socketDataRequest } from 'store/actions'
import { FadingTransitionWrapper, InstagramCarousel, MediaBluredBack, SplashScreen, Icon, MetaTags, Ticker, InstagramImage, InstagramVideo, InstagramBackground } from 'components'

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

const InstagramWrapper = styled.section`
  color: white;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  left: 0;
  overflow: hidden;
  position: absolute;
  text-align: left;
  top: 0;
  font-family: ${fonts.primary};
  width: 100%;
`

const StyledIcon = styled(Icon)`
  z-index: 59;
  padding: .25rem;
  flex: 0 0 auto;
  opacity: .5;
  position: absolute;
  left: 0.25rem;
  bottom: 0.5rem;
`

// Frame

const InstagramMedia = styled.div`
  overflow: hidden;
  flex: 1 0 auto;
  margin: 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`

const InstagramCaption = styled.span`
  display: inline-block;
  flex: 1 1 auto;
  margin: 1rem .5rem;
`

const Frame = styled.div`
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

const HeaderLevel = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex: 0 0 100%;
  justify-content: space-between;
  z-index: 1;
`


class InstagramContainer extends Component {
  componentDidMount() {
    this.props.serviceRequest()
  }

  componentWillReceiveProps(nextProps) {
    if ((this.props.status !== nextProps.status) && nextProps.status === 'success') {
      nextProps.startSlideshowLogic(nextProps.posts.length)
    }
  }

  render() {
    const isEmpty = this.props.posts.length === 0

    if (!isEmpty && this.props.slideshow.status === 'ready') {
      const post = this.props.posts[this.props.slideshow.current]
      const { id, type } = post

      const metaTags = [
        { icon: 'heart', metaInfo: post.likes.count },
        { icon: 'comment', metaInfo: post.comments.count },
      ]

      let InstagramSlideshow = {}
      console.log('post', post)


      const mediaType = () => {
        console.log('Instagram Container: type = ', type)
        console.log('Instagram Container: id = ', id)
        switch (type) {
          case 'carousel':
            InstagramSlideshow = SlideshowLogic({ connectedComp: InstagramCarousel, service: 'instagram', timeout: false })
            return (<InstagramSlideshow posts={post.carousel_media} carouselPostId={id} />)
          case 'video':
            InstagramSlideshow = SlideshowLogic({ connectedComp: InstagramVideo, service: 'instagram', timeout: false })
            return (<InstagramSlideshow currentVideo={post.videos.standard_resolution.url} />)
          default:
          case 'image':
            InstagramSlideshow = SlideshowLogic({ connectedComp: InstagramImage, service: 'instagram' })
            return (<InstagramSlideshow currentImage={post.images.standard_resolution.url} />)
        }
      }

      return (
        <InstagramWrapper>
          <StyledIcon icon={'instagram'} height={35} />
          {/*<InstagramBackground />*/}
          <Frame>
            <Ticker icon="instagram" slideShowKey={id}>
              <HeaderLevel>
                {post.location && <InstagramCaption>{post.location.name}</InstagramCaption>}
              </HeaderLevel>
              <HeaderLevel>
                <MetaTags tags={metaTags} />
              </HeaderLevel>
            </Ticker>
            <InstagramMedia>
              <TransitionWrapper>
                <FadingTransitionWrapper key={id}>
                  {mediaType()}
                </FadingTransitionWrapper>
              </TransitionWrapper>
            </InstagramMedia>
          </Frame>
          {/* <InstagramFrame post={post} slideShowKey={id} mediaType={type} /> */}
        </InstagramWrapper>
      )
    }
    return (
      <SplashScreen icon="instagram" service="Instagram" />
    )
  }
}

// Listen and capture any changes made as a result of the the actions below.
const mapStateToProps = state => ({
  posts: state.instagram.data.posts,
  status: state.instagram.data.status,
  slideshow: state.instagram.slideshow,
})

const mapDispatchToProps = dispatch => ({
  serviceRequest: () => dispatch(socketDataRequest({ service: 'INSTAGRAM', serverAction: 'pull', request: 'posts' })),
  startSlideshowLogic: max => dispatch(startSlideshowLogic('INSTAGRAM', max)),
})

InstagramContainer.propTypes = {
  serviceRequest: PropTypes.func,
  startSlideshowLogic: PropTypes.func,
  slideshow: PropTypes.object,
  posts: PropTypes.array,
  status: PropTypes.string,
}

InstagramContainer.defaultProps = {
  socketConnected: false,
  sonosRequest: false,
  slideshow: {},
  posts: [],
  status: '',
}

export default connect(mapStateToProps, mapDispatchToProps)(InstagramContainer)
