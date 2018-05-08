export const addWorkoutHelper = `
  INSERT INTO
    workouts (name, creator_id, is_public)
  VALUES 
    ($1, $2, $3)
  RETURNING 
    id, name, creator_id, is_public;
`;

export const addUsersWorkoutEntryHelper = `
  INSERT INTO
    usersWorkouts (user_id, workout_id)
  VALUES 
    ($1, $2)
  RETURNING 
    id, user_id, workout_id;
`;

export const addExerciseHelper = `
  INSERT INTO
    exercises (name, description, type, reps, sets, distance, pace, goaltime)
  VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8)
  RETURNING
    id, name, description, type, reps, sets, distance, pace, goaltime
`;

export const addExerciseWorkoutEntryHelper = `
  INSERT INTO
    exerciseWorkout (exercise_id, workout_id)
  VALUES 
    ($1, $2)
  RETURNING 
    id, exercise_id, workout_id;
`;

// export const fetchUserWorkoutsHelper = `
//   SELECT
//
//   FROM
//     workouts
//
//
//   WHERE
//
// `;