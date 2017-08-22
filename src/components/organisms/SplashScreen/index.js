import PropTypes from 'prop-types'
import React from 'react'
import styled, { css } from 'styled-components'

import { Icon, Link, Paragraph } from 'components'

import { fonts } from 'components/globals'

const styles = ({ ...props }) => css`
  align-items: center;
  background-size: cover;
  color: black;
  display: flex;
  flex-direction: column;
  font-family: ${fonts.primary};
  font-style: normal;
  font-weight: 300;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  text-align: left;
  top: 0;
  padding: 1rem;
  width: 100%;
  box-sizing: border-box;
`

const LoadingMessage = styled.span`
  font-family: ${fonts.primary};
  color: white;
  margin: 1rem;
  flex: 1;
`

const StyledIcon = styled(Icon)`
  flex: 3;
  max-width: 100px;
  width: auto;
  height: auto;
  margin: 0;
`

const SplashScreenContainer = styled.div`${styles}`

const SplashScreen = ({ children, ...props, icon, service }) => {
  return (
    <SplashScreenContainer>
      <StyledIcon {...props} icon={icon} fillColor="#fff" height={100} />
      <LoadingMessage>Loading {service}</LoadingMessage>
    </SplashScreenContainer>
  )
}

SplashScreen.propTypes = {
  children: PropTypes.any,
  icon: PropTypes.string,
  service: PropTypes.string,
}

export default SplashScreen
