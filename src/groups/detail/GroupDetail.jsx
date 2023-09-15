/**
 * DashboardContainer container
 * displays content of the Dashboard tab
 *
 * NOTE data is loaded by the parent ProjectDetail component
 */
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import './GroupDetail.scss'

import MediaQuery from 'react-responsive'
import GroupInfoContainer from './GroupInfoContainer'
import Sticky from '../../components/Sticky'
import TwoColsLayout from '../../components/TwoColsLayout'

import { loadGroupById, saveGroup } from '../../actions/loadGroups'
import { initializeAddMembers, loadMembersByGroupId } from '../../actions/loadMembers'

import {
  SCREEN_BREAKPOINT_MD,
} from '../../config/constants'
import GroupTabs from './GroupTabs'
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator'


class GroupDetail extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
    }
    this.toggleDrawer = this.toggleDrawer.bind(this)
    this.updateGroup = this.updateGroup.bind(this)
  }

  componentWillMount() {
    const groupId = this.props.match.params.groupId
    this.props.loadGroupById(groupId)
  }

  // eslint-disable-next-line no-unused-vars
  componentWillReceiveProps(nextProps) {
  }


  componentDidMount() {
    // if the user is a customer and its not a direct link to a particular phase
    // then by default expand all phases which are active
    // eslint-disable-next-line no-unused-vars
    const { isCustomerUser, expandProjectPhase, location } = this.props

  }

  updateGroup(group) {
    this.props.saveGroup(group)
      // eslint-disable-next-line no-unused-vars
      .then(response => {
        
      })
  }

  componentWillUnmount() {
    //const { collapseAllProjectPhases } = this.props

    
  }

  toggleDrawer() {
    this.setState((prevState) => ({
      open: !prevState.open
    }))
  }

  getGroupDetailView() {
    if (this.props.isGroupLoading) {
      return <LoadingIndicator label={'Loading Group'} />
    }

    return (
      <GroupTabs members={this.props.members} 
        group={this.props.currentGroup} 
        saveRecord={this.updateGroup}
        isSaving={this.props.isSaving}
      />)
  }

  render() {
    const {
      currentGroup,
      members,
      totalMemberCount
    } = this.props
    
    const loadedMemberCount = members ? members.length: 0
    
    const leftArea = (
      <GroupInfoContainer group={currentGroup} 
        loadedMemberCount={loadedMemberCount} 
        searchTerm={this.props.searchTerm}
        totalMemberCount={totalMemberCount} 
      />
    )

    return (
      <TwoColsLayout>
        
        <TwoColsLayout.Sidebar>
          <MediaQuery minWidth={SCREEN_BREAKPOINT_MD}>
            {(matches) => {
              if (matches) {
                return <Sticky top={60}>{leftArea}</Sticky>
              } else {
                return leftArea
              }
            }}
          </MediaQuery>
        </TwoColsLayout.Sidebar>

        <TwoColsLayout.Content>
          <div styleName="add-button-container">
            {this.getGroupDetailView()}
          </div>
        </TwoColsLayout.Content>
      </TwoColsLayout>
    )
  }
}

const mapStateToProps = ({ searchTerm, currentGroup }) => {
  return {
    currentGroup : currentGroup.group,
    members: currentGroup.members,
    isGroupLoading: currentGroup.isGroupLoading,

    searchTerm: searchTerm.searchTerm,

    isSaving: currentGroup.isSaving,
    isMemberLoading: currentGroup.isMemberLoading,
    totalMemberCount: currentGroup.totalMemberCount
  }
}

const mapDispatchToProps = {
  loadGroupById,
  initializeAddMembers,
  loadMembersByGroupId,
  saveGroup
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GroupDetail))
