import React from 'react'
import PropTypes from 'prop-types'
import Avatar from 'appirio-tech-react-components/components/Avatar/Avatar'
import moment from 'moment'

import './UserSummary.scss'
import { getFullNameWithFallback } from '../../helpers/tcHelpers'

const UserSummary = ({user}) => {
 
  const userName = getFullNameWithFallback(user)
  const memberSince = moment(user.createdAt).format('MMM YYYY')
  return (
    <div styleName="container">
      <div styleName="user">
        <div styleName="avatar" >
          <Avatar avatarUrl={user.photoURL} userName={userName} size={60}/>
        </div>
        <div styleName="info">
          <div styleName="name">
            {userName}
          </div>
          <div styleName="handle">
            @{user.handle}
          </div>
          <div styleName="member-since">
            User since {memberSince}
          </div>
        </div>
      </div>
    </div>
  )
}

UserSummary.propTypes = {
  user: PropTypes.object.isRequired
}

export default UserSummary
