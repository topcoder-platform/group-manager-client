import React from 'react'
import PropTypes from 'prop-types'

const ListItem = ({ item, columns }) => {

  const renderColumn = (col, index) => {
    const divClasses = `flex-item-title ${col.classes}`
    return (
      <div className={divClasses} key={index}>
        {col.renderText(item)}
      </div>
    )
  }
  let rowClasses = 'flex-row'
  if (item.status === 'completed' || item.status === 'cancelled') {
    rowClasses += ' dark-row'
  }
  return (
    <div className="row">
      <div className={rowClasses}>
        <div className="mask-layer hide" />
        {columns.map(renderColumn)}
      </div>
    </div>
  )
}

ListItem.propTypes = {
  item: PropTypes.object,
  columns: PropTypes.arrayOf(PropTypes.object)
}

export default ListItem
