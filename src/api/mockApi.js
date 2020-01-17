import { getAllGroupsJSON, newGroupJSON, removeMember,
  updateGroupJSON, getGeneratedMembers, getAddUsersByHandle } from './mock.js'

const DEFAULT_DELAY = 2000

function MockApi() {
  this.allGroupsJSON = getAllGroupsJSON()
}

MockApi.prototype.getGroups = function() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(this.allGroupsJSON)
    }, DEFAULT_DELAY)
  }) 
}

MockApi.prototype.createGroup = function(group) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(newGroupJSON(group))
    }, DEFAULT_DELAY)
  })
}

MockApi.prototype.updateGroup = function(group) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(updateGroupJSON(group))
    }, DEFAULT_DELAY)
  })
}

// The function returns 2 values data containing the actual members
// and total of all members
MockApi.prototype.getGroupMembers = function(groupId, pageNum) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({data: getGeneratedMembers(groupId, pageNum, 20), total: 2000 })
    }, DEFAULT_DELAY)
  })
}

MockApi.prototype.addUsersByHandle = function(groupId, handleArr) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(getAddUsersByHandle(groupId, handleArr))
    }, DEFAULT_DELAY)
  })
}

MockApi.prototype.removeMemberFromGroup = function(groupId, memberId) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(removeMember(groupId, memberId))
    }, DEFAULT_DELAY)
  })
}


export default new MockApi()