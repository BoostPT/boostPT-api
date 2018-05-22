export const addEventHelper = `
  INSERT INTO
    events (user_id, workout_id, title, description, month, day, year, start_hour, start_minute, end_hour, end_minute, second)
  VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
  RETURNING
  id, user_id, workout_id, title, description, month, day, year, start_hour, start_minute, end_hour, end_minute, second;
`;

export const fetchEventsByUser = `
  SELECT 
    *
  FROM
    events
  WHERE
    user_id=$1
`;
