import _ from 'lodash'
import {
  LOAD_GROUP_PENDING,
  LOAD_GROUP_SUCCESS,
  LOAD_GROUP_FAILURE,
  LOAD_GROUP_CACHE_SUCCESS,

  LOAD_CURRENT_GROUP_SUCCESS,
  LOAD_CURRENT_GROUP_PENDING,

  SET_CURRENT_GROUP_EDIT,
  EDIT_GROUP_PENDING,
  EDIT_GROUP_SUCCESS,
  EDIT_GROUP_FAILURE,
  LOAD_CURRENT_GROUP_FAILURE
} from './../config/constants'
import { getGroups, createGroup, updateGroup } from './../api/groups'
import { findGroupById } from './../helpers/utils'


export function setCurrentGroupForEdit(isNew, inputGroup) {
  
  const group = isNew ? {} : inputGroup
  
  return ( dispatch ) => {
    dispatch({ type: SET_CURRENT_GROUP_EDIT, payload: {
      isNew,
      group
    }})
  }
}

// Load function using the V5 GUID
export function loadGroupById(groupId) {
  return ((dispatch, getState) => {
    //Set the current group loading status to true
    dispatch({type: LOAD_CURRENT_GROUP_PENDING, payload: { groupId }})

    //Check if the allGroups have been already loaded. If not load all groups
    const isGroupLoadComplete = getState().groups.isGroupLoadComplete

    if (!isGroupLoadComplete) {
      dispatch(loadGroups(false))
        .then(() => {
          const currentGroup = findGroupById(getState().groups.allGroups, groupId)
          if (currentGroup) {
            dispatch({type: LOAD_CURRENT_GROUP_SUCCESS, 
              payload: {groupId: currentGroup.id, group: currentGroup} })
          }
          else { //group not found because of error or incorrect id
            dispatch({type: LOAD_CURRENT_GROUP_FAILURE, 
              payload: {err: {message: 'Group ID not found. Please refresh the home page and try again.'}}})
          }
          
        })
    }
    else {
      const currentGroup = findGroupById(getState().groups.allGroups, groupId)
      dispatch({type: LOAD_CURRENT_GROUP_SUCCESS, 
        payload: {groupId: currentGroup.id, group: currentGroup} })
    }
  })
}


export function saveGroup(editGroup) {
  return (dispatch) => {
    dispatch({type : EDIT_GROUP_PENDING})
    //If Id exists its an update operation, else its an insert operation
    const groupUpsertPromise =  editGroup.id ?  updateGroup(editGroup): createGroup(editGroup)
    const isNew = !editGroup.id

    return groupUpsertPromise
      .then( response => {
        return dispatch({ type: EDIT_GROUP_SUCCESS, payload: { group: response, isNew  }})
      })
      .then (response => {
        return _.get(response, 'payload.group.id', '')
      })
      .catch(err => {
        dispatch( { type: EDIT_GROUP_FAILURE, payload: {err: err.response}})
      })
  }
}

export function loadGroups(useCache = true) {
  return (dispatch, getState) => {
    
    // Notify that the loading of groups is in progress  
    dispatch({type : LOAD_GROUP_PENDING})

    // Gruops is loaded from cache
    const isGroupsAlreadyLoaded = getState().groups.isGroupLoadComplete
    if (isGroupsAlreadyLoaded && useCache) {
      dispatch({ type: LOAD_GROUP_CACHE_SUCCESS })
      return Promise.resolve()
    }

    // Make the API Call to load groups data from the backend endpoint
    return getGroups(useCache)
      .then(groupsArr => {
        //Response contains the array of all Groups
        dispatch({type: LOAD_GROUP_SUCCESS, payload: groupsArr})
        return Promise.resolve()
      })
      .catch(err => {
        // Package the error
        dispatch({type: LOAD_GROUP_FAILURE, payload: {err: err.response} })
        return Promise.reject(err)
      })
  }
}