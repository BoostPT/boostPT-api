import express from 'express';
import authRouter from '../components/auth/authRouter';
import userRouter from '../components/users/userRouter';
import awsRouter from '../components/aws/awsRouter';
import workoutRouter from '../components/workouts/workoutRouter';
import messageRouter from '../components/messages/messageRouter';

import { verifyUserWithJWT } from '../middleware/auth/jwt';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', verifyUserWithJWT, userRouter);
router.use('/aws', awsRouter);
router.use('/workouts', verifyUserWithJWT, workoutRouter);
router.use('/messages', messageRouter);

export default router;