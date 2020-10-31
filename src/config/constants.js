/*
 * ACTIONS
 */

// Auth
export const LOAD_USER_SUCCESS     = 'LOAD_USER_SUCCESS'
export const LOAD_USER_FAILURE     = 'LOAD_USER_FAILURE'
export const LOAD_USER_PENDING     = 'LOAD_USER_PENDING'


// Search Term
export const SET_SEARCH_TERM   = 'SET_SEARCH_TERM'
export const SET_SEARCH_TAG    = 'SET_SEARCH_TAG'
export const RESET_SEARCH_TERM = 'RESET_SEARCH_TERM'

// Project Search
export const CLEAR_PROJECT_SEARCH       = 'CLEAR_PROJECT_SEARCH'
export const PROJECT_SEARCH             = 'PROJECT_SEARCH'
export const PROJECT_SEARCH_FAILURE     = 'PROJECT_SEARCH_FAILURE'
export const PROJECT_SEARCH_SUCCESS     = 'PROJECT_SEARCH_SUCCESS'
export const PROJECT_SEARCH_PENDING     = 'PROJECT_SEARCH_PENDING'
export const LOAD_MORE_PROJECTS         = 'LOAD_MORE_PROJECTS'
export const GET_PROJECTS               = 'GET_PROJECTS'
export const GET_PROJECTS_PENDING       = 'GET_PROJECTS_PENDING'
export const GET_PROJECTS_SUCCESS       = 'GET_PROJECTS_SUCCESS'
export const GET_PROJECTS_FAILURE       = 'GET_PROJECTS_FAILURE'
export const SET_PROJECTS_SEARCH_CRITERIA = 'SET_PROJECTS_SEARCH_CRITERIA'
export const SET_PROJECTS_LIST_VIEW = 'SET_PROJECTS_LIST_VIEW'

export const SWITCH_VIEW                  = 'SWITCH_VIEW'

//GROUP LOAD
export const LOAD_GROUP               = 'LOAD_GROUP'
export const LOAD_GROUP_PENDING       = 'LOAD_GROUP_PENDING'
export const LOAD_GROUP_SUCCESS       = 'LOAD_GROUP_SUCCESS'
export const LOAD_GROUP_FAILURE       = 'LOAD_GROUP_FAILURE'
export const LOAD_GROUP_CACHE_SUCCESS = 'LOAD_GROUP_CACHE_SUCCESS'

export const LOAD_CHILD_GROUPS_PENDING     = 'LOAD_CHILD_GROUPS_PENDING'
export const LOAD_CHILD_GROUPS_SUCCESS     = 'LOAD_CHILD_GROUPS_SUCCESS'
export const LOAD_CHILD_GROUPS_FAILURE     = 'LOAD_CHILD_GROUPS_FAILURE'

export const LOAD_CURRENT_GROUP_PENDING = 'LOAD_CURRENT_GROUP_PENDING'
export const LOAD_CURRENT_GROUP_SUCCESS = 'LOAD_CURRENT_GROUP_SUCCESS'
export const LOAD_CURRENT_GROUP_FAILURE = 'LOAD_CURRENT_GROUP_FAILURE'

export const LOAD_CURRENT_GROUP_MEMBERS_PENDING = 'LOAD_CURRENT_GROUP_MEMBERS_PENDING'
export const LOAD_CURRENT_GROUP_MEMBERS_SUCCESS = 'LOAD_CURRENT_GROUP_MEMBERS_SUCCESS'
export const LOAD_CURRENT_GROUP_MEMBERS_FAILURE = 'LOAD_CURRENT_GROUP_MEMBERS_FAILURE'

export const LOAD_CURRENT_CHILD_GROUP_MEMBERS_PENDING = 'LOAD_CURRENT_CHILD_GROUP_MEMBERS_PENDING'
export const LOAD_CURRENT_CHILD_GROUP_MEMBERS_SUCCESS = 'LOAD_CURRENT_CHILD_GROUP_MEMBERS_SUCCESS'
export const LOAD_CURRENT_CHILD_GROUP_MEMBERS_FAILURE = 'LOAD_CURRENT_CHILD_GROUP_MEMBERS_FAILURE'

