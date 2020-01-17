import { SET_SEARCH_TERM, 
  SET_SEARCH_TAG, 
  RESET_SEARCH_TERM,
  GROUP_LIST_SORT,
  MEMBER_LIST_SORT,
  CHILD_GROUP_LIST_SORT,

  SET_CURRENT_MEMBER_SEARCH_TERM,
  SET_CURRENT_MEMBER_SORT_FIELD,
  LOAD_CURRENT_GROUP_SUCCESS
} from '../config/constants'

export const initialState = {
  previousSearchTerm: null,
  searchTerm : null,
  searchTermTag: null,

  groupSortField: 'name',
  currentMemberSortField: 'user.handle',
  currentMemberSearchTerm: null,

  childGroupSortField: 'name'
}

export default function(state = initialState, action) {
  switch (action.type) {
  case SET_SEARCH_TERM:
    return Object.assign({}, state, {
      previousSearchTerm: state.searchTerm,
      searchTerm: action.searchTerm
    })

  case SET_SEARCH_TAG:
    return Object.assign({}, state, {
      searchTermTag: action.searchTermTag
    })

  case RESET_SEARCH_TERM:
    return Object.assign({}, state, {
      previousSearchTerm: null,
      searchTermTag: null
    })
  
  case LOAD_CURRENT_GROUP_SUCCESS: 
    return Object.assign({}, state, {currentMemberSearchTerm: null})

  case SET_CURRENT_MEMBER_SEARCH_TERM: 

    return Object.assign({}, state, {
      currentMemberSearchTerm: action.payload.currentMemberSearchTerm
    })

  case SET_CURRENT_MEMBER_SORT_FIELD: 
    return Object.assign({}, state, {
      currentMemberSortField: action.payload.currentMemberSortField
    })  
  

  case GROUP_LIST_SORT:
    return Object.assign({}, state,  {groupSortField: action.payload.sortField})  
  
  case MEMBER_LIST_SORT:
    return Object.assign({}, state,  {memberSortField: action.payload.sortField})  
  
  case CHILD_GROUP_LIST_SORT:
    return Object.assign({}, state,  {childGroupSortField: action.payload.sortField})  
                
  default: return state
  }
}
