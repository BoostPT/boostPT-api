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

export const addExerciseHelper = (exercisePayload) => {
  // Key options: (name, description, type, reps, sets, distance, pace, goaltime)

  const keysInParens = `(${Object.keys(exercisePayload).join(', ')})`;

  const valuesInParens = `(${Object.values(exercisePayload)
                            .map(value => JSON.stringify(value))
                            .join(', ')
                            .replace(/"/g,"'")})`; // double quotes cause an error in postgres

  return `
  INSERT INTO
    exercises ${keysInParens}
  VALUES
    ${valuesInParens}
  RETURNING
    id
  `;
};

export const addExerciseWorkoutEntryHelper = `
  INSERT INTO
    exerciseWorkout (exercise_id, workout_id, order_index)
  VALUES 
    ($1, $2, $3)
  RETURNING 
    id, exercise_id, workout_id, order_index;
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