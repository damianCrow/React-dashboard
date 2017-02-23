import React, { PropTypes } from 'react'
import styled from 'styled-components'

// import { Icon } from 'components'

import { fonts } from 'components/globals'

const SonosContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`

// const PlaybackIcon = styled.Icon`
//   display: absolute;
// `

// const StyledIcon = styled(Icon)`${iconStyles}`

const SonosContainer = ({ children, ...props, isFetching }) => {
  return (
    <SonosContainerStyled>
      {children}
    </SonosContainerStyled>
  )
}

SonosContainer.propTypes = {
  children: PropTypes.any,
  isFetching: PropTypes.bool.isRequired
}

export default SonosContainer
