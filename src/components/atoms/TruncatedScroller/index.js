import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
import PropTypes from 'prop-types'
import shortid from 'shortid'

const Truncated = styled.span`
  overflow: hidden;
  box-sizing: border-box;
`
const TruncatedChild = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
`

class TruncatedScroller extends Component {

  constructor(props) {
    super(props)
    this.animateIfTrincated = this.animateIfTrincated.bind(this)
    this.state = {
      elementsWithEventListeners: {},
    }
  }

  componentDidMount() {
    this.animateIfTrincated()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.animateIfTrincated()
    }
  }

  animateIfTrincated() {
    let animationduration
    let animationdelay

    if (this.scrollerChild.scrollWidth > this.scrollerChild.clientWidth) {
      this.scrollerChild.style.width = `${this.scroller.clientWidth}px`

      const animateTruncated = keyframes`
        0% {
          transform: translateX(0px);
          overflow: visible;
        }
        40% {transform: translateX(-${this.scrollerChild.scrollWidth - (this.scroller.clientWidth / 1.01)}px);}
        60% {transform: translateX(-${this.scrollerChild.scrollWidth - (this.scroller.clientWidth / 1.01)}px);}
        100% {
          transform: translateX(0px);
          overflow: visible;
        } 
      `
      if (this.props.durationInSeconds) {
        animationduration = `${(this.props.durationInSeconds / 10) + this.props.durationInSeconds}s`
      }
      if (!this.props.durationInSeconds) {
        animationduration = `${this.scrollerChild.scrollWidth / 40}s`
      }
      if (this.props.delayInSeconds) {
        animationdelay = this.props.delayInSeconds
      } else {
        animationdelay = 10
      }
      const childEle = this.scrollerChild
      const animation = `${animateTruncated} ${animationduration} linear`
      this.animate(childEle, animation, this.scrollerChild.id, animationdelay)
    }
  }

  animate(ele, animation, eleId, animationdelay) {
    const animate = setTimeout(() => {
      ele.style.animation = animation

      if (!this.state.elementsWithEventListeners.eleId) {
        ele.addEventListener('animationend', () => {
          this.setState({ elementsWithEventListeners: { eleId } })
          ele.style.animation = ''
          this.animateIfTrincated()
          clearTimeout(animate)
        })
      }
    }, animationdelay * 1000)
  }

  render() {
    const { children, className } = this.props
    return (
      <Truncated innerRef={parent => { this.scroller = parent }} className={className}>
        <TruncatedChild id={shortid.generate()} innerRef={child => { this.scrollerChild = child }}>{children}</TruncatedChild>
      </Truncated>
    )
  }
}

TruncatedScroller.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  durationInSeconds: PropTypes.number,
  delayInSeconds: PropTypes.number,
}

export default TruncatedScroller
