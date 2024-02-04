import { io } from 'socket.io-client';

import { userId } from '@/store/user';

const options = {
  auth: { token: userId },
};

export const socket = io('http://localhost:8080', options);

let resolveConnect: (value?: unknown) => void;
const connectPromise = new Promise((resolve) => {
  resolveConnect = resolve;
});

socket.on('connect', () => {
  console.log('socket connected');
  resolveConnect();
});

await connectPromise;
