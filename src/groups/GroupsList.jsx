import React, { Component } from 'react'
import MediaQuery from 'react-responsive'
import Sticky from 'react-stickynode'
import { connect } from 'react-redux'
import { branch, renderComponent, compose, withProps, renderNothing } from 'recompose'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'
import querystring from 'query-string'

import TwoColsLayout from '../components/TwoColsLayout'
import UserSidebar from '../components/UserSidebar/UserSidebar'
import LoadingIndicator from '../components/LoadingIndicator/LoadingIndicator'


import GroupListNavHeader from './GroupListNavHeader'

import { switchSelectedView } from './../actions/navSearch'
import { loadGroups } from './../actions/loadGroups'
import { setSearchTerm, setGroupListViewSortField } from './../actions/setSearchTerm'
import { filterGroups, sortGroups } from './../helpers/utils'

import { PROJECTS_LIST_VIEW, SCREEN_BREAKPOINT_MD } from '../config/constants'
import GroupsCardView from './GroupsCardView'
import GroupsGridView from './GroupsGridView'

class GroupsList extends Component {
  constructor(props) {
    super(props)
    this.init = this.init.bind(this)
    this.sortHandler = this.sortHandler.bind(this)
    this.refreshGroups = this.refreshGroups.bind(this)
  }

  componentWillUnmount(){
    window.removeEventListener('beforeunload', this.removeScrollPosition)

    // save scroll position
    const scrollingElement = document.scrollingElement || document.documentElement
    window.sessionStorage.setItem('groupsPageScrollTop', scrollingElement.scrollTop)
  }
  

  componentWillMount() {
    this.init(this.props)
  }

  init(props) {
    document.title = 'Topcoder Group Manager - Groups'
    const { loadGroups, setSearchTerm } = props

    const queryParams = querystring.parse(location.search)
    if (queryParams.keyword) { 
      setSearchTerm(decodeURIComponent(queryParams.keyword))
    }
    loadGroups()
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.removeScrollPosition)
    // restore scroll position
    window.scrollTo(0, parseInt(window.sessionStorage.getItem('groupsPageScrollTop'), 10))
  }

  removeScrollPosition() {
    // remove scroll position from local storage
    window.sessionStorage.removeItem('groupsPageScrollTop')
  }

  onPageChange(pageNum) {
    this.props.loadProjects(this.props.criteria, pageNum)
  }

  refreshGroups() {
    //Forcibly refresh all groups, by discarding cache
    this.props.loadGroups(false)
  }

  sortHandler(fieldName) {
    this.props.setGroupListViewSortField(fieldName)
  }
 
  getSelectedDisplayView(isLoading, allGroups, sortField) {

    if (isLoading === true) {
      return <LoadingIndicator label={'Loading Groups'} />
    }

    let displayView = (
      <GroupsCardView groups={allGroups} />
    )
    if (this.props.selectedView === PROJECTS_LIST_VIEW.GRID) {
      displayView = (
        <GroupsGridView 
          sortHandler={this.sortHandler}
          groups={allGroups} 
          sortField = {sortField}
        />
      )
    }
    return displayView
  }

  render() {
    const { user, allGroups, isLoading, searchTerm, currentSortField } = this.props
    
    const filteredGroups = sortGroups(filterGroups(allGroups, searchTerm), currentSortField)
    const displayView = this.getSelectedDisplayView(isLoading, filteredGroups, currentSortField)
   
    return (
      <TwoColsLayout noPadding>
        <TwoColsLayout.Sidebar>
          <MediaQuery minWidth={SCREEN_BREAKPOINT_MD}>
            {(matches) => {
              if (matches) {
                return (
                  <Sticky top={60}>
                    <UserSidebar user={user}/>
                  </Sticky>
                )
              } else {
                return <UserSidebar user={user}/>
              }
            }}
          </MediaQuery>
        </TwoColsLayout.Sidebar>
        <TwoColsLayout.Content>
          <div>
            <section className="">
              <div className="container">
                <GroupListNavHeader 
                  changeView={this.props.switchSelectedView}
                  currentView={this.props.selectedView}
                  groups={filteredGroups}
                  refresh={this.refreshGroups}
                />
                {displayView}
              </div>
            </section>
          </div>
        </TwoColsLayout.Content>
      </TwoColsLayout>
    )
  }
}

const mapStateToProps = ({ navSearch, searchTerm, groups, loadUser }) => {
  return {
    selectedView: navSearch.selectedView,
    allGroups: groups.allGroups,
    isLoading: groups.isLoading,
    user: loadUser.user,
    searchTerm: searchTerm.searchTerm,
    currentSortField : searchTerm.groupSortField
  }
}

const actionsToBind = {
  switchSelectedView,
  loadGroups,
  setSearchTerm,
  setGroupListViewSortField
}

export default withRouter(connect(mapStateToProps, actionsToBind)(GroupsList))
