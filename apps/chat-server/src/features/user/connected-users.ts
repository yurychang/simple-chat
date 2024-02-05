import { ConnectedUser } from '../types';

export const connectedUsers: Map<ConnectedUser['id'], ConnectedUser> =
  new Map();
