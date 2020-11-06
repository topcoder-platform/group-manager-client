import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import moment from 'moment'
import TextTruncate from 'react-text-truncate'

import './GroupsGridView.scss'
import GridView from './../components/Grid/GridView'

import { GROUP_LIST_PER_PAGE } from './../config/constants'

const GroupsGridView = props => {
  const { groups, totalCount, pageNum, sortHandler, onPageChange,
    error, isLoading, infiniteAutoload, setInfiniteAutoload, sortField,
    applyFilters, newProjectLink } = props

  const currentSortField = sortField

  // This 'little' array is the heart of the list component.
  // it defines what columns should be displayed and more importantly
  // how they should be displayed.
  const columns = [
    {
      id: 'oldId',
      headerLabel: 'ID',
      classes: 'item-id',
      sortable: true,
      renderText: item => {
        const url = `/groups/${item.id}`
        const oldId = item.oldId ? item.oldId : 'NA'
        return (
          <Link to={url} className="spacing">
            {oldId}
          </Link>
        )
      }
    }, {
      id: 'name',
      headerLabel: 'Name',
      classes: 'item-projects',
      sortable: true,
      renderText: item => {
        const url = `/groups/${item.id}`
        const recentlyCreated = moment().diff(item.createdAt, 'days') < 7  
        return (
          <div className="spacing project-container">
            {(recentlyCreated) && <span className="blue-border" />}
            <div className="project-title">
              <Link to={url} className="link-title">{_.unescape(item.name)}</Link>
            </div>
            <Link to={url}>
              <TextTruncate
                containerClassName="project-description"
                line={2}
                truncateText="..."
                text={_.unescape(item.description)}
              />
            </Link>
          </div>
        )
      }
    }, 
    {
      id: 'status',
      headerLabel: 'Status',
      sortable: true,
      classes: 'item-status-date',
      renderText: item => {
        return (
          <div className="spacing time-container">
            {_.unescape(_.capitalize(item.status))}
          </div>
        )
      }
    },
    {
      id: 'createdAt',
      headerLabel: 'Created',
      sortable: true,
      classes: 'item-status-date',
      renderText: item => {
        const time = moment(item['createdAt'])
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
    resultSet: groups,
    totalCount,
    currentPageNum: pageNum,
    pageSize: GROUP_LIST_PER_PAGE,
    infiniteAutoload,
    infiniteScroll: true,
    setInfiniteAutoload,
    applyFilters,
    entityName: 'group',
    entityNamePlural: 'groups',
    noMoreResultsMessage: 'No more groups',
    newProjectLink
  }


  return (
    <div>
      <GridView {...gridProps} />
    </div>
  )
}

GroupsGridView.propTypes = {
  currentUser: PropTypes.object,
  groups: PropTypes.arrayOf(PropTypes.object),
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

export default GroupsGridView
