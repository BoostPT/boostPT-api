require('dotenv').config();

import db from '../../../config/database';

import {
  success,
  error
} from '../../log';

const database = process.env.NODE_ENV === 'production' ? process.env.AWS_DATABASE : process.env.LOCAL_DATABASE;

export const createDatabase = async () => {
  try {
    await db.query(
      `CREATE DATABASE ${database}`
    );
    success('successfully created database ', database);
  } catch (err) {
    error('error creating database ', err);
  }
};

export const dropDatabase = async () => {
  try {
    await db.query(
      `DROP DATABASE IF EXISTS ${database}`
    );
    success('successfully dropped database ', database);
  } catch (err) {
    error('error dropping database ', err);
  }
};

export const useDatabase = async () => {
  try {
    await db.query(
      `USE IF EXISTS ${database}`
    );
    success('successfully using database ', database);
  } catch (err) {
    error('error using database ', err);
  }
};

export const createUserTable = async () => {
  try {
    await db.query(
      `
      CREATE TABLE IF NOT EXISTS users
      (
      id SERIAL,
      email VARCHAR(255) UNIQUE NOT NULL,
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      isTrainer BOOLEAN NOT NULL,
      CONSTRAINT users_pk 
        PRIMARY KEY(id)
      )
      `
    );
    success('successfully created users table');
  } catch (err) {
    error('error creating users table ', err)
  }
};

export const dropUserTable = async () => {
  try {
    await db.query(
      `DROP TABLE IF EXISTS users`
    );
    success('successfully dropped users table');
  } catch (err) {
    error('error dropping users table ', err);
  }
};

export const addUserDummyData = async () => {
  try {
    await db.query(
      `INSERT INTO users (email, username, password, istrainer) VALUES ('${'gus@cheesemail.com'}', '${'gus'}', '${'1234'}', '${'true'}')`
    );
    success('added Gus as trainer');
    try {
      await db.query(
        `INSERT INTO users (email, username, password, istrainer) VALUES ('${'aaron@gmail.com'}', '${'Aaron Melendez'}', '${'1234'}', '${'false'}')`
      );
      success('added Aaron as an athlete');
    } catch (err) {
      error('error adding dummy user', err);
    }
  } catch (err) {
    error('error adding dummy user', err);
  }
}

