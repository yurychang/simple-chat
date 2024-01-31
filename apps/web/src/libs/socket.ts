import { io } from 'socket.io-client';

export const socket = io('http://localhost:8080');

socket.on('chat message', (msg) => {
  console.log(msg);
});

let resolveConnect: (value?: unknown) => void;
const connectPromise = new Promise((resolve) => {
  resolveConnect = resolve;
});

socket.on('connect', () => {
  console.log('connected');
  resolveConnect();
});

await connectPromise;
