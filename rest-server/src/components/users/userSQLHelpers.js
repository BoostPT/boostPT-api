export const fetchAllClientNonUserHelper = 
`SELECT id, trainer_id, client_name FROM trainerClientNonUser WHERE trainer_id=$1`;

export const addClientNonUserHelper = 
`INSERT INTO trainerclientnonuser (client_name, trainer_id) VALUES ($1, $2)`;