import PropTypes from 'prop-types';
import React from 'react';
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
  display: block;
  position: relative;
  max-width: 1000px;
  width: 100%;
  height: calc(100vh - 2rem);
  border-radius: 10px;
  overflow: hidden;
  will-change: transform;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`

const AdminPortalTemplate = ({ children, ...props }) => {
  return (
    <Wrapper {...props}>
      <Content>{children}</Content>
    </Wrapper>
  )
}

AdminPortalTemplate.propTypes = {
  children: PropTypes.any.isRequired,
}

export default AdminPortalTemplate
