import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
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
`

const StyledIcon = styled(Icon)`
  z-index: 59;
  padding: .25rem;
  flex: 0 0 auto;
`

class Ticker extends Component {

  constructor (props) {
    super(props)
    this.state = {
      headerChange: false
    }

    this.tMax = new TimelineMax();

  }

  componentDidMount() {
  // this.circleWrappers = ReactDOM.findDOMNode(this._clockContainer);

    this._MoreHeaderInfo =
        ReactDOM.findDOMNode(this._MoreHeaderInfo);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.slideShowKey !== this.props.slideShowKey) {
      this.openAndClose()
      return true
    }
    return true
  }

  openAndClose () {
    clearTimeout(this.state.headerChange)

    this.setState({
      headerChange: setTimeout(() => this.revealHeader(), 2000)
    })
  }

  revealHeader () {
    clearTimeout(this.state.headerChange)

    this.tMax.to(this._MoreHeaderInfo, .75, {
      y: '-42px'
    })

    this.setState({
      headerChange: setTimeout(() => this.hideHeader(), 5000)
    })
  }

  hideHeader () {
    this.tMax.to(this._MoreHeaderInfo, .75, {
      y: '0px'
    })
  }

  render () {
    const { children, icon, slideShowKey } = this.props
    console.log('ticker slideShowKey', slideShowKey)
    return (
      <HeaderWrapper>
        <StyledIcon icon={icon} height={35} />
        <MoreHeaderInfo>
          <Levels
            innerRef={(el) => {
              this._MoreHeaderInfo = el;
            }}
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
  slideShowKey: PropTypes.any
}

export default Ticker
