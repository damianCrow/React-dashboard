import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  box-sizing: border-box;
  padding-top: 9.375rem;
  width: 1080px;
  overflow: hidden;
  height: 1920px;
  background: linear-gradient(to right, #00928f 0%, #50b848 100%);
  cursor: url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7), auto;
`

const Content = styled.article`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  width: 100%;
  overflow: hidden;
  will-change: transform;
`

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
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
