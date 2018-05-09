import express from 'express';

import {
  awsS3Controller
} from './awsControllers';

const router = express.Router();

router.route('/s3')
  .get(awsS3Controller);

export default router;