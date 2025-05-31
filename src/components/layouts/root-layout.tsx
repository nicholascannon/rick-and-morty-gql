import { Outlet } from 'react-router';

import { MenuBar } from '../navigation/menu-bar';

export function RootLayout() {
  return (
    <main className="min-h-screen container mx-auto lg:px-32 px-10 mb-16">
      <MenuBar />
      <Outlet />
    </main>
  );
}
