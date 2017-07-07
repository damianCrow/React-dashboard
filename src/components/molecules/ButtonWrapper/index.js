import React from 'react'
import styled from 'styled-components'

const BtnWrapper = styled.div`
 position: relative;
 margin: 15px 0;
 width: calc(100% - 2rem);
 max-width: 700px;
 transform: translateX(-50%);
 left: 50%;
 display: block;
 text-align: center;
`

const ButtonWrapper = ({ children, ...props }) => {
  return (
    <BtnWrapper {...props}>
      {children}
    </BtnWrapper>
  )
}

export default ButtonWrapper
