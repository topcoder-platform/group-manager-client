import { combineReducers } from 'redux'
import searchTerm from './searchTerm'
import loadUser from './loadUser'
import groups from './groups'
import navSearch from './navSearch'
import childGroups from './childGroups'
import currentGroup from './currentGroup'
import alerts from './alerts'
import addMembers from './addMembers'
import removeMembers from './removeMembers'
import batch from './batch'
import connect from './connect'


export default combineReducers({
  loadUser,
  navSearch,
  currentGroup,
  searchTerm,
  alerts,
  groups,
  addMembers,
  childGroups,
  batch,
  connect,
  removeMembers
})
