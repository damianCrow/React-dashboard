import React, { PropTypes } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  box-sizing: border-box;
  background: linear-gradient(to right, #00928f 0%, #50b848 100%);
  padding: 1rem;
`

const Content = styled.article`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  max-width: 1000px;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  margin-left: -1rem;
`

const Intro = styled.section`
  position: relative;
  display: block;
`

const DashboardTemplate = ({ header, intro, children, ...props }) => {
  return (
    <Wrapper {...props}>
      <Header>{header}</Header>
      {intro && <Intro>{intro}</Intro>}
      <Content>{children}</Content>
    </Wrapper>
  )
}

DashboardTemplate.propTypes = {
  header: PropTypes.any.isRequired,
  intro: PropTypes.any,
  children: PropTypes.any.isRequired,
}

export default DashboardTemplate
