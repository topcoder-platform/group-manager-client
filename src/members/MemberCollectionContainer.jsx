import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Modal from 'react-modal'
import querystring from 'query-string'


import './MemberContainerCollection.scss'

import SearchBar from 'appirio-tech-react-components/components/SearchBar/SearchBar'
import HelpIcon from 'appirio-tech-react-components/components/HelpIcon/HelpIcon'
import LoadingIndicator from './../components/LoadingIndicator/LoadingIndicator'


import { loadChildGroupsForGroup, setInfiniteAutoload, loadMembersByGroupId, removeMember, refreshMembers } 
  from './../actions/loadMembers'
import { setCurrentMemberSortField, setCurrentMemberSearchTerm } from './../actions/setSearchTerm'
import { filterMembers, sortMembers } from './../helpers/utils'


import ChildGroupMemberGridView from './ChildGroupMembersGridView'
import MembersGridView from './MembersGridView'
import RefreshIcon from '../assets/icons/refresh8x8.svg'

class MemberCollectionContainer extends React.Component {
  constructor(props) {
    super(props)
    
    //Set the confirm modal to false
    this.state = {
      showDeleteModal: false,
      currentMember: {}
    }

    this.handleTermChange = this.handleTermChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.onPageChange = this.onPageChange.bind(this)
    this.sortHandler = this.sortHandler.bind(this)
    this.removeMember = this.removeMember.bind(this)
    this.refreshUserMembers = this.refreshUserMembers.bind(this)
    this.cancelDelete = this.cancelDelete.bind(this)
    this.confirmDelete = this.confirmDelete.bind(this)
    this.getDeletionProgress = this.getDeletionProgress.bind(this)
  }

  cancelDelete() {
    this.setState({
      showDeleteModal: false,
      currentMember: {}    
    })
  }

  confirmDelete() {
    this.props.removeMember(this.state.currentMember)
      .then(() => {
        this.cancelDelete()
      })
      .catch(() => {
        this.cancelDelete()
      })
  }
 

  handleTermChange(oldTerm, searchTerm, reqNo, callback) {
    callback(reqNo, [])  
  }
  
  // Called from Member Grid View, to initiate deletion process
  removeMember(member) {
    this.setState({
      showDeleteModal: true,
      currentMember: member    
    })
  }

  sortHandler(sortField) {
    this.props.setCurrentMemberSortField(sortField)
  }

  handleSearch(keyword) {
    let search = null
    if (keyword) {
      search = '?member=' + keyword
    }

    this.props.history.push({ 
      pathname: this.props.location.pathname,
      search
    })
    this.props.setCurrentMemberSearchTerm( keyword )
  }

  onPageChange() {
    if (!this.props.isCurrentMembersLoading) {
      this.props.loadMembersByGroupId(this.props.currentGroup.groupId, this.props.pageNum + 1)
    }
  }

  componentDidMount() {
    const groupId = _.get(this.props.currentGroup, 'group.id')
    
    if (groupId) {
      this.props.loadChildGroupsForGroup(this.props.currentGroup.groupId)
      this.props.loadMembersByGroupId(this.props.currentGroup.groupId, this.props.pageNum)
    }
  }

  refreshUserMembers() {
    this.props.refreshMembers(this.props.currentGroup.groupId)
  }

  componentWillMount() {
    const queryParams = querystring.parse(location.search)
    // update query string if there is a search
    if (queryParams.member) {
      this.props.setCurrentMemberSearchTerm( queryParams.member )
    }
  }
  getTotalUserCount() {
    const childGroups = this.props.currentGroup.childGroups
    if (childGroups && childGroups.length > 0) {
      return this.props.memberCount - childGroups.length
    }
    return this.props.memberCount
  }

  getChildGroupsContainer() {
    const childGroups = this.props.currentGroup.childGroups
    
    if (!childGroups || childGroups.length === 0) {
      return null
    }

    return (
      <div>
        <nav className="list-nav-container" style={{marginLeft: 0}}>
          <div className="left-wrapper"  style={{textAlign:'left'}}>
              Child Groups ( { childGroups.length } )
          </div>
        </nav>  
        <ChildGroupMemberGridView members={childGroups} />
      </div>
    )
  }

