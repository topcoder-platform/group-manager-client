import update from 'react-addons-update'

import {
  LOAD_CURRENT_GROUP_PENDING,
  LOAD_CURRENT_GROUP_SUCCESS,
  LOAD_CURRENT_GROUP_FAILURE,

  LOAD_CURRENT_GROUP_MEMBERS_PENDING,
  LOAD_CURRENT_GROUP_MEMBERS_SUCCESS,
  LOAD_CURRENT_GROUP_MEMBERS_FAILURE,

  LOAD_CURRENT_CHILD_GROUP_MEMBERS_PENDING,
  LOAD_CURRENT_CHILD_GROUP_MEMBERS_SUCCESS,
  
  EDIT_GROUP_PENDING,
  EDIT_GROUP_SUCCESS,
  EDIT_GROUP_FAILURE,

  SET_MEMBERS_INFINITE_AUTOLOAD,

  SET_CURRENT_MEMBER_PAGE_NUM,
  SET_CURRENT_MEMBER_SORT_FIELD,
  SET_CURRENT_MEMBER_SEARCH_TERM,


  REMOVE_GROUP_MEMBER_SUCCESS,
  REMOVE_GROUP_MEMBER_PENDING,
  REMOVE_GROUP_MEMBER_FAILURE,

  MEMEBER_LIST_PER_PAGE

} from '../config/constants'

//Current Group which the user has selected and is working on it
// total Member is set to 200 by default 
const initialState = {  
  groupId: null,
  group: {},
  isGroupLoading: false,

  members:[],
  isCurrentMembersLoading: false,
 
  childGroups: [],
  isChildGroupsLoading: true,
  
  totalMemberCount: MEMEBER_LIST_PER_PAGE,
  memberPageNumber: 1,
  memberRefresh: false,
  infiniteAutoload: false,

  isSaving: false,
  refreshMembers: false,
  err: {},

  isDeleting: false
}
/*
function setCurrentGroup(state, payload) {
  if (payload.isNew) {
    return Object.assign({}, state, {group: {name: 'Wipro - Topgear - '}})
  }
  return Object.assign({}, state, payload.group)
}
*/
function updateState(state, payload, extraInfo) {
  const prevState = {...state}

  if (payload.groupId) {
    prevState.groupId = payload.groupId
  }
  
  if(payload.group) {
    prevState.group = payload.group
  }  

  if (payload.members) {
    prevState.members = payload.members
  }

  if (payload.childGroups) {
    prevState.childGroups = payload.childGroups
  }

  if (payload.err) {
    prevState.err = payload.err
  }
  return Object.assign({}, prevState, extraInfo)
}

function currentGroupMemberLoadingSuccess(state, payload, meta) {
  let updatedMembers = {}
  
  if (meta && meta.keepPrevious) {
    updatedMembers =  { members :{$push: payload.members }, 
      totalMemberCount: {$set: payload.total},
      isCurrentMembersLoading : { $set: false }} 
  }
  else {
    updatedMembers =  { members :{$set: payload.members },  
      totalMemberCount: {$set: payload.total},
      isCurrentMembersLoading : { $set: false }}
  }
  return update(state, updatedMembers) 
}


export default function(state = initialState, action) {
  switch(action.type) {
  
  case SET_CURRENT_MEMBER_SORT_FIELD: 
  case SET_CURRENT_MEMBER_SEARCH_TERM: 
    return ( Object.assign( {}, state, { infiniteAutoload: false }))    
  
  case SET_CURRENT_MEMBER_PAGE_NUM: 
    return (Object.assign({}, state, {
      memberPageNumber: action.payload.pageNumber,
      isCurrentMembersLoading: true
    }))  
  
  case SET_MEMBERS_INFINITE_AUTOLOAD: 
    return (Object.assign({}, state, {
      infiniteAutoload: action.payload
    }))

  case LOAD_CURRENT_GROUP_PENDING:
    return updateState(state, action.payload, {isGroupLoading: true})   
  case LOAD_CURRENT_GROUP_SUCCESS:
    return updateState(state, action.payload, 
      {
        isGroupLoading: false,
        infiniteAutoload: false, 
        memberPageNumber:1,
        childGroups:[], 
        totalMemberCount: MEMEBER_LIST_PER_PAGE,
        isCurrentMembersLoading: false,
        members:[]      
      })     
  case LOAD_CURRENT_GROUP_FAILURE:
    return updateState(state, action.payload, {isGroupLoading: false, childGroups:[] })   
  
  case EDIT_GROUP_PENDING: 
    return Object.assign({}, state, {isSaving : true})     
  case EDIT_GROUP_SUCCESS:
    return updateState(state, action.payload, {isSaving: false}) 
  case EDIT_GROUP_FAILURE:
    return Object.assign({}, state, {isSaving: false})   


  case LOAD_CURRENT_GROUP_MEMBERS_PENDING:
    return updateState(state, action.payload, {isCurrentMembersLoading: true})     
  case LOAD_CURRENT_GROUP_MEMBERS_SUCCESS:
    return currentGroupMemberLoadingSuccess(state, action.payload, action.meta) 
  case LOAD_CURRENT_GROUP_MEMBERS_FAILURE:  
    return updateState(state, action.payload, {isCurrentMembersLoading: false})      

  /************************* MEMBER REMOVAL ******************************/  
  case REMOVE_GROUP_MEMBER_FAILURE: 
    return Object.assign({}, state, { isDeleting: false, err: action.payload.err})
  case REMOVE_GROUP_MEMBER_PENDING: 
    return Object.assign({}, state, { isDeleting: true})
  case REMOVE_GROUP_MEMBER_SUCCESS:
    return Object.assign({}, state, 
      {
        isDeleting: false, 
        members: action.payload.members, 
      })
  case LOAD_CURRENT_CHILD_GROUP_MEMBERS_PENDING:
    return updateState( state, action.payload, {isChildGroupsLoading: true} )  
  case LOAD_CURRENT_CHILD_GROUP_MEMBERS_SUCCESS:
    return updateState( state, action.payload, {isChildGroupsLoading: false} )      
  
  default:
    return state      
  }
}

