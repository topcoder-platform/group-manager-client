import React from 'react'
import PT from 'prop-types'
import _ from 'lodash'
import { withRouter } from 'react-router-dom'

import GroupCardHeader from './GroupCardHeader'
import GroupCardBody from './GroupCardBody'

import './GroupCard.scss'

function GroupCard({ group, history}) {
  const disabled = false

  const className = `ProjectCard ${ disabled ? 'disabled' : 'enabled'}`
  if (!group) return null

  return (
    <div
      className={className}
      onClick={() => {
        history.push(`/groups/${group.id}`)
      }}
    >
      <div className="card-header">
        <GroupCardHeader  group={group} />
      </div>
      <div className="card-body">
        <GroupCardBody
          group={group}
        />
      </div>
      <div className="card-footer">
        <div>
            Child Groups : {_.get(group, 'childGroupIds', []).length}
        </div>
      </div>
    </div>
  )
}



GroupCard.propTypes = {
  group: PT.object.isRequired
}

export default withRouter(GroupCard)
