import { globalController } from '../../lib/utils/queryHelpers';
import { 
    fetchClientNonUserQuery,
    addClientNonUserQuery,
    fetchAllTrainersQuery,
    userQuery,
    userAddPictureQuery,
    addTrainerRequestQuery
 } from './userQueries';

export const fetchNonUserClientsController = globalController(fetchClientNonUserQuery, 'nonUserClientsController');
export const addNonUserClientsController = globalController(addClientNonUserQuery, 'addClientNonUserController');
export const userPictureEdit = globalController(userAddPictureQuery, 'userPictureEdit');
export const userController = globalController(userQuery , 'userController');
export const fetchAllTrainers = globalController(fetchAllTrainersQuery, 'fetchAllTrainersQuery');
export const addTrainerRequest = globalController(addTrainerRequestQuery, 'addTrainerRequestQuery');
// export const getTrainerRequestIn = globalController(addTrainerRequestInQuery, 'addTrainerRequestQuery');
// export const getTrainerRequestOut = globalController(addTrainerRequestOutQuery, 'addTrainerRequestQuery');