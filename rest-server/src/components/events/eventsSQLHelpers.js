export const addEventHelper = `
  INSERT INTO
    events (user_id, workout_id, title, description, month, day, year, hour, minute, second)
  VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  RETURNING
  id, user_id, workout_id, title, description, month, day, year, hour, minute, second;
`;