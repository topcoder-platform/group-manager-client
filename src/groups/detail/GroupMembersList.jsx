import React from 'react'
import './GroupDetail.scss'

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

  