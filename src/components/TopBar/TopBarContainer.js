import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import _ from 'lodash'
import UserDropdown from 'appirio-tech-react-components/components/UserDropdownMenu/UserDropdownMenu'
import {
  ACCOUNTS_APP_LOGIN_URL,
  ACCOUNTS_APP_REGISTER_URL,
  ROLE_GROUP_MANAGER,
  ROLE_ADMINISTRATOR,
  DOMAIN
} from '../../config/constants'
import ConnectLogoMono from '../../assets/icons/connect-logo-mono.svg'
import { getAvatarResized, getFullNameWithFallback } from '../../helpers/tcHelpers.js'
require('./TopBarContainer.scss')


class TopBarContainer extends React.Component {

  constructor(props) {
    super(props)
    this.renderLogo = this.renderLogo.bind(this)
    this.navigateToProfile = this.navigateToProfile.bind(this)
  }

  handleMobileClick(se) {
    const mobileMenuLink = se.target.querySelector('.mobile-wrap > a')
    if (mobileMenuLink) {
      mobileMenuLink.click()
    }
  }

  navigateToProfile() {
    const handle = _.get(this.props, 'user.handle')
    window.location = `https://www.${DOMAIN}.com/members/` + handle
  }

  shouldComponentUpdate(nextProps) {
    return (nextProps.user || {}).handle !== (this.props.user || {}).handle
    || (nextProps.user || {}).photoURL !== (this.props.user || {}).photoURL
    || nextProps.toolbar !== this.props.toolbar
    || this.props.location.pathname !== nextProps.location.pathname
  }

  renderLogo(comp){
    const logoTargetUrl =  '/'
    return (
      <div className="logo-wrapper">
        <Link className="logo" to={logoTargetUrl} target="_self">
          <ConnectLogoMono className="icon-connect-logo-mono" title="Group Manager" />
        </Link>
        {comp}
      </div>
    )
  }

  render() {

    const { user, toolbar } = this.props
    const userHandle  = _.get(user, 'handle')
    const bigPhotoURL = _.get(user, 'photoURL')
    const userImage = getAvatarResized(bigPhotoURL, 40)
    const userName = getFullNameWithFallback(user)
    const homePageUrl = `${window.location.protocol}//${window.location.host}/`
    const logoutLink = `https://accounts.${DOMAIN}/#!/logout?retUrl=${homePageUrl}`

    const logoutClick = (evt) => {
      evt.preventDefault()
      window.location = logoutLink
    }

    const userMenuItems = [
      [
        { label: 'My profile', link: `//${DOMAIN}/members/${user.handle}`, onClick: this.navigateToProfile }
      ],
      [
        { label: 'Log out', onClick: logoutClick, absolute: true, id: 0 }
      ]
    ]

    const mobileMenu = [
      {
        style: 'big',
        items: [
          { label: 'My profile', link: `//www.${DOMAIN}.com/members/` + user.handle }
        ]
      },
      {
        items: [
          { label: 'Log Out', link: logoutLink, absolute: true, onClick: logoutClick },
        ]
      }
    ]


    const avatar = (
      <div className="welcome-info">
        <div className="avatar-info">
          <div className="links-section">
            <div className="menu-wrap" onClick={this.handleMobileClick}>
              <UserDropdown
                userName={ userName }
                userHandle={userHandle}
                userImage={userImage}
                domain={ DOMAIN }
                menuItems={ userMenuItems }
                forReactRouter
              />
            </div>
          </div>
        </div>
      </div>
    )
    let ToolBar = null
    ToolBar = typeof toolbar === 'function' ? toolbar : null
    ToolBar = toolbar && typeof toolbar.type  === 'function' ? toolbar.type : ToolBar
    
    return (
      <div className="TopBarContainer">
        <div className="tc-header tc-header__connect" id="TopToolbar">
          <div className="top-bar">
            {
              ToolBar &&
              <ToolBar
                {...this.props}
                renderLogoSection={ this.renderLogo }
                userMenu={ avatar }
                mobileMenu={mobileMenu}
              />
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ loadUser }) => {
  return {
    userRoles              : _.get(loadUser, 'user.roles', []),
    user                   : loadUser.user  
  }
}

const actionsToBind = { }

export default withRouter(connect(mapStateToProps, actionsToBind)(TopBarContainer))
