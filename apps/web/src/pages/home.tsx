import { Link, Outlet } from 'react-router-dom';

export function Home() {
  return (
    <>
      <div className="flex justify-center">
        <div>
          <h1 className="mt-8 text-xl">
            Nice to see you here! This is my react starter template. I hope you
            like it!
          </h1>

          <nav className="my-5">
            <ul className="flex gap-3 border-b border-b-orange-900">
              <li>
                <Link to={`query`}>React query</Link>
              </li>
              <li>
                <Link to={`zustand`}>Zustand</Link>
              </li>
            </ul>
          </nav>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Home;
