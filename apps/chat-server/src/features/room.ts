import { v4 as uuid } from 'uuid';
import { Room } from './types';
import { RoomType } from './enums';
import { connectedUsers, roomMap, userRoomMap } from './data';

export const roomManager = {
  createRoom: (name: string, type: Room['type']) => {
    const id = uuid();
    const room = { id, name, type, members: [], createdAt: Date.now() };
    roomMap.set(id, room);
    return room;
  },
  createDMRoom: (user1: string, user2: string) => {
    let room = roomManager.getDMRoom(user1, user2);
    if (room) {
      return room;
    }
    const name = `${user1}-${user2}`;
    room = roomManager.createRoom(name, RoomType.DM);
    roomManager.joinRoom(room.id, user1);
    roomManager.joinRoom(room.id, user2);
    return room.id;
  },
  joinRoom: (roomId: string, userId: string) => {
    const room = roomMap.get(roomId);
    if (!room) {
      return;
    }
    room.members.push(userId);
    const userRooms = userRoomMap.get(userId) || [];
    userRooms.push({ id: roomId, type: room.type });
    userRoomMap.set(userId, userRooms);
    connectedUsers.get(userId)?.socket.join(room.id);
    return room;
  },
  getDMRoom: (user1: string, user2: string) => {
    const user1DMRooms = userRoomMap
      .get(user1)
      ?.filter(({ type }) => type === RoomType.DM);
    const user2DMRooms = userRoomMap
      .get(user2)
      ?.filter(({ type }) => type === RoomType.DM);
    if (!user1DMRooms || !user2DMRooms) {
      return;
    }
    const dmRoom = user1DMRooms.find(({ id }) =>
      user2DMRooms.find(({ id: id2 }) => id2 === id)
    );
    return dmRoom && roomMap.get(dmRoom.id);
  },
  getUserRooms: (userId: string) => {
    const rooms = userRoomMap.get(userId);
    return rooms?.map(({ id }) => roomMap.get(id)) || [];
  },
};
