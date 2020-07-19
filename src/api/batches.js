import _ from 'lodash'
import { axiosInstance as axios } from './requestInterceptor'
import { GROUPS_API_URL } from '../config/constants'
import MockApi from './mockApi'

const USE_MOCK = false
const API_END_POINT = GROUPS_API_URL

/**
 * Get All Batches from the backend API
 */
export function getAllBatches(useCache) {
  if (USE_MOCK) {
    return MockApi.getAllBatches()
  }
  const queryParam = (useCache ? '' : '?refresh=true')
  console.log(`${API_END_POINT}/batches${queryParam}`)

  return axios.get(`${API_END_POINT}/batches${queryParam}`)
    .then( resp => {
      return _.get(resp, 'data')
    })
}

/**
 * Create a new batch with email
 * @param {batch} object to be created.  
 */
export function createBatch(batch) {
  if (USE_MOCK) {
    return MockApi.createBatch(batch)
  }
  return axios.post(`${API_END_POINT}/batches`, batch)
    .then(resp => {
      return _.get(resp, 'data') 
    })
}
