import React from 'react'

import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import GroupInfo from './GroupInfo'
import TailLeft from '../../assets/icons/arrows-16px-1_tail-left.svg'

import './GroupInfoContainer.scss'

class GroupInfoContainer extends React.Component {

  constructor(props) {
    super(props)
  }
 
  render() {
    const { group, totalMemberCount, loadedMemberCount, searchTerm } = this.props
    let groupLink = '/' 

    if (searchTerm) {
      groupLink = '/?keyword=' + searchTerm
    }

    return (
      <div>
        <div className="sideAreaWrapper">
          <div styleName="all-project-link-wrapper">
            <Link to={groupLink}>
              <div styleName="breadcrumb">
                <TailLeft styleName="icon-tail-left" />
                <span>ALL GROUPS</span>
              </div>
            </Link>
          </div>

          {/* Separator above project description */}
          <hr styleName="separator" />
          <GroupInfo
            group={group} totalMemberCount={totalMemberCount} loadedMemberCount={loadedMemberCount}
          />
          <hr styleName="separator" />
        
        </div>
      </div>
    )
  }
}

export default GroupInfoContainer
