/**
 * Notification Item
 *
 * Has a tick to toggle read status
 */
import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import cn from 'classnames'
import moment from 'moment'
import { Link } from 'react-router-dom'
import './SectionItem.scss'


import IconRight from './../../assets/icons/arrows-16px-1_minimal-right.svg'
import IconDown from './../../assets/icons/arrows-16px-1_minimal-down.svg'

class SectionItem extends React.Component { 

  constructor() {
    super()
    this.state = {
      isExpanded : false
    }
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({
      isExpanded: !this.state.isExpanded
    })
  }


  render() {
    const { details, title, transitionState } = this.props
    const displayValue = this.state.isExpanded ? {display: 'block'} : {display: 'none'}

    const notificationItem = (
      <div className="notification-item-link">
        <div className={cn('notification-item', transitionState)}>
          <div className="icon">
            <a href="javascript:void(0)" onClick={this.toggle}>
              {this.state.isExpanded ? <IconDown /> : <IconRight /> }
            </a>
          </div>
          <div className="body">
            <a className="content" href="javascript:void(0)" onClick={this.toggle}>
              {title}
            </a>
            <p className="date" style={displayValue}>
              {details}
            </p>
          </div>
        </div>
      </div>
    )

    return (
      notificationItem
    )
  }
}


SectionItem.propTypes = {
  text: PropTypes.string,
  seen: PropTypes.bool,
  
}

export default SectionItem
