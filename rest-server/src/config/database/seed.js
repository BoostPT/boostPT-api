import {
  useDatabase
} from '../../lib/db/SQL';

import {
  addUserDummyData,
  addTrainerClientNonUserDummyData
} from '../../lib/db/SQL/seedDbHelpers';

const seed = async () => {
  await useDatabase();
  await addUserDummyData();
  await addTrainerClientNonUserDummyData();
  process.exit();
};

seed();