export const ADD_MEMBERS_PENDING = 'ADD_MEMBERS_PENDING'
export const ADD_MEMBERS_SUCCESS = 'ADD_MEMBERS_SUCCESS'
export const ADD_MEMBERS_FAILURE = 'ADD_MEMBERS_FAILURE'
export const ADD_MEMBERS_INITIALIZE = 'ADD_MEMBERS_INITIALIZE'

export const REMOVE_GROUP_MEMBER_PENDING    = 'REMOVE_GROUP_MEMBER_PENDING'
export const REMOVE_GROUP_MEMBER_SUCCESS    = 'REMOVE_GROUP_MEMBER_SUCCESS'
export const REMOVE_GROUP_MEMBER_FAILURE    = 'REMOVE_GROUP_MEMBER_FAILURE'

export const EDIT_GROUP_PENDING   = 'EDIT_GROUP_PENDING'
export const EDIT_GROUP_SUCCESS   = 'EDIT_GROUP_SUCCESS'
export const EDIT_GROUP_FAILURE   = 'EDIT_GROUP_FAILURE'

export const GROUP_LIST_SORT            = 'GROUP_LIST_SORT' 
export const MEMBER_LIST_SORT           = 'MEMBER_LIST_SORT' 
export const CHILD_GROUP_LIST_SORT      = 'CHILD_GROUP_LIST_SORT' 

export const SET_MEMBERS_INFINITE_AUTOLOAD = 'SET_MEMBERS_INFINITE_AUTOLOAD'
export const SET_CURRENT_MEMBER_SEARCH_TERM = 'SET_CURRENT_MEMBER_SEARCH_TERM'
export const SET_CURRENT_MEMBER_SORT_FIELD = 'SET_CURRENT_MEMBER_SORT_FIELD'

export const SET_CURRENT_MEMBER_PAGE_NUM = 'SET_CURRENT_MEMBER_PAGE_NUM'
export const REFRESH_USER_MEMBERS = 'REFRESH_USER_MEMBERS'

export const SET_GROUPS_INFINITE_AUTOLOAD = 'SET_GROUPS_INFINITE_AUTOLOAD'
export const SET_GROUPS_PAGE_NUM = 'SET_GROUPS_PAGE_NUM'
export const SET_GROUPS_PAGE_LOADING = 'SET_GROUPS_PAGE_LOADING'

/*********************************END GROUP CONSTANTS **********************/

/***************************BATCH CONSTANTS *******************************/
export const LOAD_BATCH_SUCCESS = 'LOAD_BATCH_SUCCESS'
export const LOAD_BATCH_FAILURE = 'LOAD_BATCH_FAILURE'
export const LOAD_BATCH_PENDING = 'LOAD_BATCH_PENDING'
export const LOAD_BATCH_CACHE_SUCCESS = 'LOAD_BATCH_CACHE_SUCCESS'

export const SET_BATCH_INFINITE_AUTOLOAD = 'SET_BATCH_INFINITE_AUTOLOAD'
export const SET_BATCH_PAGE_NUM = 'SET_BATCH_PAGE_NUM'
export const SET_BATCH_PAGE_LOADING = 'SET_BATCH_PAGE_LOADING'

export const SET_BATCH_SORT_FIELD = 'SET_BATCH_SORT_FIELD'
export const BATCH_LIST_PER_PAGE = 50

export const EDIT_BATCH_SUCCESS = 'EDIT_BATCH_SUCCESS'
export const EDIT_BATCH_PENDING = 'EDIT_BATCH_PENDING'
export const EDIT_BATCH_FAILURE = 'EDIT_BATCH_FAILURE'

/*************************** END BATCH CONSTANTS****************************/

/***************************CONNECT CONSTANTS *******************************/
export const LOAD_CONNECT_SUCCESS = 'LOAD_CONNECT_SUCCESS'
export const LOAD_CONNECT_FAILURE = 'LOAD_CONNECT_FAILURE'
export const LOAD_CONNECT_PENDING = 'LOAD_CONNECT_PENDING'
export const LOAD_CONNECT_CACHE_SUCCESS = 'LOAD_CONNECT_CACHE_SUCCESS'

export const LOAD_CONNECT_ID_PENDING = 'LOAD_CONNECT_ID_PENDING'
export const LOAD_CONNECT_ID_SUCCESS = 'LOAD_CONNECT_ID_SUCCESS'
export const LOAD_CONNECT_ID_FAILURE = 'LOAD_CONNECT_ID_FAILURE'
export const RESET_NEW_CONNECT_ID  = 'RESET_NEW_CONNECT_ID'

