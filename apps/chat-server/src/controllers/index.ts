import { Router } from 'express';
import { chatRouter } from './chat';
import { authRouter } from './auth';

export const router = Router();

router.get('/', function (req, res, next) {
  res.json({ title: 'Hello world!' });
});

router.use('/', authRouter);
router.use('/chat', chatRouter);
