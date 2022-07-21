import { getAllGroupsJSON, newGroupJSON, removeMember,
  updateGroupJSON, getGeneratedMembers, getAddUsersByHandle, newBatchJSON,
  newBulkUploadJSON,
  getAllBatches,
  getAllBulkUploads,
  getAllConnect,
  getConnect,
  getConnectJSON
} from './mock.js'

const DEFAULT_DELAY = 2 

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

MockApi.prototype.getAllBatches = function() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(getAllBatches())
    }, DEFAULT_DELAY)
  })
}

MockApi.prototype.getAllBulkUploads = function() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(getAllBulkUploads())
    }, DEFAULT_DELAY)
  })
}


MockApi.prototype.createBatch = function(input) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(newBatchJSON(input))
    }, DEFAULT_DELAY)
  })
}

MockApi.prototype.createBulkUpload = function(input) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(newBulkUploadJSON(input))
    }, DEFAULT_DELAY)
  })
}

MockApi.prototype.getAllConnect = function() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(getAllConnect())
    }, DEFAULT_DELAY)
  })
}

MockApi.prototype.getConnect = function(connectId) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(getConnect(connectId))
    }, DEFAULT_DELAY)
  })
}

MockApi.prototype.createConnect = function(connect) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(getConnectJSON(connect.id))
    }, DEFAULT_DELAY)
  })
}

export default new MockApi()