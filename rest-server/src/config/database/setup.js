import {
  createDatabase,
  createUserTable,
  dropDatabase,
  dropUserTable,
  useDatabase,
} from '../../lib/db/SQL';

const setup = async () => {
  await dropDatabase();
  await dropUserTable();
  await createDatabase();
  await createUserTable();
  process.exit();
}

setup();