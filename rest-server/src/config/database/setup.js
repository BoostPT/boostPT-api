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
  createEventsTable,
  createTrainerClientUserTable,
  createTrainerRequestsTable,
  dropDatabase,
  dropUserTable,
  dropWorkoutTable,
  dropExerciseTable,
  dropUsersWorkoutsTable,
  dropExerciseWorkoutTable,
  dropStarWorkoutTable,
  dropStarExerciseTable,
  dropEventsTable,
  dropTrainerClientNonUserTable,
  droptrainerClientUserTable,
  dropTrainerRequestsTable
} from '../../lib/db/SQL';

import '../mongoDB';

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
  await dropEventsTable();
  await droptrainerClientUserTable();
  await dropTrainerRequestsTable();
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
  await createEventsTable();
  await createTrainerClientUserTable();
  await createTrainerRequestsTable();
  process.exit();
};

setup();