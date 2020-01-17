module.exports = {
  API_URL           : 'https://api.topcoder-dev.com/v3',
  API_URL_V2        : 'https://api.topcoder-dev.com/v2',
  INTERNAL_API_URL  : 'https://internal-api.topcoder-dev.com/v3',
  ASSET_PREFIX      : 'https://s3.amazonaws.com/app.topcoder-dev.com/',
  AUTH_API_URL      : 'https://api.topcoder-dev.com/v3',
  auth0Callback     : 'https://api.topcoder-dev.com/pub/callback.html',
  auth0Domain       : 'topcoder-dev.auth0.com',
  clientId          : process.env.AUTH0_CLIENT_ID_DEV,
  AUTH0_DOMAIN      : 'topcoder-dev.auth0.com',
  AUTH0_CLIENT_ID   : process.env.AUTH0_CLIENT_ID_DEV,
  domain            : 'topcoder-dev.com',
  DOMAIN            : 'topcoder-dev.com',
  ENV               : 'DEV',

  MAIN_URL           : 'https://www.topcoder-dev.com',
  PHOTO_LINK_LOCATION: 'https://community.topcoder-dev.com',

  ACCOUNTS_APP_URL             : 'https://accounts.topcoder-dev.com/#!/member',
  ACCOUNTS_APP_CONNECTOR_URL   : 'https://accounts.topcoder-dev.com/connector.html',


  MAINTENANCE_MODE: process.env.DEV_MAINTENANCE_MODE,

}
