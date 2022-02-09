import _ from 'lodash'
import {

  LOAD_CURRENT_GROUP_MEMBERS_SUCCESS,
  LOAD_CURRENT_GROUP_MEMBERS_FAILURE,
  

  LOAD_CURRENT_CHILD_GROUP_MEMBERS_PENDING,
  LOAD_CURRENT_CHILD_GROUP_MEMBERS_SUCCESS,

  ADD_MEMBERS_PENDING,
  ADD_MEMBERS_FAILURE,
  ADD_MEMBERS_SUCCESS,
  ADD_MEMBERS_INITIALIZE,
  LOAD_CHILD_GROUPS_SUCCESS,

  SET_MEMBERS_INFINITE_AUTOLOAD,
  SET_CURRENT_MEMBER_PAGE_NUM,

  REMOVE_GROUP_MEMBER_PENDING,
  REMOVE_GROUP_MEMBER_SUCCESS,
  REMOVE_GROUP_MEMBER_FAILURE,

  REMOVE_MEMBERS_PENDING,
  REMOVE_MEMBERS_SUCCESS,
  REMOVE_MEMBERS_FAILURE

} from './../config/constants'

import { getGroupMembers, addUsersByHandle, addUsersByEmail, removeMemberFromGroup } from './../api/members'
import {  extractAllChildGroupsForGroup, removeMemberFromList } from './../helpers/utils'
 
// ---------------------------ADD USERS TO GROUP ------------------------------//

export function addUserMembersToGroup(groupId, handleArr, emailArr) {
  const allMembers = [] 

  handleArr = _.uniq(handleArr)
  emailArr = _.uniq(emailArr)

  _.forEach(handleArr, (handle) => {
    allMembers.push( {membershipType: 'User', identifier: 'Handle', data: handle})
  })
  _.forEach(emailArr, (email) => {
    allMembers.push( {membershipType: 'User', identifier: 'Email', data: email})
  })

  return ((dispatch) => {
    dispatch({type: ADD_MEMBERS_PENDING, payload: {groupId, members: allMembers}})
    
    // If handle has data
    addUsersHandle(groupId, handleArr)
      .then(result => {
        return Promise.resolve(processMemberResult(result, allMembers))
      })
      .then(() => {
        return addUsersEmail(groupId, emailArr)
      }) 
      .then(result => {
        return Promise.resolve(processMemberResult(result, allMembers))
      })  
      .then(() => {
        dispatch({type: ADD_MEMBERS_SUCCESS, payload: {groupId, members: allMembers}})  
      })
      .catch(err => {
        dispatch({type: ADD_MEMBERS_FAILURE, payload: {err} })
      })
  })
}

function processMemberResult(allResults, allMembers) {
  _.forEach(allResults, (result) => {
    for(let i = 0; i < allMembers.length; i++) {
      const userEmail = result['user.email']
      const userHandle = result['user.handle']
      const data = allMembers[i].data ? allMembers[i].data.toLowerCase(): ''

      if (userEmail && userEmail.toLowerCase() === data) {
        allMembers[i].response = result
        break
      }
      if (userHandle && userHandle.toLowerCase() === data) {
        allMembers[i].response = result
        break
      }
    }
  })
}

function addUsersEmail(groupId, emailArr) {
  if (!emailArr || emailArr.length === 0) {
    return Promise.resolve([])
  }
  return addUsersByEmail(groupId, emailArr)
}

function addUsersHandle(groupId, handleArr) {
  if (!handleArr || handleArr.length === 0) {
    return Promise.resolve([])
  }
  return addUsersByHandle(groupId, handleArr)
}

// ---------------------------END ADD USERS TO GROUP ------------------------------//


export function loadChildGroupsForGroup(groupId) {
  return ((dispatch, getState) => {
    dispatch({type: LOAD_CURRENT_CHILD_GROUP_MEMBERS_PENDING, payload: { groupId }})

    // Check if have already loaded this before and data is available in cache
    const childGroupContainer = getState().childGroups[groupId]
    if (childGroupContainer && childGroupContainer.isLoaded) {
      dispatch( { type: LOAD_CURRENT_CHILD_GROUP_MEMBERS_SUCCESS, payload : { groupId, childGroups : childGroupContainer.childGroups }})
      return
    }

    //If is Loaded is false means the child groups are never loaded
    const childGroups = extractAllChildGroupsForGroup(getState().groups.allGroups, groupId)

    // Load the data in current group array for display
    dispatch({type: LOAD_CURRENT_CHILD_GROUP_MEMBERS_SUCCESS, payload : { groupId, childGroups } })

    // Save the data in cache for other time load
    dispatch({type: LOAD_CHILD_GROUPS_SUCCESS, payload: {groupId, childGroups} })

  })
}
// --------------------------- LOADING OF MEMBERS ------------------------------ //
export function initializeAddMembers(groupId) {
  return ( dispatch => {
    dispatch( {type: ADD_MEMBERS_INITIALIZE, payload: {groupId} })
  })
}

