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

// Users Table

export const createUserTable = async () => {
  try {
    await db.query(
      `
      CREATE TABLE IF NOT EXISTS users
      (
      id SERIAL,
      email VARCHAR(255) UNIQUE NOT NULL,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      isTrainer BOOLEAN NOT NULL,
      picture VARCHAR(255),
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
      `DROP TABLE IF EXISTS users cascade`
    );
    success('successfully dropped users table');
  } catch (err) {
    error('error dropping users table ', err);
  }
};

// Workouts Table

export const createWorkoutTable = async () => {
  try {
    await db.query(
      `
      CREATE TABLE IF NOT EXISTS workouts
      (
      id SERIAL,
      name VARCHAR(100) NOT NULL,
      creator_id INT NOT NULL,
      created_at TIMESTAMP default NOW(),
      is_public BOOLEAN,
      CONSTRAINT workout_pk
        PRIMARY KEY(id),
      CONSTRAINT fk_creator_id
          FOREIGN KEY(creator_id) REFERENCES users(id)
      )
      `
    );
    success('successfully created workouts table');
  } catch (err) {
    error('error creating workouts table ', err)
  }
};

export const dropWorkoutTable = async () => {
  try {
    await db.query(
      `DROP TABLE IF EXISTS workouts cascade`
    );
    success('successfully dropped workouts table');
  } catch (err) {
    error('error dropping workouts table ', err);
  }
};

// Exercises Tables

export const createExerciseTable = async () => {
  // type
  //   0: Warm-up
  //   1: Strength
  //   2: Cardio
  //   3: Stretch
  try {
    await db.query(
      `
      CREATE TABLE IF NOT EXISTS exercises
      (
      id SERIAL,
      name VARCHAR(100) NOT NULL,
      description VARCHAR(255),
      type INT,
      reps INT,
      sets INT,
      distance VARCHAR(100),
      pace VARCHAR(100),
      goaltime VARCHAR(100),
      CONSTRAINT exercise_pk
        PRIMARY KEY(id)
      )
      `
    );
    success('successfully created exercises table');
  } catch (err) {
    error('error creating exercises table ', err)
  }
};

export const dropExerciseTable = async () => {
  try {
    await db.query(
      `DROP TABLE IF EXISTS exercises cascade`
    );
    success('successfully dropped exercises table');
  } catch (err) {
    error('error dropping exercises table ', err);
  }
};

// Users Workouts Join Table

export const createUsersWorkoutsTable = async () => {
  try {
    await db.query(
      `
      CREATE TABLE IF NOT EXISTS usersWorkouts
      (
        id SERIAL,
        user_id INT NOT NULL,
        workout_id INT NOT NULL,
        CONSTRAINT usersWorkouts_pk
          PRIMARY KEY(id),
        CONSTRAINT fk_usersWorkouts_user_id
          FOREIGN KEY(user_id) REFERENCES users(id),
        CONSTRAINT fk_usersWorkouts_workout_id
          FOREIGN KEY(workout_id) REFERENCES workouts(id)
      )
      `
    );
    success('succesfully created usersWorkouts table')
  } catch (err) {
    error('error creating usersWorkouts table ', err);
  }
};

export const dropUsersWorkoutsTable = async () => {
  try {
    await db.query(
      `DROP TABLE IF EXISTS usersWorkouts cascade`
    );
  } catch (err) {
    error('error dropping usersWorkouts table ', err);
  }
};

// Exercise Workout Join Table

export const createExerciseWorkoutTable = async () => {
  try {
    await db.query(
      `
      CREATE TABLE IF NOT EXISTS exerciseWorkout
      (
        id SERIAL,
        exercise_id INT NOT NULL,
        workout_id INT NOT NULL,
        order_index INT NOT NULL,
        CONSTRAINT exerciseWorkout_pk
          PRIMARY KEY(id),
        CONSTRAINT fk_exerciseWorkout_exercise_id
          FOREIGN KEY(exercise_id) REFERENCES exercises(id),
        CONSTRAINT fk_exerciseWorkout_workout_id
          FOREIGN KEY(workout_id) REFERENCES workouts(id)
      )
      `
    );
    success('successfully created exerciseWorkout table')
  } catch (err) {
    error('error creating exerciseWorkout table ', err);
  }
};

export const dropExerciseWorkoutTable = async () => {
  try {
    await db.query(
      `DROP TABLE IF EXISTS exerciseWorkout cascade`
    );
  } catch (err) {
    error('error dropping exerciseWorkout table ', err);
  }
};