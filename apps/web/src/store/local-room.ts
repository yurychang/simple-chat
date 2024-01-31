import { StateCreator } from 'zustand';

import { RoomType } from '@/constants/enums';

export type LocalRoom = {
  id: string;
  name: string;
  type: RoomType;
  members: string[];
  createdAt: number;
};

export interface LocalRoomSlice {
  rooms: LocalRoom[];
  createDmRoom: (targetUserId: string, targetUserName: string) => void;
}

export const createLocalRoomSlice: StateCreator<
  LocalRoomSlice,
  [],
  [],
  LocalRoomSlice
> = (set) => ({
  rooms: [],
  createDmRoom: (targetUserId, targetUserName) =>
    set((state) => ({
      rooms: [
        ...state.rooms,
        {
          id: targetUserId,
          name: targetUserName,
          type: RoomType.DM,
          members: [targetUserId],
          createdAt: Date.now(),
        },
      ],
    })),
});
