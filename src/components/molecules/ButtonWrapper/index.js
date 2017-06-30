import React, { PropTypes } from 'react'
import styled, { css } from 'styled-components'
import { Button } from 'components'

const BtnWrapper = styled.div`
 position:absolute;
 bottom: 15px;
 max-width: 700px;
`

const ButtonWrapper = () => {
  return (
    <BtnWrapper>
      <Button type="info" palette="secondary">Add Video</Button>
      <Button type="info" palette="primary">Add Image</Button>
    </BtnWrapper>
  )
}

export default ButtonWrapper
