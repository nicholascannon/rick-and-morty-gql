import { RouterProvider, createBrowserRouter } from 'react-router';

import { RootLayout } from '@/components/layouts/root-layout';
import { CharacterDetailsPage } from '@/pages/character-details';
import { CharacterTablePage } from '@/pages/character-table';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <CharacterTablePage />,
            },
            {
                path: '/character/:id',
                element: <CharacterDetailsPage />,
            },
        ],
    },
]);

export function Router() {
    return <RouterProvider router={router} />;
}
