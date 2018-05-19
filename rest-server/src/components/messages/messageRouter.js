import express from 'express';

import {
  getChannelsController,
  addChannelController
} from './messageController';

const router = express.Router();

router.route('/addchannel')
  .post(addChannelController);

router.route('/:username')
  .get(getChannelsController);

export default router;