import { v4 as uuid } from 'uuid';
import { StateCreator } from 'zustand';

import { RoomType } from '@/constants/enums';

export type Message = { author: string; content: string; createAt: number };

export type Room = {
  id: string;
  name: string;
  type: RoomType;
  members: { id: string; name: string }[];
  createdAt: number;
  messages: Message[];
};

export interface RoomSlice {
  currentRoomId: string | null;
  currentRoom: () => Room | null;
  rooms: Room[];
  localRooms: Room[];
  createLocalDmRoom: (targetUserId: string, targetUserName: string) => void;
  setRooms: (rooms: Room[]) => void;
  setCurrentRoom: (roomId: string) => void;
  addMessage: (roomId: string, message: Message) => void;
  addRoom: (room: Room) => void;
  removeLocalRoom: (roomId: string) => void;
}

export const createRoomSlice: StateCreator<RoomSlice, [], [], RoomSlice> = (
  set,
  get,
) => ({
  currentRoomId: null,
  currentRoom: () =>
    [...get().rooms, ...get().localRooms].find(
      (room) => room.id === get().currentRoomId,
    ) || null,
  rooms: [],
  localRooms: [],
  setCurrentRoom: (roomId) => set(() => ({ currentRoomId: roomId })),
  createLocalDmRoom: (targetUserId, targetUserName) => {
    set((state) => {
      const existRoom = [...state.localRooms, ...state.rooms].find(
        (room) =>
          room.type === RoomType.DM &&
          room.members.map((member) => member.id).includes(targetUserId),
      );
      if (existRoom) {
        return {
          currentRoomId: existRoom.id,
        };
      } else {
        const roomId = uuid();
        return {
          localRooms: [
            ...state.localRooms,
            {
              id: roomId,
              name: targetUserName,
              type: RoomType.DM,
              members: [{ id: targetUserId, name: targetUserName }],
              createdAt: Date.now(),
              messages: [],
            },
          ],
          currentRoomId: roomId,
        };
      }
    });
  },
  setRooms: (rooms) => set(() => ({ rooms })),
  addMessage: (roomId, message) => {
    set((state) => {
      const room = [...state.rooms, ...state.localRooms].find(
        (r) => r.id === roomId,
      );
      if (room) {
        room.messages = [...room.messages, message];
      }
      return { rooms: [...state.rooms], localRooms: [...state.localRooms] };
    });
  },
  addRoom: (room) => {
    set((state) => ({ rooms: [...state.rooms, room] }));
  },
  removeLocalRoom: (roomId) =>
    set((state) => ({
      localRooms: state.localRooms.filter((room) => room.id !== roomId),
    })),
});
