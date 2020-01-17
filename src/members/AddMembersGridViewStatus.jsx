import React from 'react'
import _ from 'lodash'

import './AddMembersGridViewStatus.scss'

import GridView from '../components/Grid/GridView'

import IconSuccess from './../assets/icons/icon-check-solid.svg'
import IconFailure from './../assets/icons/x-mark-red.svg'
import IconPending from './../assets/icons/notification-review-pending.svg'


const AddMembersGridViewStatus = props => {
  const { members, totalCount, pageNum, sortHandler, onPageChange,
    error, isLoading, infiniteAutoload, setInfiniteAutoload,
    applyFilters, newProjectLink } = props

  const currentSortField = 'name'  

  // This 'little' array is the heart of the list component.
  // it defines what columns should be displayed and more importantly
  // how they should be displayed.
  const columns = [
    {
      id: 'type',
      headerLabel: 'Type',
      classes: 'item-type',
      sortable: false,
      renderText: item => {
        return (
          <div className="spacing">
            {item.membershipType}
          </div>
        )
      }
    },
    {
      id: 'identifier',
      headerLabel: 'Identifier',
      classes: 'item-identifier',
      sortable: false,
      renderText: item => {
        return (
          <div className="spacing">
            {item.identifier}
          </div>
        )
      }
    },
    {
      id: 'data',
      headerLabel: 'Data',
      classes: 'item-data',
      sortable: false,
      renderText: item => {
        return (
          <div className="spacing">
            {item.data}
          </div>
        )
      }
    },
    {
      id: 'status',
      headerLabel:'Status',
      sortable: false,
      classes: 'item-status',
      renderText: item => {      
        const responsePresent = _.get(item, 'response.resolved', false)
        if (!responsePresent) {
          return (
            <div className="txt-normal">
              <IconPending height={16} width={16} />
            </div>
          )  
        }

        const isValid = _.get(item, 'response.isValid', false)
        return (
          <div className="txt-normal">
            {(isValid ? <IconSuccess height={32} width={32} /> : <IconFailure height={32} width={32} />)}
          </div>
        )
      }
    },
    {
      id: 'message',
      headerLabel: 'Message',
      classes: 'item-message',
      sortable: false,
      renderText: item => {
        const responsePresent = _.get(item, 'response.resolved', false)
        if (!responsePresent) {
          return (
            <span>&nbsp;</span>
          )  
        }

        let message = _.get(item, 'response.message', '')
        if (_.get(item, 'response.isValid', false)) {
          message = 'User added'
        }

        return (
          <div className="txt-normal">
            {message}
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
    currentSortField,
    sortHandler,
    resultSet: members,
    totalCount,
    currentPageNum: pageNum,
    pageSize: 200,
    infiniteAutoload,
    infiniteScroll: false,
    setInfiniteAutoload,
    applyFilters,
    entityName: 'member',
    entityNamePlural: 'members',
    noMoreResultsMessage: 'No more members',
    newProjectLink
  }


  return (
    <div>
      <GridView {...gridProps} />
    </div>
  )
}

export default AddMembersGridViewStatus
