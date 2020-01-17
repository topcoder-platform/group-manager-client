import { 
  ADD_MEMBERS_PENDING,
  ADD_MEMBERS_SUCCESS,
  ADD_MEMBERS_FAILURE,
  ADD_MEMBERS_INITIALIZE,

  LOAD_CURRENT_GROUP_SUCCESS
} from '../config/constants'

// Base State
const initialState = {
  groupId: '',
  members: [],
  isSaving: false,
  error: {}
}

export default function(state = initialState, action) {
  switch(action.type) {
  case ADD_MEMBERS_INITIALIZE:
  case LOAD_CURRENT_GROUP_SUCCESS:  
    return Object.assign({}, state, { isSaving: false, groupId: action.payload.groupId, 
      members:[], error: {}})    
  
  case ADD_MEMBERS_PENDING:
    return Object.assign({}, state, { isSaving: true,  groupId: action.payload.groupId,
      members: action.payload.members})
  case ADD_MEMBERS_SUCCESS:
    return Object.assign({}, state, { isSaving: false, members: action.payload.members})
  case ADD_MEMBERS_FAILURE:
    return Object.assign({}, state, { isSaving: false, error: action.payload.error})       
  default:
    return state      
  }
}