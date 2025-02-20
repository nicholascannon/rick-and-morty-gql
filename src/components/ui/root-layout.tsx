import { Outlet } from 'react-router';

export function RootLayout() {
    return (
        <main className="min-h-screen">
            <Outlet />
        </main>
    );
}
