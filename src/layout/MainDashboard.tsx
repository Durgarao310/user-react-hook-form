/** @format */
import { Outlet, NavLink } from 'react-router-dom';

const MainDashboard = () => {
  return (
    <div className='flex h-screen overflow-hidden'>
      {/* Sidebar */}
      <aside className='w-64 bg-white shadow-md flex flex-col'>
        {/* Fixed logo/header */}
        <div className='p-4 text-2xl font-bold border-b shrink-0 sticky top-0 bg-white z-10'>
          MyLogo
        </div>

        {/* Scrollable navigation */}
        <div className='flex-1 overflow-y-auto'>
          <nav className='flex flex-col p-4 space-y-2'>
            <NavLink
              to='/'
              end
              className={({ isActive }) =>
                `p-2 rounded hover:bg-gray-100 ${
                  isActive ? 'bg-gray-200 font-semibold' : ''
                }`
              }
            >
              Home
            </NavLink>
          </nav>
        </div>
      </aside>

      {/* Main content area */}
      <div className='flex-1 flex flex-col overflow-hidden'>
        {/* Fixed header */}
        <header className='h-16 bg-gray-100 shadow-md px-6 flex items-center justify-between shrink-0'>
          <h1 className='text-xl font-semibold'>Dashboard</h1>
          <div className='text-sm'>User Menu</div>
        </header>

        {/* Scrollable content */}
        <main className='flex-1 overflow-y-auto p-6 bg-gray-50'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainDashboard;
