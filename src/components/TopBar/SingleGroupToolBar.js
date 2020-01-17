require('./SingleGroupToolBar.scss')

import _ from 'lodash'
import React from 'react'
import PT from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'

import NewGroupNavLink from './NewGroupNavLink'
import MobileMenu from '../MobileMenu/MobileMenu'
import MobileMenuToggle from '../MobileMenu/MobileMenuToggle'

import './SingleGroupToolBar.scss'

function isEllipsisActive(el) {
  return (el.offsetWidth < el.scrollWidth)
}

class SingleGroupToolBar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isTooltipVisible: false,
      isMobileMenuOpen: false
    }
    this.onNameEnter = this.onNameEnter.bind(this)
    this.onNameLeave = this.onNameLeave.bind(this)
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this)
  }

  onNameEnter() {
    const el = ReactDOM.findDOMNode(this.refs.name)
    if (isEllipsisActive(el)) {
      this.setState({ isTooltipVisible: true })
    }
  }

  onNameLeave() {
    this.setState({ isTooltipVisible: false })
  }

  toggleMobileMenu() {
    this.setState({ isMobileMenuOpen: !this.state.isMobileMenuOpen })
  }

  shouldComponentUpdate(nextProps) {
    return !nextProps.isProjectLoading
  }

  render() {
    const { renderLogoSection, userMenu, currentGroup, user, mobileMenu} = this.props
    const { isTooltipVisible, isMobileMenuOpen } = this.state

    return (
      <div className="ProjectToolBar">
        <div className="tool-bar">
          <div className="bar-column">
            {renderLogoSection()}
          </div>
          {currentGroup && currentGroup.name && <div className="bar-column project-name">
            <span ref="name" onMouseEnter={this.onNameEnter} onMouseLeave={this.onNameLeave}>{_.unescape(currentGroup.name)}</span>
            {isTooltipVisible && <div className="breadcrumb-tooltip">{_.unescape(currentGroup.name)}</div>}
          </div>}
          {currentGroup && currentGroup.name && <div className="bar-column project-name mobile"><span>{_.unescape(currentGroup.name)}</span></div>}
          <div className="bar-column">
            <NewGroupNavLink link={'/groups/new'} />
            {userMenu}
         
            <MobileMenuToggle onToggle={this.toggleMobileMenu}/>
          </div>
        </div>
        {isMobileMenuOpen && <MobileMenu user={user} onClose={this.toggleMobileMenu} menu={mobileMenu} />}
      </div>
    )
  }
}

SingleGroupToolBar.propTypes = {
  isProjectLoading: PT.bool,
  project: PT.object,
  isPowerUser: PT.bool,
  /**
   * Function which render the logo section in the top bar
   */
  renderLogoSection: PT.func
}

const mapStateToProps = ({ currentGroup, loadUser }) => {
  return {
    //isProjectLoading: projectState.isLoading,
    //project: projectState.project,
    //userRoles: _.get(loadUser, 'user.roles', []),
    user: loadUser.user,
    currentGroup: currentGroup.group
    //orgConfig: loadUser.orgConfig
  }
}

const actionsToBind = {}

// export default ProjectToolBar
export default connect(mapStateToProps, actionsToBind)(withRouter(SingleGroupToolBar))
