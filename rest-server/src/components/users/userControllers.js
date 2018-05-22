import { globalController } from '../../lib/utils/queryHelpers';
import { 
    fetchClientsQuery,
    addClientNonUserQuery,
    fetchAllTrainersQuery,
    userQuery,
    userAddPictureQuery,
    addTrainerRequestQuery,
    fetchTrainerRequestInQuery,
    fetchTrainerRequestOutQuery,
    deleteTrainerRequestQuery,
    addTrainerClientConnectionQuery,
    fetchClientQuery
 } from './userQueries';

export const fetchClientsController = globalController(fetchClientsQuery, 'fetchClientsQuery');
export const addNonUserClientsController = globalController(addClientNonUserQuery, 'addClientNonUserController');
export const userPictureEdit = globalController(userAddPictureQuery, 'userPictureEdit');
export const userController = globalController(userQuery , 'userController');
export const fetchAllTrainers = globalController(fetchAllTrainersQuery, 'fetchAllTrainersQuery');
export const addTrainerRequest = globalController(addTrainerRequestQuery, 'addTrainerRequestQuery');
export const fetchTrainerRequestIn = globalController(fetchTrainerRequestInQuery, 'fetchTrainerRequestQuery');
export const fetchTrainerRequestOut = globalController(fetchTrainerRequestOutQuery, 'fetchTrainerRequestQuery');
export const deleteTrainerRequest = globalController(deleteTrainerRequestQuery, 'deleteTrainerRequestQuery');
export const addTrainerClientConnection = globalController(addTrainerClientConnectionQuery, 'addTrainerClientConnectionQuery');
export const fetchClient = globalController(fetchClientQuery, 'fetchClientQuery');
// export const getTrainerRequestIn = globalController(addTrainerRequestInQuery, 'addTrainerRequestQuery');
// export const getTrainerRequestOut = globalController(addTrainerRequestOutQuery, 'addTrainerRequestQuery');
