import { v4 as uuid } from 'uuid';
import { StateCreator } from 'zustand';

import { RoomType } from '@/constants/enums';

export type LocalRoom = {
  id: string;
  name: string;
  type: RoomType;
  members: { id: string; name: string }[];
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
  currentRoomId: string | null;
  rooms: Room[];
  localRooms: LocalRoom[];
  createLocalDmRoom: (targetUserId: string, targetUserName: string) => void;
  setRooms: (rooms: Room[]) => void;
  setCurrentRoom: (roomId: string) => void;
}

export const createRoomSlice: StateCreator<RoomSlice, [], [], RoomSlice> = (
  set,
) => ({
  currentRoomId: null,
  rooms: [],
  localRooms: [],
  setCurrentRoom: (roomId) => set(() => ({ currentRoomId: roomId })),
  createLocalDmRoom: (targetUserId, targetUserName) => {
    const roomId = uuid();
    set((state) => ({
      localRooms: [
        ...state.localRooms,
        {
          id: roomId,
          name: targetUserName,
          type: RoomType.DM,
          members: [{ id: targetUserId, name: targetUserName }],
          createdAt: Date.now(),
        },
      ],
      currentRoomId: roomId,
    }));
  },
  setRooms: (rooms) => set(() => ({ rooms })),
});
