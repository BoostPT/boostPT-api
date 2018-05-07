import { globalController } from '../../lib/utils/queryHelpers';
import { userQuery } from './userQueries';
import { fetchClientNonUserQuery } from './userQueries';

export const fetchNonUserClientsController = globalController(fetchClientNonUserQuery, 'nonUserClientsController');