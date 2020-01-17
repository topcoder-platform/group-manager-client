import React from 'react'
import PropTypes from 'prop-types'
import './MembersGridView.scss'

import GridView from '../components/Grid/GridView'

const MembersGridView = props => {
  const { members, totalCount, currentSortField, pageNum, sortHandler, onPageChange,
    error, isLoading, infiniteAutoload, setInfiniteAutoload, removeMember,
    applyFilters, newProjectLink } = props 


  // This 'little' array is the heart of the list component.
  // it defines what columns should be displayed and more importantly
  // how they should be displayed.
  const columns = [
    {
      id: 'memberId',
      headerLabel: 'Member ID',
      classes: 'item-id',
      sortable: true,
      renderText: item => {
        return (
          <div className="spacing">
            {item.memberId}
          </div>
        )
      }
    },
    {
      id: 'user.first_name',
      headerLabel:'Name',
      sortable: true,
      classes: 'item-member-name',
      renderText: item => {
        return (
          <div className="txt-normal">{item['user.first_name']} {item['user.last_name']}</div>
        )
      }
    },
    {
      id: 'user.handle',
      headerLabel: 'Handle',
      classes: 'item-member-handle',
      sortable: true,
      renderText: item => {
        return (
          <div>{item['user.handle']}</div>
        )
      }
    },
    {
      id: 'user.email',
      headerLabel: 'Email',
      classes: 'item-member-email',
      sortable: true,
      renderText: item => {
        return (
          <div>{item['user.email']}</div>
        )
      }
    },
    {
      id: 'remove',
      headerLabel: 'Remove',
      classes: 'item-member-remove-btn',
      sortable: false,
      renderText: item => {
        return (
          <div className="removeBtnContainer">
            <button onClick={() => {removeMember(item)}} 
              className="tc-btn tc-btn-sm tc-btn-red"
            >Remove
            </button>
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
    pageSize: 20,
    infiniteAutoload,
    infiniteScroll: true,
    setInfiniteAutoload,
    applyFilters,
    entityName: 'Member',
    entityNamePlural: 'members',
    noMoreResultsMessage: 'No more members',
    newProjectLink,
  }


  return (
    <div>
      <GridView {...gridProps} />
    </div>
  )
}



MembersGridView.propTypes = {
  currentUser: PropTypes.object,
  groups: PropTypes.arrayOf(PropTypes.object),
  newProjectLink: PropTypes.string,
  totalCount: PropTypes.number,

  isLoading: PropTypes.bool,
  error: PropTypes.bool,
  onPageChange: PropTypes.func,
  sortHandler: PropTypes.func.isRequired,
  removeMember: PropTypes.func.isRequired,
  pageNum: PropTypes.number,
  currentSortField: PropTypes.string
}

export default MembersGridView
