import { Router } from 'express';
import { userRouter } from './user';
import { chatRouter } from './chat';

export const router = Router();

router.get('/', function (req, res, next) {
  res.json({ title: 'Hello world!' });
});

router.use('/users', userRouter);
router.use('/chat', chatRouter);
