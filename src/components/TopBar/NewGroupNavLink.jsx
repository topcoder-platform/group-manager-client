import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './NewGroupNavLink.scss'
import BoldAdd from '../../assets/icons/ui-16px-1_bold-add.svg'

const NewGroupNavLink = ({ compact=false, link, label }) => {
  if (compact && /^https?:\/\//.test(link)) {
    return (
      <a
        href={link}
        className="new-group-link"
      >
        <div className="new-group-icon">
          <BoldAdd className="icon-bold-add" />
        </div>
      </a>
    )
  } else if (compact) {
    return (
      <Link
        to={link} className="new-group-link"
      >
        <div className="new-group-icon">
          <BoldAdd className="icon-bold-add" />
        </div>
      </Link>
    )
  } else if (/^https?:\/\//.test(link)) {
    return (
      <a
        href={link}
        className="tc-btn tc-btn-sm tc-btn-primary"
      >{label ? label : '+ New Group'}</a>
    )
  } else {
    return (
      <div className="new-group-link">
        <Link
          to={link} className="tc-btn tc-btn-sm tc-btn-primary"
        >{label ? label : '+ New Group'}</Link>
      </div>
    )
  }
}

NewGroupNavLink.propTypes = {
  compact: PropTypes.bool,
  link: PropTypes.string,
  label: PropTypes.string
}

export default NewGroupNavLink
