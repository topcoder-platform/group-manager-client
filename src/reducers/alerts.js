import _ from 'lodash'
import Alert from 'react-s-alert'
/* eslint-disable no-unused-vars */
import {
  
  LOAD_GROUP_FAILURE,

  EDIT_GROUP_SUCCESS,
  EDIT_GROUP_FAILURE,

  EDIT_BATCH_SUCCESS,
  EDIT_BATCH_FAILURE,
  LOAD_BATCH_FAILURE,

  ADD_MEMBERS_SUCCESS,
  REMOVE_GROUP_MEMBER_SUCCESS,
  REMOVE_GROUP_MEMBER_FAILURE,
  ADD_MEMBERS_FAILURE,
  LOAD_CURRENT_GROUP_FAILURE,
  LOAD_CURRENT_GROUP_MEMBERS_FAILURE,

  EDIT_CONNECT_SUCCESS,
  EDIT_CONNECT_FAILURE

} from '../config/constants'
/* eslint-enable no-unused-vars */

function extractErrorMessage(err) {
  //console.log(JSON.stringify(err))

  let message = _.get(err, ['response', 'data', 'message'] )
  if (message) return message

  message = _.get(err, 'data.message')
  if (message) return message

  message = _.get(err, 'message')
  if (message) return message
 
  message = _.get(err, 'response.status') 
  if (message) {
    return `${err.response.status} - ${err.response.statusText}`
  }
  return null
}

function extractSucessfulAddMembers(payload) {
  const members = payload.members
  const successMembers = _.filter(members, 
    (u) => { return u.response && u.response.isValid } )
  
  const failureLength = members.length - successMembers.length
  const messageArr = ['Add Members to group completed.']
  
  if (successMembers.length > 0) {
    messageArr.push(`( ${successMembers.length} ) members added successfully.`)
  }
  if (failureLength > 0) {
    messageArr.push(`( ${failureLength} ) members failed to add.`)
  }
  return messageArr.join('<br/>')
}

export default function(state = {}, action) {
  switch(action.type) {
  case EDIT_BATCH_SUCCESS: {
    Alert.success('New Batch for User deactivation submitted successfully') 
    return state 
  }

  
  case ADD_MEMBERS_SUCCESS: {
    Alert.success(extractSucessfulAddMembers(action.payload))
    return state
  }  

  case REMOVE_GROUP_MEMBER_SUCCESS: {
    const handle =  _.get(action, ['payload', 'member', 'user.handle'], '')
    const groupName = _.get(action, ['payload', 'member', 'groupName'], '')

    Alert.success(`${handle} removed from ${groupName} successfully`)
    return state
  }
  
  case EDIT_GROUP_SUCCESS: {
    Alert.success(`Group ${_.get(action, 'payload.group.name', '')} saved successfully`)
    return state
  }  

  case EDIT_CONNECT_SUCCESS: {
    Alert.success(`CONNECT ${_.get(action, 'payload.name', '')} saved successfully`)
    return state
  }  

  case EDIT_CONNECT_FAILURE:
  case LOAD_BATCH_FAILURE:
  case EDIT_BATCH_FAILURE:
  case EDIT_GROUP_FAILURE:
  case LOAD_GROUP_FAILURE:  
  case REMOVE_GROUP_MEMBER_FAILURE:
  case ADD_MEMBERS_FAILURE:  
  case LOAD_CURRENT_GROUP_FAILURE:
  case LOAD_CURRENT_GROUP_MEMBERS_FAILURE:
    if (action.payload && action.payload.err) {
      const message = extractErrorMessage(action.payload.err)
      
      if (message) {
        Alert.error(message)
        return state
      }
    }
    Alert.error('Whoops! we ran into a problem.<br/> Please try again later.')
    return state
  default:
    return state
  }
}
