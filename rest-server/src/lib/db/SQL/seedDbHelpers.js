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

export const addTrainerClientNonUserDummyData = async () => {
  try {
    await db.query(
      `INSERT INTO trainerClientNonUser (trainer_id, client_name) 
      VALUES 
      ('${1}', '${'David_Johnson'}'),
      ('${1}', '${'Pete_Matthews'}'),
      ('${1}', '${'Sally_Fuller'}'),
      ('${1}', '${'Phillip_Phillips'}'),
      ('${1}', '${'John_Smith'}'),
      ('${1}', '${'James_Johnson'}')`
    );
    success('successfully seeded trainerClientNonUser table');
  } catch (err) {
    error('error adding dummy non user client', err);
  }
};