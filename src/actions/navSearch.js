import _ from 'lodash'
import moment from 'moment'
import { flatten, unflatten } from 'flat'

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