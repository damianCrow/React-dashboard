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
        id="imageTitle"
        name="imageTitle"
        label="Image Title"
        type="text"
        placeholder="Enter Image Title Here"
      />
      <Field
        id="imageUpload"
        name="imageUpload"
        label="Choose Image"
        type="file"
      />
      <Heading level={6} >Or</Heading>
      <Field
        id="imageUrl"
        name="imageUrl"
        label="Image URL"
        type="text"
        placeholder="Paste Image URL Here"
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
