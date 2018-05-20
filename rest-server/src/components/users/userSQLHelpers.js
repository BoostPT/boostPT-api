export const fetchAllClientNonUserHelper = 
`SELECT id, trainer_id, client_name FROM trainerClientNonUser WHERE trainer_id=$1`;

export const addClientNonUserHelper = 
`INSERT INTO trainerclientnonuser (client_name, trainer_id) VALUES ($1, $2)`;

export const fetchUserHelper = `
  SELECT
    id, email, username, password, isTrainer
  FROM
    users
  WHERE
    id=$1
`;

export const addUserPictureHelper = `
  UPDATE 
    users
  SET 
    picture=$2
  WHERE
    id=$1
`;

export const fetchAllTrainersHelper = `
  SELECT 
    id, username, email, picture 
  FROM 
    users 
  WHERE 
    isTrainer=true
`;

export const addTrainerRequestHelper = `
  INSERT
  INTO
    trainerRequests (client_id, trainer_id)
  VALUES
    ($1, $2)
`;