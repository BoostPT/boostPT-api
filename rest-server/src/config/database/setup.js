import {
  createDatabase,
  createUserTable,
  createWorkoutTable,
  createExerciseTable,
  createUsersWorkoutsTable,
  createExerciseWorkoutTable,
  createStarWorkoutTable,
  createStarExerciseTable,
  createTrainerClientNonUserTable,
  dropDatabase,
  dropUserTable,
  dropWorkoutTable,
  dropExerciseTable,
  dropUsersWorkoutsTable,
  dropExerciseWorkoutTable,
  dropStarWorkoutTable,
  dropStarExerciseTable,
  dropTrainerClientNonUserTable
} from '../../lib/db/SQL';

// Temp until we make more seed data files
import {
  addUserDummyData,
  addTrainerClientNonUserDummyData
} from '../../lib/db/SQL/seedDbHelpers';

const setup = async () => {
  await dropDatabase();
  await dropUserTable();
  await dropWorkoutTable();
  await dropExerciseTable();
  await dropExerciseWorkoutTable();
  await dropUsersWorkoutsTable();
  await dropStarWorkoutTable();
  await dropStarExerciseTable();
  await dropTrainerClientNonUserTable();
  await createDatabase();
  await createUserTable();
  await createWorkoutTable();
  await createExerciseTable();
  await createUsersWorkoutsTable();
  await createExerciseWorkoutTable();
  await createDatabase();
  await createUserTable();
  await createStarWorkoutTable();
  await createStarExerciseTable();
  await createTrainerClientNonUserTable();
  await addUserDummyData();
  await addTrainerClientNonUserDummyData();
  process.exit();
};

setup();