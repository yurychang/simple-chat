import { Router } from 'express';
import { connectedUsers, userRoomMap } from '@/features/data';
import { roomManager } from '@/features/chat/room';

export const chatRouter = Router();

chatRouter.get('/online-users', function (req, res, next) {
  const { userId } = req.query;
  const users = Array.from(connectedUsers, ([id, user]) => ({
    id: user.id,
    name: user.name,
  })).filter(({ id }) => id !== userId);
  res.json(users);
});

chatRouter.post('/start-dm-chat', function (req, res, next) {
  const { userId, targetUserId } = req.body;
  if (!userId || !targetUserId) {
    return res.status(400).json({ error: 'Missing userId or targetId' });
  }
  const roomId = roomManager.createDMRoom(userId, targetUserId);
  res.json({ roomId });
});

chatRouter.get('/user-rooms/:userId', function (req, res, next) {
  const { userId } = req.params;
  const rooms = roomManager.getUserRooms(userId);

  console.log(Object.fromEntries(userRoomMap.entries()));
  res.json(rooms);
});
