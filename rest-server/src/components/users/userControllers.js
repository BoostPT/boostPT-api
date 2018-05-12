import { globalController } from '../../lib/utils/queryHelpers';
import { fetchClientNonUserQuery } from './userQueries';
import {addClientNonUserQuery} from './userQueries';

export const fetchNonUserClientsController = globalController(fetchClientNonUserQuery, 'nonUserClientsController');
export const addNonUserClientsController = globalController(addClientNonUserQuery, 'addClientNonUserController');
