import { Server } from 'socket.io';
import type * as http from 'http';
import { registerMessageHandlers as registerMessageHandler } from './socket/messages';
import { registerUserHandlers } from './socket/users';
import { registerRoomHandlers } from './socket/rooms';

export const bindSocket = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.WEB_HOST,
      credentials: true,
    },
  });

  io.of('/').on('connection', (socket) => {
    registerUserHandlers(socket, io);
    registerMessageHandler(socket, io);
    registerRoomHandlers(socket, io);
  });

  io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
  });
};
