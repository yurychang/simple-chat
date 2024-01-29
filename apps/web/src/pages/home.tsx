import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { socket } from '@/libs/socket';

export function Home() {
  const [username, setUsername] = useState('');
  const updateName = () => {
    username && socket.emit('updateName', username);
  };
  return (
    <>
      <div>
        <Outlet />
        <div className="max-w-screen-lg mx-auto">
          <Input
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="flex justify-end mt-3">
            <Button onClick={updateName}>Update name</Button>
          </div>
          <Textarea placeholder="Type your message here." />
          <Button onClick={updateName}>Update name</Button>
        </div>
      </div>
    </>
  );
}

export default Home;
