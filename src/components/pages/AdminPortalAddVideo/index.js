import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router'
import shortid from 'shortid'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { addEntryToPlaylist, overideQueue, publishPlaylist } from 'store/actions'
import { AdminPortalTemplate, Field, Button, ButtonWrapper, Heading, SwipableArea } from 'components'

const AdminLink = styled(Link)`
  text-decoration: none;
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

class AdminPortalAddVideoForm extends Component {

  onSubmit(e) {
    let serviceName

    if (e !== 'overide') {
      e.preventDefault()
    }

    if (this.videoTitle.value === '') {
      this.videoTitleError.style.display = 'block'
      return null
    }
    if (this.videoUrl.value === '') {
      this.videoUrlError.style.display = 'block'
      return null
    }

    if (this.videoUrl.value.search('youtu') > 0) {
      serviceName = 'youtube'
    } else if (this.videoUrl.value.search('vimeo') > 0) {
      serviceName = 'vimeo'
    } else {
      serviceName = ''
    }

    const newObj = {
      id: shortid.generate(),
      type: 'Video',
      title: this.videoTitle.value,
      url: this.videoUrl.value,
      serviceName,
      serviceId: this.videoUrl.value
      .replace(/\\/g, '/')
      .replace(/.*\//, '')
      .replace(/#.*/, '')
      .replace(/(.*\?v=|\?version=.*)/, ''),
    }
    if (e === 'overide') {
      this.props.overideQueue(newObj)
      this.props.publishPlaylist(true)
    } else {
      this.props.addEntryToPlaylist(newObj)
    }
    history.go(-1)
  }

  Onchange(e) {
    switch (e.target.getAttribute('aria-describedby')) {
      case 'videoTitleError':
        this.videoTitleError.style.display = 'none'
        break
      case 'videoUrlError':
        this.videoUrlError.style.display = 'none'
        break
      default: null
    }
  }

  render() {
    return (
      <AdminPortalTemplate>
        <Heading level={6}>
          Add A Video
        </Heading>
        <form method="post" encType="multipart/form-data" onSubmit={this.onSubmit.bind(this)}>
          <Field
            innerRef={(videoTitle) => { this.videoTitle = videoTitle }}
            name="videoTitle"
            label="Video Title"
            type="text"
            placeholder="Enter Video Title Here"
            onChange={this.Onchange.bind(this)}
          />
          <EleError innerRef={(videoTitleError) => { this.videoTitleError = videoTitleError }} className="error" id="videoTitleError"> A Title for the video is required!</EleError>
          <Field
            innerRef={(videoUrl) => { this.videoUrl = videoUrl }}
            name="videoUrl"
            label="Video URL"
            type="text"
            placeholder="Paste Video URL Here"
            onChange={this.Onchange.bind(this)}
          />
          <EleError innerRef={(videoUrlError) => { this.videoUrlError = videoUrlError }} className="error" id="videoUrlError"> A video URL is required!</EleError>
          <ButtonWrapper>
            <Button type="submit" palette="primary">Add Video</Button>
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

AdminPortalAddVideoForm.propTypes = {
  addEntryToPlaylist: PropTypes.func,
  publishPlaylist: PropTypes.func,
  overideQueue: PropTypes.func,
}

const mapDispatchToProps = (dispatch) => ({
  addEntryToPlaylist: (newObj) => dispatch(addEntryToPlaylist(newObj)),
  overideQueue: (newObj) => dispatch(overideQueue(newObj)),
  publishPlaylist: (overideQueue) => dispatch(publishPlaylist(overideQueue)),
})

export default connect(null, mapDispatchToProps)(AdminPortalAddVideoForm)

