export const signUpHelper = `
    INSERT INTO
      users (username, email, password, isTrainer)
    VALUES
      ($1, $2, $3, $4)
    RETURNING
      id, username, email, isTrainer
`;

export const loginHelper = `
    SELECT
      id, username, email, password, isTrainer
    FROM
      users
    WHERE
      email=$1
`;