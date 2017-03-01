import React, { Component, PropTypes } from 'react'
import styled from 'styled-components'

import { Icon } from 'components'

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

class InfoBlockHeader extends Component {

  constructor (props) {
    super(props)
  }

  componentDidMount () {
  }

  render () {
    const { children, icon } = this.props
    console.log('infoblockheader children', children)
    return (
      <HeaderWrapper>
        <StyledIcon icon={icon} size={35} />
        <MoreHeaderInfo>
          <Levels>
            {children}
          </Levels>
        </MoreHeaderInfo>
      </HeaderWrapper>
    )
  }
}

InfoBlockHeader.propTypes = {
  children: PropTypes.any,
  icon: PropTypes.string.isRequired
}

export default InfoBlockHeader
