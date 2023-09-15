import { SET_SEARCH_TERM,
  GROUP_LIST_SORT, 
  MEMBER_LIST_SORT, 
  CHILD_GROUP_LIST_SORT,
  SET_CURRENT_MEMBER_SEARCH_TERM,
  SET_CURRENT_MEMBER_SORT_FIELD 
} from '../config/constants'

export function setSearchTerm(searchTerm) {
  return {
    type: SET_SEARCH_TERM,
    searchTerm
  }
}

export function setGroupListViewSortField(sortField) {
  const payload =  {
    sortField
  }
  return {
    type: GROUP_LIST_SORT,
    payload
  }
}
export function setMemberListViewSortField(sortField) {
  const payload =  {
    sortField
  }
  return {
    type: MEMBER_LIST_SORT,
    payload
  }
}

export function setChildGroupListViewSortField(sortField) {
  const payload =  {
    sortField
  }
  return {
    type: CHILD_GROUP_LIST_SORT,
    payload
  }
}

export function setCurrentMemberSearchTerm(currentMemberSearchTerm) {
  return (dispatch => {

    return dispatch ( {
      type: SET_CURRENT_MEMBER_SEARCH_TERM,
      payload: {
        currentMemberSearchTerm
      }
    })
  })
}

export function setCurrentMemberSortField(currentMemberSortField) {
  return ( dispatch => {
    return dispatch( {
      type: SET_CURRENT_MEMBER_SORT_FIELD,
      payload : {
        currentMemberSortField
      }
    })
  })
} 

