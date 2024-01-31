import { RoomType } from './constants/enums';

export type Room = {
  id: string;
  name: string;
  type: RoomType;
  members: string[];
  createdAt: number;
};
