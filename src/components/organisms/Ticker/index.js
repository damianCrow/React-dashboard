import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'

import { Icon } from 'components'

const HeaderWrapper = styled.header`
  display: block;
  overflow: hidden;
  position: relative;
  width: 100%;
  flex: 0 1 auto;
  align-items: stretch;
  z-index: 2;
  box-sizing: border-box;
  opacity: .5;
`

const MoreHeaderInfo = styled.div`
  flex-direction: column;
  overflow: hidden;
  position: relative;
  align-items: center;
  width: 100%;
  min-height: 50px;
  display: flex;
`

const Levels = styled.div`
  display: block;
  flex-direction: column;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  position: absolute;
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
      headerPos: '-50',
    })

    this.setState({
      headerChange: setTimeout(() => this.hideHeader(), 5000),
    })
  }

  hideHeader() {
    this.setState({
      headerPos: '0',
    })
  }

  render() {
    const { children, icon } = this.props
    const { headerPos } = this.state
    return (
      <HeaderWrapper>
        { /* <StyledIcon icon={icon} height={35} /> */ }
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
  icon: PropTypes.string,
  slideShowKey: PropTypes.any,
}

export default Ticker
