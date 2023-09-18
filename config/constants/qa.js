module.exports = {
  ASSET_PREFIX      : 'https://s3.amazonaws.com/app.topcoder-qa.com/',
  DOMAIN            : 'topcoder-qa.com',
  ENV               : 'QA',
  
  MAIN_URL           : 'https://www.topcoder-qa.com',
 
  ACCOUNTS_APP_URL             : 'https://accounts.topcoder-qa.com/#!/member',
  ACCOUNTS_APP_CONNECTOR_URL   : 'https://accounts.topcoder-qa.com/connector.html',
  MAINTENANCE_MODE: process.env.QA_MAINTENANCE_MODE,
}
