// eslint-disable-next-line camelcase
import { unstable_batchedUpdates } from 'react-dom';
import { Socket } from 'socket.io-client';

import { Room } from '@/features/room/store';
import { store } from '@/store';

export const registerRoomHandlers = (socket: Socket) => {
  socket.on('rooms', (rooms: Omit<Room, 'messages'>[]) => {
    unstable_batchedUpdates(() => {
      store
        .getState()
        .setRooms(rooms.map((room) => ({ ...room, messages: [] })));
    });
  });
  socket.on('rooms:new', (room: Omit<Room, 'messages'>) => {
    unstable_batchedUpdates(() => {
      store.getState().addRoom({ ...room, messages: [] });
    });
  });
  socket.on('user:update', ({ id, name }: { id: string; name: string }) => {
    unstable_batchedUpdates(() => {
      store.getState().updateUser(id, name);
    });
  });
};
