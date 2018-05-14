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
    w.id, w.name, w.is_public, w.created_at, sw.id as star
  FROM
    workouts as w
  JOIN
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
    e.id, e.name, e.description, e.type, e.reps, e.sets, e.distance, e.pace, e.goaltime, ew.order_index, se.id as star
  FROM
    exercises as e
  JOIN
    exerciseWorkout as ew
  ON
    e.id = ew.exercise_id
  JOIN
    starExercise as se
  ON
    e.id = se.exercise_id
  WHERE
    e.workout_id=$1
`;
