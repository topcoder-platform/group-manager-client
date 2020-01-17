import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

require('./LoadingIndicator.scss')

const LoadingIndicator = ({ isSmall, label }) => {
  return (
    <div>
      <div
        className={cn('loading-indicator', { small: isSmall })}
      />
      { (label ? <div className={'loading-text'}>{label} ...</div>: null) }
    </div>
  )
}

LoadingIndicator.defaulProps = {
  isSmall: false,
  label: null
}

LoadingIndicator.propTypes = {
  isSmall: PropTypes.bool,
  label: PropTypes.string
}

export default LoadingIndicator
