import express from 'express';
import authRouter from '../components/auth/authRouter';
import userRouter from '../components/users/userRouter';
import awsRouter from '../components/aws/awsRouter';
import workoutRouter from '../components/workouts/workoutRouter';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/aws', awsRouter);
router.use('/workouts', workoutRouter);

export default router;