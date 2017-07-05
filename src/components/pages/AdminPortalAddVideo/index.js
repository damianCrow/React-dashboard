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
        Add A Video
      </Heading>
      <Field
        id="videoTitle"
        name="videoTitle"
        label="Video Title"
        type="text"
        placeholder="Enter Video Title Here"
      />
      <Field
        id="videoUrl"
        name="videoUrl"
        label="Video URL"
        type="text"
        placeholder="Paste Video URL Here"
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
