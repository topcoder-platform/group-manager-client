import {
  LOAD_BULKUPLOAD_SUCCESS,
  LOAD_BULKUPLOAD_FAILURE,
  LOAD_BULKUPLOAD_PENDING,
  LOAD_BULKUPLOAD_CACHE_SUCCESS,

  EDIT_BULKUPLOAD_SUCCESS,
  EDIT_BULKUPLOAD_PENDING,
  EDIT_BULKUPLOAD_FAILURE,

  SET_BULKUPLOAD_INFINITE_AUTOLOAD,
  SET_BULKUPLOAD_PAGE_NUM,
  SET_BULKUPLOAD_PAGE_LOADING,
  SET_BULKUPLOAD_SORT_FIELD

} from '../config/constants'


export const initialState = {
  isLoading: true,
  allBulkUploades: [],  //All Bulk Uploads that are already available
  isBulkUploadSaveInProgress: false,
  isBulkUploadComplete: false, //Is Bulk Upload Batches have been loaded in the state. 

  isInfiniteAutoLoad: false, //Should the page start loading the bulk upload records automatically
  bulkUploadPageNumber: 1, //The page that should be currently displayed
  isLoadingCurrentPage: false, //If the current Page load is in progress

  sortField: 'id', //Default Sort field used in Batch header
  isSaving: false //If the create Bulk Upload Batch save in progress
}

function updateState(state, payload, extraInfo) {
  const prevState = { ...state }
  if (payload.isNew) {
    prevState.allBatches = prevState.allBulkUploades.concat(payload.bulkUpload)
  }
  return Object.assign({}, prevState, extraInfo)
}

export default function (state = initialState, action) {
  switch (action.type) {
  case EDIT_BULKUPLOAD_PENDING:
    return Object.assign({}, state, { isSaving: true })

  case SET_BULKUPLOAD_SORT_FIELD:
    return Object.assign({}, state, { sortField: action.payload })

  case LOAD_BULKUPLOAD_PENDING:
    return Object.assign({}, state, { isLoading: true })

  case LOAD_BULKUPLOAD_CACHE_SUCCESS:
    return Object.assign({}, state, { isLoading: false })

  case SET_BULKUPLOAD_PAGE_NUM:
    return Object.assign({}, state, { bulkUploadPageNumber: action.payload })

  case SET_BULKUPLOAD_INFINITE_AUTOLOAD:
    return Object.assign({}, state, { isInfiniteAutoLoad: action.payload })

  case SET_BULKUPLOAD_PAGE_LOADING:
    return Object.assign({}, state, { isLoadingCurrentPage: action.payload })

  case EDIT_BULKUPLOAD_SUCCESS:
    return Object.assign({}, state, { isSaving: false })

  case EDIT_BULKUPLOAD_FAILURE:
    return Object.assign({}, state, { isSaving: false })

  case LOAD_BULKUPLOAD_SUCCESS:
    return Object.assign({}, state,
      {
        isLoading: false,
        allBulkUploades: action.payload,
        isBulkUploadComplete: true,
        bulkUploadPageNumber: 1,
        isInfiniteAutoLoad: false,
        isLoadingCurrentPage: false
      })

  case LOAD_BULKUPLOAD_FAILURE:
    return Object.assign({}, state,
      {
        isLoading: false,
        isBulkUploadComplete: false,
        allBulkUploades: [],
      })

  default:
    return state
  }

}  