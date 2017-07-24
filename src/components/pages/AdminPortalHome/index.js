import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import styled from 'styled-components'
import { updatePlaylist, publishPlaylist, socketDataRequest } from 'store/actions'

import { AdminPortalTemplate, Button, ButtonWrapper, SortableComponent, Heading } from 'components'

const AdminLink = styled(Link)`
  text-decoration: none;
`
class adminPortalHome extends Component {

  resetPlaylist() {
    this.props.updateAdminPlaylist(JSON.parse(localStorage.getItem('playList')), true)
  }

  handlePusblish() {
    this.props.publishPlaylist()
    // this.props.serviceRequest({ playlist: this.props.playlist, overideQueue: false })
  }

  render() {
    return (
      <AdminPortalTemplate>
        <Heading level={3} >
          Playlist
        </Heading>
        <SortableComponent />
        {this.props.saved ? (
          <ButtonWrapper>
            <AdminLink to="admin-portal/add-video">
              <Button type="info" palette="primary">Add Video</Button>
            </AdminLink>
            <AdminLink to="admin-portal/add-image">
              <Button type="info" palette="primary">Add Image</Button>
            </AdminLink>
          </ButtonWrapper>
          ) : (
            <ButtonWrapper>
              <Button type="info" palette="secondary" onClick={this.resetPlaylist.bind(this)}>Cancel</Button>
              <Button
                type="info"
                palette="primary"
                onClick={this.handlePusblish.bind(this, false)}
              >
                Publish
              </Button>
            </ButtonWrapper>
        )}

      </AdminPortalTemplate>
    )
  }
}

const mapStateToProps = state => ({
  saved: state.admin.saved,
  playlist: state.admin.playlist,
})

const mapDispatchToProps = (dispatch) => ({
  updateAdminPlaylist: (updatedPlaylist, savedState) => dispatch(updatePlaylist(updatedPlaylist, savedState)),
  publishPlaylist: (overideQueue) => dispatch(publishPlaylist(overideQueue)),
  // serviceRequest: (playlistData) => dispatch(socketDataRequest({ service: 'ADMIN', serverAction: 'emit', request: 'newPlaylist', payload: playlistData })),
})

adminPortalHome.propTypes = {
  playlist: PropTypes.array,
  saved: PropTypes.bool,
  updateAdminPlaylist: PropTypes.func,
  publishPlaylist: PropTypes.func,
  // serviceRequest: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(adminPortalHome)
