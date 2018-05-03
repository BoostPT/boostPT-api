export const fetchAllUserHelper = `
  SELECT
    id, email, username, password, clout, kdr
  FROM
    users
`;

export const fetchUserHelper = `
  SELECT
    id, email, username, password, clout, kdr
  FROM
    users
  WHERE
    id=$1
`;