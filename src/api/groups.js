import _ from 'lodash'
import { axiosInstance as axios } from './requestInterceptor'
import { GROUPS_API_URL } from '../config/constants'
import MockApi from './mockApi'

const USE_MOCK = false
const API_END_POINT =  GROUPS_API_URL + '/groups'

/**
 * Get All Groups from the backend API
 */
export function getGroups(useCache) {
  if (USE_MOCK) {
    return MockApi.getGroups()
  }
  const queryParam = (useCache ? '' : '?refresh=true')
  console.log(`${API_END_POINT}${queryParam}`)

  return axios.get(`${API_END_POINT}${queryParam}`)
    .then( resp => {
      return _.get(resp, 'data')
    })
}

/**
 * Create a new group with name and description properties, both mandatory
 * @param {group} Group object to be created.  
 */
export function createGroup(group) {
  if (USE_MOCK) {
    return MockApi.createGroup(group)
  }
  return axios.post(`${API_END_POINT}`, group)
    .then(resp => {
      return _.get(resp, 'data') 
    })
}

/**
 * @param {group} update Group 
 */
export function updateGroup(group) {
  if (USE_MOCK) {
    return MockApi.updateGroup(group)
  }
  return axios.put(`${API_END_POINT}/${group.id}`, group)
    .then(resp => {
      return _.get(resp, 'data') 
    }) 
}