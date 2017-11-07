import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { fonts } from 'components/globals'
import { startSlideshowLogic, socketDataRequest } from 'store/actions'
import { InstagramFrame, Pagination, SplashScreen, Icon, MetaTags, Ticker, InstagramBackground } from 'components'

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
  contain: strict;
`

const BottomMeta = styled.div`
  align-items: center;
  bottom: 0;
  box-sizing: border-box;
  display: flex;
  left: 0;
  padding: .25rem;
  position: absolute;
  width: 100%;
`

const StyledIcon = styled(Icon)`
  z-index: 59;
  padding: .25rem;
  flex: 0 0 auto;
  opacity: .5;
  display: flex;
`

// Frame

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


class InstagramContainer extends PureComponent {
  componentDidMount() {
    this.props.serviceRequest()
  }

  componentWillReceiveProps(nextProps) {
    if ((this.props.status !== nextProps.status) && nextProps.status === 'success') {
      nextProps.startSlideshowLogic(nextProps.posts.length)
    }
  }

  // shouldComponentUpdate(nextProps) {
  //   if (this.props.slideshow.status === 'ready') {
  //     if (nextProps.posts[nextProps.slideshow.current].id === this.props.posts[this.props.slideshow.current].id) {
  //       return false
  //     }
  //   }

  //   return true
  // }

  render() {
    const isEmpty = this.props.posts.length === 0

    if (!isEmpty && this.props.slideshowStatus === 'ready') {
      const post = this.props.posts[this.props.current]

      const metaTags = [
        { icon: 'heart', metaInfo: post.likes.count },
        { icon: 'comment', metaInfo: post.comments.count },
      ]

      return (
        <InstagramWrapper>
          <InstagramBackground />
          <Frame>
            <Ticker icon="instagram" slideShowKey={post.id}>
              <HeaderLevel>
                {post.location && <InstagramCaption>{post.location.name}</InstagramCaption>}
              </HeaderLevel>
              <HeaderLevel>
                <MetaTags tags={metaTags} />
              </HeaderLevel>
            </Ticker>
            <InstagramFrame />
          </Frame>
          <BottomMeta>
            <StyledIcon icon={'instagram'} height={35} />
            {(post.type === 'carousel') && <Pagination
              total={this.props.carousel.max}
              active={this.props.carousel.current}
            />}
          </BottomMeta>
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
  current: state.instagram.slideshow.current,
  slideshowStatus: state.instagram.slideshow.status,
  carousel: state.instagram.slideshow.carousel,
})

const mapDispatchToProps = dispatch => ({
  serviceRequest: () => dispatch(socketDataRequest({ service: 'INSTAGRAM', serverAction: 'pull', request: 'posts' })),
  startSlideshowLogic: max => dispatch(startSlideshowLogic('INSTAGRAM', max)),
})

InstagramContainer.propTypes = {
  serviceRequest: PropTypes.func,
  startSlideshowLogic: PropTypes.func,
  slideshowStatus: PropTypes.string,
  posts: PropTypes.array,
  status: PropTypes.string,
  current: PropTypes.number,
  carousel: PropTypes.object,
}

InstagramContainer.defaultProps = {
  socketConnected: false,
  sonosRequest: false,
  slideshow: {},
  posts: [],
  status: '',
}

export default connect(mapStateToProps, mapDispatchToProps)(InstagramContainer)
