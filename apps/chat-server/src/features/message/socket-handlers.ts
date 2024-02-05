import { Server, Socket } from 'socket.io';

export const registerMessageHandlers = (socket: Socket, io: Server) => {
  socket.on(
    'message',
    (
      message: {
        roomId: string;
        content: string;
      },
      cb
    ) => {
      console.log('message', {
        author: socket.handshake.auth.token,
        content: message.content,
        createAt: Date.now(),
      });
      socket.to(message.roomId).emit('message', {
        roomId: message.roomId,
        author: socket.handshake.auth.token,
        content: message.content,
        createAt: Date.now(),
      });
      cb({ sent: true });
    }
  );
};
