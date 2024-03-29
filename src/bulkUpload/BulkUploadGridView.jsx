import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import moment from 'moment'
import TextTruncate from 'react-text-truncate'

import './BulkUploadGridView.scss'
import GridView from '../components/Grid/GridView'

import { GROUP_LIST_PER_PAGE } from '../config/constants'

const BulkUploadGridView = props => {
  const { bulkUploads, totalCount, pageNum, sortHandler, onPageChange,
    error, isLoading, infiniteAutoload, setInfiniteAutoload, sortField,
    applyFilters, newProjectLink } = props

  const currentSortField = sortField

  // This 'little' array is the heart of the list component.
  // it defines what columns should be displayed and more importantly
  // how they should be displayed.
  const columns = [
    {
      id: 'id',
      headerLabel: 'ID',
      classes: 'item-id',
      sortable: true,
      renderText: item => {
        return (
          <div className="spacing">
            {item.id}
          </div>
        )
      }
    }, 
    {
      id: 'name',
      headerLabel: 'Name',
      classes: 'item-batch-status',
      sortable: true,
      renderText: item => {
        return (
          <div className="spacing project-container">
            {item.name}
          </div>
        )
      }
    }, 

    {
      id: 'fileName',
      headerLabel: 'File Name',
      classes: 'item-batch-status',
      sortable: true,
      renderText: item => {
        return (
          <div className="spacing project-container">
            {item.file_name}
          </div>
        )
      }
    }, 
    
    {
      id: 'status',
      headerLabel: 'Status',
      classes: 'item-batch-status',
      sortable: true,
      renderText: item => {
        return (
          <div className="spacing project-container">
            {item.status}
          </div>
        )
      }
    }, 
    {
      id: 'total',
      headerLabel: 'Total',
      classes: 'item-number',
      sortable: true,
      renderText: item => {
        return (
          <div className="spacing project-container">
            {item.total}
          </div>
        )
      }
    }, 
    {
      id: 'processed',
      headerLabel: 'Processed',
      classes: 'item-number',
      sortable: true,
      renderText: item => {
        return (
          <div className="spacing project-container">
            {item.processed}
          </div>
        )
      }
    }, 
    {
      id: 'errors',
      headerLabel: 'Errors',
      classes: 'item-number',
      sortable: true,
      renderText: item => {
        return (
          <div className="spacing project-container">
            {item.error}
          </div>
        )
      }
    }, 
    {
      id: 'updated_at',
      headerLabel: 'Update',
      sortable: true,
      classes: 'item-status-date',
      renderText: item => {
        const time = moment(item['updated_at'])
        return (
          <div className="spacing time-container">
            <div className="txt-normal">{time.year() === moment().year() ? time.format('MMM D, h:mm a') : time.format('MMM D YYYY, h:mm a')}</div>
          </div>
        )
      }
    }
    
  ]
 
  const gridProps = {
    error,
    isLoading,
    columns,
    onPageChange,
    sortHandler,
    currentSortField,
    resultSet: bulkUploads,
    totalCount,
    currentPageNum: pageNum,
    pageSize: GROUP_LIST_PER_PAGE,
    infiniteAutoload,
    infiniteScroll: true,
    setInfiniteAutoload,
    applyFilters,
    entityName: 'Bulk Upload',
    entityNamePlural: 'Bulk Uploads',
    noMoreResultsMessage: 'No more Bulk Upload Records',
    newProjectLink
  }


  return (
    <div>
      <GridView {...gridProps} />
    </div>
  )
}

BulkUploadGridView.propTypes = {
  currentUser: PropTypes.object,
  batches: PropTypes.arrayOf(PropTypes.object),
  newProjectLink: PropTypes.string,
  totalCount: PropTypes.number,

  isLoading: PropTypes.bool,
  error: PropTypes.bool,
  onPageChange: PropTypes.func,
  sortHandler: PropTypes.func.isRequired,
  pageNum: PropTypes.number,
  sortField: PropTypes.string,

  setFilter: PropTypes.func,
}

export default BulkUploadGridView
