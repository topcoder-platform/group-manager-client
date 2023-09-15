import {
  PROJECTS_LIST_VIEW,
  SWITCH_VIEW,
} from './../config/constants'

import update from 'react-addons-update'

export const initialState = {
  isLoading: false,
  selectedView: PROJECTS_LIST_VIEW.GRID
}

export default function(state = initialState, action) {
  switch(action.type) {
  case SWITCH_VIEW:
    return Object.assign({}, state, { selectedView: action.payload.view})

  default:
    return state
  }
}