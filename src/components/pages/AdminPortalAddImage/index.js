import React from 'react'
import { Link } from 'react-router'
import styled from 'styled-components'
import { AdminPortalTemplate, Field, ButtonWrapper, Button, Heading } from 'components'

const AdminLink = styled(Link)`
  text-decoration: none;
`

const AdminPortalAddImageForm = () => {
  return (
    <AdminPortalTemplate>
      <Heading level={6} >
        Upload An Image
      </Heading>
      <Field
        name="imageTitle"
        label="Enter Image Title"
        type="text"
      />
      <Field
        name="imageTitle"
        label="Choose Image"
        type="file"
      />
      <ButtonWrapper>
        <Button type="submit" palette="primary">Upload Image</Button>
        <AdminLink to="/admin-portal">
          <Button type="reset" palette="secondary">Cancel</Button>
        </AdminLink>
      </ButtonWrapper>
    </AdminPortalTemplate>
  )
}

export default AdminPortalAddImageForm
