import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import Tooltip from 'appirio-tech-react-components/components/Tooltip/Tooltip'
import Avatar from 'appirio-tech-react-components/components/Avatar/Avatar'
import { DOMAIN } from '../../config/constants'
import { getAvatarResized, getFullNameWithFallback } from '../../helpers/tcHelpers'
import IconDirectArrow from '../../assets/icons/icon-direct-arrow.svg'

require('./UserTooltip.scss')

const UserTooltip = ({ usr, id, previewAvatar, size, invitedLabel, showEmailOnly }) => {
  const theme = `customer-data size-${size}`
  const tooltipMargin = previewAvatar ? -(100 + (id * 20)) : 0
  const userHandle = _.get(usr, 'handle')
  const userEmail = _.get(usr, 'email')
  const userFullName = getFullNameWithFallback(usr)
  const avatar =
    (
      <Avatar
        avatarUrl={showEmailOnly ? '' : getAvatarResized(_.get(usr || {}, 'photoURL'), 40)}
        userName={showEmailOnly ? userEmail : userFullName}
      />
    )
  return (
    <Tooltip theme={theme} pointerWidth={20} tooltipMargin={tooltipMargin}>
      <div className="tooltip-target" id={`tt-${id}`}>
        {
          previewAvatar ? (<div className={`stack-avatar-${id}`}>
            <Avatar
              avatarUrl={showEmailOnly ? '' : getAvatarResized(_.get(usr || {}, 'photoURL'), 40)}
              userName={showEmailOnly ? userEmail : userFullName}
              size={size}
            />
            {invitedLabel && <IconDirectArrow className="direct-arrow"/>}
          </div>) :
            <span className="project-customer">{userFullName}</span>
        }
      </div>
      <div className="tooltip-body">
        <div className="top-container">
          <div className="tt-col-avatar">
            { !showEmailOnly ? (
              <a href={`//www.${DOMAIN}/members/${userHandle}/`} target="_blank" rel="noopener noreferrer" className="tt-user-avatar">
                {avatar}
              </a>
            ) : (
              <span>
                {avatar}
              </span>
            )}
          </div>
          <div className="tt-col-user-data">
            {!showEmailOnly && <div className="user-name-container">
              <span>{userFullName}</span>
            </div>}
            {!showEmailOnly && <div className="user-handle-container">
              <span>{userHandle}</span>
            </div>}
            {userEmail && <div className={`user-email-container ${showEmailOnly ? 'text-dark' : ''}`}>
              <a href={`mailto:${userEmail}`}>{userEmail}</a>
            </div>}
            {invitedLabel && <div className="invited-label">invited</div>}
          </div>
        </div>
      </div>
    </Tooltip>
  )
}

UserTooltip.propTypes = {
  usr: PropTypes.object.isRequired,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  previewAvatar: PropTypes.bool,
  size: PropTypes.number
}

UserTooltip.defaultProps = {
  size: 30,
  previewAvatar: false,
  showEmailOnly: false,
}

export default UserTooltip
