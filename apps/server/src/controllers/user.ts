import { Router } from 'express';
import { prisma } from '@/models/prisma';
import { User } from '@prisma/client';

export const userRouter = Router();

userRouter.get('/', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

userRouter.get('/:userId', async (req, res) => {
  console.log(req.params.userId);
  const users = await prisma.user.findFirst({
    where: {
      userId: +req.params.userId,
    },
  });
  res.json(users);
});

userRouter.post('/', async (req, res) => {
  const userData = req.body as Pick<User, 'email' | 'name'>;
  const user = await prisma.user.create({
    data: userData,
  });
  res.json(user);
});

userRouter.post('/:userId', async (req, res) => {
  const updateData = req.body as Pick<User, 'email' | 'name'>;
  console.log(updateData);
  const user = await prisma.user.update({
    data: updateData,
    where: {
      userId: +req.params.userId,
    },
  });
  res.json(user);
});
