/** 
 * These are lists of environment variables 
 * 
 * envBuild[directory] = [...environmentVariables]
 * Will need to add other types of servers later in development. (i.e )
 */

const envBuild = {
  'rest-server': [
    'DEBUG=TRUE',
    'NODE_ENV=test',
    'PORT=3396',
    'LOCAL_USER=root',
    'LOCAL_HOST=localhost',
    'LOCAL_DATABASE=codesling',
    'LOCAL_PASSWORD=',
    'LOCAL_PORT=5432',
    'AWS_USER=',
    'AWS_HOST=',
    'AWS_DATABASE=',
    'AWS_PASSWORD=',
    'AWS_PORT=',
    'SALT_ROUNDS=10',
    'TOKEN_SECRET=codeslingapi'
  ]
};

module.exports = envBuild;