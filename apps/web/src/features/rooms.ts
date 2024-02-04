import { Socket } from 'socket.io-client';

import { useStore } from '@/store';
import { Room } from '@/types';

export const registerRoomHandlers = (socket: Socket) => {
  socket.on('rooms', (rooms: Room[]) => {
    const setRooms = useStore.use.setRooms();
    setRooms(rooms);
  });
};
