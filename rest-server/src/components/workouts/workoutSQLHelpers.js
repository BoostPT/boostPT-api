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
    w.id, w.name, w.is_public, w.created_at, sw.id IS NOT NULL as star
  FROM
    workouts as w
  FULL OUTER JOIN
    starWorkout as sw
  ON
    w.id=sw.workout_id
  WHERE
    w.creator_id=$1
  ORDER BY
    w.id DESC
`;

export const fetchExercisesByWorkout = `
  SELECT
    e.id, e.name, e.description, e.type, e.reps, e.sets, e.distance, e.pace, e.goaltime, ew.order_index, se.id IS NOT NULL as star
  FROM
    exercises as e
  JOIN
    exerciseWorkout as ew
  ON
    e.id = ew.exercise_id
  FULL OUTER JOIN
    starExercise as se
  ON
    e.id = se.exercise_id
  WHERE
    ew.workout_id=$1
  ORDER BY
    ew.order_index
`;

export const starWorkoutExistance = `
  SELECT EXISTS
  (
  SELECT
    id
  FROM
    starWorkout
  WHERE
    workout_id=$1 AND user_id=$2
  )
`;

export const starWorkout = `
  INSERT INTO
    starWorkout (workout_id, user_id)
  VALUES
    ($1, $2)
  RETURNING
    id
`;

export const deleteStarWorkout = `
  DELETE FROM
    starWorkout
  WHERE
    workout_id=$1 AND user_id=$2
`;

export const starExerciseExistance = `
  SELECT EXISTS
  (
  SELECT
    id
  FROM
    starExercise
  WHERE
    exercise_id=$1 AND user_id=$2
  )
`;

export const starExercise = `
  INSERT INTO
    starExercise (exercise_id, user_id)
  VALUES
    ($1, $2)
  RETURNING
    id
`;

export const deleteStarExercise = `
  DELETE FROM
    starExercise
  WHERE
    exercise_id=$1 AND user_id=$2
`;