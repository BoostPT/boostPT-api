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
  useDatabase,
} from '../../lib/db/SQL';

// Temp until we make more seed data files
import {
  addUserDummyData
} from '../../lib/db/SQL/seedDbHelpers';

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
  await addUserDummyData();
  process.exit();
};

setup();