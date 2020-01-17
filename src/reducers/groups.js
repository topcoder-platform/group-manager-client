import _ from 'lodash'
import {
  LOAD_GROUP_SUCCESS,
  LOAD_GROUP_FAILURE,
  LOAD_GROUP_PENDING,
  LOAD_GROUP_CACHE_SUCCESS,

  EDIT_GROUP_SUCCESS

} from '../config/constants'

import { findAndReplaceGroup } from '../helpers/utils'

export const initialState = {
  isLoading : true,
  allGroups: [],  //All Groups that are child of Wipro - All
  isGroupSaveInProgress: false,
  isGroupLoadComplete: false //Is Groups have been loaded in the state. 
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

  case EDIT_GROUP_SUCCESS:
    return updateState(state, action.payload)
      
  case LOAD_GROUP_SUCCESS:
    return Object.assign({}, state, 
      { 
        isLoading: false,
        allGroups: action.payload, 
        isGroupLoadComplete: true
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
