import { v4 as uuid } from 'uuid';
import { Room } from '../types';
import { RoomType } from '../../constants/enums';
import { connectedUsers } from '../user/connected-users';
import { roomMap } from './room-map';

const userRoomMap = new Map<string, { id: string; type: RoomType }[]>();

export const roomManager = {
  createRoom: (name: string, createdBy: string, type: Room['type']) => {
    const id = uuid();
    const room = {
      id,
      name,
      type,
      createdBy,
      members: [],
      createdAt: Date.now(),
    };
    roomMap.set(id, room);
    return room;
  },
  createDMRoom: (creator: string, targetUser: string) => {
    let room = roomManager.getDMRoom(creator, targetUser);
    if (room) {
      return room;
    }
    const name = `${creator}-${targetUser}`;
    room = roomManager.createRoom(name, creator, RoomType.DM);
    roomManager.joinRoom(room.id, creator);
    roomManager.joinRoom(room.id, targetUser);
    return room;
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
    const rooms = userRoomMap.get(userId) || [];
    return rooms.map(({ id }) => roomMap.get(id) as Room);
  },
};
