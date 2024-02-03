import { Socket, Server } from 'socket.io';
import { connectedUsers } from '../features/data';

export const registerUserHandlers = (socket: Socket, io: Server) => {
  connectedUsers.set(socket.handshake.auth.token, {
    id: socket.handshake.auth.token,
    name: '',
    socket,
  });

  socket.on('disconnect', (reason) => {
    connectedUsers.delete(socket.handshake.auth.token);
  });

  socket.on('update-user', (userData: { name: string }, callback) => {
    connectedUsers.set(socket.handshake.auth.token, {
      id: socket.handshake.auth.token,
      name: userData.name,
      socket,
    });
    callback({ ok: true });
  });
};
