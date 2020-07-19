module.exports = {
  API_URL           : 'https://api.topcoder.com/v3',
  API_URL_V2        : 'https://api.topcoder.com/v2',
  INTERNAL_API_URL  : 'https://internal-api.topcoder.com/v3',
  ASSET_PREFIX      : 'https://s3.amazonaws.com/app.topcoder.com/',
  AUTH_API_URL      : 'https://api.topcoder.com/v3',
  GROUPS_API_URL    : 'https://api.topcoder.com/v5/groupmanager',

  auth0Callback     : 'https://api.topcoder.com/pub/callback.html',
  auth0Domain       : 'topcoder.auth0.com',
  domain            : 'topcoder.com',
  DOMAIN            : 'topcoder.com',
  ENV               : 'PROD',
  NODE_ENV          : 'production',

  MAIN_URL           : 'https://www.topcoder.com',
  PHOTO_LINK_LOCATION: 'https://community.topcoder.com',

  ACCOUNTS_APP_URL             : 'https://accounts.topcoder.com/#!/member',
  ACCOUNTS_APP_LOGIN_URL       : 'https://accounts.topcoder.com/#!/member',
  ACCOUNTS_APP_CONNECTOR_URL   : 'https://accounts.topcoder.com/connector.html',

  MAINTENANCE_MODE: process.env.PROD_MAINTENANCE_MODE,

}
