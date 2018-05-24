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
    'PORT=8000',
    'LOCAL_USER=root',
    'LOCAL_HOST=localhost',
    'LOCAL_DATABASE=boostpt',
    'LOCAL_PASSWORD=',
    'LOCAL_PORT=5432',
    'AWS_USER=',
    'AWS_HOST=',
    'AWS_ACCESS_KEY=',
    'AWS_SECRET_KEY=',
    'AWS_DATABASE=',
    'AWS_PASSWORD=',
    'AWS_PORT=',
    'NOSQL_LOCAL_USER=userAdmin',
    'NOSQL_LOCAL_HOST=localhost',
    'NOSQL_LOCAL_DATABASE=boostpt',
    'NOSQL_LOCAL_PASSWORD=',
    'NOSQL_LOCAL_PORT=27017',
    'NOSQL_AWS_USER=userAdmin',
    'NOSQL_AWS_HOST=localhost',
    'NOSQL_AWS_DATABASE=boostpt',
    'NOSQL_AWS_PASSWORD=',
    'NOSQL_AWS_PORT=27017',
    'SALT_ROUNDS=10',
    'TOKEN_SECRET=fitnessguru',
    'S3_BUCKET='
  ],
  'socket-server': [
    'NODE_ENV=test',
    'DEBUG=TRUE',
    'HOST=http://localhost',
    'PORT=5000',
  ]
};

module.exports = envBuild;