  getDeletionProgress() {
    if (this.props.isDeleting) {
      return (<div>
        <LoadingIndicator label={'Deleting'} />
      </div>)
    }
    return null
  }
 
  getMemberLoading() {
    if (this.props.isCurrentMembersLoading) {
      return <LoadingIndicator isSmall />
    }
    return null
  }

  render() {

    const members  = this.props.currentGroup.members
    if ( !this.props.currentGroup.groupId) {
      return ( <div>Loading..</div>)
    }  

    let filteredMembers = sortMembers(filterMembers(members, this.props.currentMemberSearchTerm), this.props.currentMemberSortField)
    if (!filteredMembers) {
      filteredMembers = []
    }

    return (
      <div style={{textAlign:'left'}}>
    
        {/* Display Child Groups if not empty */}
        {this.getChildGroupsContainer()}
        

        <nav className="list-nav-container" style={{marginLeft: 0}}>
          <div className="left-wrapper" style={{textAlign:'left'}}>
            Users ( { filteredMembers.length } / { this.getTotalUserCount() } )
            <a href="javascript:void(0)" className={'refresh-icon'} onClick={ this.refreshUserMembers }>
              <RefreshIcon height={16} />
            </a>
          </div>
          {this.getMemberLoading()}
          <HelpIcon tooltip="Search is limited to displayed users. Scroll or use load more button to load users for the group" />
        </nav>  

        <SearchBar
          hideSuggestionsWhenEmpty
          showPopularSearchHeader={ false }
          searchTermKey="member"
          onTermChange={ this.handleTermChange }
          onSearch={ this.handleSearch }
          onClearSearch={ this.handleSearch }
        /> 

        <MembersGridView members={filteredMembers}  
          setInfiniteAutoload={this.props.setInfiniteAutoload} 
          onPageChange={this.onPageChange} 
          pageNum={this.props.pageNum}
          infiniteAutoload={this.props.infiniteAutoload}
          totalCount={this.props.memberCount}
          sortHandler={this.sortHandler}
          isLoading={this.props.isCurrentMembersLoading}
          currentSortField={this.props.currentMemberSortField}
          removeMember={this.removeMember}
        />

        <Modal
          isOpen={this.state.showDeleteModal}
          className="delete-template-dialog"
          onRequestClose={ this.cancelDelete }
          overlayClassName="delete-template-dialog-overlay"
          contentLabel=""
        >
          <div className="modal-body">
            Are you sure you want to remove the user "{this.state.currentMember['user.handle']}" ?
            {this.getDeletionProgress()}
          </div>

          <div className="button-area flex center action-area">
            <button
              className="tc-btn tc-btn-default tc-btn-sm action-btn btn-cancel" 
              onClick={this.cancelDelete} disabled={this.props.isDeleting}
            >Cancel
            </button>
            &nbsp;&nbsp;
            <button
              className="tc-btn tc-btn-warning tc-btn-sm action-btn"
              onClick={this.confirmDelete} disabled={this.props.isDeleting}
            >Delete
            </button>
          </div>
        </Modal>

      </div>
    )
  }
}

const mapStateToProps = ({currentGroup, searchTerm}) => {
  return {
    currentGroup,
    pageNum: currentGroup.memberPageNumber,
    infiniteAutoload: currentGroup.infiniteAutoload,
    memberCount: currentGroup.totalMemberCount,
    isDeleting: currentGroup.isDeleting,
    isCurrentMembersLoading: currentGroup.isCurrentMembersLoading,
    
    currentMemberSearchTerm : searchTerm.currentMemberSearchTerm,
    currentMemberSortField: searchTerm.currentMemberSortField
  }
}
  
  
const mapDispatchToProps = {
  loadChildGroupsForGroup,
  loadMembersByGroupId,
  setInfiniteAutoload,
  setCurrentMemberSortField,
  setCurrentMemberSearchTerm,
  removeMember,
  refreshMembers
}
  
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MemberCollectionContainer))
  