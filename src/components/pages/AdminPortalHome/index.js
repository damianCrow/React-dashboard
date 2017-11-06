import PropTypes from 'prop-types'
import React, { Component } from 'react'
import shortid from 'shortid'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Redirect, Link, withRouter } from 'react-router-dom'
import { storeAllPlaylists, recievedPlaylistFromServer, addNewPlaylistToStore, publishPlaylist } from 'store/actions'
import { AdminPortalTemplate, AdminPortalPlaylistView, Field, Button, ButtonWrapper, Heading } from 'components'

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
const List = styled.ul`
 margin: 0 27.5px;
 width: calc(100% - 1rem);
 font-family: Helvetica Neue, Helvetica, Roboto, sans-serif;
 font-size: 1.125rem;
 margin: 1rem 0.5rem;
 padding: 0;
 max-height: calc(100% - 240px);
 overflow-y: scroll;
`
const ListItem = styled.li`
 display: flex;
 flex-direction: column;
 border-bottom: 1px solid #616161;

 div {
   margin-bottom: 0.5rem;

   button {
    height: 2em;
    font-size: 0.9rem;

    &[disabled] {
      color: #41adaa;
    }
   }
 }
`
const ListItemTitle = styled.p`
  margin: 0.5rem 0;
  font-size: 1rem;
  color: #fff;
  text-align: center;
`

const SubHeading = styled.span`
 display: block;
 font-size: 0.75rem;
 color: #616161;
`

class AdminPortalHome extends Component {

  constructor(props) {
    super(props)
    this.state = { goToPlaylist: ''}
    if (this.props.allAvailablePlaylists.length < 1) {
      fetch('/public/user-data/showcase-media.json').then((response) => {
        return response.json()
      }).then((j) => {
        this.props.storeAllPlaylists(j.playlists)
      })
    }

    this.onSelect = this.onSelect.bind(this)
    this.onCreate = this.onCreate.bind(this)
  }

  onSelect(playlistId) {
    this.props.recievedPlaylistFromServer(...this.props.allAvailablePlaylists.filter(playlist => playlist.id === playlistId))
    this.setState({ goToPlaylist: playlistId })
  }

  onPublish(playlistId) {
    this.props.recievedPlaylistFromServer(...this.props.allAvailablePlaylists.filter(playlist => playlist.id === playlistId))
    this.props.publishPlaylist()
  }

  onCreate() {
    if (this.playlistTitle.value === '') {
      this.playlistTitleError.style.display = 'block'
      return null
    }
    const newPlaylist = {
      name: this.playlistTitle.value,
      id: shortid.generate(),
      isCurrent: false,
      data: [],
    }
    this.props.addNewPlaylistToStore(newPlaylist)
    this.setState({ goToPlaylist: newPlaylist.id })
  }

  render() {
    if (this.state.goToPlaylist) {
      return (<Redirect to={`/admin-portal/playlist/${this.state.goToPlaylist}`} component={AdminPortalPlaylistView} />)
    }

    let currentPlaylistName

    if(this.props.allAvailablePlaylists.find(playlist => playlist.isCurrent)){
      currentPlaylistName = this.props.allAvailablePlaylists.find(playlist => playlist.isCurrent).name
    } else {
      currentPlaylistName = ''
    }

    return (
      <AdminPortalTemplate>
        <Heading palette="alert" level={6}>
          <SubHeading>The current playlist is:</SubHeading>
          {currentPlaylistName}
        </Heading>
        <Heading style={{color: '#616161'}} level={3}>
          Playlists:
        </Heading>
        <List>
          {this.props.allAvailablePlaylists.map((playlistObj, idx) =>
            <ListItem value={playlistObj.id} key={idx}>
              <ListItemTitle>{playlistObj.name}</ListItemTitle>
              <div style={{textAlign: 'center'}}>
                <Button onClick={this.onSelect.bind(this, playlistObj.id)} palette="primary">Edit</Button>
                  {(() => {
                    if(playlistObj.isCurrent) {
                      return <Button disabled palette="primary">CURRENT</Button>
                    } else {
                      return <Button onClick={this.onPublish.bind(this, playlistObj.id)} palette="primary">Publish</Button>
                    }
                  })()}
              </div>
            </ListItem>
          )}
        </List>
        <Heading style={{color: '#616161'}} level={6}>
          Create New Playlist
        </Heading>
        <form>
          <Field
            innerRef={(playlistTitle) => { this.playlistTitle = playlistTitle }}
            name="playlistTitle"
            label="Playlist Title:"
            type="text"
            placeholder="Enter Playlist Title Here"
          />
          <EleError innerRef={(playlistTitleError) => { this.playlistTitleError = playlistTitleError }} className="error" id="playlistTitleError"> A Title for the new playlist is required!</EleError>
          <ButtonWrapper>
            <Button onClick={this.onCreate} palette="primary">Create Playlist</Button>
          </ButtonWrapper>
        </form>
      </AdminPortalTemplate>
    )
  }
}

AdminPortalHome.propTypes = {
  publishPlaylist: PropTypes.func,
  overideQueue: PropTypes.func,
  storeAllPlaylists: PropTypes.func,
  recievedPlaylistFromServer: PropTypes.func,
  allAvailablePlaylists: PropTypes.array,
  addNewPlaylistToStore: PropTypes.func,
}

const mapStateToProps = state => ({
  allAvailablePlaylists: state.admin.allAvailablePlaylists,
})

const mapDispatchToProps = (dispatch) => ({
  publishPlaylist: () => dispatch(publishPlaylist(true)),
  addNewPlaylistToStore: (newPlaylistObj) => dispatch(addNewPlaylistToStore(newPlaylistObj)),
  storeAllPlaylists: (allPlaylists) => dispatch(storeAllPlaylists(allPlaylists)),
  recievedPlaylistFromServer: (playlistFromServer) => dispatch(recievedPlaylistFromServer(playlistFromServer)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminPortalHome))

