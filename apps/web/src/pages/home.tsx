import { Outlet } from 'react-router-dom';

import { RoomView } from '../components/room-view';
import { Sidebar } from '../components/sidebar';

export function Home() {
  return (
    <>
      <div>
        <Outlet />
        <div className="grid min-h-screen grid-cols-4 gap-3 px-5">
          <Sidebar></Sidebar>
          <RoomView></RoomView>
        </div>
      </div>
    </>
  );
}
