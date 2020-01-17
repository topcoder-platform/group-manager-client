/**
 * Add Member form Container acts as the top Level container for Add Member form
 */
import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { addUserMembersToGroup } from './../actions/loadMembers'

import AddMemberForm from './AddMemberForm'
import AddMembersGridViewStatus from './AddMembersGridViewStatus'
import { splitIntoEmailAndHandle } from './../helpers/utils'

class AddMemberFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.addMembers = this.addMembers.bind(this)
  }

  addMembers(groupId, data) {
    const handleEmail = splitIntoEmailAndHandle(_.trim(data.handleStr))
    this.props.addUserMembersToGroup(groupId, handleEmail.handleArr, handleEmail.emailArr)
  }

  render() {

    return (
      <div>
        <div>
          <nav className="list-nav-container" style={{marginLeft: 0}}>
            <div className="left-wrapper" style={{textAlign:'left'}}>
               Add Members
            </div>
          </nav>
        </div>      
        <AddMemberForm currentGroup={this.props.currentGroup} 
          addMembers={this.addMembers} isSaving={this.props.isSaving}
        />

        <div>
          <nav className="list-nav-container" style={{marginLeft: 0}}>
            <div className="left-wrapper" style={{textAlign:'left'}}>
               Add Members Status
            </div>
          </nav>
        </div>  
        <AddMembersGridViewStatus members={this.props.members} />
      </div> 
    )
  }
}

const mapStateToProps = ({ addMembers }) => {
  return {
    members: addMembers.members,
    isSaving: addMembers.isSaving,
  }
}


const mapDispatchToProps = {
  addUserMembersToGroup
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddMemberFormContainer))
