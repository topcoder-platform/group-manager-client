import _ from 'lodash'
import {
  LOAD_CONNECT_PENDING,
  LOAD_CONNECT_SUCCESS,
  LOAD_CONNECT_FAILURE,
  LOAD_CONNECT_CACHE_SUCCESS,

  LOAD_CONNECT_ID_PENDING,
  LOAD_CONNECT_ID_SUCCESS,
  LOAD_CONNECT_ID_FAILURE,
  RESET_NEW_CONNECT_ID,

  EDIT_CONNECT_PENDING,
  EDIT_CONNECT_SUCCESS,
  EDIT_CONNECT_FAILURE,

  SET_CONNECT_INFINITE_AUTOLOAD,
  SET_CONNECT_PAGE_NUM,
  SET_CONNECT_SORT_FIELD,
  SET_CONNECT_PAGE_LOADING

} from './../config/constants'
import { getAllConnect, createConnect, getConnect } from './../api/connect'

export function setSortField(sortField) {
 
  return (dispatch) => {
    dispatch({ type: SET_CONNECT_SORT_FIELD, payload: sortField })
  }
}

/*
* Load Groups infinite scroll related methods
*/
export function setInfiniteAutoload(infiniteAutoload) {
  return (dispatch) => {
    dispatch({ type: SET_CONNECT_INFINITE_AUTOLOAD, payload: infiniteAutoload })
  }
}

export function resetNewConnectId() {
  return (dispatch) => {
    dispatch({ type: RESET_NEW_CONNECT_ID})
  }
}

export function setPageNumber(pageNumber) {
  return (dispatch) => {
    dispatch({ type: SET_CONNECT_PAGE_LOADING, payload: true })

    setTimeout(() => {
      dispatch({ type: SET_CONNECT_PAGE_NUM, payload: pageNumber })
      dispatch({ type: SET_CONNECT_PAGE_LOADING, payload: false })

      return Promise.resolve()
    }, 1500)
  }
}


export function saveConnect(projectData) {
  return (dispatch, getState) => {

    const connect = getState().connect.currentConnect

    dispatch({type : EDIT_CONNECT_PENDING})
    //If Id exists its an update operation, else its an insert operation

    const newConnect = _.cloneDeep(connect)
    newConnect.details.project_data = projectData
    const connectUpsertPromise = createConnect(newConnect)

    return connectUpsertPromise
      .then( response => {
        return dispatch({ type: EDIT_CONNECT_SUCCESS, payload: { connect: response }})
      })
      .catch(err => {
        dispatch( { type: EDIT_CONNECT_FAILURE, payload: {err: err.response}})
      })
  }
}

// Load the connect project that the user has input
export function loadConnect(connectId) {
  connectId = _.trim(connectId)
  
  return ( dispatch ) => {
    dispatch({ type: LOAD_CONNECT_ID_PENDING, payload: {
      connectId
    }})
    const loadConnectIdPromise = getConnect(connectId)

    return loadConnectIdPromise
      .then( response => {
        return dispatch({ type: LOAD_CONNECT_ID_SUCCESS, payload: { response }})
      })
      .catch (err => {
        dispatch( { type: LOAD_CONNECT_ID_FAILURE, payload: {err: err.response}})
      })
  }
}


export function loadAllConnect(useCache = true) {
  return (dispatch, getState) => {
    
    // Notify that the loading of connect project is in progress  
    dispatch({type : LOAD_CONNECT_PENDING})

    // Gruops is loaded from cache
    const isBatchesAlreadyLoaded = getState().connect.isConnectLoadComplete
    if (isBatchesAlreadyLoaded && useCache) {
      dispatch({ type: LOAD_CONNECT_CACHE_SUCCESS })
      return Promise.resolve()
    }

    // Make the API Call to load groups data from the backend endpoint
    return getAllConnect(useCache)
      .then(connectArr => {
        //Response contains the array of all Connect Projects
        dispatch({type: LOAD_CONNECT_SUCCESS, payload: connectArr})
        return Promise.resolve()
      })
      .catch(err => {
        // Package the error
        dispatch({type: LOAD_CONNECT_FAILURE, payload: {err: err.response} })
        return Promise.reject(err)
      })
  }
}