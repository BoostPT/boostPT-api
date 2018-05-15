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
    id
`;

export const addExerciseWorkoutEntryHelper = `
  INSERT INTO
    exerciseWorkout (exercise_id, workout_id, order_index)
  VALUES 
    ($1, $2, $3)
  RETURNING 
    id, exercise_id, workout_id, order_index;
`;

export const fetchWorkoutsByUser = `
  SELECT
    id, name, is_public, created_at
  FROM
    workouts
  WHERE
    creator_id=$1
  ORDER BY
    id DESC
`;

export const fetchExercisesByWorkout = `
  SELECT
    exercises.id, name, description, type, reps, sets, distance, pace, goaltime, order_index
  FROM
    exercises
  JOIN
    exerciseWorkout
  ON
    exercises.id = exerciseWorkout.exercise_id
  WHERE
    workout_id=$1
`;

export const deleteWorkouts = `
  DELETE
  FROM 
    workouts
  WHERE 
    id=$1
`;

export const deleteExercises = `
  DELETE
  FROM
    exerciseWorkout
  WHERE
    workout_id=$1
`;

// DELETE
//   exercises, exerciseWorkout
// FROM 
//   exercises 
// INNER JOIN 
//   exerciseWorkout  
// WHERE 
//   exercises.id=exerciseWorkout.workout_id
// AND 
//   exerciseWorkout.workout_id=$1

// DELETE 
//   a.*, b.*
// FROM 
//   exercises AS a
// LEFT JOIN 
//   exerciseWorkout AS b 
// ON 
//   a.id = b.exercise_id
// WHERE 
//   b.workout_id = $1
