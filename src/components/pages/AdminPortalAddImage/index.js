import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import styled from 'styled-components'
import shortid from 'shortid'
import { connect } from 'react-redux'
import { uploadImage, addEntryToPlaylist } from 'store/actions'
import { AdminPortalTemplate, Field, ButtonWrapper, Button, Heading } from 'components'

const AdminLink = styled(Link)`
  text-decoration: none;
`

class AdminPortalAddImageForm extends Component {

  onSubmit(e) {
    e.preventDefault()
    if (this.imageUpload.files.length > 0) {
      const formData = new FormData()
      formData.append('imageUpload', this.imageUpload.files[0])
      formData.append('imageTitle', this.imageTitle.value)
      formData.append('imageUrl', this.imageUrl.value)
      this.props.uploadImage(formData)
    } else {
      const newEntryObj = {
        id: shortid.generate(),
        type: 'Image',
        title: this.imageTitle.value,
        url: this.imageUrl.value,
        serviceId: '',
      }
      this.props.addEntryToPlaylist(newEntryObj)
    }
    history.go(-1)
  }

  render() {
    return (
      <AdminPortalTemplate>
        <Heading level={6} >
          Upload An Image
        </Heading>
        <form method="post" encType="multipart/form-data" onSubmit={this.onSubmit.bind(this)}>
          <Field
            innerRef={(imageTitle) => { this.imageTitle = imageTitle }}
            name="imageTitle"
            label="Image Title"
            type="text"
            placeholder="Enter Image Title Here"
            required
          />
          <Field
            innerRef={(imageUpload) => { this.imageUpload = imageUpload }}
            name="imageUpload"
            label="Choose Image"
            type="file"
            accept=".jpg, .png, .gif, .webp"
          />
          <Heading level={6} >Or</Heading>
          <Field
            innerRef={(imageUrl) => { this.imageUrl = imageUrl }}
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
        </form>
      </AdminPortalTemplate>
    )
  }
}

const mapStateToProps = state => ({
  filesArray: state.admin.uploadedFiles,
})

AdminPortalAddImageForm.propTypes = {
  uploadImage: PropTypes.func,
  addEntryToPlaylist: PropTypes.func,
}

const mapDispatchToProps = (dispatch) => ({
  uploadImage: (formData) => dispatch(uploadImage(formData)),
  addEntryToPlaylist: (entryObj) => dispatch(addEntryToPlaylist(entryObj)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminPortalAddImageForm)
