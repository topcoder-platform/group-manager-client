import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import './ChildGroupMembersGridView.scss'

import GridView from '../components/Grid/GridView'
import {
  GROUP_LIST_PER_PAGE
} from '../config/constants'

const ChildGroupMembersGridView = props => {
  const { members, totalCount, pageNum, sortHandler, onPageChange,
    error, isLoading, infiniteAutoload, setInfiniteAutoload, 
    applyFilters, newProjectLink } = props

  const currentSortField  = 'name'
  // This 'little' array is the heart of the list component.
  // it defines what columns should be displayed and more importantly
  // how they should be displayed.
  const columns = [
    {
      id: 'id',
      headerLabel: 'Group ID',
      classes: 'item-id',
      sortable: false,
      renderText: item => {
        return (
          <div className="spacing">
            {item.oldId}
          </div>
        )
      }
    }, {
      id: 'name',
      headerLabel:'Name',
      sortable: false,
      classes: 'item-child-group-name',
      renderText: item => {
     
        return ( 
          <div className="txt-normal">
            {item.name}
          </div>
        )
      }
    }, {
      id: 'createdAt',
      headerLabel:'Created At',
      sortable: false,
      classes: 'item-child-group-created',
      renderText: item => {
        const time = moment(item.createdAt)
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
    resultSet: members,
    totalCount,
    currentPageNum: pageNum,
    pageSize: GROUP_LIST_PER_PAGE,
    infiniteAutoload,
    infiniteScroll: true,
    setInfiniteAutoload,
    applyFilters,
    entityName: 'group',
    entityNamePlural: 'groups',
    noMoreResultsMessage: 'No more child groups',
    newProjectLink
  }

  return (
    <div>
      <GridView {...gridProps} />
    </div>
  )
}

export default ChildGroupMembersGridView
