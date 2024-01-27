import { Outlet } from 'react-router-dom';

import { Button } from '@/components/ui/button';

export function Home() {
  return (
    <>
      <div className="flex justify-center">
        <Outlet />
        <Button>Click me</Button>
      </div>
    </>
  );
}

export default Home;
