import { io } from 'socket.io-client';

import { registerMessageHandlers } from '@/features/message/socket-handlers';
import { registerRoomHandlers } from '@/features/room/socket-handlers';
import { userId } from '@/store/user';

const options = {
  auth: { token: userId },
};

export const socket = io('http://localhost:8080', options);

registerMessageHandlers(socket);
registerRoomHandlers(socket);

let resolveConnect: (value?: unknown) => void;
const connectPromise = new Promise((resolve) => {
  resolveConnect = resolve;
});

socket.on('connect', () => {
  console.log('socket connected');
  resolveConnect();
});

await connectPromise;
