import { Server, Socket } from 'socket.io';
import { roomManager } from '@/features/room';

export const registerRoomHandlers = (socket: Socket, io: Server) => {
  socket.on('rooms', (_, cb) => {
    const rooms = roomManager.getUserRooms(socket.handshake.auth.token);
    cb(rooms);
  });
  socket.emit('rooms', roomManager.getUserRooms(socket.handshake.auth.token));
};
