import {
  useDatabase
} from '../../lib/db/SQL';

import {
  addUserDummyData,
  addWorkoutDummyData
} from '../../lib/db/SQL/seedDbHelpers';

const seed = async () => {
  await useDatabase();
  await addUserDummyData();
  await addWorkoutDummyData();
  process.exit();
};

seed();