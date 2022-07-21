import _ from 'lodash'
import { axiosInstance as axios } from './requestInterceptor'
import { GROUPS_API_URL } from '../config/constants'
import MockApi from './mockApi'

const USE_MOCK = false
const API_END_POINT = GROUPS_API_URL

/**
 * Get All Previously loaded bulk uploaded records from the backend API
 */
export function getAllBulkUploads(useCache) {
  if (USE_MOCK) {
    return MockApi.getAllBulkUploads()
  }
  const queryParam = (useCache ? '' : '?refresh=true')
  console.log(`${API_END_POINT}/bulkImport${queryParam}`)

  return axios.get(`${API_END_POINT}/bulkImport${queryParam}`)
    .then( resp => {
      return _.get(resp, 'data')
    })
}

/**
 * Create a new bulk upload operation with the data provided
 * @param {bulkUpload} object to be created.  
 */
export function createBulkUpload(bulkUpload) {
  if (USE_MOCK) {
    return MockApi.createBatch(bulkUpload)
  }
  return axios.post(`${API_END_POINT}/bulkImport`, bulkUpload)
    .then(resp => {
      return _.get(resp, 'data') 
    })
}
