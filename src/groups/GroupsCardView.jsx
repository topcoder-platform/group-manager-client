import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import InfiniteScroll from 'react-infinite-scroller'
import GroupCard from './groupsCard/GroupCard'
import NewGroupCard from './groupsCard/NewGroupCard'

import cn from 'classnames'
import { PROJECTS_LIST_PER_PAGE } from '../config/constants'

require('./GroupsGridView.scss')

const GroupsCardView = props => {
  const { groups, currentUser, onPageChange, pageNum, totalCount, infiniteAutoload, newGroupLink,
    setInfiniteAutoload, isLoading } = props
  
  const renderGroup = (group) => {
    return (<div key={group.id} className="project-card">
      <GroupCard
        group={group} 
      />
    </div>)
  }
  const handleLoadMore = () => {
    onPageChange(pageNum + 1)
    setInfiniteAutoload(true)
  }
  const hasMore = pageNum * PROJECTS_LIST_PER_PAGE < totalCount
  const placeholders = []
  if (isLoading & hasMore) {
    for (let i = 0; i < PROJECTS_LIST_PER_PAGE; i++) {
      placeholders.push({ isPlaceholder: true })
    }
  }

  const moreGroup = (isBeforeNewCard) => !isLoading && !infiniteAutoload && (
    <div className={cn('more-wrapper', {'more-wrapper-before-new-card': isBeforeNewCard})}>
      {hasMore
        ? <button type="button" className="tc-btn tc-btn-primary" onClick={handleLoadMore} key="loadMore">Load more groups</button>
        : <div key="end" className="cardview-no-more">No more groups</div>
      }
    </div>
  )

  if (totalCount === 0) {
    return (
      <div className="projects card-view">
        <div key="end" className="cardview-no-project">
          No results found based on current search criteria. <br /> Please modify your search criteria
        </div>
      </div>
    )
  }

  return (
    <div className="projects card-view">
      <InfiniteScroll
        initialLoad={false}
        pageStart={pageNum}
        loadMore={infiniteAutoload ? onPageChange : () => {}}
        hasMore={hasMore}
        threshold={500}
      >
        { [...groups, ...placeholders].map((group) => renderGroup(group))}
        {moreGroup(true)}
        <div className="project-card project-card-new">
          <NewGroupCard link={'/groups/new'} />
        </div>
      </InfiniteScroll>
      {moreGroup(false)}
    </div>
  )
}


GroupsCardView.propTypes = {

  groups: PropTypes.arrayOf(PropTypes.object),
  newGroupLink: PropTypes.string,
  totalCount: PropTypes.number,

  // isLoading: PropTypes.bool.isRequired,
  error: PropTypes.bool,

  pageNum: PropTypes.number,
  // criteria: PropTypes.object.isRequired
  infiniteAutoload: PropTypes.bool,
  setInfiniteAutoload: PropTypes.func,
  applyFilters: PropTypes.func,
  isLoading: PropTypes.bool,
}

GroupsCardView.defaultProps = {
  infiniteAutoload : false
}

export default GroupsCardView
