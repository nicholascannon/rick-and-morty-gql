import { Outlet } from 'react-router';

import { MenuBar } from './menu-bar';

export function RootLayout() {
    return (
        <main className="min-h-screen container mx-auto px-12 mb-16">
            <MenuBar />
            <Outlet />
        </main>
    );
}
