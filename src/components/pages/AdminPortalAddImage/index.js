import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import styled from 'styled-components'
import shortid from 'shortid'
import { connect } from 'react-redux'
import { imageUploaded, addEntryToPlaylist, uploadAndOverideQueue, overideQueue, publishPlaylist } from 'store/actions'
import { AdminPortalTemplate, Field, ButtonWrapper, Button, Heading, SwipableArea } from 'components'

const AdminLink = styled(Link)`
  text-decoration: none;
`
const HeadingWrapper = styled.div`
 margin: -5px 0 -20px 0;
`
class AdminPortalAddImageForm extends Component {

  onSubmit(e) {
    if (e !== 'overide') {
      e.preventDefault()
    }
    if (this.imageUpload.files.length > 0) {
      const formData = new FormData()
      formData.append('imageUpload', this.imageUpload.files[0])
      formData.append('imageTitle', this.imageTitle.value)
      formData.append('imageUrl', this.imageUrl.value)
      fetch('/admin/upload', {
        method: 'post',
        body: formData,
      }).then((response) => response.json()).then((data) => {
        const newObj = {
          id: shortid.generate(),
          type: 'Image',
          title: data.imageTitle,
          url: data.imagePath,
          serviceId: '',
        }
        if (e === 'overide') {
          this.props.uploadAndOverideQueue(newObj)
          this.props.publishPlaylist()
        } else {
          this.props.imageUploaded(newObj)
        }
      })
    } else {
      const newObj = {
        id: shortid.generate(),
        type: 'Image',
        title: this.imageTitle.value,
        url: this.imageUrl.value,
        serviceId: '',
      }
      if (e === 'overide') {
        this.props.overideQueue(newObj)
        this.props.publishPlaylist()
      } else {
        this.props.addEntryToPlaylist(newObj)
      }
    }
    history.back()
  }

  render() {
    return (
      <AdminPortalTemplate>
        <Heading level={6} >
          Upload Or Add An Image
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
          <HeadingWrapper><Heading level={6} >Or</Heading></HeadingWrapper>
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
        <SwipableArea swipedUp={this.onSubmit.bind(this, 'overide')} />
      </AdminPortalTemplate>
    )
  }
}

const mapStateToProps = state => ({
  filesArray: state.admin.uploadedFiles,
})

AdminPortalAddImageForm.propTypes = {
  imageUploaded: PropTypes.func,
  addEntryToPlaylist: PropTypes.func,
  overideQueue: PropTypes.func,
  uploadAndOverideQueue: PropTypes.func,
  publishPlaylist: PropTypes.func,
}

const mapDispatchToProps = (dispatch) => ({
  imageUploaded: (newImageObj) => dispatch(imageUploaded(newImageObj)),
  addEntryToPlaylist: (entryObj) => dispatch(addEntryToPlaylist(entryObj)),
  uploadAndOverideQueue: (newImageObj) => dispatch(uploadAndOverideQueue(newImageObj)),
  overideQueue: (newObj) => dispatch(overideQueue(newObj)),
  publishPlaylist: () => dispatch(publishPlaylist()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminPortalAddImageForm)
