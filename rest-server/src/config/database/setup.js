import {
  createDatabase,
  createUserTable,
  createWorkoutTable,
  createExerciseTable,
  createUsersWorkoutsTable,
  createExerciseWorkoutTable,
  dropDatabase,
  dropUserTable,
  dropWorkoutTable,
  dropExerciseTable,
  dropUsersWorkoutsTable,
  dropExerciseWorkoutTable,
  dropTrainerClientNonUserTable,
  createTrainerClientNonUserTable,
  addTrainerClientNonUserDummyData,
  useDatabase,
} from '../../lib/db/SQL';

// Temp until we make more seed data files
import {
  addUserDummyData
} from '../../lib/db/SQL/seedDbHelpers';

import {
  addMessagesDummyData,
  dropMessagesCollection
} from '../../lib/db/mongo/seedDbHelpers';

const setup = async () => {
  await dropDatabase();
  await dropUserTable();
  await dropWorkoutTable();
  await dropExerciseTable();
  await dropExerciseWorkoutTable();
  await dropUsersWorkoutsTable();
  await createDatabase();
  await createUserTable();
  await createWorkoutTable();
  await createExerciseTable();
  await createUsersWorkoutsTable();
  await createExerciseWorkoutTable();
  await dropTrainerClientNonUserTable();
  await createDatabase();
  await createUserTable();
  await createTrainerClientNonUserTable();
  await addUserDummyData();
  await addTrainerClientNonUserDummyData();
  await dropMessagesCollection();
  await addMessagesDummyData();
  process.exit();
};

setup();