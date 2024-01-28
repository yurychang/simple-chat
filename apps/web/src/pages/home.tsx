import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { socket } from '@/libs/socket';

export function Home() {
  const [message, setMessage] = useState('');
  const sendMessage = () => {
    socket.emit('message', message);
    console.log(message);
    setMessage('');
  };
  return (
    <>
      <div className="flex justify-center">
        <Outlet />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </>
  );
}

export default Home;
