import React from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc'

const List = styled.ul`
  display: block;
  width: 100%;
  align-items: center;
  min-height: 100%;
  padding: 0 20px 50px 20px;
  font-family: ${font('primary')};
  max-width: 700px;
`
const ListItem = styled.li`
 height: 35px;
 background: linear-gradient(to right, #50b848 0%, #00928f 100%);
 padding: 2.5px;
 margin: 5px;
 border-radius: 5px;
 list-style: none;
`
const ListItemText = styled.span`
 height: 50%;
 width: 100%;
 color: white;
 display: block;
`

const SortableItem = SortableElement(({ value }) =>
  <ListItem>
    <ListItemText>{value.title}</ListItemText>
    <ListItemText>{value.type}</ListItemText>
  </ListItem>
)

const SortableList = SortableContainer(({ items }) => {
  return (
    <List>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </List>
  )
})

const SortableComponent = () => {
  const state = {
    items: [
      {
        title: 'Item 1',
        type: 'Image',
      },
      {
        title: 'Item 2',
        type: 'Image',
      },
      {
        title: 'Item 3',
        type: 'Video',
      },
      {
        title: 'Item 4',
        type: 'Image',
      },
      {
        title: 'Item 5',
        type: 'Video',
      },
      {
        title: 'Item 6',
        type: 'Video',
      },
    ],
  }

  const onSortEnd = ({ oldIndex, newIndex }) => {
    // this.setState(
    //   arrayMove(state.items, oldIndex, newIndex),
    // )
  }
  return (<SortableList items={state.items} onSortEnd={onSortEnd} />)
}

SortableComponent.defaultProps = {
  palette: 'primary',
}

export default SortableComponent
