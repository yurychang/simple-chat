import { io } from 'socket.io-client';

export const socket = io('http://localhost:8080');

socket.on('chat message', (msg) => {
  console.log(msg);
});
