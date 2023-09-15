import React from 'react'
import PT from 'prop-types'
import TextTruncate from 'react-text-truncate'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import './GroupCardBody.scss'

function GroupCardBody({ group }) {
  if (!group) return null

  return (
    <div className="project-card-body">
      <TextTruncate
        containerClassName="project-description"
        line={8}
        truncateText="..."
        text={_.unescape(group.description)}
      />
    </div>
  )
}


GroupCardBody.propTypes = {
  group: PT.object.isRequired,
}

export default GroupCardBody
