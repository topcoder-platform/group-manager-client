require('./BulkUploadListNavHeader.scss')

import React, { Component } from 'react'
import PT from 'prop-types'

import RefreshIcon from '../assets/icons/refresh8x8.svg'

export default class BulkUploadListNavHeader extends Component {

  constructor(props) {
    super(props) 
    this.refreshClick = this.refreshClick.bind(this)
  }
  
  refreshClick(e) {
    e.preventDefault()
    this.props.refresh()
  }

  render() {
    return (
      <nav className="list-nav-container">
        <div className="left-wrapper">
          All Bulk Uploads ( {this.props.batches} of {this.props.total} )
          <a href="javascript:void(0)" className={'refresh-icon'} onClick={this.refreshClick}>
            <RefreshIcon height={16}/>
          </a>
        </div>
        
        <div className="right-wrapper">
          &nbsp;
        </div>
      </nav>
    )
  }
}
BulkUploadListNavHeader.propTypes = {
  batches: PT.number,
  total: PT.number
}
