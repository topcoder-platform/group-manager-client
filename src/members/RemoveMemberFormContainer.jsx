/**
 * Add Member form Container acts as the top Level container for Add Member form
 */
 import React from 'react'
 import _ from 'lodash'
 import { connect } from 'react-redux'
 import { withRouter } from 'react-router-dom'
 
 import { removeUserMembersToGroup } from './../actions/loadMembers'
 
 import RemoveMemberForm from './RemoveMemberForm'
 import RemoveMembersGridViewStatus from './RemoveMembersGridViewStatus'
 import { splitIntoEmailAndHandle } from './../helpers/utils'
 
 class RemoveMemberFormContainer extends React.Component {
   constructor(props) {
     super(props)
     this.removeMembers = this.removeMembers.bind(this)
   }
 
   removeMembers(groupId, data) {
     const handleEmail = splitIntoEmailAndHandle(_.trim(data.handleStr))
     this.props.removeUserMembersToGroup(groupId, handleEmail.handleArr, handleEmail.emailArr)
   }
 
   render() {
 
     return (
       <div>
         <div>
           <nav className="list-nav-container" style={{marginLeft: 0}}>
             <div className="left-wrapper" style={{textAlign:'left'}}>
                Remove Members
             </div>
           </nav>
         </div>      
         <RemoveMemberForm currentGroup={this.props.currentGroup} 
           removeMembers={this.removeMembers} isSaving={this.props.isSaving}
         />
 
         <div>
           <nav className="list-nav-container" style={{marginLeft: 0}}>
             <div className="left-wrapper" style={{textAlign:'left'}}>
                Remove Members Status
             </div>
           </nav>
         </div>  
         <RemoveMembersGridViewStatus members={this.props.members} />
       </div> 
     )
   }
 }
 
 const mapStateToProps = ({ removeMembers }) => {
   return {
     members: removeMembers.members,
     isSaving: removeMembers.isSaving,
   }
 }
 
 
 const mapDispatchToProps = {
   removeUserMembersToGroup
 }
 
 export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RemoveMemberFormContainer))
 