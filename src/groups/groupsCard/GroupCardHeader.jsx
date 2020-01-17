import _ from 'lodash'
import moment from 'moment'
import React from 'react'
import PT from 'prop-types'
import TextTruncate from 'react-text-truncate'

import './GroupCardHeader.scss'

function GroupCardHeader({ group, onClick}) {
  if (!group) return null

  return (
    <div className="project-card-header" onClick={onClick}>
      <div className="project-header">
       
        <div className="project-header-details">
          <div className="project-name">
            <TextTruncate
              containerClassName="project-name"
              line={2}
              truncateText="..."
              text={_.unescape(group.name)}
            />
          </div>
          <div className="project-date">{moment(group.updatedAt).format('MMM DD, YYYY')}</div>
        </div>
      </div>
    </div>
  )
}



GroupCardHeader.propTypes = {
  group: PT.object,
  onClick: PT.func
}

export default GroupCardHeader
