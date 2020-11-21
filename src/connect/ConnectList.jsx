import React, { Component } from 'react'
import MediaQuery from 'react-responsive'
import Sticky from 'react-stickynode'
import { connect } from 'react-redux'
import { branch, renderComponent, compose, withProps, renderNothing } from 'recompose'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'

import TwoColsLayout from '../components/TwoColsLayout'
import UserSidebar from '../components/UserSidebar/UserSidebar'
import LoadingIndicator from '../components/LoadingIndicator/LoadingIndicator'

import ConnectListNavHeader from './ConnectListNavHeader'

import { switchSelectedView } from './../actions/navSearch'
import { loadAllConnect, setPageNumber, setInfiniteAutoload, setSortField } from './../actions/loadConnect'
import { sortBatches } from './../helpers/utils'

import { SCREEN_BREAKPOINT_MD, BATCH_LIST_PER_PAGE } from '../config/constants'

import ConnectGridView from './ConnectGridView'

class ConnectList extends Component {
  constructor(props) {
    super(props)
    this.init = this.init.bind(this)
    this.sortHandler = this.sortHandler.bind(this)
    this.refreshConnect = this.refreshConnect.bind(this)

    this.pageChange = this.pageChange.bind(this)
  }

  componentWillUnmount(){
    window.removeEventListener('beforeunload', this.removeScrollPosition)

    // save scroll position
    const scrollingElement = document.scrollingElement || document.documentElement
    window.sessionStorage.setItem('connectPageScrollTop', scrollingElement.scrollTop)
  }
  

  componentWillMount() {
    this.init(this.props)
  }

  init(props) {
    document.title = 'Topcoder Group Manager - Connect'
    const { loadAllConnect } = props

    loadAllConnect()
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.removeScrollPosition)
    // restore scroll position
    window.scrollTo(0, parseInt(window.sessionStorage.getItem('connectPageScrollTop'), 10))
  }

  removeScrollPosition() {
    // remove scroll position from local storage
    window.sessionStorage.removeItem('connectPageScrollTop')
  }

  refreshConnect() {
    //Forcibly refresh all groups, by discarding cache
    this.props.loadAllConnect(false)
  }

  pageChange() {
    this.props.setPageNumber(this.props.pageNum + 1)
  }

  sortHandler(fieldName) {
    this.props.setSortField(fieldName)
  }
 
  getSelectedDisplayView(isLoading, allConnect, sortField) {

    if (isLoading === true) {
      return <LoadingIndicator label={'Loading Connect Project'} />
    }

    const displayView = (
      <ConnectGridView 
        sortHandler={this.sortHandler}
        connect={allConnect} 
        sortField = {sortField}

        isLoading={this.props.isLoadingCurrentPage}
        setInfiniteAutoload={this.props.setInfiniteAutoload} 
        onPageChange={this.pageChange} 
        pageNum={this.props.pageNum}
        infiniteAutoload={this.props.isInfiniteAutoLoad}
        totalCount={allConnect.length}
      />
    )
    return displayView
  }

  render() {
    const { user, allConnect, isLoading, currentSortField } = this.props
    
    const sortedConnect = sortBatches(allConnect, currentSortField)
    const displayedBatchesCount = Math.min(this.props.pageNum * BATCH_LIST_PER_PAGE, allConnect.length)
    const displayView = this.getSelectedDisplayView(isLoading, sortedConnect, currentSortField)
   
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
                <ConnectListNavHeader 
                  changeView={this.props.switchSelectedView}
                  currentView={this.props.selectedView}
                  batches={displayedBatchesCount}
                  total={allConnect.length}
                  refresh={this.refreshConnect}
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

const mapStateToProps = ({ connect, loadUser }) => {
  return {
    allConnect: connect.allConnect,
    isLoading: connect.isLoading,
    user: loadUser.user,
   
    pageNum: connect.connectPageNumber,
    isLoadingCurrentPage: connect.isLoadingCurrentPage,
    isInfiniteAutoLoad: connect.isInfiniteAutoLoad,

    currentSortField: connect.sortField
  }
}

const actionsToBind = {
  switchSelectedView,
  loadAllConnect,
  setSortField,

  setPageNumber,
  setInfiniteAutoload
}

export default withRouter(connect(mapStateToProps, actionsToBind)(ConnectList))
