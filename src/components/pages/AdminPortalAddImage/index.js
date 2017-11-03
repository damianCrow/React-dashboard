import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import shortid from 'shortid'
import { connect } from 'react-redux'
import { imageUploaded, addEntryToPlaylist, uploadAndOverideQueue, overideQueue, publishPlaylist, socketDataRequest } from 'store/actions'
import { AdminPortalTemplate, Field, ButtonWrapper, Button, Heading, SwipableArea } from 'components'

const AdminLink = styled(Link)`
  text-decoration: none;
`
const HeadingWrapper = styled.div`
 margin: -5px 0 -20px 0;
`
const EleError = styled.div`
 margin: 0 27.5px;
 width: calc(100% - 55px);
 display: none;
 font-family: Helvetica Neue, Helvetica, Roboto, sans-serif;
 color: darkred;
 font-size: 3.29vw;
 text-align: center;
`
class AdminPortalAddImageForm extends Component {

  onSubmit(e) {
    if (e !== 'overide') {
      e.preventDefault()
    }

    if (this.imageTitle.value === '') {
      this.imageTitleError.style.display = 'block'
      return null
    }

    if (this.imageUpload.files.length < 1 && this.imageUrl.value === '') {
      this.imageUrlError.style.display = 'block'
      this.imageUploadError.style.display = 'block'
      return null
    }

    if (this.imageUpload.files.length > 0) {
      const formData = new FormData()
      formData.append('imageUpload', this.imageUpload.files[0])
      formData.append('imageTitle', this.imageTitle.value)
      formData.append('imageUrl', this.imageUrl.value)
      fetch('/admin/upload', {
        method: 'post',
        body: formData,
      }).then(response => response.json()).then((data) => {
        const newObj = {
          id: shortid.generate(),
          hidden: false,
          type: 'Image',
          title: data.imageTitle,
          url: data.imagePath,
          preview: data.preview,
          serviceId: '',
          serviceName: '',
        }
        if (e === 'overide') {
          this.props.uploadAndOverideQueue(newObj)
          this.props.publishPlaylist(true)
        } else {
          this.props.imageUploaded(newObj)
        }
      })
    } else {
      const newObj = {
        id: shortid.generate(),
        hidden: false,
        type: 'Image',
        title: this.imageTitle.value,
        url: this.imageUrl.value,
        serviceId: '',
        serviceName: '',
      }
      if (e === 'overide') {
        this.props.overideQueue(newObj)
        this.props.publishPlaylist(true)
      } else {
        this.props.addEntryToPlaylist(newObj)
      }
    }
    return history.back()
  }

  Onchange(e) {
    const elemArray = []
    switch (e.target.getAttribute('aria-describedby')) {
      case 'imageTitleError':
        elemArray.push(this.imageTitleError)
        break
      case 'imageUrlError':
        elemArray.push(this.imageUploadError, this.imageUrlError)
        break
      case 'imageUploadError':
        elemArray.push(this.imageUploadError, this.imageUrlError)
        break
      default: null
    }
    elemArray.forEach((elem) => {
      elem.style.display = 'none'
    })
  }

  goBack() {
    this.props.history.goBack()
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
            onChange={this.Onchange.bind(this)}
          />
          <EleError innerRef={(imageTitleError) => { this.imageTitleError = imageTitleError }} className="error" id="imageTitleError"> A Title for the image is required!</EleError>
          <Field
            innerRef={(imageUpload) => { this.imageUpload = imageUpload }}
            name="imageUpload"
            label="Choose Image"
            type="file"
            accept=".jpg, .png, .gif, .webp"
            onChange={this.Onchange.bind(this)}
          />
          <EleError innerRef={(imageUploadError) => { this.imageUploadError = imageUploadError }} className="error"> Please upload an image or provide an image URL </EleError>
          <HeadingWrapper><Heading level={6} >Or</Heading></HeadingWrapper>
          <Field
            innerRef={(imageUrl) => { this.imageUrl = imageUrl }}
            name="imageUrl"
            label="Image URL"
            type="text"
            placeholder="Paste Image URL Here"
            onChange={this.Onchange.bind(this)}
          />
          <EleError innerRef={(imageUrlError) => { this.imageUrlError = imageUrlError }} className="error"> Please upload an image or provide an image URL </EleError>
          <ButtonWrapper>
            <Button type="submit" palette="primary">Upload Image</Button>
            <AdminLink to="/admin-portal">
              <Button onClick={this.goBack.bind(this)} type="reset" palette="secondary">Cancel</Button>
            </AdminLink>
          </ButtonWrapper>
        </form>
        <SwipableArea swipedUp={this.onSubmit.bind(this, 'overide')}>Swipe up to overide queue</SwipableArea>
      </AdminPortalTemplate>
    )
  }
}

const mapStateToProps = state => ({
  filesArray: state.admin.uploadedFiles,
  currentPlaylist: state.admin.currentPlaylist,
})

AdminPortalAddImageForm.propTypes = {
  imageUploaded: PropTypes.func,
  addEntryToPlaylist: PropTypes.func,
  overideQueue: PropTypes.func,
  uploadAndOverideQueue: PropTypes.func,
  publishPlaylist: PropTypes.func,
  serviceRequest: PropTypes.func,
}

const mapDispatchToProps = (dispatch) => ({
  imageUploaded: (newImageObj) => dispatch(imageUploaded(newImageObj)),
  serviceRequest: (newPlaylist) => dispatch(socketDataRequest({ service: 'ADMIN', request: 'pushPlaylistToFront', payload: newPlaylist })),
  addEntryToPlaylist: (entryObj) => dispatch(addEntryToPlaylist(entryObj)),
  uploadAndOverideQueue: (newImageObj) => dispatch(uploadAndOverideQueue(newImageObj)),
  overideQueue: (newObj) => dispatch(overideQueue(newObj)),
  publishPlaylist: (overideQueue) => dispatch(publishPlaylist(overideQueue)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminPortalAddImageForm))
