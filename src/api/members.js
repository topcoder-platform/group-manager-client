import _ from 'lodash'
import { axiosInstance as axios } from './requestInterceptor'
import { GROUPS_API_URL } from '../config/constants'

import MockApi from './mockApi'

//const BASE_API_ENDPOINT = 'http://localhost:3001/groups'
const USE_MOCK = false

const API_END_POINT = GROUPS_API_URL + '/groups'

/**
 * @param {groupId} the group Id for whom to load data 
 * @param {page} the page number to load data typically we load 20 members per page 
 * The return type of this function is slightly different
 * as it returns both data, and headers
 */

export function getGroupMembers(groupId, page) {
  if (USE_MOCK) {
    return MockApi.getGroupMembers(groupId, page)
  }
  let pageParam = ''
  if (page) {
    pageParam = `?page=${page}` 
  }

  return axios.get(`${API_END_POINT}/${groupId}/members${pageParam}`)
    .then( resp => {
      //Get data 
      let total = -1
      if (resp.headers && resp.headers['x-total']) {
        total = resp.headers['x-total']
      }
      return { data: _.get(resp, 'data'), total}
    }) 
}
/**
 * @param {groupId} the group Id where these members should be added 
 * @param {handleArr} the handle which needs to be added 
 */
export function addUsersByHandle(groupId, handleArr) {
  if (USE_MOCK) {
    return MockApi.addUsersByHandle(groupId, handleArr)
  }
  return axios.post(`${API_END_POINT}/${groupId}/members/handle`, handleArr)
    .then( resp => {
      return _.get(resp, 'data')
    }) 
}

export function addChildGroupById(groupId, childGroupIdArr) {
  if (USE_MOCK) {
    return MockApi.addChildGroupsById(groupId, childGroupIdArr)
  }
  return axios.post(`${API_END_POINT}/${groupId}/members/handle`, childGroupIdArr)
    .then( resp => {
      return _.get(resp, 'data')
    }) 
}

export function addUsersByEmail(groupId, emailArr) {
  if (USE_MOCK) {
    return MockApi.addUsersByHandle(groupId, emailArr)
  }
  return axios.post(`${API_END_POINT}/${groupId}/members/email`, emailArr)
    .then( resp => {
      return _.get(resp, 'data')
    }) 
}

export function removeMemberFromGroup(groupId, memberId) {
  if (USE_MOCK) {
    return MockApi.removeMemberFromGroup(groupId, memberId)
  }
  
  return axios.delete(`${API_END_POINT}/${groupId}/members/${memberId}`)
    .then( resp => {
      return _.get(resp, 'data')
    }) 
 
}


