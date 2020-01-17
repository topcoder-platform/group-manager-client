import React from 'react'
import PropTypes from 'prop-types'
import './Placeholder.scss'

const Placeholder = ({ columns }) => {

  const renderColumn = (col, index) => {
    const divClasses = `flex-item-title ${col.classes} placeholder-parent`
    return (
      <div className={divClasses} key={index}>
        <div className="placeholder" />
      </div>
    )
  }

  return (
    <div className="row">
      <div className="flex-row">
        {columns.map(renderColumn)}
      </div>
    </div>
  )
}

Placeholder.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object)
}

export default Placeholder
