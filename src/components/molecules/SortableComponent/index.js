import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components'
import { connect } from 'react-redux'
import { font } from 'styled-theme'
import { updatePlaylist, deletePlaylistItem, recievedPlaylistFromServer } from 'store/actions'
import { Button } from 'components'
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc'

const List = styled.ul`
  display: block;
  align-items: center;
  padding: 0;
  margin: 15px 20px;
  font-family: ${font('primary')};
  max-width: 700px;
  max-height: calc(100vh - 12rem);
  overflow: scroll;
`
const ListItem = styled.li`
 height: 35px;
 background: linear-gradient(to right, #50b848 0%, #00928f 100%);
 padding: 2.5px;
 margin: 5px;
 border-radius: 5px;
 list-style: none;
 position: relative;
`
const ListItemText = styled.span`
 height: 50%;
 width: calc(100% - 80px);
 text-overflow: ellipsis;
 color: white;
 display: block;
 font-size: 0.75rem;
 padding-left: 7.5px;
 font-weight: lighter;
 white-space: nowrap;
 overflow: hidden;

 &:first-child {
   font-weight: bold;
 }
`
const ListButton = styled.div`
position: absolute;
right: 0;
z-index: 2;
top: 5px;
`

const SortableItem = SortableElement(({ value, deleteFunc, playlist }) => {
  return (
    <ListItem>
      <ListItemText>{value.title}</ListItemText>
      <ListItemText>{value.type}</ListItemText>
      <ListButton>
        <Button id={value.id} height={30} palette="secondary" onClick={deleteFunc.bind(this, playlist)}>Delete</Button>
      </ListButton>
    </ListItem>
  )
})

const SortableList = SortableContainer(({ items, deleteFunc }) => {
  return (
    <List>
      {items.map((value, index) => (
        <SortableItem playlist={items} deleteFunc={deleteFunc} key={`item-${index}`} index={index} value={value} />
      ))}
    </List>
  )
})

class SortableComponent extends Component {

  constructor(props) {
    super(props)
    if (this.props.playlist.length < 1) {
      fetch('/public/user-data/showcase-media.json').then((response) => {
        return response.json()
      }).then((j) => {
        this.props.recievedPlaylistFromServer(j.playlist)
        localStorage.setItem('playList', JSON.stringify(j.playlist))
      })
    }
  }

  onSortEnd({ oldIndex, newIndex }) {
    let savedState
    const reOrderdPlaylist = arrayMove(this.props.playlist, oldIndex, newIndex)

    if (localStorage.getItem('playList') !== JSON.stringify(reOrderdPlaylist)) {
      savedState = false
    } else {
      savedState = true
    }
    this.props.updateAdminPlaylist(reOrderdPlaylist, savedState)
  }

  render() {
    return (
      <SortableList
        deleteFunc={this.props.deletePlaylistItem}
        items={this.props.playlist}
        pressDelay={200}
        onSortEnd={this.onSortEnd.bind(this)}
      />
    )
  }
}

const mapStateToProps = state => ({
  saved: state.admin.saved,
  playlist: state.admin.playlist,
})

SortableComponent.defaultProps = {
  playlist: [{ id: '001', type: 'Default', title: 'Default Item', url: '', serviceId: '' }],
  saved: true,
}

SortableComponent.propTypes = {
  playlist: PropTypes.array,
  saved: PropTypes.bool,
  updateAdminPlaylist: PropTypes.func,
  deletePlaylistItem: PropTypes.func,
  recievedPlaylistFromServer: PropTypes.func,
}

const mapDispatchToProps = (dispatch) => ({
  updateAdminPlaylist: (updatedPlaylist, savedState) => dispatch(updatePlaylist(updatedPlaylist, savedState)),
  deletePlaylistItem: (playlist, item) => dispatch(deletePlaylistItem(playlist, item)),
  recievedPlaylistFromServer: (playlistFromServer) => dispatch(recievedPlaylistFromServer(playlistFromServer)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SortableComponent)
