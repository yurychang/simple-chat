import { v4 as uuid } from 'uuid';
import { Room } from './types';
import { RoomType } from './enums';

const roomMap = new Map<string, Room>();
const userRoomMap = new Map<string, { [type in RoomType]: string[] }>();

export const roomManager = {
  createRoom: (name: string, type: Room['type']) => {
    const id = uuid();
    const room = { id, name, members: [], type };
    roomMap.set(id, room);
    return room;
  },
  createDMRoom: (user1: string, user2: string) => {
    const room = roomManager.getDMRoom(user1, user2);
    if (room) {
      return room;
    }
    const name = `${user1}-${user2}`;
    return roomManager.createRoom(name, RoomType.DM);
  },
  joinRoom: (roomId: string, userId: string) => {
    const room = roomMap.get(roomId);
    if (!room) {
      return;
    }
    room.members.push(userId);
    const userRooms = userRoomMap.get(userId) || {
      [RoomType.DM]: [],
      [RoomType.Group]: [],
    };
    userRooms[room.type].push(roomId);
    userRoomMap.set(userId, userRooms);
    return room;
  },
  getRoom: (roomId: string) => {
    return roomMap.get(roomId);
  },
  getDMRoom: (user1: string, user2: string) => {
    const user1DMRooms = userRoomMap.get(user1)?.[RoomType.DM];
    const user2DMRooms = userRoomMap.get(user2)?.[RoomType.DM];
    if (!user1DMRooms || !user2DMRooms) {
      return;
    }
    const dmRoom = user1DMRooms.find((id) => user2DMRooms.includes(id));
    return dmRoom && roomMap.get(dmRoom);
  },
  getUserRooms: (userId: string) => {
    return userRoomMap.get(userId) || [];
  },
};
