import React, { PropTypes } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  box-sizing: border-box;
  background: linear-gradient(to right,  #00928f 0%, #50b848 100%);
  padding: 1rem;
`

const Content = styled.section`
  width: 100%;
  box-sizing: border-box;
`

const DashboardTemplate = ({ children, ...props }) => {
  return (
    <Wrapper {...props}>
      <Content>{children}</Content>
    </Wrapper>
  )
}

DashboardTemplate.propTypes = {
  children: PropTypes.any.isRequired
}

export default DashboardTemplate
