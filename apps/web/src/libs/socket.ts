import { io } from 'socket.io-client';

import { userId } from '@/store/user';

const options = {
  auth: { token: userId },
};

export const socket = io('http://localhost:8080', options);
export const userSocket = io('http://localhost:8080/users', options);
export const messageSocket = io('http://localhost:8080/messages', options);
export const roomSocket = io('http://localhost:8080/rooms', options);

let resolveConnect: (value?: unknown) => void;
const connectPromise = new Promise((resolve) => {
  resolveConnect = resolve;
});

socket.on('connect', () => {
  console.log('socket connected');
  resolveConnect();
});

await connectPromise;
