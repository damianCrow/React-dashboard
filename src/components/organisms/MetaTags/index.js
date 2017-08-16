import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { Icon } from 'components'

const MetaContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0 .5rem;
  flex: 1 1 100%;
  height: 100%;
`
const Meta = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0 .25rem;
  flex: 0 0 auto;
  height: 100%;
`

const StyledIcon = styled(Icon)`
  z-index: 59;
  padding: 0 .25rem;
  flex: 0 0 auto;
`

const MetaTags = ({ tags }) => {
  const builtTags = tags.map((tag, index) => {
    return (
      <Meta key={index}>
        <StyledIcon icon={tag.icon} height={28} />
        <span>{tag.metaInfo}</span>
      </Meta>
    )
  })

  return (
    <MetaContainer>
      {builtTags}
    </MetaContainer>
  )
}

MetaTags.propTypes = {
  tags: PropTypes.array.isRequired,
}

export default MetaTags
