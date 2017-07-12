import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import shortid from 'shortid'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { addEntryToPlaylist, overideQueue, publishPlaylist } from 'store/actions'
import { AdminPortalTemplate, Field, Button, ButtonWrapper, Heading, SwipableArea } from 'components'

const AdminLink = styled(Link)`
  text-decoration: none;
`
class AdminPortalAddVideoForm extends Component {

  onSubmit(e) {
    if (e !== 'overide') {
      e.preventDefault()
    }
    const newObj = {
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
    if (e === 'overide') {
      this.props.overideQueue(newObj)
      this.props.publishPlaylist()
    } else {
      this.props.addEntryToPlaylist(newObj)
    }
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
  publishPlaylist: () => dispatch(publishPlaylist()),
})

export default connect(null, mapDispatchToProps)(AdminPortalAddVideoForm)

