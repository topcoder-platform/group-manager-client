import React from 'react'
import PropTypes from 'prop-types'
import update from 'react-addons-update'
import { findIndex, some } from 'lodash'
import { withRouter } from 'react-router-dom'

import UserSummary from '../UserSummary/UserSummary'
import MenuList from '../MenuList/MenuList'
import NotificationsIcon from '../../assets/icons/ui-bell.svg'
import AllProjectsIcon from '../../assets/icons/v.2.5/icon-all-projects.svg'
import MyProfileIcon from '../../assets/icons/v.2.5/icon-my-profile.svg'
import NotificationSettingsIcon from '../../assets/icons/v.2.5/icon-notification-setting.svg'
import AccountSecurityIcon from '../../assets/icons/v.2.5/icon-account-security.svg'

import './UserSidebar.scss'

const navLinks = [{
  label: 'ALL GROUPS',
  to: '/',
  Icon: AllProjectsIcon,
  iconClassName: 'fill',
  exact: true,
}, 
{
  label: 'BATCHES',
  to: '/batches',
  Icon: NotificationSettingsIcon,
  iconClassName: 'fill',
},
{
  label: 'CONNECT',
  to: '/connect',
  Icon: AccountSecurityIcon,
  iconClassName: 'fill',
},
{
  label: 'HELP',
  to: '/help',
  Icon: NotificationsIcon,
  iconClassName: 'fill',
}]

class UserSidebar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      navLinks
    }
  }

  componentDidMount() {
    this.initAccordion()
  }

  initAccordion() {
    const {match} = this.props
    const {navLinks} = this.state

    const matchedPath = match && match.path
    const activeNavIndex = findIndex(navLinks, nav => nav.children && some(nav.children, c => c.to === matchedPath))

    if (activeNavIndex >= 0) {
      this.setAccordionOpen(activeNavIndex, true)
    }
  }

  setAccordionOpen(i, open) {
    const { navLinks } = this.state
    const updatedNavLinks = update(navLinks, {
      [i]: {
        $set: {
          ...navLinks[i],
          isAccordionOpen: open
        }
      }
    })

    this.setState({
      navLinks: updatedNavLinks
    })
  }

  render() {
    const {user} = this.props
    const {navLinks} = this.state

    return (
      <div styleName="container">
        <div className="sideAreaWrapper">
          <UserSummary user={user}/>
          <hr styleName="separator"/>
          <div styleName="section-title">
            SYSTEM
          </div>
          <MenuList navLinks={navLinks} onAccordionToggle={(i, open) => this.setAccordionOpen(i, open)} />
        </div>
      </div>
    )
  }
}

UserSidebar.propTypes = {
  user: PropTypes.object.isRequired
}

export default withRouter(UserSidebar)
