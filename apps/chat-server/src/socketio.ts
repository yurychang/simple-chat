import { Server } from 'socket.io';
import type * as http from 'http';
import { messageHandler } from './features/chat/socket-handler';
import { userHandler } from './features/user/user-handler';

export const bindSocket = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.WEB_HOST,
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
    userHandler(socket, io);
    messageHandler(socket, io);
  });
};
