import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import './ConnectGridView.scss'
import GridView from './../components/Grid/GridView'

import { GROUP_LIST_PER_PAGE } from './../config/constants'

const ConnectGridView = props => {
  const { connect, totalCount, pageNum, sortHandler, onPageChange,
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
      id: 'connect-id',
      headerLabel: 'Connect ID',
      classes: 'item-connect-id',
      sortable: true,
      renderText: item => {
        return (
          <div className="spacing">
            {item.connect_id}
          </div>
        )
      }
    }, 
    {
      id: 'name',
      headerLabel: 'Name',
      classes: 'item-connect-status',
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
      id: 'created_at',
      headerLabel: 'Created',
      sortable: true,
      classes: 'item-status-date',
      renderText: item => {
        const time = moment(item['created_at'])
        return (
          <div className="spacing time-container">
            <div className="txt-normal">{time.year() === moment().year() ? time.format('MMM D, h:mm a') : time.format('MMM D YYYY, h:mm a')}</div>
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
    resultSet: connect,
    totalCount,
    currentPageNum: pageNum,
    pageSize: GROUP_LIST_PER_PAGE,
    infiniteAutoload,
    infiniteScroll: true,
    setInfiniteAutoload,
    applyFilters,
    entityName: 'Connect Project',
    entityNamePlural: 'Connect Projects',
    noMoreResultsMessage: 'No more Connect Projects',
    newProjectLink
  }


  return (
    <div>
      <GridView {...gridProps} />
    </div>
  )
}

ConnectGridView.propTypes = {
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

export default ConnectGridView
