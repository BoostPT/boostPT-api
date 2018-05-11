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