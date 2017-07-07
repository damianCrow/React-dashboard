import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import shortid from 'shortid'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { addEntryToPlaylist } from 'store/actions'
import { AdminPortalTemplate, Field, Button, ButtonWrapper, Heading } from 'components'

const AdminLink = styled(Link)`
  text-decoration: none;
`
class AdminPortalAddVideoForm extends Component {

  onSubmit(e) {
    e.preventDefault()
    const newEntryObj = {
      id: shortid.generate(),
      type: 'Video',
      title: this.videoTitle.value,
      url: this.videoUrl.value,
      serviceId: this.videoUrl.value
      .replace(/\\/g, '/')
      .replace(/.*\//, '')
      .replace(/#.*/, '')
      .replace(/(.*\?v=|\?version=.*)/, ''),
    }
    this.props.addEntryToPlaylist(newEntryObj)
    history.go(-1)
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
            required
          />
          <Field
            innerRef={(videoUrl) => { this.videoUrl = videoUrl }}
            name="videoUrl"
            label="Video URL"
            type="text"
            placeholder="Paste Video URL Here"
            required
          />
          <ButtonWrapper>
            <Button type="submit" palette="primary">Add Video</Button>
            <AdminLink to="/admin-portal">
              <Button type="reset" palette="secondary">Cancel</Button>
            </AdminLink>
          </ButtonWrapper>
        </form>
      </AdminPortalTemplate>
    )
  }
}

AdminPortalAddVideoForm.propTypes = {
  addEntryToPlaylist: PropTypes.func,
}

const mapDispatchToProps = (dispatch) => ({
  addEntryToPlaylist: (newEntryObj) => dispatch(addEntryToPlaylist(newEntryObj)),
})

export default connect(null, mapDispatchToProps)(AdminPortalAddVideoForm)

