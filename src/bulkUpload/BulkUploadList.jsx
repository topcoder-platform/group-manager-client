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

import BulkUploadListNavHeader from './BulkUploadListNavHeader'


import { switchSelectedView } from '../actions/navSearch'
import { getBulkUploads, setPageNumber, setInfiniteAutoload, setSortField } from '../actions/loadBulkUpload'
import { sortBatches } from '../helpers/utils'

import { SCREEN_BREAKPOINT_MD, BATCH_LIST_PER_PAGE } from '../config/constants'

import BulkUploadGridView from './BulkUploadGridView'

class BulkUploadList extends Component {
  constructor(props) {
    super(props)
    this.init = this.init.bind(this)
    this.sortHandler = this.sortHandler.bind(this)
    this.refreshBulkUploads = this.refreshBulkUploads.bind(this)

    this.pageChange = this.pageChange.bind(this)
  }

  componentWillUnmount(){
    window.removeEventListener('beforeunload', this.removeScrollPosition)

    // save scroll position
    const scrollingElement = document.scrollingElement || document.documentElement
    window.sessionStorage.setItem('bulkUploadPageScrollTop', scrollingElement.scrollTop)
  }
  

  componentWillMount() {
    this.init(this.props)
  }

  init(props) {
    document.title = 'Topcoder Group Manager - Bulk Upload'
    const { getBulkUploads } = props

    getBulkUploads()
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.removeScrollPosition)
    // restore scroll position
    window.scrollTo(0, parseInt(window.sessionStorage.getItem('bulkUploadPageScrollTop'), 10))
  }

  removeScrollPosition() {
    // remove scroll position from local storage
    window.sessionStorage.removeItem('batchPageScrollTop')
  }

  refreshBulkUploads() {
    //Forcibly refresh all groups, by discarding cache
    this.props.getBulkUploads(false)
  }

  pageChange() {
    this.props.setPageNumber(this.props.pageNum + 1)
  }

  sortHandler(fieldName) {
    this.props.setSortField(fieldName)
  }
 
  getSelectedDisplayView(isLoading, allBulkUploadBatches, sortField) {

    if (isLoading === true) {
      return <LoadingIndicator label={'Loading Bulk Upload Entries'} />
    }

    const displayView = (
      <BulkUploadGridView 
        sortHandler={this.sortHandler}
        bulkUploads={allBulkUploadBatches} 
        sortField = {sortField}

        isLoading={this.props.isLoadingCurrentPage}
        setInfiniteAutoload={this.props.setInfiniteAutoload} 
        onPageChange={this.pageChange} 
        pageNum={this.props.pageNum}
        infiniteAutoload={this.props.isInfiniteAutoLoad}
        totalCount={allBulkUploadBatches.length}
      />
    )
    return displayView
  }

  render() {
    const { user, allBulkUploadBatches, isLoading, currentSortField } = this.props    
    const sortedBatches = sortBatches(allBulkUploadBatches, currentSortField)
    const displayedBatchesCount = Math.min(this.props.pageNum * BATCH_LIST_PER_PAGE, allBulkUploadBatches.length)
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
                <BulkUploadListNavHeader 
                  changeView={this.props.switchSelectedView}
                  currentView={this.props.selectedView}
                  batches={displayedBatchesCount}
                  total={allBulkUploadBatches.length}
                  refresh={this.refreshBulkUploads}
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

const mapStateToProps = ({ bulkUpload, loadUser }) => {
  return {
    allBulkUploadBatches: bulkUpload.allBulkUploades,
    isLoading: bulkUpload.isLoading,
    user: loadUser.user,
   
    pageNum: bulkUpload.bulkUploadPageNumber,
    isLoadingCurrentPage: bulkUpload.isLoadingCurrentPage,
    isInfiniteAutoLoad: bulkUpload.isInfiniteAutoLoad,

    currentSortField: bulkUpload.sortField
  }
}

const actionsToBind = {
  switchSelectedView,
  getBulkUploads,
  setSortField,

  setPageNumber,
  setInfiniteAutoload
}

export default withRouter(connect(mapStateToProps, actionsToBind)(BulkUploadList))
