module.exports = {
  ASSET_PREFIX      : 'https://s3.amazonaws.com/app.topcoder.com/',
  GROUPS_API_URL    : 'https://api.topcoder.com/v5/groupmanager',
  DOMAIN            : 'topcoder.com',
  ENV               : 'PROD',
  NODE_ENV          : 'production',

  MAIN_URL           : 'https://www.topcoder.com',
  PHOTO_LINK_LOCATION: 'https://community.topcoder.com',

  ACCOUNTS_APP_URL             : 'https://accounts-auth0.topcoder.com',
  ACCOUNTS_APP_LOGIN_URL       : 'https://accounts-auth0.topcoder.com',
  ACCOUNTS_APP_CONNECTOR_URL   : 'https://accounts-auth0.topcoder.com',

  FILE_PICKER_API_KEY: process.env.FILE_PICKER_API_KEY,
  FILE_PICKER_SUBMISSION_CONTAINER_NAME: 'submission-staging-dev',

  MAINTENANCE_MODE: process.env.PROD_MAINTENANCE_MODE,

}
