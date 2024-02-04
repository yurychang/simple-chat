import { Socket } from 'socket.io';
import { RoomType } from './enums';

export type ConnectedUser = {
  id: Socket['id'];
  name: string;
  socket: Socket;
};
export type MessageData = {
  roomId: string;
  content: string;
};

export type Room = {
  id: string;
  name: string;
  members: string[];
  type: RoomType;
  createdAt: number;
  createdBy: string;
};
