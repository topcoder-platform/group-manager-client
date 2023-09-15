import {
  LOAD_BATCH_SUCCESS,
  LOAD_BATCH_FAILURE,
  LOAD_BATCH_PENDING,
  LOAD_BATCH_CACHE_SUCCESS,

  EDIT_BATCH_SUCCESS,
  EDIT_BATCH_PENDING,
  EDIT_BATCH_FAILURE,

  SET_BATCH_INFINITE_AUTOLOAD,
  SET_BATCH_PAGE_NUM,
  SET_BATCH_PAGE_LOADING,
  SET_BATCH_SORT_FIELD

} from '../config/constants'


export const initialState = {
  isLoading : true,
  allBatches: [],  //All Batches that are already available
  isBatchSaveInProgress: false,
  isBatchLoadComplete: false, //Is Baches have been loaded in the state. 
  
  isInfiniteAutoLoad: false, //Should the page start loading the batches automatically
  batchPageNumber: 1, //The page that should be currently displayed
  isLoadingCurrentPage: false, //If the current Page load is in progress

  sortField: 'id', //Default Sort field used in Batch header

  isSaving: false //If the create Batch save in progress

}
/*
function updateState(state, payload, extraInfo) {
  const prevState = {...state}
  if (payload.isNew) {
    prevState.allBatches = prevState.allBatches.concat(payload.batch)
  } 
  return Object.assign({}, prevState, extraInfo)
}
*/
export default function(state = initialState, action) {
  switch (action.type) {
  case EDIT_BATCH_PENDING:
    return Object.assign({}, state, {isSaving : true})  

  case SET_BATCH_SORT_FIELD:
    return Object.assign({}, state, {sortField : action.payload})

  case LOAD_BATCH_PENDING:
    return Object.assign({}, state, { isLoading : true })

  case LOAD_BATCH_CACHE_SUCCESS:
    return Object.assign({}, state, { isLoading: false})

  case SET_BATCH_PAGE_NUM: 
    return Object.assign({}, state, { batchPageNumber : action.payload })

  case SET_BATCH_INFINITE_AUTOLOAD: 
    return Object.assign({}, state, { isInfiniteAutoLoad : action.payload })

  case SET_BATCH_PAGE_LOADING: 
    return Object.assign({}, state, { isLoadingCurrentPage : action.payload })

  case EDIT_BATCH_SUCCESS:
    return Object.assign({}, state, { isSaving : false })
        
  case EDIT_BATCH_FAILURE:
    return Object.assign({}, state, { isSaving : false })
       
  case LOAD_BATCH_SUCCESS:
    return Object.assign({}, state, 
      { 
        isLoading: false,
        allBatches: action.payload, 
        isBatchLoadComplete: true,
        batchPageNumber: 1,
        isInfiniteAutoLoad: false,
        isLoadingCurrentPage: false
      })

  case LOAD_BATCH_FAILURE:
    return Object.assign({}, state, 
      {
        isLoading: false,
        isBatchLoadComplete: false,
        allBatches: [],
      })     


  default:
    return state  
  }
  
}  