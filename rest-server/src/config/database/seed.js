import {
  useDatabase
} from '../../lib/db/SQL';

import {
  addUserDummyData,
  addWorkoutDummyData
  addTrainerClientNonUserDummyData
} from '../../lib/db/SQL/seedDbHelpers';

const seed = async () => {
  await useDatabase();
  await addUserDummyData();
  await addWorkoutDummyData();
  await addTrainerClientNonUserDummyData();
  process.exit();
};

seed();