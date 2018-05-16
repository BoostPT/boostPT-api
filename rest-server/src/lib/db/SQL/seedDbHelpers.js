import {error, success} from "../../log";
import {hashPassword} from "../../../middleware/auth/bcrypt";
import db from "../../../config/database";

export const addUserDummyData = async () => {

  const hashedPassword = await hashPassword('password');

  try {
    await db.query(
      `INSERT INTO users (email, username, password, istrainer) VALUES ('${'gus@cheesemail.com'}', '${'gus'}', '${hashedPassword}', '${'true'}')`
    );
    await db.query(
      `INSERT INTO users (email, username, password, istrainer) VALUES ('${'aaron@gmail.com'}', '${'AaronMelendez'}', '${hashedPassword}', '${'false'}')`
    );
    success('successfully seeded users table');
  } catch (err) {
    error('error adding dummy user', err);
  }
};

export const addWorkoutDummyData = async () => {
  try {
    await db.query(
      `INSERT INTO workouts (name, creator_id, is_public) VALUES ('${'Cardio Workout'}', '${'2'}', '${'true'}')`
    );
    await db.query(
      `INSERT INTO exercises (name, description, type, distance) VALUES ('${'Stair Master'}', '${'Difficulty set to 6'}', '${'2'}', '${'10 flights'}')`
    );
    await db.query(
      `INSERT INTO exerciseWorkout (exercise_id, workout_id, order_index) VALUES ('${'1'}', '${'1'}', '${'0'}')`
    );
    success('successfully seeded users table');
  } catch (err) {
    error('error adding dummy user', err);
  }
};