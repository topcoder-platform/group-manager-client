require('./BatchesToolBar.scss')

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'


import NewGroupNavLink from './NewGroupNavLink'
import MobileMenu from '../MobileMenu/MobileMenu'
import MobileMenuToggle from '../MobileMenu/MobileMenuToggle'

import { setSearchTerm } from '../../actions/setSearchTerm'

class BatchesToolBar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isMobileMenuOpen: false,
      isMobileSearchVisible: false
    }
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this)
  }

  componentWillMount() {
  }



  toggleMobileMenu() {
    this.setState({ isMobileMenuOpen: !this.state.isMobileMenuOpen })
  }
  
  render() {
    const { renderLogoSection, userMenu, user, mobileMenu } = this.props
    const { isMobileMenuOpen, isMobileSearchVisible } = this.state
    const isLoggedIn = true //!!(userRoles && userRoles.length)

    return (
      <div className="BatchesToolBar">
        <div className="primary-toolbar">
          { renderLogoSection() }
          {
            <div className="search-widget">
              <div className="title">
                Bulk Upload - Bulk Upload Group Operations
              </div>  
            </div>
          }
          <div className="actions">
            {isLoggedIn && <NewGroupNavLink link={'/bulkUpload/new'} label={'+ New Bulk Upload Operation'} />}
            { userMenu }
           
            { isLoggedIn && <MobileMenuToggle onToggle={this.toggleMobileMenu}/> }
          </div>
        </div>
        { isMobileSearchVisible && isLoggedIn &&
          <div className="secondary-toolbar">
            ,
          </div>
        }
        {isMobileMenuOpen && <MobileMenu user={user} onClose={this.toggleMobileMenu} menu={mobileMenu} />}
      </div>
    )
  }
}

BatchesToolBar.propTypes = {
  /**
   * Function which render the logo section in the top bar
   */
  renderLogoSection     : PropTypes.func.isRequired
}

const mapStateToProps = ({ loadUser }) => {

  return {
    user                   : loadUser.user
  }
}

const actionsToBind = { setSearchTerm }

export default withRouter(connect(mapStateToProps, actionsToBind)(BatchesToolBar))
