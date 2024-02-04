import { StateCreator } from 'zustand';

import { RoomType } from '@/constants/enums';

export type LocalRoom = {
  id: string;
  name: string;
  type: RoomType;
  members: string[];
  createdAt: number;
};

export type Room = {
  id: string;
  name: string;
  type: RoomType;
  members: string[];
  createdAt: number;
};

export interface RoomSlice {
  rooms: Room[];
  localRooms: LocalRoom[];
  createLocalDmRoom: (targetUserId: string, targetUserName: string) => void;
  setRooms: (rooms: Room[]) => void;
}

export const createRoomSlice: StateCreator<RoomSlice, [], [], RoomSlice> = (
  set,
) => ({
  rooms: [],
  localRooms: [],
  createLocalDmRoom: (targetUserId, targetUserName) =>
    set((state) => ({
      localRooms: [
        ...state.localRooms,
        {
          id: targetUserId,
          name: targetUserName,
          type: RoomType.DM,
          members: [targetUserId],
          createdAt: Date.now(),
        },
      ],
    })),
  setRooms: (rooms) => set(() => ({ rooms })),
});
