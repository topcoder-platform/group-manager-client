import {
  SWITCH_VIEW
} from './../config/constants'

export function switchSelectedView(view) {
  return (dispatch) => {
    return dispatch({
      type: SWITCH_VIEW,
      payload: { view }
    })
  }
}