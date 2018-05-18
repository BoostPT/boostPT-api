import express from 'express';

import {
  addChannelController
} from './messageController';

const router = express.Router();

router.route('/getchannels')
  .get(addChannelController);

export default router;