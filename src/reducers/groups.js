import _ from 'lodash'
import {
  LOAD_GROUP_SUCCESS,
  LOAD_GROUP_FAILURE,
  LOAD_GROUP_PENDING,
  LOAD_GROUP_CACHE_SUCCESS,

  EDIT_GROUP_SUCCESS,

  SET_GROUPS_INFINITE_AUTOLOAD,
  SET_GROUPS_PAGE_NUM,
  SET_GROUPS_PAGE_LOADING

} from '../config/constants'

import { findAndReplaceGroup } from '../helpers/utils'

export const initialState = {
  isLoading : true,
  allGroups: [],  //All Groups that are child of Wipro - All
  isGroupSaveInProgress: false,
  isGroupLoadComplete: false, //Is Groups have been loaded in the state. 

  isInfiniteAutoLoad: false, //Should the page start loading the groups automatically
  groupPageNumber: 1, //The page that should be currently displayed
  isLoadingCurrentPage: false //If the current Page load is in progress
}

function updateState(state, payload, extraInfo) {
  const prevState = {...state}
  if (payload.isNew) {
    prevState.allGroups = prevState.allGroups.concat(payload.group)
  } 
  else {
    prevState.allGroups = findAndReplaceGroup(prevState.allGroups, payload.group)
  }
  return Object.assign({}, prevState, extraInfo)
}
  
export default function(state = initialState, action) {
  switch (action.type) {
  case LOAD_GROUP_PENDING:
    return Object.assign({}, state, { isLoading : true })
  
  case LOAD_GROUP_CACHE_SUCCESS:
    return Object.assign({}, state, { isLoading: false})

  case SET_GROUPS_PAGE_NUM: 
    return Object.assign({}, state, { groupPageNumber : action.payload })

  case SET_GROUPS_INFINITE_AUTOLOAD: 
    return Object.assign({}, state, { isInfiniteAutoLoad : action.payload })

  case SET_GROUPS_PAGE_LOADING: 
    return Object.assign({}, state, { isLoadingCurrentPage : action.payload })

  case EDIT_GROUP_SUCCESS:
    return updateState(state, action.payload)
      
  case LOAD_GROUP_SUCCESS:
    return Object.assign({}, state, 
      { 
        isLoading: false,
        allGroups: action.payload, 
        isGroupLoadComplete: true,
        groupPageNumber: 1,
        isInfiniteAutoLoad: false,
        isLoadingCurrentPage: false
      })
  
  case LOAD_GROUP_FAILURE:
    return Object.assign({}, state, 
      {
        isLoading: false,
        isGroupLoadComplete: false,
        allGroups: [],
      })     
  

  default:
    return state  
  }

}
