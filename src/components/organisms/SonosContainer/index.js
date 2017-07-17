import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components'

// import { Icon } from 'components'

import { fonts } from 'components/globals'

const SonosContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: black;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  font-family: ${fonts.primary};
`

const SonosContainer = ({ children, ...props, isFetching }) => {
  return (
    <SonosContainerStyled>
      {children}
    </SonosContainerStyled>
  )
}

SonosContainer.propTypes = {
  children: PropTypes.node,
}

export default SonosContainer
