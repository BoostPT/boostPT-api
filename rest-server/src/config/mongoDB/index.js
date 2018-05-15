require('dotenv').config();

import mongoose from 'mongoose';
import {
  success,
  error,
} from '../../lib/log';

const options = {
  auth: {
    user: process.env.NODE_ENV === 'production' ? process.env.NOSQL_AWS_USER : process.env.NOSQL_LOCAL_USER,
    password: process.env.NODE_ENV === 'production' ? process.env.NOSQL_AWS_PASSWORD : process.env.NOSQL_LOCAL_PASSWORD,  
  }, 
  authSource: process.env.NODE_ENV === 'production' ? process.env.NOSQL_AWS_HOST : process.env.NOSQL_LOCAL_HOST,
  port: process.env.NODE_ENV = 'production' ? process.env.NOSQL_AWS_PORT : process.env.NOSQL_LOCAL_PORT
}

mongoose.connect(`mongodb://${options.auth.user}:${options.auth.password}@${options.authSource}:${options.port}/boostpt`);
let db = mongoose.connection;
db.on('error', (err) => {
  error('error in mongoDB', err);
});
db.once('open', () => {
  success('successfully connected to mongoDB', options.authSource);
});

module.exports.db = db;


