// eslint-disable-next-line camelcase
import { unstable_batchedUpdates } from 'react-dom';
import { Socket } from 'socket.io-client';

import { socket } from '@/libs/socket';
import { store } from '@/store';
import { Room } from '@/store/room';

export const registerMessageHandlers = (socket: Socket) => {
  socket.on(
    'message',
    (message: {
      roomId: string;
      content: string;
      createAt: number;
      author: string;
    }) => {
      unstable_batchedUpdates(() => {
        store.getState().addMessage(message.roomId, {
          author: message.author,
          content: message.content,
          createAt: message.createAt,
        });
      });
    },
  );
};

export const sendMessage = (roomId: string, message: string) => {
  const localRoom = store
    .getState()
    .localRooms.find((room) => room.id === roomId);

  if (localRoom) {
    socket.emit(
      'rooms:create-dm',
      { targetUserId: localRoom.members[0].id },
      (room: Room) => {
        unstable_batchedUpdates(() => {
          store.getState().addRoom(room);
          store.getState().setCurrentRoom(room.id);
          store.getState().removeLocalRoom(localRoom.id);
        });
        socket.emit(
          'message',
          { roomId: room.id, content: message },
          (res: any) => console.log(res),
        );
      },
    );
  } else {
    socket.emit('message', { roomId, message });
  }
};
