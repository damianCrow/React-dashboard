import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'

import { fonts } from 'components/globals'
import { SlideshowLogic } from 'hoc'

import theaterJS from 'theaterjs/dist/theater'

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
  font-size: 2rem;
  left: 0;
`

function stripLinks(tweetText) {
  return tweetText.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '')
}

class Tweet extends Component {
  constructor(props) {
    super(props)
    this.theater =
      theaterJS({ minSpeed: { erase: 10, type: 35 }, maxSpeed: { erase: 25, type: 50 } })

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

    this.state = {
      removeing: false,
    }
  }

  componentDidMount() {
    const { allTweetDetails } = this.props

    this.tweetText.id = `tweet-${allTweetDetails.id_str}`

    this.tweetText.setAttribute('id', `tweet-${allTweetDetails.id_str}`)

    this.tweetId = `tweet-${allTweetDetails.id_str}`

    this.theater
      .addActor(this.tweetId)

    this.startTyping()
  }

  componentWillUnmount() {
    if (!this.state.removeing) {
      this.removeType()
    }
  }

  startTyping() {
    const { allTweetDetails } = this.props
    this.theater
      .addScene(500)
      .addScene(`${this.tweetId}:${stripLinks(allTweetDetails.text)}`, 100)
      .addScene((done) => {
        done()
        setTimeout(() => {
          if (!this.state.removeing) {
            this.removeType()
          }
        }, 8500)
      })
  }

  removeType() {
    this.setState({
      removeing: true,
    })

    this.theater
      .addScene(`${this.tweetId}: `, 50)
      .addScene((done) => {
        done()
        this.props.nextComponent()
      })
  }

  render() {
    return (
      <TweetAndBack>
        <TweetWrapper>
          <span ref={(el) => { this.tweetText = el }} />
        </TweetWrapper>
      </TweetAndBack>
    )
  }
}

Tweet.propTypes = {
  allTweetDetails: PropTypes.object,
  nextComponent: PropTypes.func.isRequired,
}

export default SlideshowLogic({ connectedComp: Tweet, service: 'twitter', timeout: false })
