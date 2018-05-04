import {
  createDatabase,
  createUserTable,
  dropDatabase,
  dropUserTable,
  addUserDummyData,
  useDatabase,
} from '../../lib/db/SQL';

const setup = async () => {
  await dropDatabase();
  await dropUserTable();
  await createDatabase();
  await createUserTable();
  await addUserDummyData();
  process.exit();
}

setup();