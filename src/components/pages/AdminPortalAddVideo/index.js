import React from 'react'
import { Link } from 'react-router'
import styled from 'styled-components'
import { AdminPortalTemplate, Field, Button, ButtonWrapper, Heading } from 'components'

const AdminLink = styled(Link)`
  text-decoration: none;
`
const AdminPortalAddVideoForm = () => {
  return (
    <AdminPortalTemplate>
      <Heading level={6}>
        Add A video
      </Heading>
      <Field name="videoTitle"
             label="Enter Video Title"
             type="text"
      />
      <Field name="videoUrl"
             label="Enter Video URL"
             type="text"
      />
      <ButtonWrapper>
        <Button type="submit" palette="primary">Add Video</Button>
        <AdminLink to="/admin-portal">
          <Button type="reset" palette="secondary">Cancel</Button>
        </AdminLink>
      </ButtonWrapper>
    </AdminPortalTemplate>
  )
}

export default AdminPortalAddVideoForm
