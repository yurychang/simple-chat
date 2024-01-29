import { Socket, Server } from 'socket.io';
import { ConnectedUser } from './types';

export const connectedUsers: Map<ConnectedUser['id'], ConnectedUser> =
  new Map();

export const userHandler = (socket: Socket, io: Server) => {
  connectedUsers.set(socket.id, { id: socket.id, name: '' });
  socket.on('updateName', (username: string) => {
    console.log(username);
    connectedUsers.set(socket.id, { id: socket.id, name: username });
  });
};
