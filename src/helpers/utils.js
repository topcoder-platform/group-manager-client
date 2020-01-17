import _ from 'lodash'

/**
 * Search for the current group in the list of all Groups using a groupId
 */
export const findGroupById = (allGroups, groupId) => {
  const currentGroup = _.find(allGroups, (group) => {
    return (group.id === groupId)
  })
  return currentGroup
}

export const extractAllChildGroupsForGroup = (allGroups, groupId) => {
  
  const group = findGroupById(allGroups, groupId)
  if (!group) {
    return []
  }

  // if there are no child Groups attached to the group, return an empty array
  if (!group.childGroupIds || !group.childGroupIds.length === 0) {
    return []
  }
  // Create a map using all group Ids
  const map = {}
  _.forEach(allGroups, (group) => {
    map[group.id] = group
  })

  // Find Child Groups By Id
  const childGroups = []
  _.forEach(group.childGroupIds, (childGroupId) => {
    const childGroup =  map[childGroupId]
    if (childGroup) {
      childGroups.push(childGroup)
    }
  })

  return childGroups
} 

/**
 * Split the record into email, handle
 */
export const splitIntoEmailAndHandle = (str) => {
  //Email regex  
  const emailRegex =/[^@]+@[^\\.]+\..+/g
  const all = trimArray(splitByCommaOrSemiColon(str))

  const handleArr = []
  const emailArr = []

  _.forEach(all, (current) => {
    if(current.match(emailRegex)) {
      emailArr.push(current)
    }
    else {
      handleArr.push(current)
    }
  })

  return {
    handleArr,
    emailArr
  }
}

function splitByCommaOrSemiColon(str) {
  const arr = [',', ';', ':', '\n'] //Create an array of allowed separators
  let i = -1
  for(i = 0; i < arr.length; i++) {
    // IF anyone of the separators is found, use that
    if(str.indexOf(arr[i]) > -1) {
      return str.split(arr[i])
    }
  }
  //No separator
  return [str]
}

function trimArray(arr) {
  for(let i = 0; i < arr.length; i++) {
    arr[i] = _.trim(arr[i])
  }
  return _.compact(arr)
}

// Sort  data array, based on sort Field, internal 
function sortArray(arr, sortExpression) {
  if (!sortExpression || !arr) {
    return arr
  }
  const fieldName = _.split(sortExpression, ' ')[0]
  const order = _.split(sortExpression, ' ')[1] || 'asc'

  return _.orderBy(arr, [fieldName], [order])
}

/**
 * Sort the Groups array, based on sort Expression
 */
export const sortGroups = (groups, sortExpression) => {
  return sortArray(groups, sortExpression)
}

/** 
* Sort the Members array, based on Sort Expression
*/
export const sortMembers = (members, sortExpression) => {
  return sortArray(members, sortExpression)
}

/** 
 * Searching the keyword across name and description 
*/
export const filterGroups = (groups, keyword) => {
  //If no keyword provided, return all the groups as is
  if (!keyword) {
    return groups
  }
  
  const lowerKeyword = keyword.toLowerCase()

  return _.filter(groups, (group) => {
    if (group) {
      if (group.name && group.name.toLowerCase().indexOf(lowerKeyword) > -1) {
        return true
      }
      if (group.description && group.description.toLowerCase().indexOf(lowerKeyword) > -1 ) {
        return true
      }
    }
  })
}

export const filterMembers = (members, keyword) => {
  if (!keyword) {
    return members
  }
  const memberKeys = ['user.first_name', 'user.last_name', 'user.handle', 'user.email']
  const lowerKeyword = keyword.toLowerCase()

  return _.filter(members, (member) => {
    for(let i = 0; i < memberKeys.length; i++) {
      const currentKey = member[memberKeys[i]]
      if (currentKey && currentKey.indexOf(lowerKeyword) > -1) {
        return true
      }
    }
  })
}

export const removeMemberFromList = (allMembers, memberId) => {
  return _.remove(allMembers, member => {
    return (member.memberId === memberId)
  })
}


// Group Map contains members or is loading state, return null
// else return array
export const checkIfGroupMembersLoaded = (groupMap, groupId) => {
  if (!groupMap) {
    return null
  }

  const memberMap = groupMap[groupId]
  // If the group hasn't been loaded ever return null or is in state of loading 
  // return null
  if (!memberMap) {
    return null
  }

  // If the load is in progress return empty array
  if(memberMap.isLoading) {
    return []
  }

  // Return Members 
  return memberMap.members
}

export const findAndReplaceGroup = (allGroup, group) => {
  const index = _.findIndex(allGroup, (currentGroup) => {
    if (currentGroup.id === group.id) {
      return true
    }
  })
 
  if (!index) {
    return allGroup
  }

  allGroup[index] = _.merge(allGroup[index], group)
  return allGroup
}