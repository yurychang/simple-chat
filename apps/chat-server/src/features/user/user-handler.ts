import { Socket, Server } from 'socket.io';
import { connectedUsers } from '../data';

export const userHandler = (socket: Socket, io: Server) => {
  connectedUsers.set(socket.id, { id: socket.id, name: '', socket });
  socket.on('disconnect', (reason) => {
    connectedUsers.delete(socket.id);
  });
  socket.on('updateName', (username: string) => {
    console.log(username);
    connectedUsers.set(socket.id, { id: socket.id, name: username, socket });
  });
};
