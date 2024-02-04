// eslint-disable-next-line camelcase
import { unstable_batchedUpdates } from 'react-dom';
import { Socket } from 'socket.io-client';

import { store } from '@/store';
import { Room } from '@/store/room';

export const registerRoomHandlers = (socket: Socket) => {
  socket.on('rooms', (rooms: Room[]) => {
    unstable_batchedUpdates(() => {
      store.getState().setRooms(rooms);
    });
  });
};
