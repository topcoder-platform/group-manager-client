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

import BatchListNavHeader from './BatchListNavHeader'


import { switchSelectedView } from './../actions/navSearch'
import { loadAllBatches, setPageNumber, setInfiniteAutoload, setSortField } from './../actions/loadBatches'
import { sortBatches } from './../helpers/utils'

import { SCREEN_BREAKPOINT_MD, BATCH_LIST_PER_PAGE } from '../config/constants'

import BatchesGridView from './BatchesGridView'

class BatchList extends Component {
  constructor(props) {
    super(props)
    this.init = this.init.bind(this)
    this.sortHandler = this.sortHandler.bind(this)
    this.refreshBatches = this.refreshBatches.bind(this)

    this.pageChange = this.pageChange.bind(this)
  }

  componentWillUnmount(){
    window.removeEventListener('beforeunload', this.removeScrollPosition)

    // save scroll position
    const scrollingElement = document.scrollingElement || document.documentElement
    window.sessionStorage.setItem('batchesPageScrollTop', scrollingElement.scrollTop)
  }
  

  componentWillMount() {
    this.init(this.props)
  }

  init(props) {
    document.title = 'Topcoder Group Manager - Batch'
    const { loadAllBatches } = props

    loadAllBatches()
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.removeScrollPosition)
    // restore scroll position
    window.scrollTo(0, parseInt(window.sessionStorage.getItem('batchesPageScrollTop'), 10))
  }

  removeScrollPosition() {
    // remove scroll position from local storage
    window.sessionStorage.removeItem('batchPageScrollTop')
  }

  refreshBatches() {
    //Forcibly refresh all groups, by discarding cache
    this.props.loadAllBatches(false)
  }

  pageChange() {
    this.props.setPageNumber(this.props.pageNum + 1)
  }

  sortHandler(fieldName) {
    this.props.setSortField(fieldName)
  }
 
  getSelectedDisplayView(isLoading, allBatches, sortField) {

    if (isLoading === true) {
      return <LoadingIndicator label={'Loading Batches'} />
    }

    const displayView = (
      <BatchesGridView 
        sortHandler={this.sortHandler}
        batches={allBatches} 
        sortField = {sortField}

        isLoading={this.props.isLoadingCurrentPage}
        setInfiniteAutoload={this.props.setInfiniteAutoload} 
        onPageChange={this.pageChange} 
        pageNum={this.props.pageNum}
        infiniteAutoload={this.props.isInfiniteAutoLoad}
        totalCount={allBatches.length}
      />
    )
    return displayView
  }

  render() {
    const { user, allBatches, isLoading, currentSortField } = this.props

    console.log(currentSortField)
    
    const sortedBatches = sortBatches(allBatches, currentSortField)
    const displayedBatchesCount = Math.min(this.props.pageNum * BATCH_LIST_PER_PAGE, allBatches.length)
    const displayView = this.getSelectedDisplayView(isLoading, sortedBatches, currentSortField)
   
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
                <BatchListNavHeader 
                  changeView={this.props.switchSelectedView}
                  currentView={this.props.selectedView}
                  batches={displayedBatchesCount}
                  total={allBatches.length}
                  refresh={this.refreshBatches}
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

const mapStateToProps = ({ batch, loadUser }) => {
  return {
    allBatches: batch.allBatches,
    isLoading: batch.isLoading,
    user: loadUser.user,
   
    pageNum: batch.batchPageNumber,
    isLoadingCurrentPage: batch.isLoadingCurrentPage,
    isInfiniteAutoLoad: batch.isInfiniteAutoLoad,

    currentSortField: batch.sortField
  }
}

const actionsToBind = {
  switchSelectedView,
  loadAllBatches,
  setSortField,

  setPageNumber,
  setInfiniteAutoload
}

export default withRouter(connect(mapStateToProps, actionsToBind)(BatchList))
