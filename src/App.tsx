import { BrowserRouter } from 'react-router';

import { CLIENT } from '@/lib/client';
import { AppProvider } from '@/providers/app-provider';
import { Routes } from '@/routes';

export function App() {
    return (
        <AppProvider client={CLIENT}>
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </AppProvider>
    );
}
