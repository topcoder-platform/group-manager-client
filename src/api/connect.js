import _ from 'lodash'
import { axiosInstance as axios } from './requestInterceptor'
import { GROUPS_API_URL } from '../config/constants'
import MockApi from './mockApi'

const USE_MOCK = true
const API_END_POINT = GROUPS_API_URL

/**
 * Get All Connect Status Updates from the backend API
 */
export function getAllConnect(useCache) {
  if (USE_MOCK) {
    return MockApi.getAllConnect()
  }
  const queryParam = (useCache ? '' : '?refresh=true')
  console.log(`${API_END_POINT}/connect${queryParam}`)

  return axios.get(`${API_END_POINT}/connect${queryParam}`)
    .then( resp => {
      return _.get(resp, 'data')
    })
}

/**
 * Get connect project
 * @param {connectId} connect project id that needs to be retrieved.  
 */
export function getConnect(connectId) {
  console.log('Api call =>' + connectId)

  if (USE_MOCK) {
    return MockApi.getConnect(connectId)
  }
  return axios.get(`${API_END_POINT}/connect/${connectId}`)
    .then(resp => {
      return _.get(resp, 'data') 
    })
}

/**
 * Create a new connect project with updates
 * @param {connect} object to be created.  
 */
export function createConnect(connect) {
  if (USE_MOCK) {
    return MockApi.createConnect(connect)
  }
  return axios.post(`${API_END_POINT}/connect`, connect)
    .then(resp => {
      return _.get(resp, 'data') 
    })
}
