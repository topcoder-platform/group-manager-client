module.exports = {
  API_URL           : 'https://api.topcoder-qa.com/v3',
  API_URL_V2        : 'https://api.topcoder-qa.com/v2',
  INTERNAL_API_URL  : 'https://internal-api.topcoder-qa.com/v3',
  ASSET_PREFIX      : 'https://s3.amazonaws.com/app.topcoder-qa.com/',
  AUTH_API_URL      : 'https://api.topcoder-qa.com/v3',
  auth0Callback     : 'https://api.topcoder-qa.com/pub/callback.html',
  auth0Domain       : 'topcoder-qa.auth0.com',
  clientId          : process.env.AUTH0_CLIENT_ID_QA,
  AUTH0_DOMAIN      : 'topcoder-qa.auth0.com',
  AUTH0_CLIENT_ID   : process.env.AUTH0_CLIENT_ID_QA,
  domain            : 'topcoder-qa.com',
  DOMAIN            : 'topcoder-qa.com',
  ENV               : 'QA',
  
  MAIN_URL           : 'https://www.topcoder-qa.com',
 
  ACCOUNTS_APP_URL             : 'https://accounts.topcoder-qa.com/#!/member',
  ACCOUNTS_APP_CONNECTOR_URL   : 'https://accounts.topcoder-qa.com/connector.html',
  MAINTENANCE_MODE: process.env.QA_MAINTENANCE_MODE,
}
