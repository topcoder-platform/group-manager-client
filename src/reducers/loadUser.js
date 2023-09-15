import _ from 'lodash'
import {
  LOAD_USER_PENDING,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE
} from '../config/constants'

export const initialState = {
  isLoading : false,
  isLoggedIn: false,
  isLoginFailed: false,
  user: null,
}

export default function(state = initialState, action) {
  switch (action.type) {

  case LOAD_USER_PENDING:  
    return Object.assign({}, state, { isLoggedIn: false, isLoginFailed: false, isLoading: true, user: null})

  case LOAD_USER_SUCCESS:

    return Object.assign({}, state, {
      isLoading : false,
      isLoggedIn: true,
      isLoginFailed: false,
      user : action.user
    })

  case LOAD_USER_FAILURE:
    return Object.assign({}, state, {
      isLoading : false,
      isLoggedIn: false,
      isLoginFailed: true,
      user: null
    })

  default:
    return state
  }
}
