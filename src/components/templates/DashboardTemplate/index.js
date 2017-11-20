import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  min-height: 1920px;
  box-sizing: border-box;
  padding-top: 9.375rem;
  overflow: hidden;
  height: 1920px;
  background: linear-gradient(to right, #00928f 0%, #50b848 100%);
  // cursor: url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7), auto;
`

const Content = styled.article`
  box-sizing: border-box;
  display: block;
  height: 100%;
  overflow: hidden;
  width: 100%;
`

const Header = styled.header`
  left: 0;
  position: fixed;
  top: 0;
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
