import _ from 'lodash'
import { axiosInstance as axios } from './requestInterceptor'
import { DOMAIN } from '../config/constants'

/**
 * Get a user basd on it's handle/username
 * @param  {integer} handle unique identifier of the user
 * @return {object}           user returned by api
 */
export function getUserProfile(handle) {
  return axios.get(`https://api.${DOMAIN}/v3/members/${handle}/`)
    .then(resp => {
      return _.get(resp.data, 'result.content', {})
    })
}