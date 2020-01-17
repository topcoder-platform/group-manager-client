/**
 * New Group Container, which houses the New Group form
 */
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import './NewGroupContainer.scss'

import MediaQuery from 'react-responsive'
import GroupInfoContainer from './GroupInfoContainer'
import Sticky from '../../components/Sticky'
import TwoColsLayout from '../../components/TwoColsLayout'

import { setCurrentGroupForEdit, saveGroup } from '../../actions/loadGroups'
import NewGroupForm from './NewGroupForm'

import { SCREEN_BREAKPOINT_MD } from '../../config/constants'

class NewGroupContainter extends React.Component {
  constructor(props) {
    super(props)
    this.toggleDrawer = this.toggleDrawer.bind(this)
    this.saveNewGroup = this.saveNewGroup.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    let editGroup = nextProps.group
    let displayGroup = {}
    if (nextProps.isNew) {
      editGroup =  {
        name: 'Wipro - Topgear - '
      },
      displayGroup = {
        name: 'New Group',
        description: ' New Group will be created under Wipro All. The group name should start with Wipro - Topgear - '
      }
    }
  
    this.setState({
      editGroup,
      displayGroup
    })
  }

  componentWillMount() {
    this.componentWillReceiveProps(this.props)
  }

  toggleDrawer() {
    this.setState((prevState) => ({
      open: !prevState.open
    }))
  }

  saveNewGroup(group) {
    this.props.saveGroup(group)
      .then(groupId => {
        if (groupId) {
          this.props.history.push(`/groups/${groupId}`)
        }
      })
  }

  render() {
    const leftArea = (
      <GroupInfoContainer group={this.state.displayGroup} />
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
          <NewGroupForm editGroup={this.state.editGroup} 
            saveRecord={this.saveNewGroup} isNew 
            isSaving={this.props.isSaving}
          />  
        </TwoColsLayout.Content>
      </TwoColsLayout>
    )
  }
}

const mapStateToProps = ({ currentGroup }) => {
  return {
    group: currentGroup.group,
    isSaving: currentGroup.isSaving
  }
}

NewGroupContainter.defaultProps = {
  isNew : true
}

const mapDispatchToProps = {
  setCurrentGroupForEdit,
  saveGroup
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewGroupContainter))
