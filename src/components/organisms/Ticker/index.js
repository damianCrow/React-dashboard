import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import { Icon } from 'components'

import { TweenMax } from 'gsap'

const HeaderWrapper = styled.header`
  display: flex;
  overflow: hidden;
  align-items: center;
  position: relative;
  width: 100%;
  flex: 0 1 auto;
  align-items: stretch;
  z-index: 2;
`

const MoreHeaderInfo = styled.div`
  flex-direction: column;
  overflow: hidden;
  position: relative;
  align-items: center;
  flex: 1 1 100%;
`

const Levels = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  flex-direction: row;
  flex-wrap: wrap;
  transition: transform .75s ease-in-out;
`

const StyledIcon = styled(Icon)`
  z-index: 59;
  padding: .25rem;
  flex: 0 0 auto;
`

class Ticker extends Component {

  constructor(props) {
    super(props)
    this.state = {
      headerChange: false,
      headerPos: '0',
    }
    this.tMax = new TimelineMax()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.slideShowKey !== this.props.slideShowKey) {
      this.openAndClose()
    }
  }

  openAndClose() {
    clearTimeout(this.state.headerChange)

    this.setState({
      headerChange: setTimeout(() => this.revealHeader(), 2000),
    })
  }

  revealHeader() {
    clearTimeout(this.state.headerChange)

    this.setState({
      headerPos: '-42'
    })

    this.setState({
      headerChange: setTimeout(() => this.hideHeader(), 5000),
    })
  }

  hideHeader() {
    this.setState({
      headerPos: '0'
    })
  }

  render() {
    const { children, icon } = this.props
    const { headerPos } = this.state
    return (
      <HeaderWrapper>
        <StyledIcon icon={icon} height={35} />
        <MoreHeaderInfo>
          <Levels
            innerRef={(el) => {
              this.moreHeaderInfo = el
            }}
            style={{ transform: `translateY(${headerPos}px)` }}
          >
            {children}
          </Levels>
        </MoreHeaderInfo>
      </HeaderWrapper>
    )
  }
}

Ticker.propTypes = {
  children: PropTypes.any,
  icon: PropTypes.string.isRequired,
  slideShowKey: PropTypes.any,
}

export default Ticker
