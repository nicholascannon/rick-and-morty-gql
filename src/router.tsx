import { type ReactNode, Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router';

import { RootLayout } from '@/components/layouts/root-layout';
import { LoaderPage } from '@/components/loader-page';

const CharacterTablePage = lazy(() => import('@/pages/character-table'));
const CharacterDetailsPage = lazy(() => import('@/pages/character-details'));

function AsyncPage({ page }: { page: ReactNode }) {
    return <Suspense fallback={<LoaderPage />}>{page}</Suspense>;
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <AsyncPage page={<CharacterTablePage />} />,
            },
            {
                path: '/character/:id',
                element: <AsyncPage page={<CharacterDetailsPage />} />,
            },
        ],
    },
]);

export function Router() {
    return <RouterProvider router={router} />;
}
