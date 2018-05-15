require('dotenv').config();

import { Pool } from 'pg';

import {
  success,
  error,
} from '../../lib/log';

const config = {
  user: process.env.NODE_ENV === 'production' ? process.env.AWS_USER : process.env.LOCAL_USER,
  host: process.env.NODE_ENV === 'production' ? process.env.AWS_HOST : process.env.LOCAL_HOST,
  database: process.env.NODE_ENV === 'production' ? process.env.AWS_DATABASE : process.env.LOCAL_DATABASE,
  password: process.env.NODE_ENV === 'production' ? process.env.AWS_PASSWORD : process.env.LOCAL_PASSWORD,
  port: process.env.NODE_ENV === 'production' ? process.env.AWS_PORT : process.env.LOCAL_PORT,
  max: 20
};

const db = new Pool(config);

db.on('connect', () => {
  success('successfully connected to postgres', config.database);
});

db.on('remove', client => {
  success('successfully removed client ', client)
});

db.on('error', (err) => {
  error('error in postgres ', err);
});

db.connect();

export default db;
