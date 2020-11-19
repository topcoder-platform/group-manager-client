import {
  LOAD_CONNECT_SUCCESS,
  LOAD_CONNECT_FAILURE,
  LOAD_CONNECT_PENDING,
  LOAD_CONNECT_CACHE_SUCCESS,
    
  EDIT_CONNECT_SUCCESS,
  EDIT_CONNECT_PENDING,
  EDIT_CONNECT_FAILURE,
  
  LOAD_CONNECT_ID_PENDING,
  LOAD_CONNECT_ID_SUCCESS,
  LOAD_CONNECT_ID_FAILURE,
  RESET_NEW_CONNECT_ID,
    
  SET_CONNECT_INFINITE_AUTOLOAD,
  SET_CONNECT_PAGE_NUM,
  SET_CONNECT_PAGE_LOADING,
  SET_CONNECT_SORT_FIELD
    
} from '../config/constants'
    
export const initialState = {
  isLoading : true,
  allConnect: [],  //All Connect that are already available
  isConnectSaveInProgress: false,
  isConnectLoadComplete: false, //Is Connect have been loaded in the state. 
  projectLoadSuccessful: false,
      
  isInfiniteAutoLoad: false, //Should the page start loading the connect automatically
  connectPageNumber: 1, //The page that should be currently displayed
  isLoadingCurrentPage: false, //If the current Page load is in progress
    
  sortField: 'id', //Default Sort field used in Connect header
    
  isSaving: false, //If the create Connect save in progress
  currentConnect: {
    details: {
    },
    id: null
  },
  currentConnectLoading: false
}
    
function updateState(state, payload, extraInfo) {
  const prevState = {...state}
  if (payload.isNew) {
    prevState.allConnect = prevState.allConnect.concat(payload.batch)
  } 
  return Object.assign({}, prevState, extraInfo)
}
    
export default function(state = initialState, action) {
  switch (action.type) {
  case EDIT_CONNECT_PENDING:
    return Object.assign({}, state, {isSaving : true})  
    
  case LOAD_CONNECT_ID_PENDING:
    return Object.assign({}, state, {currentConnectLoading: true,
      currentConnect: {id: action.payload.connectId}})
  
  case LOAD_CONNECT_ID_SUCCESS:
    return Object.assign({}, state, {projectLoadSuccessful: true,
      currentConnectLoading: false,
      currentConnect: action.payload.response})
    
  case LOAD_CONNECT_ID_FAILURE:
    return Object.assign({}, state, {projectLoadSuccessful: false,
      currentConnectLoading: false})
    
  case RESET_NEW_CONNECT_ID:
    return Object.assign({}, state, {projectLoadSuccessful:false, 
      currentConnect: {detail:{}, id: null}})
        
  case SET_CONNECT_SORT_FIELD:
    return Object.assign({}, state, {sortField : action.payload})
    
  case LOAD_CONNECT_PENDING:
    return Object.assign({}, state, { isLoading : true })
    
  case LOAD_CONNECT_CACHE_SUCCESS:
    return Object.assign({}, state, { isLoading: false})
    
  case SET_CONNECT_PAGE_NUM: 
    return Object.assign({}, state, { batchPageNumber : action.payload })
    
  case SET_CONNECT_INFINITE_AUTOLOAD: 
    return Object.assign({}, state, { isInfiniteAutoLoad : action.payload })
    
  case SET_CONNECT_PAGE_LOADING: 
    return Object.assign({}, state, { isLoadingCurrentPage : action.payload })
    
  case EDIT_CONNECT_SUCCESS:
    return Object.assign({}, state, { isSaving : false })
            
  case EDIT_CONNECT_FAILURE:
    return Object.assign({}, state, { isSaving : false })
           
  case LOAD_CONNECT_SUCCESS:
    return Object.assign({}, state, 
      { 
        isLoading: false,
        allConnect: action.payload, 
        isConnectLoadComplete: true,
        connectPageNumber: 1,
        isInfiniteAutoLoad: false,
        isLoadingCurrentPage: false
      })
    
  case LOAD_CONNECT_FAILURE:
    return Object.assign({}, state, 
      {
        isLoading: false,
        isConnectLoadComplete: false,
        allConnect: [],
      })     
  
  default:
    return state  
  }
      
}  