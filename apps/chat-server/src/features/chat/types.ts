import { RoomType } from './enums';

export type MessageData = {
  roomId: string;
  content: string;
};

export type Room = {
  id: string;
  name: string;
  members: string[];
  type: RoomType;
};
