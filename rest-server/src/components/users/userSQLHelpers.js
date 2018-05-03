export const fetchAllUserHelper = `
  SELECT
    id, email, username, password, isTrainer
  FROM
    users
`;

export const fetchUserHelper = `
  SELECT
    id, email, username, password, isTrainer
  FROM
    users
  WHERE
    id=$1
`;