export const SET_CONNECT_INFINITE_AUTOLOAD = 'SET_CONNECT_INFINITE_AUTOLOAD'
export const SET_CONNECT_PAGE_NUM = 'SET_CONNECT_PAGE_NUM'
export const SET_CONNECT_PAGE_LOADING = 'SET_CONNECT_PAGE_LOADING'

export const SET_CONNECT_SORT_FIELD = 'SET_CONNECT_SORT_FIELD'
export const CONNECT_LIST_PER_PAGE = 50

export const EDIT_CONNECT_SUCCESS = 'EDIT_CONNECT_SUCCESS'
export const EDIT_CONNECT_PENDING = 'EDIT_CONNECT_PENDING'
export const EDIT_CONNECT_FAILURE = 'EDIT_CONNECT_FAILURE'

/*************************** END BATCH CONSTANTS****************************/

export const SET_CURRENT_GROUP_EDIT = 'SET_CURRENT_GROUP_EDIT'

// projects list view types
export const PROJECTS_LIST_VIEW = {
  GRID: 'grid',
  CARD: 'card'
}


/*
 * Events
 */
export const EVENT_ROUTE_CHANGE = 'event.route_change'

/*
 * User Roles
 */
export const ROLE_TOPCODER_USER = 'Topcoder User'
export const ROLE_GROUP_MANAGER = 'Group Manager'
export const ROLE_ADMINISTRATOR = 'administrator'
export const ADMIN_ROLES = [ROLE_ADMINISTRATOR, ROLE_GROUP_MANAGER]

/*
 * URLs
 */
export const DOMAIN = process.env.domain || 'topcoder-dev.com'
//export const CONNECT_DOMAIN = `connect.${DOMAIN}`
export const ACCOUNTS_APP_CONNECTOR_URL = process.env.ACCOUNTS_APP_CONNECTOR_URL
export const ACCOUNTS_APP_LOGIN_URL = process.env.ACCOUNTS_APP_LOGIN_URL || `https://accounts.${DOMAIN}/member`
export const GROUPS_API_URL = process.env.GROUPS_API_URL

export const SERVER_PORT = 3001

//export const TC_API_URL = `https://api.${DOMAIN}/${SERVER_PORT}`
//export const TC_NOTIFICATION_URL = process.env.TC_NOTIFICATION_URL || `${TC_API_URL}/v5/notifications`



export const CODER_BOT_USER_FNAME = 'Coder'
export const CODER_BOT_USER_LNAME = 'the Bot'
export const CONNECT_USER_HANDLE = 'connectuser'
export const CONNECT_USER_FNAME = 'Connect'
export const CONNECT_USER_LNAME = 'User'
export const CONNECT_USER = {
  firstName: CONNECT_USER_FNAME,
  lastName: CONNECT_USER_LNAME,
}

export const PROJECT_MAX_COLORS = 5

export const AUTOCOMPLETE_TRIGGER_LENGTH = 3

// Toggle this flag to enable/disable maintenance mode
export const MAINTENANCE_MODE = process.env.MAINTENANCE_MODE


/**
 * These query params are special during project creating wizard.
 * They have some special code to handle them.
 */

// for local testing Connect App with Project Service, comment the previous line and uncomment the next one
// export const PROJECTS_API_URL = 'http://localhost:8001'

// ToolTip
export const TOOLTIP_DEFAULT_DELAY = 300 // in ms

// Projects list
export const PROJECTS_LIST_PER_PAGE = 4
export const GROUP_LIST_PER_PAGE = 50

export const MEMEBER_LIST_PER_PAGE = 10


// 60px of primary toolbar height + 50px of secondary toolbar height + 10px to make some margin
export const SCROLL_TO_MARGIN = 60 + 50 + 10
export const SCROLL_TO_DURATION = 500 // ms


// Screen breakpoints
export const SCREEN_BREAKPOINT_LG = 1360
export const SCREEN_BREAKPOINT_RG = 992
export const SCREEN_BREAKPOINT_MD = 768
export const SCREEN_BREAKPOINT_SM = 640
export const SCREEN_BREAKPOINT_XS = 320
