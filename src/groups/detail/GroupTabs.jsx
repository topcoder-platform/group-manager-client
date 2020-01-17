import React, { Component } from 'react'
import './GroupTabs.scss'

import Tabs from 'appirio-tech-react-components/components/Tabs/Tabs'
import Tab from 'appirio-tech-react-components/components/Tabs/Tab'

import NewGroupForm from './NewGroupForm'
import MemberCollectionContainer from './../../members/MemberCollectionContainer'
import AddMemberFormContainer from './../../members/AddMemberFormContainer'

class GroupTabs extends React.Component {

  render() {
    const { group, saveRecord, isSaving } = this.props

    return (
      <div className="group-tabs">
        <Tabs onSelect={function(eventKey) {console.log(eventKey)}}  defaultActiveKey={this.props.selectedTab}>
          
          <Tab title="Add Members"eventKey="1" key="1"> 
            <AddMemberFormContainer currentGroup={group} />
          </Tab>

          <Tab title="Members" eventKey="2" key="2"> 
            <MemberCollectionContainer />   
          </Tab>
         
          <Tab title="Edit Group"eventKey="3" key="3"> 
            <NewGroupForm 
              editGroup={group} 
              saveRecord={saveRecord} 
              isSaving={isSaving}
            /> 
          </Tab>
        </Tabs>
      </div>
    )
  }
}

GroupTabs.defaultProps = {
  selectedTab: '2'
}

export default GroupTabs