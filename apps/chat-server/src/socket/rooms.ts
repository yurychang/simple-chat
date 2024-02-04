import { Server, Socket } from 'socket.io';
import { roomManager } from '@/features/room';

export const registerRoomHandlers = (socket: Socket, io: Server) => {
  socket.on('user-rooms', (_, cb) => {
    const rooms = roomManager.getUserRooms(socket.handshake.auth.token);
    console.log(rooms);
    cb(rooms);
  });
  socket.emit(
    'user-rooms',
    roomManager.getUserRooms(socket.handshake.auth.token)
  );
};
