import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { updatePlaylist, publishPlaylist, savePlaylist } from 'store/actions'

import { AdminPortalTemplate, Button, ButtonWrapper, SortableComponent, Heading, SwipableArea } from 'components'

const AdminLink = styled(Link)`
  text-decoration: none;
`
const BtnWrapper = styled(ButtonWrapper)`
 margin-bottom: 0;
`
class AdminPortalPlaylistView extends Component {
  // PLAYLIST GETS FETCHED IN SORTABLELIST COMPONENT \\
  resetPlaylist() {
    this.props.updateAdminPlaylist(this.props.allAvailablePlaylists.filter(playlist => playlist.id === this.props.match.params.playlistId)[0].data, true)
  }

  handlePusblish(playlist, overideState) {
    this.props.publishPlaylist(playlist, overideState)
    // this.props.serviceRequest({ playlist: this.props.playlist, overideQueue: false })
  }

  handleSave(playlist) {
    this.props.savePlaylist(playlist)
  }

  goBack() {
    this.props.history.push('/admin-portal')
  }

  render() {
    return (
      <AdminPortalTemplate>
        <Heading level={3} >
          {this.props.playlist.name}
        </Heading>
        <SortableComponent />
        {this.props.saved ? (
          <BtnWrapper>
            <AdminLink to={`/admin-portal/playlist/add-video/${this.props.match.params.playlistId}`}>
              <Button type="info" palette="primary">Add Video</Button>
            </AdminLink>
            <AdminLink to={`/admin-portal/playlist/add-image/${this.props.match.params.playlistId}`}>
              <Button type="info" palette="primary">Add Image</Button>
            </AdminLink>
          </BtnWrapper>
          ) : (
            <BtnWrapper>
              <Button type="info" palette="secondary" onClick={this.resetPlaylist.bind(this)}>Cancel</Button>
              <Button type="info" palette="primary" onClick={this.handlePusblish.bind(this, this.props.playlist, true)}>Publish</Button>
              <Button type="info" palette="primary" onClick={this.handleSave.bind(this, this.props.playlist)}>Save</Button>
            </BtnWrapper>
        )}
        <SwipableArea classes={'swipe_left'} swipedLeft={this.goBack.bind(this)}>Swipe left to go back</SwipableArea>
      </AdminPortalTemplate>
    )
  }
}

const mapStateToProps = state => ({
  saved: state.admin.saved,
  playlist: state.admin.currentPlaylist,
  allAvailablePlaylists: state.admin.allAvailablePlaylists,
})

const mapDispatchToProps = (dispatch) => ({
  updateAdminPlaylist: (updatedPlaylist, savedState) => dispatch(updatePlaylist(updatedPlaylist, savedState)),
  publishPlaylist: (playlist, overideQueue) => dispatch(publishPlaylist(playlist, overideQueue)),
  savePlaylist: (playlist) => dispatch(savePlaylist(playlist)),
  // serviceRequest: (playlistData) => dispatch(socketDataRequest({ service: 'ADMIN', serverAction: 'emit', request: 'newPlaylist', payload: playlistData })),
})

AdminPortalPlaylistView.propTypes = {
  playlist: PropTypes.object,
  saved: PropTypes.bool,
  updateAdminPlaylist: PropTypes.func,
  publishPlaylist: PropTypes.func,
  savePlaylist: PropTypes.func,
  allAvailablePlaylists: PropTypes.array,
  // serviceRequest: PropTypes.func,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminPortalPlaylistView))
