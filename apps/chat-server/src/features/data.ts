import { RoomType } from './enums';
import { Room } from './types';
import { ConnectedUser } from './types';

export const connectedUsers: Map<ConnectedUser['id'], ConnectedUser> =
  new Map();

export const roomMap = new Map<string, Room>();

export const userRoomMap = new Map<string, { id: string; type: RoomType }[]>();