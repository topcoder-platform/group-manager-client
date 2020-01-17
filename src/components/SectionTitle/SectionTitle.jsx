/**
 * Title for sections of notifications
 *
 * Can be two types depend on isGlobal flag
 */
import React from 'react'
import PropTypes from 'prop-types'
import './SectionTitle.scss'

const SectionTitle = (props) => {
  return (
    <section className={'notifications-section-title' + (props.isTop ? ' global' : '')}>
      {props.isGlobal ?
        <h2 className="title">{props.title}</h2> :
        <h3 className="title">{props.title}</h3>
      }
    </section>
  )
}

SectionTitle.propTypes = {
  title: PropTypes.string,
  isTop: PropTypes.bool,
}

export default SectionTitle
