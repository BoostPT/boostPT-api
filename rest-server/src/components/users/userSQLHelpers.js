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

export const fetchAllClientNonUserHelper = 
`SELECT id, trainer_id, client_name FROM trainerClientNonUser WHERE trainer_id=$1`;

export const addClientNonUserHelper = 
`INSERT INTO trainerclientnonuser (client_name, trainer_id) VALUES ($1, $2)`;