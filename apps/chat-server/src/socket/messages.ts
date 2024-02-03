import { Server, Socket } from 'socket.io';
import { MessageData } from '../features/types';

export const registerMessageHandlers = (socket: Socket, io: Server) => {
  socket.on('message', (message: MessageData) => {
    console.log('message', message);
    socket.to(message.roomId).emit('message', message);
  });
};
