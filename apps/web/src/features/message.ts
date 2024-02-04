// eslint-disable-next-line camelcase
import { unstable_batchedUpdates } from 'react-dom';
import { Socket } from 'socket.io-client';

import { socket } from '@/libs/socket';
import { store } from '@/store';
import { Room } from '@/store/room';
import { userId } from '@/store/user';

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

export const sendMessage = (roomId: string, content: string) => {
  const localRoom = store
    .getState()
    .localRooms.find((room) => room.id === roomId);

  if (localRoom) {
    socket.emit(
      'rooms:new-dm',
      { targetUserId: localRoom.members[0].id },
      (room: Omit<Room, 'messages'>) => {
        const message = {
          roomId: room.id,
          content,
          author: userId,
          createAt: Date.now(),
        };
        unstable_batchedUpdates(() => {
          console.log(room);
          store.getState().addRoom({ ...room, messages: [message] });
          store.getState().setCurrentRoom(room.id);
          store.getState().removeLocalRoom(localRoom.id);
        });
        socket.emit('message', message, (res: any) => console.log(res));
      },
    );
  } else {
    const message = {
      roomId,
      content,
      author: userId,
      createAt: Date.now(),
    };
    socket.emit('message', message, (res: any) => console.log(res));
    unstable_batchedUpdates(() => {
      store.getState().addMessage(roomId, message);
    });
  }
};
