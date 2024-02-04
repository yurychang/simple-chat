import { Server, Socket } from 'socket.io';
import { roomManager } from '@/features/room';
import { connectedUsers } from '@/features/data';

export const registerRoomHandlers = (socket: Socket, io: Server) => {
  socket.emit(
    'rooms',
    roomManager.getUserRooms(socket.handshake.auth.token).map((room) => ({
      ...room,
      members: room.members.map((id) => {
        const user = connectedUsers.get(id);
        return {
          id: user?.id,
          name: user?.name,
        };
      }),
    }))
  );
  socket.on('rooms:new-dm', (r: { targetUserId: string }, cb) => {
    const room = roomManager.createDMRoom(
      socket.handshake.auth.token,
      r.targetUserId
    );

    const res = {
      ...room,
      members: room.members.map((id) => {
        const user = connectedUsers.get(id);
        return {
          id: user?.id,
          name: user?.name,
        };
      }),
    };

    socket.join(room.id);
    connectedUsers.get(r.targetUserId)?.socket.join(room.id);
    socket.to(room.id).emit('rooms:new', res);

    cb(res);
  });
};
