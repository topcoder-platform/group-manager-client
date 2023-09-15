module.exports = {
  ASSET_PREFIX      : 'https://s3.amazonaws.com/app.topcoder-dev.com/',
  GROUPS_API_URL     : 'https://api.topcoder-dev.com/v5/groupmanager', 
  DOMAIN            : 'topcoder-dev.com',
  ENV               : 'DEV',

  MAIN_URL           : 'https://www.topcoder-dev.com',
  PHOTO_LINK_LOCATION: 'https://community.topcoder-dev.com',

  ACCOUNTS_APP_URL             : 'https://accounts-auth0.topcoder-dev.com',
  ACCOUNTS_APP_LOGIN_URL       : 'https://accounts-auth0.topcoder-dev.com',
  ACCOUNTS_APP_CONNECTOR_URL   : 'https://accounts-auth0.topcoder-dev.com',

  FILE_PICKER_API_KEY: process.env.FILE_PICKER_API_KEY_DEV,
  FILE_PICKER_SUBMISSION_CONTAINER_NAME: 'submission-staging-dev',


  MAINTENANCE_MODE: process.env.DEV_MAINTENANCE_MODE,

}
