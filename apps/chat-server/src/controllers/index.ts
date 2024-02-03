import { Router } from 'express';
import { chatRouter } from './chat';

export const router = Router();

router.get('/', function (req, res, next) {
  res.json({ title: 'Hello world!' });
});

router.use('/chat', chatRouter);
