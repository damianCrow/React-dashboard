import React, { PropTypes, Component } from 'react'
import styled from 'styled-components'
import ReactDOM from 'react-dom'

import { fonts } from 'components/globals'

import theaterJS from 'theaterjs/dist/theater.js'
import { TweenMax } from 'gsap'

const TweetAndBack = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  left: 0;
`

const TweetWrapper = styled.div`
  position: absolute;
  padding: 1rem;
  top: 0;
  width: calc(100% - 2rem);
  height: calc(100% - 2rem);
  font-family: ${fonts.primary};
  color: white;
  font-size: 1.5rem;
  left: 0;
`

class Tweet extends Component {
  constructor(props) {
    super(props)
    this.theater =
      theaterJS({ minSpeed: { erase: 10, type: 50 }, maxSpeed: { erase: 25, type: 75 } })

    this.theater
      .on('type:start, erase:start', () => {
        // add a class to actor's dom element when he starts typing/erasing
        const actor = this.theater.getCurrentActor()
        actor.$element.classList.add('is-typing')
      })
      .on('type:end, erase:end', () => {
        // and then remove it when he's done
        const actor = this.theater.getCurrentActor()
        actor.$element.classList.remove('is-typing')
      })
  }

  componentDidMount() {
    const { allTweetDetails } = this.props
    // console.log('allTweetDetails', allTweetDetails)
    // console.log('this._tweetText', this._tweetText)

    this._tweetText.id = `tweet-${allTweetDetails.id_str}`

    this._tweetText.setAttribute('id', `tweet-${allTweetDetails.id_str}`)

    this.tweetId = `tweet-${allTweetDetails.id_str}`

    this.theater
      .addActor(this.tweetId)
  }

  // componentWillAppear (callback) {
  //   callback()
  //   console.log('will appear')
  // }

  componentWillEnter(callback) {
    // const el = ReactDOM.findDOMNode(this)
    // TweenMax.fromTo(el, 1, {opacity: 0}, {opacity: 1, onComplete: callback})
    this.startTyping(callback)
  }

  componentWillLeave(callback) {
    // const el = ReactDOM.findDOMNode(this)
    this.removeType(callback)
    // TweenMax.fromTo(el, 1, {opacity: 1}, {opacity: 0, onComplete: callback})
  }

  startTyping(callback) {
    const { allTweetDetails } = this.props
    this.theater
      .addScene(3500)
      .addScene(`${this.tweetId}:${allTweetDetails.text}`, 100)
      .addScene((done) => {
        callback()
        done()
      })
  }

  removeType(callback) {
    this.theater
      .addScene(`${this.tweetId}: `, 50)
      .addScene((done) => {
        callback()
        done()
      })
  }

  render() {
    const { allTweetDetails } = this.props
    return (
      <TweetAndBack>
        <TweetWrapper>
          <span ref={(el) => { this._tweetText = el }} />
        </TweetWrapper>
      </TweetAndBack>
    )
  }
}

Tweet.propTypes = {
  allTweetDetails: PropTypes.object,
}

export default Tweet

