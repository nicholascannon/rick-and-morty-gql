import { Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router';

import { RootLayout } from '@/components/layouts/root-layout';
import { LoaderPage } from '@/components/pages/loader-page';
import { ErrorPage } from './components/pages/error-page';

const CharacterTablePage = lazy(() => import('@/pages/character-table'));
const CharacterDetailsPage = lazy(() => import('@/pages/character-details'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
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
  return (
    <Suspense fallback={<LoaderPage />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
