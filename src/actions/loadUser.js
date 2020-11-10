import _ from 'lodash'
import {
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  LOAD_USER_PENDING,
  ADMIN_ROLES,
  ACCOUNTS_APP_CONNECTOR_URL,
  DOMAIN
} from '../config/constants'

import { getFreshToken, configureConnector, decodeToken } from '@topcoder-platform/tc-auth-lib'
import { getUserProfile } from '../api/users'

const domainConnectorUrl = `https://accounts.${DOMAIN}/connector.html`

console.log('Domain =>' + DOMAIN)
console.log('iframe url =>' + domainConnectorUrl)
console.log('Accounts App url =>' + ACCOUNTS_APP_CONNECTOR_URL)

configureConnector({
  connectorUrl: ACCOUNTS_APP_CONNECTOR_URL,
  frameId: 'tc-accounts-iframe'
})

export function validateLogin() {
  return ((dispatch) => {
    
    dispatch({type: LOAD_USER_PENDING})
    
    return getFreshToken()
      .then((token) => {
        return loadUserSuccess(dispatch, token)
      })
      .catch((err) => {
        console.log(err)
        return loadUserFailure(dispatch)
      })

  })
}
export function loadUserSuccess(dispatch, token) {
  const decodedToken = decodeToken( token )
  let currentUser = null
  
  if (decodedToken.userId) {
    currentUser = decodedToken
    currentUser.id = currentUser.userId
    currentUser.token = token
  }
  if (currentUser) {
    getUserProfile(currentUser.handle).then((profile) => {
      currentUser = _.assign(currentUser, profile)

      const userRoles = _.get(currentUser, 'roles', [])
      const isAcceptedRole = userRoles.some((role) => ADMIN_ROLES.indexOf(role) !== -1)
      if (!isAcceptedRole) {
        console.log('Incorrect Role')
        dispatch({ type: LOAD_USER_FAILURE })      
      }
      else {
        dispatch({
          type: LOAD_USER_SUCCESS,
          user : currentUser
        })
      }
    })
      .catch((err) => {
        console.log(err)
        dispatch({ type: LOAD_USER_FAILURE } )
      })
  }
}

export function loadUserFailure(dispatch) {
  dispatch({ type: LOAD_USER_FAILURE })
}


