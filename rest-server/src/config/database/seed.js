import {
  useDatabase
} from '../../lib/db/SQL';

import {
  addUserDummyData
} from '../../lib/db/SQL/seedDbHelpers';

const seed = async () => {
  await useDatabase();
  await addUserDummyData();
  process.exit();
};

seed();