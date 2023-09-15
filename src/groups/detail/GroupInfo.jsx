import React, { Component } from 'react'
import PT from 'prop-types'
import _ from 'lodash'
import moment from 'moment'

import './GroupInfo.scss'

class GroupInfo extends Component {

  constructor(props) {
    super(props)
  }

  getChildGroupCount() {
    const childGroupIds = this.props.group.childGroupIds
    if (childGroupIds && childGroupIds.length > 0) {
      return childGroupIds.length
    }
    return 0
  }

  render() {
    const { group } = this.props
    const childGroupCount = this.getChildGroupCount()

    return (
      <div className="project-info">
        <div className="project-status">
          <div styleName="project-name">{_.unescape(group.name)}</div>

          <div styleName="project-status-bottom">
            <div className="project-status-time">
              Created {moment(group.createdAt).format('MMM DD, YYYY')}
            </div>
           
          </div>
        </div>

        <div className="project-info-review">
          <p>
            {_.unescape(group.description)}
          </p>
        </div>
       
        <hr styleName="separator separator-margin-top"/>
        
        <div className="project-info-review">
          <p>&nbsp;</p>
          <p>  
            <span className="bold">Total Members : </span>{ this.props.totalMemberCount }
          </p>
          <p>
            <span className="bold">Child Groups : </span>{childGroupCount}
          </p>
          <p>  
            <span className="bold">Loaded Members : </span> { this.props.loadedMemberCount }
          </p>  
        </div>
      </div>
    )
  }
}

GroupInfo.propTypes = {
  group: PT.object,
  members: PT.array,
  isGroupProcessing: PT.bool,
}

export default GroupInfo
