import { Socket, Server } from 'socket.io';
import { connectedUsers } from '../features/data';
import { roomManager } from '@/features/room';

export const registerUserHandlers = (socket: Socket, io: Server) => {
  connectedUsers.set(socket.handshake.auth.token, {
    id: socket.handshake.auth.token,
    name: '',
    socket,
  });

  socket.on('disconnect', (reason) => {
    console.log('user disconnected:', reason);
    connectedUsers.delete(socket.handshake.auth.token);
  });

  socket.on('user:update', (userData: { name: string }, callback) => {
    connectedUsers.set(socket.handshake.auth.token, {
      id: socket.handshake.auth.token,
      name: userData.name,
      socket,
    });

    callback({ ok: true });

    const rooms = roomManager.getUserRooms(socket.handshake.auth.token);
    rooms.forEach((room) => {
      io.to(room?.id).emit('user:update', {
        id: socket.handshake.auth.token,
        name: userData.name,
      });
    });
  });
};
