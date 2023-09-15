import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import './GroupDetail.scss'

import MediaQuery from 'react-responsive'

class GroupMemberList extends React.Component {
  constructor(props) {
    super(props)
  }   
   
  render() {
    return (<div>
      {this.props.members.map((member) => (
        <p key={member.member.memberId}>{member.memberId, member['user.email']} </p>
      ))}
    </div>)
  }
}

export default GroupMemberList

  