import React from 'react'
import PropTypes from 'prop-types'
import ListHeader from './ListHeader'
import ListItem from './ListItem'
import PaginationBar from './PaginationBar'
import Placeholder from './Placeholder'
import InfiniteScroll from 'react-infinite-scroller'
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator'
import NewGroupCard from '../../groups/groupsCard/NewGroupCard'
import './GridView.scss'


const GridView = props => {
  const { columns, sortHandler, currentSortField, ListComponent, resultSet, onPageChange, noMoreResultsMessage,
    totalCount, pageSize, currentPageNum, infiniteScroll, infiniteAutoload, isLoading, setInfiniteAutoload,
    entityNamePlural, newProjectLink,
    // entityName
  } = props
  const paginationProps = { totalCount, pageSize, currentPageNum, onPageChange }
  const headerProps = { columns, sortHandler, currentSortField }
  let noMoreResultsMsg = noMoreResultsMessage
  noMoreResultsMsg = noMoreResultsMsg ? noMoreResultsMsg : `No more ${entityNamePlural}`


  const renderItem = (item, index) => {
    return item.isPlaceholder ? <Placeholder columns={columns} key={`placeholder-${index}`} /> : <ListComponent columns={columns} item={item} key={item.id}/>
  }

  const handleLoadMore = () => {
    onPageChange(currentPageNum + 1)
    setInfiniteAutoload(true)
  }

  const renderGridWithPagination = () => (
    isLoading ? (
      <LoadingIndicator />
    ) : (
      <div className="container">
        <div className="flex-area">
          <div className="flex-data">
            <ListHeader {...headerProps} />
            {resultSet.length ? (
              resultSet.map(renderItem)
            ) : (
              <div style={{textAlign: 'center'}} className="gridview-no-project">  No results found <br/> </div>
            )}
          </div>
          <PaginationBar {...paginationProps} />
        </div>
      </div>
    )
  )

  const renderGridWithInfiniteScroll = () => {

    const hasMore = currentPageNum * pageSize < totalCount

    const placeholders = []
    if (isLoading & hasMore) {
      for (let i = 0; i < pageSize; i++) {
        placeholders.push({ isPlaceholder: true })
      }
    }

    return (
      <div>
        <div className="container">
          <div className="flex-area">
            <div className="flex-data">
              <ListHeader {...headerProps} />
              <InfiniteScroll
                initialLoad={false}
                pageStart={currentPageNum}
                loadMore={infiniteAutoload && !isLoading ? onPageChange : () => {}}
                hasMore={hasMore}
                threshold={250}
              >
                {[...resultSet, ...placeholders].map(renderItem)}
              </InfiniteScroll>
              {totalCount === 0 && <section className="content gridview-content">
                <div key="end" className="gridview-no-project">
                  No results found 
                </div>
              </section>}
            </div>
          </div>
        </div>
        { isLoading && <LoadingIndicator /> }

        { !isLoading && !infiniteAutoload && hasMore &&
            <div className="gridview-load-more">
              <button type="button" className="tc-btn tc-btn-primary" onClick={handleLoadMore} key="loadMore">Load more {entityNamePlural}</button>
            </div>
        }

        { !isLoading && !hasMore && <div key="end" className="gridview-no-more">{noMoreResultsMsg}</div>}
        {!!newProjectLink && <div className="project-card project-card-new">
          <NewGroupCard link={newProjectLink} />
        </div>}
      </div>
    )
  }

  return (
    <section className="content gridview-content">
      {infiniteScroll ? renderGridWithInfiniteScroll() : renderGridWithPagination()}
    </section>
  )
}

GridView.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  onPageChange: PropTypes.func,
  sortHandler: PropTypes.func,
  currentSortField: PropTypes.string,
  ListComponent: PropTypes.func,
  resultSet: PropTypes.arrayOf(PropTypes.object),
  totalCount: PropTypes.number,
  pageSize: PropTypes.number,
  currentPageNum: PropTypes.number,
  infiniteAutoload: PropTypes.bool,
  infiniteScroll: PropTypes.bool,
  setInfiniteAutoload: PropTypes.func,
  applyFilters: PropTypes.func,
  newProjectLink: PropTypes.string
}

GridView.defaultProps = {
  infiniteScroll: true,
  ListComponent: ListItem
}
export default GridView
