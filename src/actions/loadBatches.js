import _ from 'lodash'
import {
  LOAD_BATCH_PENDING,
  LOAD_BATCH_SUCCESS,
  LOAD_BATCH_FAILURE,
  LOAD_BATCH_CACHE_SUCCESS,

  EDIT_BATCH_PENDING,
  EDIT_BATCH_SUCCESS,
  EDIT_BATCH_FAILURE,

  SET_BATCH_INFINITE_AUTOLOAD,
  SET_BATCH_PAGE_NUM,
  SET_BATCH_SORT_FIELD,
  SET_BATCH_PAGE_LOADING

} from './../config/constants'
import { getAllBatches, createBatch } from './../api/batches'

export function setSortField(sortField) {
  console.log('**set Sort Field***' + sortField)

  return (dispatch) => {
    dispatch({ type: SET_BATCH_SORT_FIELD, payload: sortField })
  }
}

/*
* Load Groups infinite scroll related methods
*/
export function setInfiniteAutoload(infiniteAutoload) {
  return (dispatch) => {
    dispatch({ type: SET_BATCH_INFINITE_AUTOLOAD, payload: infiniteAutoload })
  }
}

export function setPageNumber(pageNumber) {
  return (dispatch) => {
    dispatch({ type: SET_BATCH_PAGE_LOADING, payload: true })

    setTimeout(() => {
      dispatch({ type: SET_BATCH_PAGE_NUM, payload: pageNumber })
      dispatch({ type: SET_BATCH_PAGE_LOADING, payload: false })

      return Promise.resolve()
    }, 1500)
  }
}


export function saveBatch(editBatch) {
  return (dispatch) => {
    dispatch({type : EDIT_BATCH_PENDING})
    //If Id exists its an update operation, else its an insert operation
    const batchUpsertPromise = createBatch(editBatch)

    return batchUpsertPromise
      .then( response => {
        return dispatch({ type: EDIT_BATCH_SUCCESS, payload: { batch: response }})
      })
      .catch(err => {
        dispatch( { type: EDIT_BATCH_FAILURE, payload: {err: err.response}})
      })
  }
}


export function loadAllBatches(useCache = true) {
  return (dispatch, getState) => {
    
    // Notify that the loading of groups is in progress  
    dispatch({type : LOAD_BATCH_PENDING})

    // Gruops is loaded from cache
    const isBatchesAlreadyLoaded = getState().batch.isBatchLoadComplete
    if (isBatchesAlreadyLoaded && useCache) {
      dispatch({ type: LOAD_BATCH_CACHE_SUCCESS })
      return Promise.resolve()
    }

    // Make the API Call to load groups data from the backend endpoint
    return getAllBatches(useCache)
      .then(batchesArr => {
        //Response contains the array of all Groups
        dispatch({type: LOAD_BATCH_SUCCESS, payload: batchesArr})
        return Promise.resolve()
      })
      .catch(err => {
        // Package the error
        dispatch({type: LOAD_BATCH_FAILURE, payload: {err: err.response} })
        return Promise.reject(err)
      })
  }
}