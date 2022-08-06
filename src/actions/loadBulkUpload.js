import _ from 'lodash'
import {
  LOAD_BULKUPLOAD_PENDING,
  LOAD_BULKUPLOAD_SUCCESS,
  LOAD_BULKUPLOAD_FAILURE,
  LOAD_BULKUPLOAD_CACHE_SUCCESS,

  EDIT_BULKUPLOAD_PENDING,
  EDIT_BULKUPLOAD_SUCCESS,
  EDIT_BULKUPLOAD_FAILURE,

  SET_BULKUPLOAD_INFINITE_AUTOLOAD,
  SET_BULKUPLOAD_PAGE_NUM,
  SET_BULKUPLOAD_SORT_FIELD,
  SET_BULKUPLOAD_PAGE_LOADING

} from './../config/constants'
import { getAllBulkUploads, createBulkUpload } from './../api/bulkUpload'

export function setSortField(sortField) {
  console.log('**set Sort Field***' + sortField)

  return (dispatch) => {
    dispatch({ type: SET_BULKUPLOAD_SORT_FIELD, payload: sortField })
  }
}

/*
* Load Groups infinite scroll related methods
*/
export function setInfiniteAutoload(infiniteAutoload) {
  return (dispatch) => {
    dispatch({ type: SET_BULKUPLOAD_INFINITE_AUTOLOAD, payload: infiniteAutoload })
  }
}

export function setPageNumber(pageNumber) {
  return (dispatch) => {
    dispatch({ type: SET_BULKUPLOAD_PAGE_LOADING, payload: true })

    setTimeout(() => {
      dispatch({ type: SET_BULKUPLOAD_PAGE_NUM, payload: pageNumber })
      dispatch({ type: SET_BULKUPLOAD_PAGE_LOADING, payload: false })

      return Promise.resolve()
    }, 1500)
  }
}


export function saveBulkUpload(editBulkUpload) {
  return (dispatch) => {
    dispatch({type : EDIT_BULKUPLOAD_PENDING})
    const batchUpsertPromise = createBulkUpload(editBulkUpload)

    return batchUpsertPromise
      .then( response => {
        dispatch({ type: EDIT_BULKUPLOAD_SUCCESS, payload: { bulkUpload: response }})
        return response
      })
      .catch(err => {
        dispatch( { type: EDIT_BULKUPLOAD_FAILURE, payload: {err: err.response}})
        throw err
      })
  }
}


export function getBulkUploads(useCache = true) {
  return (dispatch, getState) => {
    
    // Notify that the loading of groups is in progress  
    dispatch({type : LOAD_BULKUPLOAD_PENDING})

    // Gruops is loaded from cache
    const isBulkUploadAlreadyLoaded = getState().bulkUpload.isBulkUploadComplete
    if (isBulkUploadAlreadyLoaded && useCache) {
      dispatch({ type: LOAD_BULKUPLOAD_CACHE_SUCCESS })
      return Promise.resolve()
    }

    // Make the API Call to load groups data from the backend endpoint
    return getAllBulkUploads(useCache)
      .then(bulkUploadArr => {
        //Response contains the array of all Groups
        dispatch({type: LOAD_BULKUPLOAD_SUCCESS, payload: bulkUploadArr})
        return Promise.resolve()
      })
      .catch(err => {
        // Package the error
        dispatch({type: LOAD_BULKUPLOAD_FAILURE, payload: {err: err.response} })
        return Promise.reject(err)
      })
  }
}