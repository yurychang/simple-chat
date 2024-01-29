import { Socket } from 'socket.io';

export type ConnectedUser = {
  id: Socket['id'];
  name: string;
};
