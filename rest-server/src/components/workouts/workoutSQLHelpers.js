export const createWorkoutHelper = `
  INSERT INTO
    workouts (name, description, type, reps, sets, distance, pace, goaltime)
  VALUES 
    ($1, $2, $3, $4, $5, $6, $7, $8)
  RETURNING 
    id, name, description, type, reps, sets, distance, pace, goaltime
`;

export const fetchWorkoutsHelper = `
  SELECT
    id, name, description, type, reps, sets, distance, pace, goaltime
  FROM
    workouts
  WHERE
    id=$1
`;