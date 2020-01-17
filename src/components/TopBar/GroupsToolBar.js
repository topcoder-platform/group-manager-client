require('./GroupsToolBar.scss')

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import SearchBar from 'appirio-tech-react-components/components/SearchBar/SearchBar'
import HelpIcon from 'appirio-tech-react-components/components/HelpIcon/HelpIcon'


import NewGroupNavLink from './NewGroupNavLink'
import MobileMenu from '../MobileMenu/MobileMenu'
import MobileMenuToggle from '../MobileMenu/MobileMenuToggle'

import { setSearchTerm } from '../../actions/setSearchTerm'


class GroupsToolBar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isMobileMenuOpen: false,
      isMobileSearchVisible: false
    }
    this.applyFilters = this.applyFilters.bind(this)
    this.handleTermChange = this.handleTermChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this)
  }

  componentWillMount() {
    const { searchTerm } = this.props

    // update query string if there is a search
    if (searchTerm) {
      this.applyFilters(searchTerm)
    }
  }

  /*eslint-disable no-unused-vars */
  // We are not using the suggestions feature
  // Passing empty array 
  handleTermChange(oldTerm, searchTerm, reqNo, callback) {
    callback(reqNo, [])  
  }
  /*eslint-enable */

  handleSearch(keyword) {
    this.applyFilters(keyword )
  }

  applyFilters(keyword) {
    let search = null
    if (keyword) {
      search = '?keyword=' + keyword
    }

    this.props.history.push({
      pathname: '/',
      search
    })

    this.props.setSearchTerm(keyword)
  }

  toggleMobileMenu() {
    this.setState({ isMobileMenuOpen: !this.state.isMobileMenuOpen })
  }
  
  render() {
    const { renderLogoSection, userMenu, user, mobileMenu } = this.props
    const { isMobileMenuOpen, isMobileSearchVisible } = this.state
    const isLoggedIn = true //!!(userRoles && userRoles.length)

    return (
      <div className="ProjectsToolBar">
      
        <div className="primary-toolbar">
          { renderLogoSection() }
          {
            <div className="search-widget">
              <SearchBar
                hideSuggestionsWhenEmpty
                showPopularSearchHeader={ false }
                searchTermKey="keyword"
               
                onTermChange={ this.handleTermChange }
                onSearch={ this.handleSearch }
                onClearSearch={ this.handleSearch }
              />
              <HelpIcon tooltip="Searches in Group name or description" />

            </div>
          }
          <div className="actions">
            {isLoggedIn && <NewGroupNavLink link={'/groups/new'} />}
            { userMenu }
           
            { isLoggedIn && <MobileMenuToggle onToggle={this.toggleMobileMenu}/> }
          </div>
        </div>
        { isMobileSearchVisible && isLoggedIn &&
          <div className="secondary-toolbar">
            <SearchBar
              hideSuggestionsWhenEmpty
              showPopularSearchHeader={ false }
              searchTermKey="keyword"
              onTermChange={ this.handleTermChange }
              onSearch={ this.handleSearch }
              onClearSearch={ this.handleSearch }
            />
          </div>
        }
        {isMobileMenuOpen && <MobileMenu user={user} onClose={this.toggleMobileMenu} menu={mobileMenu} />}
      </div>
    )
  }
}

GroupsToolBar.propTypes = {
  /**
   * Function which render the logo section in the top bar
   */
  renderLogoSection     : PropTypes.func.isRequired
}

const mapStateToProps = ({ searchTerm, loadUser }) => {

  return {
    previousSearchTerm     : searchTerm.previousSearchTerm,
    searchTerm             : searchTerm.searchTerm,
    user                   : loadUser.user
  }
}

const actionsToBind = { setSearchTerm }

export default withRouter(connect(mapStateToProps, actionsToBind)(GroupsToolBar))
