import _ from 'lodash'
import { 
  LOAD_CHILD_GROUPS_PENDING, 
  LOAD_CHILD_GROUPS_SUCCESS, 
  LOAD_CHILD_GROUPS_FAILURE,
} from '../config/constants'

//Initial State is an empty object that stores the group Id 
//as the key and group Members array
const initialState = {
  '-1': groupMembers
}

//Group Members Data that is stored for each group
const groupMembers = {
  childGroups:[],
  isLoaded: false,
}

function updateState(state, payload, isLoaded) {
  const prevState = {...state}
  const currentGroupId = payload.groupId

  const childGroupsResult = {
    childGroups: payload.childGroups,
    isLoaded
  }
  
  prevState[currentGroupId] = childGroupsResult
  return prevState
}

export default function(state = initialState, action) {
  switch(action.type) {
  case LOAD_CHILD_GROUPS_PENDING: 
    return updateState(state, action.payload, false)
  case LOAD_CHILD_GROUPS_SUCCESS:
    return updateState(state, action.payload, true)
  case LOAD_CHILD_GROUPS_FAILURE:
    return updateState(state, action.payload, false)

  default:
    return state
  }
}
