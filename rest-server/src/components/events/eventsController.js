import { globalController } from '../../lib/utils/queryHelpers';

import { 
  eventQuery
} from './eventsQueries';

import { globalQueryHelper } from "../../lib/utils/queryHelpers";

import {
  success,
  error
} from '../../lib/log';

export const eventsController = globalController(eventQuery, 'eventsController');