export function refreshMembers(groupId) {
  return ((dispatch) => {
    dispatch({ type: SET_MEMBERS_INFINITE_AUTOLOAD, payload: false })
    return populateMembersForGroupId(dispatch, groupId, 1)
  })
}

function processMemberApiResponse(groupId, response) {
  const memberApiResponse = _.cloneDeep(response)
  const members = memberApiResponse.data
  let total = -1
  
  if (memberApiResponse.total) { 
    try {
      total = parseInt(memberApiResponse.total, 10)
    } catch(e) { console.log('Error parsing total')}
  }
  
  return  {
    groupId,
    members,
    total
  }
}

function populateMembersForGroupId(dispatch, groupId, pageNumber) {
  dispatch({ type : SET_CURRENT_MEMBER_PAGE_NUM, payload: { pageNumber }})
  const meta = {
    //keep previous to if page Number is not 1 to preserve old values
    keepPrevious : pageNumber !== 1
  }

  return getGroupMembers(groupId, pageNumber)
    .then(response => {
      const payload = processMemberApiResponse(groupId, response)      
      //Response contains the parent Group
      dispatch({type: LOAD_CURRENT_GROUP_MEMBERS_SUCCESS, payload, meta })
    })
    .catch(err => {
      dispatch({type: LOAD_CURRENT_GROUP_MEMBERS_FAILURE, payload: {err} })
    })
}

export function loadMembersByGroupId(groupId, pageNumber) { 
  return (( dispatch, getState ) => {
    const currentPage = getState().currentGroup.memberPageNumber
    //If page number has changed or page Number is 1, then refresh 
    //the group members
    if (currentPage !== pageNumber || pageNumber === 1) {
      return populateMembersForGroupId(dispatch, groupId, pageNumber)
    }
  })
}

/*
* Load Members infinite scroll related methods
*/
export function setInfiniteAutoload(infiniteAutload) {
  return (dispatch) => {
    dispatch({ type: SET_MEMBERS_INFINITE_AUTOLOAD, payload: infiniteAutload })
  }
}

// ------------------------- REMOVE MEMBER --------------------------------------//
export function removeMember(member) {
  const groupId = _.get(member, 'groupId', '')
  const memberId = _.get(member, 'memberId', '')

  return ( (dispatch, getState ) => {
    dispatch( { type: REMOVE_GROUP_MEMBER_PENDING} )

    return removeMemberFromGroup(groupId, memberId)
      .then (() => {
     
        const members = getState().currentGroup.members
        removeMemberFromList( members, memberId)

        const filteredMembers = getState().currentGroup.filteredMembers
        removeMemberFromList( filteredMembers, memberId)
        
        dispatch( { type: REMOVE_GROUP_MEMBER_SUCCESS, payload: { groupId, members, member, filteredMembers } })
      })
      .catch(err => {
        dispatch( {type : REMOVE_GROUP_MEMBER_FAILURE, payload : {err} })
      })
  })
}

// remove members -----

export function removeUserMembersToGroup(groupId, handleArr, emailArr) {
  const allMembers = [] 

  handleArr = _.uniq(handleArr)
  emailArr = _.uniq(emailArr)

  _.forEach(handleArr, (handle) => {
    allMembers.push( {membershipType: 'User', identifier: 'Handle', data: handle})
  })
  _.forEach(emailArr, (email) => {
    allMembers.push( {membershipType: 'User', identifier: 'Email', data: email})
  })

  return ((dispatch) => {
    dispatch({type: REMOVE_MEMBERS_PENDING, payload: {groupId, members: allMembers}})
    
    // If handle has data
    addUsersHandle(groupId, handleArr)
      .then(result => {
        return Promise.resolve(processMemberResult(result, allMembers))
      })
      .then(() => {
        return addUsersEmail(groupId, emailArr)
      }) 
      .then(result => {
        return Promise.resolve(processMemberResult(result, allMembers))
      })  
      .then(() => {
        dispatch({type: REMOVE_MEMBERS_SUCCESS, payload: {groupId, members: allMembers}})  
      })
      .catch(err => {
        dispatch({type: REMOVE_MEMBERS_FAILURE, payload: {err} })
      })
  })
}


